import { UserProfile, Tweet, Guardian } from "./scoring";

const BASE = "https://api.apify.com/v2";
const ACTOR = "apidojo~tweet-scraper";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ApifyItem = Record<string, any>;

function getNum(obj: ApifyItem, ...keys: string[]): number {
  for (const k of keys) {
    const v = obj?.[k];
    if (typeof v === "number") return v;
  }
  return 0;
}

function getStr(obj: ApifyItem, ...keys: string[]): string {
  for (const k of keys) {
    const v = obj?.[k];
    if (typeof v === "string" && v.trim()) return v.trim();
  }
  return "";
}

export async function startApifyRun(handle: string): Promise<string> {
  const token = process.env.APIFY_API_TOKEN;
  if (!token) throw new Error("APIFY_API_TOKEN is not set");

  const res = await fetch(`${BASE}/acts/${ACTOR}/runs?token=${token}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      startUrls: [{ url: `https://twitter.com/${handle}` }],
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

export async function pollApifyRun(runId: string, handle = ""): Promise<PollResult> {
  const token = process.env.APIFY_API_TOKEN;
  if (!token) throw new Error("APIFY_API_TOKEN is not set");

  const statusRes = await fetch(`${BASE}/actor-runs/${runId}?token=${token}`);
  if (!statusRes.ok) throw new Error(`Failed to check run status: ${statusRes.status}`);
  const { data } = await statusRes.json();

  if (["FAILED", "ABORTED", "TIMED-OUT"].includes(data.status)) {
    throw new Error(`Apify run ended with status: ${data.status}`);
  }
  if (data.status !== "SUCCEEDED") {
    return { status: "pending" };
  }

  const datasetRes = await fetch(
    `${BASE}/actor-runs/${runId}/dataset/items?token=${token}&limit=50`
  );
  if (!datasetRes.ok) throw new Error(`Failed to fetch dataset: ${datasetRes.status}`);
  const items: ApifyItem[] = await datasetRes.json();

  if (!items.length)
    throw new Error(`No data returned for @${handle} — check the handle and try again`);

  console.log(`[apify] ${items.length} items for @${handle}`);
  console.log(`[apify] first item keys:`, Object.keys(items[0] ?? {}).join(", "));
  console.log(`[apify] first item (truncated):`, JSON.stringify(items[0]).slice(0, 600));

  // startUrls points at the user's profile, so every item belongs to them — no filtering.
  const first = items[0];
  const authorObj = first?.author ?? first?.user ?? first?.userData ?? {};

  const displayName =
    getStr(authorObj, "name", "displayName", "full_name") ||
    getStr(first, "authorName", "displayName", "name") ||
    handle;

  const avatarUrl =
    getStr(authorObj, "profilePicture", "profile_image_url", "profile_image_url_https", "avatar") ||
    getStr(first, "authorProfilePicture", "profilePicture", "avatarUrl") ||
    "";

  const followerCount =
    getNum(authorObj, "followers", "followers_count", "followersCount") ||
    getNum(first, "authorFollowers", "followers", "followersCount");

  const followingCount =
    getNum(authorObj, "following", "friends_count", "followingCount") ||
    getNum(first, "authorFollowing", "following", "followingCount");

  const tweets: Tweet[] = items.slice(0, 10).map((item) => ({
    likeCount: getNum(item, "likeCount", "favorite_count", "likes", "favouriteCount"),
    replyCount: getNum(item, "replyCount", "reply_count", "replies"),
    bookmarkCount: getNum(item, "bookmarkCount", "bookmark_count", "bookmarks", "postBookmarks"),
    createdAt: getStr(item, "createdAt", "created_at", "timestamp") || new Date().toISOString(),
  }));

  const resolvedHandle =
    handle ||
    getStr(authorObj, "userName", "username") ||
    getStr(first, "authorUserName", "userName", "username") ||
    "";

  const profile: UserProfile = {
    handle: resolvedHandle,
    displayName,
    avatarUrl,
    followerCount,
    followingCount,
    tweets,
  };

  // Guardian requires a separate replies search; omitted here.
  // The card renders "No guardian found. You're out here alone." when null.
  const guardian: Guardian | null = null;

  return { status: "done", profile, guardian };
}
