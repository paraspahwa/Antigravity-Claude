import Replicate from "replicate";

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
});

async function withRetry<T>(fn: () => Promise<T>, maxRetries = 3): Promise<T> {
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
            return await fn();
        } catch (err: any) {
            const status = err?.response?.status ?? err?.status;
            const isRateLimit = status === 429 || err?.message?.includes('429');
            if (!isRateLimit || attempt === maxRetries) throw err;
            const retryAfter = parseInt(err?.response?.headers?.get?.('retry-after') ?? '10', 10);
            const delay = (retryAfter + attempt * 2) * 1000;
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
    throw new Error('Max retries exceeded');
}

export async function generateAnimeAvatar(prompt: string) {
    const output = await withRetry(() => replicate.run(
        "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
        {
            input: {
                prompt: prompt,
                negative_prompt: "nsfw, lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry",
                width: 1024,
                height: 1024,
                num_inference_steps: 25,
                guidance_scale: 7.5,
                scheduler: "K_EULER"
            }
        }
    ));

    if (Array.isArray(output)) {
        return output.map((item: any) =>
            typeof item === 'string' ? item : (typeof item.url === 'function' ? item.url().href : String(item))
        );
    }
    return output;
}

function extractVideoUrl(output: unknown): string {
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

/**
 * Generates one or more video clips from a static image using Stable Video Diffusion XT.
 * Each clip is ~4 seconds (25 frames at 6fps). Multiple clips are generated in parallel.
 */
export async function generateVideoFromAvatar(imageUrl: string, clipCount: number = 1): Promise<string[]> {
    const generateClip = () => replicate.run(
        "stability-ai/stable-video-diffusion:3f0457e4619daac51203dedb472816fd4af51f3149fa7a9e0b5ffcf1b8172438",
        {
            input: {
                cond_aug: 0.02,
                decoding_t: 7,
                input_image: imageUrl,
                video_length: "25_frames_with_svd_xt",
                sizing_strategy: "maintain_aspect_ratio",
                motion_bucket_id: 127,
                frames_per_second: 6,
            }
        }
    );

    const results = await Promise.all(
        Array.from({ length: clipCount }, generateClip)
    );

    return results.map(extractVideoUrl).filter(Boolean);
}
