import { NextResponse } from 'next/server';

/**
 * Placeholder until production marketplace DB/API is wired.
 * Returns empty list so clients apply SEED_MARKETPLACE_PROVIDERS fallback.
 */
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const country = searchParams.get('country');
  const limit = searchParams.get('limit');

  return NextResponse.json({
    providers: [],
    meta: {
      source: 'placeholder',
      country: country || null,
      limit: limit ? Number(limit) : null,
    },
  });
}
