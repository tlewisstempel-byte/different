import { UserProfile, Tweet, Guardian } from "./scoring";

const APIFY_BASE = "https://api.apify.com/v2";
const ACTOR_ID = "apidojo~tweet-scraper";

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
    followersCount?: number;
    following?: number;
    followingCount?: number;
  };
  // Some actor versions use these alternative field names
  bookmark_count?: number;
  postBookmarks?: number;
  favorite_count?: number;
  reply_count?: number;
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

export async function startApifyRun(handle: string): Promise<string> {
  const token = process.env.APIFY_API_TOKEN;
  if (!token) throw new Error("APIFY_API_TOKEN is not set");

  const input = {
    twitterHandles: [handle],
    maxTweets: 15,
    maxRequestRetries: 2,
    timeoutSecs: 25,
    proxyConfiguration: {
      useApifyProxy: true,
      apifyProxyGroups: ["DATACENTER"],
    },
  };

  const res = await fetch(`${APIFY_BASE}/acts/${ACTOR_ID}/runs?token=${token}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to start Apify run: ${res.status} ${text}`);
  }

  const data = await res.json();
  return data.data.id as string;
}

export type PollResult =
  | { status: "pending" }
  | { status: "done"; profile: UserProfile; guardian: Guardian | null };

export async function pollApifyRun(runId: string): Promise<PollResult> {
  const token = process.env.APIFY_API_TOKEN;
  if (!token) throw new Error("APIFY_API_TOKEN is not set");

  const statusRes = await fetch(`${APIFY_BASE}/actor-runs/${runId}?token=${token}`);
  if (!statusRes.ok) throw new Error(`Failed to check run status: ${statusRes.status}`);

  const statusData = await statusRes.json();
  const runStatus: string = statusData.data.status;

  if (runStatus === "FAILED" || runStatus === "ABORTED" || runStatus === "TIMED-OUT") {
    throw new Error(`Apify run ended with status: ${runStatus}`);
  }

  if (runStatus !== "SUCCEEDED") {
    return { status: "pending" };
  }

  const datasetRes = await fetch(
    `${APIFY_BASE}/actor-runs/${runId}/dataset/items?token=${token}&limit=15`
  );
  if (!datasetRes.ok) throw new Error(`Failed to fetch dataset: ${datasetRes.status}`);

  const items: ApifyTweet[] = await datasetRes.json();

  if (!items.length) throw new Error("No tweets returned for this handle");

  const firstItem = items[0];
  const author = firstItem.author;

  const followerCount = author?.followers ?? author?.followersCount ?? 0;
  const followingCount = author?.following ?? author?.followingCount ?? 0;
  const displayName = author?.name ?? author?.userName ?? "";
  const avatarUrl = author?.profilePicture ?? "";
  const handle = author?.userName ?? "";

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
        followerCount: itemAuthor.followers ?? itemAuthor.followersCount ?? 0,
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

  return { status: "done", profile, guardian };
}
