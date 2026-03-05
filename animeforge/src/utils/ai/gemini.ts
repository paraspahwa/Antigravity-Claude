import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function generateAnimePrompt(niche: string, customIdea?: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `
    You are a world-class anime art director specializing in Japanese anime illustration.
    Generate a SINGLE, highly detailed Stable Diffusion image generation prompt.
    
    The anime niche/genre is: ${niche}
    ${customIdea ? `The user's specific idea: ${customIdea}` : "Create an original compelling scene."}
    
    STRICT REQUIREMENTS for the prompt you generate:
    1. Start with quality tags: "masterpiece, best quality, ultra-detailed, anime style, japanese anime, illustration"
    2. Describe ONE main character in vivid detail: hair color/style, eye color, expression, outfit, pose, accessories.
    3. The character MUST look like authentic Japanese anime (large expressive eyes, detailed hair, clean linework).
    4. Include dynamic posing — the character should look like they are mid-action or in an emotionally charged moment.
    5. Describe the background/environment in detail (lighting, atmosphere, weather, time of day).
    6. Include cinematic lighting keywords: "dramatic lighting, volumetric light, rim lighting, god rays"
    7. Add style references like: "by ufotable, by kyoto animation, by mappa, anime key visual, pixiv ranking"
    8. End with negative concepts to avoid: "3d, photorealistic, western cartoon"
    9. The entire prompt must be under 350 words.
    10. Return ONLY the raw prompt text. No labels, no prefixes, no explanations.
  `;

  const result = await model.generateContent(prompt);
  return result.response.text().trim();
}
