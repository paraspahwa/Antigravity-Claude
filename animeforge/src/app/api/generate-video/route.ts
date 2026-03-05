import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { generateVideoFromAvatar } from '@/utils/ai/replicate';

// Allow up to 5 minutes for parallel clip generation
export const maxDuration = 300;

// Number of clips to generate per duration (each SVD-XT clip is ~4s at 25 frames/6fps)
const CLIP_COUNTS: Record<string, number> = {
    '30s': 2,
    '60s': 3,
    '2min': 4,
    '5min': 4,
};

const DURATION_SECONDS: Record<string, number> = {
    '30s': 30,
    '60s': 60,
    '2min': 120,
    '5min': 300,
};

export async function POST(req: Request) {
    try {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { imageUrl, duration } = await req.json();

        if (!imageUrl) {
            return NextResponse.json({ error: 'Image URL is required' }, { status: 400 });
        }

        const clipCount = CLIP_COUNTS[duration] ?? 1;
        const totalSeconds = DURATION_SECONDS[duration] ?? 30;

        // Generate all clips in parallel — each is ~4s of SVD-XT animation
        const videoUrls = await generateVideoFromAvatar(imageUrl, clipCount);

        if (!videoUrls || videoUrls.length === 0) {
            throw new Error("Failed to generate video clips.");
        }

        return NextResponse.json({ videoUrls, totalSeconds });

    } catch (error: any) {
        console.error('Video Generation Error:', error);
        return NextResponse.json(
            { error: error.message || 'Internal Server Error' },
            { status: 500 }
        );
    }
}
