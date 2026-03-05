import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { generateAnimeAvatar } from '@/utils/ai/replicate';

export const maxDuration = 300;

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const NICHE_PROMPTS: Record<string, string> = {
    motivational: 'motivational wisdom and life lessons inspired by anime philosophy and stoic teachings',
    dark_facts: 'shocking, disturbing, and mind-blowing historical and world facts that most people never knew',
    reddit_stories: 'wild viral Reddit story (AITA or relationship advice style) retold dramatically',
    horror_stories: 'terrifying creepy paranormal horror story with a twist ending',
    mythology: 'ancient mythology story retold dramatically (Greek, Norse, Japanese, or Hindu)',
    life_lessons: 'practical life improvement, discipline, and self-development tips',
    fun_facts: 'mind-blowing science, space, or history facts that sound impossible but are true',
    anime_lore: 'deep dive into anime lore, power systems, hidden meanings, or character backstory',
    japanese_culture: 'Japanese history, samurai code, feudal era stories, or modern Japanese culture',
    crypto_finance: 'cryptocurrency story, personal finance lesson, or wealth-building insight',
    true_crime: 'gripping true crime case, heist, or unsolved mystery',
    psychology: 'dark psychology insight, manipulation tactic, or cognitive bias most people fall for',
};

const VISUAL_STYLE_TAGS: Record<string, string> = {
    shonen: 'shonen anime style, dynamic action, vibrant colors, detailed linework, by ufotable, anime key visual',
    ghibli: 'studio ghibli style, soft watercolor, miyazaki aesthetic, painterly backgrounds, gentle lighting',
    dark_fantasy: 'dark fantasy anime, berserk style, dramatic shadows, gothic atmosphere, intense lighting',
    cyberpunk: 'cyberpunk anime, neon city lights, akira style, futuristic, rain, neon reflections',
    manga: 'manga panel art, black and white ink, detailed inking, professional manga, screentone shading',
    chibi: 'chibi anime style, cute SD characters, bright pastel colors, kawaii, adorable expressions',
    realistic: 'realistic anime, detailed portrait, by ilya kuvshinov, cinematic lighting, photorealistic anime',
    watercolor: 'anime watercolor painting, soft brushstrokes, pastel tones, artistic illustration',
};

function extractImageUrl(output: unknown): string {
    if (Array.isArray(output)) {
        const item = output[0];
        if (typeof item === 'string') return item;
        if (typeof (item as any)?.url === 'function') return (item as any).url().href;
        return String(item);
    }
    if (typeof output === 'string') return output;
    if (typeof (output as any)?.url === 'function') return (output as any).url().href;
    return String(output);
}

export async function POST(req: Request) {
    try {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { niche, visualStyle, topicHint } = await req.json();

        if (!niche || !visualStyle) {
            return NextResponse.json({ error: 'Niche and visual style are required' }, { status: 400 });
        }

        const nicheDesc = NICHE_PROMPTS[niche] || niche;
        const styleTag = VISUAL_STYLE_TAGS[visualStyle] || 'anime style';

        // Step 1: Generate full script with Gemini
        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

        const scriptPrompt = `
You are a viral faceless content creator making anime-aesthetic short videos for TikTok, YouTube Shorts, and Instagram Reels.

Create a viral short video script about: ${nicheDesc}
${topicHint ? `Specific topic: ${topicHint}` : ''}

Return ONLY valid JSON with no markdown, no code blocks, no explanation:
{
  "title": "catchy viral title under 70 chars",
  "hook": "opening attention-grabbing line read in first 3 seconds",
  "scenes": [
    {
      "narration": "what the narrator says — 2 to 4 punchy sentences",
      "sceneDescription": "vivid description of the anime visual for this scene — include character, setting, action, lighting, and mood"
    }
  ],
  "callToAction": "closing line (follow for more, etc.)",
  "hashtags": ["#tag1", "#tag2", "#tag3", "#tag4", "#tag5"]
}

Rules:
- Exactly 4 scenes
- Each narration is 2–4 sentences, dramatic and hook-driven
- Each sceneDescription is detailed enough to generate a compelling anime image
- Total read time should be 30–50 seconds
- Content should be educational, shocking, or emotional — viral-worthy
- Output raw JSON only
        `;

        const geminiResult = await model.generateContent(scriptPrompt);
        const rawText = geminiResult.response.text().trim()
            .replace(/^```json\n?/, '').replace(/\n?```$/, '').trim();

        const script = JSON.parse(rawText);

        if (!script.scenes || script.scenes.length === 0) {
            throw new Error('Script generation failed — no scenes returned');
        }

        // Step 2: Generate one anime image per scene, sequentially to avoid rate limits
        const imageOutputs: any[] = [];
        for (const scene of script.scenes) {
            const prompt = `masterpiece, best quality, ultra-detailed, ${styleTag}, ${scene.sceneDescription}, cinematic lighting, volumetric light, anime key visual, pixiv ranking`;
            const output = await generateAnimeAvatar(prompt);
            imageOutputs.push(output);
            // Small delay between requests to stay within Replicate rate limits
            if (imageOutputs.length < script.scenes.length) {
                await new Promise(resolve => setTimeout(resolve, 2000));
            }
        }

        const scenes = script.scenes.map((scene: any, i: number) => ({
            sceneNumber: i + 1,
            narration: scene.narration,
            imageUrl: extractImageUrl(imageOutputs[i]),
        }));

        return NextResponse.json({
            title: script.title,
            hook: script.hook,
            scenes,
            callToAction: script.callToAction,
            hashtags: script.hashtags,
        });

    } catch (error: any) {
        console.error('Faceless generation error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to generate faceless video' },
            { status: 500 }
        );
    }
}
