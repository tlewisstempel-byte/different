import { UserProfile, Tweet, Guardian } from "./scoring";

const APIFY_BASE = "https://api.apify.com/v2";
const ACTOR_ID = "apidojo~tweet-scraper";
const POLL_INTERVAL_MS = 3000;
const MAX_WAIT_MS = 120_000;

interface ApifyTweet {
  id?: string;
  text?: string;
  likeCount?: number;
  retweetCount?: number;
  replyCount?: number;
  bookmarkCount?: number;
  viewCount?: number;
  createdAt?: string;
  author?: {
    userName?: string;
    name?: string;
    profilePicture?: string;
    followers?: number;
    following?: number;
  };
  // Some actor versions use these alternative field names
  bookmark_count?: number;
  postBookmarks?: number;
  favorite_count?: number;
  reply_count?: number;
}

async function runActor(handle: string, token: string): Promise<string> {
  const input = {
    startUrls: [{ url: `https://twitter.com/${handle}` }],
    maxTweets: 15,
    maxRequestRetries: 2,
    proxyConfiguration: {
      useApifyProxy: true,
      apifyProxyGroups: ["DATACENTER"],
    },
  };

  const res = await fetch(
    `${APIFY_BASE}/acts/${ACTOR_ID}/runs?token=${token}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    }
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Apify run failed: ${res.status} ${text}`);
  }

  const data = await res.json();
  return data.data.id as string;
}

async function waitForRun(runId: string, token: string): Promise<void> {
  const start = Date.now();
  while (Date.now() - start < MAX_WAIT_MS) {
    await new Promise((r) => setTimeout(r, POLL_INTERVAL_MS));
    const res = await fetch(`${APIFY_BASE}/actor-runs/${runId}?token=${token}`);
    if (!res.ok) continue;
    const data = await res.json();
    const status: string = data.data.status;
    if (status === "SUCCEEDED") return;
    if (status === "FAILED" || status === "ABORTED" || status === "TIMED-OUT") {
      throw new Error(`Apify run ${runId} ended with status: ${status}`);
    }
  }
  throw new Error("Apify run timed out after 120s");
}

async function fetchDataset(runId: string, token: string): Promise<ApifyTweet[]> {
  const res = await fetch(
    `${APIFY_BASE}/actor-runs/${runId}/dataset/items?token=${token}&limit=15`
  );
  if (!res.ok) throw new Error(`Failed to fetch dataset: ${res.status}`);
  return res.json();
}

function normalizeBookmarks(tweet: ApifyTweet): number {
  return tweet.bookmarkCount ?? tweet.bookmark_count ?? tweet.postBookmarks ?? 0;
}

function normalizeLikes(tweet: ApifyTweet): number {
  return tweet.likeCount ?? tweet.favorite_count ?? 0;
}

function normalizeReplies(tweet: ApifyTweet): number {
  return tweet.replyCount ?? tweet.reply_count ?? 0;
}

export async function scrapeTwitterProfile(
  handle: string
): Promise<{ profile: UserProfile; guardian: Guardian | null }> {
  const token = process.env.APIFY_API_TOKEN;
  if (!token) throw new Error("APIFY_API_TOKEN is not set");

  const runId = await runActor(handle, token);
  await waitForRun(runId, token);
  const items = await fetchDataset(runId, token);

  if (!items.length) throw new Error("No tweets returned for this handle");

  // The first item typically contains the author profile
  const firstItem = items[0];
  const author = firstItem.author;

  const followerCount = author?.followers ?? 0;
  const followingCount = author?.following ?? 0;
  const displayName = author?.name ?? handle;
  const avatarUrl = author?.profilePicture ?? "";

  const tweets: Tweet[] = items.slice(0, 10).map((item) => ({
    likeCount: normalizeLikes(item),
    replyCount: normalizeReplies(item),
    bookmarkCount: normalizeBookmarks(item),
    createdAt: item.createdAt ?? new Date().toISOString(),
  }));

  const profile: UserProfile = {
    handle,
    displayName,
    avatarUrl,
    followerCount,
    followingCount,
    tweets,
  };

  // Guardian: highest-follower author among reply authors in the dataset
  // The tweet scraper may include some reply tweets where author differs
  const guardianCandidates = new Map<
    string,
    { handle: string; avatarUrl: string; followerCount: number }
  >();

  for (const item of items) {
    const itemAuthor = item.author;
    if (!itemAuthor?.userName) continue;
    const userName = itemAuthor.userName.toLowerCase();
    if (userName === handle.toLowerCase()) continue;
    if (!guardianCandidates.has(userName)) {
      guardianCandidates.set(userName, {
        handle: itemAuthor.userName,
        avatarUrl: itemAuthor.profilePicture ?? "",
        followerCount: itemAuthor.followers ?? 0,
      });
    }
  }

  let guardian: Guardian | null = null;
  if (guardianCandidates.size > 0) {
    const best = Array.from(guardianCandidates.values()).sort(
      (a, b) => b.followerCount - a.followerCount
    )[0];
    guardian = best;
  }

  return { profile, guardian };
}
