import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { generateVideoFromAvatar } from '@/utils/ai/replicate';

export async function POST(req: Request) {
    try {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { imageUrl } = await req.json();

        if (!imageUrl) {
            return NextResponse.json({ error: 'Image URL is required' }, { status: 400 });
        }

        // Generate Video using Replicate SVD
        const videoUrl = await generateVideoFromAvatar(imageUrl) as unknown as string;

        if (!videoUrl) {
            throw new Error("Failed to generate video.");
        }

        // In a real production app, we would download this video arraybuffer 
        // and upload it to Supabase Storage before returning the URL to ensure persistence.
        // For now, returning the direct replicate URL.

        return NextResponse.json({
            videoUrl
        });

    } catch (error: any) {
        console.error('Video Generation Error:', error);
        return NextResponse.json(
            { error: error.message || 'Internal Server Error' },
            { status: 500 }
        );
    }
}
