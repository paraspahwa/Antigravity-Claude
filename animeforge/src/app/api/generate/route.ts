import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { generateAnimePrompt } from '@/utils/ai/gemini';
import { generateAnimeAvatar } from '@/utils/ai/replicate';

export async function POST(req: Request) {
    try {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { niche, customPrompt } = await req.json();

        if (!niche) {
            return NextResponse.json({ error: 'Niche is required' }, { status: 400 });
        }

        // 1. Generate Prompt using Gemini
        const enhancedPrompt = await generateAnimePrompt(niche, customPrompt);

        // 2. Generate Avatar using Replicate
        // Replicate returns an array of strings (URLs)
        const avatarUrls = await generateAnimeAvatar(enhancedPrompt) as string[];

        if (!avatarUrls || avatarUrls.length === 0) {
            throw new Error("Failed to generate avatar image.");
        }
        const avatarUrl = avatarUrls[0];

        return NextResponse.json({
            enhancedPrompt,
            avatarUrl
        });

    } catch (error: any) {
        console.error('Generation Error:', error);
        return NextResponse.json(
            { error: error.message || 'Internal Server Error' },
            { status: 500 }
        );
    }
}
