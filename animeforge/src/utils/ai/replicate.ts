import Replicate from "replicate";

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
});

export async function generateAnimeAvatar(prompt: string) {
    // Swapping to stability-ai/sdxl due to 422 model permission errors on animagine
    const output = await replicate.run(
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
    );

    if (Array.isArray(output)) {
        return output.map((item: any) =>
            typeof item === 'string' ? item : (typeof item.url === 'function' ? item.url().href : String(item))
        );
    }
    return output;
}

export async function generateVideoFromAvatar(imageUrl: string) {
    // Using Stable Video Diffusion (SVD) for image-to-video
    const output = await replicate.run(
        "stability-ai/stable-video-diffusion:3f0457e4619daac51203dedb472816fd4af51f3149fa7a9e0b5ffcf1b8172438",
        {
            input: {
                cond_aug: 0.02,
                decoding_t: 7,
                input_image: imageUrl,
                video_length: "14_frames_with_svd",
                sizing_strategy: "maintain_aspect_ratio",
                motion_bucket_id: 127,
                frames_per_second: 6
            }
        }
    );

    if (Array.isArray(output)) {
        return output.map((item: any) =>
            typeof item === 'string' ? item : (typeof item.url === 'function' ? item.url().href : String(item))
        )[0] || output[0]; // Return single string
    } else if (typeof output === 'string') {
        return output;
    } else if ((output as any)?.url && typeof (output as any).url === 'function') {
        return (output as any).url().href;
    }

    return output;
}
