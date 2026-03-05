import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
    try {
        const { avatarPrompt } = await req.json();

        if (!avatarPrompt) {
            return NextResponse.json({ error: 'Avatar prompt is required' }, { status: 400 });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const prompt = `
You are a professional anime video storyboard writer.

Based on this anime character/scene description:
"${avatarPrompt}"

Write a short, vivid VIDEO STORY that describes what this character does in a 30-60 second animated video.

REQUIREMENTS:
1. Write in present tense, describing actions scene-by-scene.
2. Include camera movements (zoom in, pan, wide shot, close-up).
3. Describe the character's expressions, movements, and emotions.
4. Include atmospheric details (wind, lighting changes, particles, effects).
5. Make it dramatic and cinematic — like an anime trailer or opening sequence.
6. Keep it between 80-150 words.
7. Return ONLY the story text. No labels, no prefixes, no bullet points.
        `;

        const result = await model.generateContent(prompt);
        const story = result.response.text().trim();

        return NextResponse.json({ story });
    } catch (error: any) {
        console.error('Story Generation Error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to generate story' },
            { status: 500 }
        );
    }
}
