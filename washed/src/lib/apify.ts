import { UserProfile, Tweet, Guardian } from "./scoring";

const BASE = "https://api.apify.com/v2";
const ACTOR = "apidojo~tweet-scraper";

interface ApifyTweet {
  likeCount?: number;
  favorite_count?: number;
  replyCount?: number;
  reply_count?: number;
  bookmarkCount?: number;
  bookmark_count?: number;
  postBookmarks?: number;
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
}

function books(t: ApifyTweet) { return t.bookmarkCount ?? t.bookmark_count ?? t.postBookmarks ?? 0; }
function likes(t: ApifyTweet) { return t.likeCount ?? t.favorite_count ?? 0; }
function replies(t: ApifyTweet) { return t.replyCount ?? t.reply_count ?? 0; }

export async function startApifyRun(handle: string): Promise<string> {
  const token = process.env.APIFY_API_TOKEN;
  if (!token) throw new Error("APIFY_API_TOKEN is not configured");

  const res = await fetch(`${BASE}/acts/${ACTOR}/runs?token=${token}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      twitterHandles: [handle],
      maxTweets: 15,
      maxRequestRetries: 2,
      timeoutSecs: 25,
      proxyConfiguration: {
        useApifyProxy: true,
        apifyProxyGroups: ["DATACENTER"],
      },
    }),
  });
  if (!res.ok) throw new Error(`Apify start failed: ${res.status} ${await res.text()}`);
  const data = await res.json();
  return data.data.id as string;
}

export type PollResult =
  | { status: "pending" }
  | { status: "done"; profile: UserProfile; guardian: Guardian | null };

export async function pollApifyRun(runId: string): Promise<PollResult> {
  const token = process.env.APIFY_API_TOKEN;
  if (!token) throw new Error("APIFY_API_TOKEN is not configured");

  const statusRes = await fetch(`${BASE}/actor-runs/${runId}?token=${token}`);
  if (!statusRes.ok) throw new Error(`Status check failed: ${statusRes.status}`);
  const { data } = await statusRes.json();

  if (["FAILED", "ABORTED", "TIMED-OUT"].includes(data.status)) {
    throw new Error(`Apify run ended: ${data.status}`);
  }
  if (data.status !== "SUCCEEDED") {
    return { status: "pending" };
  }

  const datasetRes = await fetch(
    `${BASE}/actor-runs/${runId}/dataset/items?token=${token}&limit=15`
  );
  if (!datasetRes.ok) throw new Error(`Dataset fetch failed: ${datasetRes.status}`);
  const items: ApifyTweet[] = await datasetRes.json();

  if (!items.length) throw new Error("No data returned — check the handle and try again");

  const first = items[0];
  const author = first.author;
  const handle = author?.userName ?? "";

  const tweets: Tweet[] = items.slice(0, 10).map((item) => ({
    likeCount: likes(item),
    replyCount: replies(item),
    bookmarkCount: books(item),
    createdAt: item.createdAt ?? new Date().toISOString(),
  }));

  const profile: UserProfile = {
    handle,
    displayName: author?.name ?? handle,
    avatarUrl: author?.profilePicture ?? "",
    followerCount: author?.followers ?? author?.followersCount ?? 0,
    followingCount: author?.following ?? author?.followingCount ?? 0,
    tweets,
  };

  const candidates = new Map<string, Guardian>();
  for (const item of items) {
    const a = item.author;
    if (!a?.userName) continue;
    const key = a.userName.toLowerCase();
    if (key === handle.toLowerCase()) continue;
    if (!candidates.has(key)) {
      candidates.set(key, {
        handle: a.userName,
        avatarUrl: a.profilePicture ?? "",
        followerCount: a.followers ?? a.followersCount ?? 0,
      });
    }
  }

  const guardian =
    candidates.size > 0
      ? [...candidates.values()].sort((a, b) => b.followerCount - a.followerCount)[0]
      : null;

  return { status: "done", profile, guardian };
}
