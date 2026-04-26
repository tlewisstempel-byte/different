import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json()

  const airtableRes = await fetch(
    `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/Applications`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fields: {
          'Telegram Username':               body.telegramUsername,
          'X Handle':                        body.xHandle,
          'YouTube Handle':                  body.youtubeHandle,
          'TikTok Handle':                   body.tiktokHandle,
          'Primary Platform':                body.primaryPlatform,
          'Additional Platforms':            body.additionalPlatforms,
          'Profile URLs':                    body.profileUrls,
          'Follower Count':                  body.followerCount,
          'Primary Audience Location':       body.audienceLocation,
          'Primary Audience Device':         body.audienceDevice,
          'Sorsa Score':                     body.sorsaScore,
          'Avg Daily Impressions (90 days)': body.avgImpressions,
          'Avg Engagement Rate (90 days)':   body.avgEngagement,
          'Niche':                           body.niche,
          'Content Description':             body.contentDescription,
          'Worked with Web3/AI Brands':      body.workedWithBrands,
          'Why Different':                   body.whyDifferent,
        },
      }),
    }
  )

  if (!airtableRes.ok) {
    return NextResponse.json({ error: 'Airtable write failed' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
