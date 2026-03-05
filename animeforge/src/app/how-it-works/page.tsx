import Link from 'next/link'

export default function HowItWorksPage() {
    return (
        <div className="relative min-h-screen z-10 px-6 py-16 max-w-4xl mx-auto">
            <Link href="/" className="text-sm text-purple-400 hover:text-purple-300 transition mb-6 inline-block">
                ← Back to Home
            </Link>

            <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
                <span className="gradient-text">How AnimeForge Works</span>
            </h1>
            <p className="text-gray-500 mb-12 max-w-lg text-sm leading-relaxed">
                A complete guide to generating anime videos and automating social media — from zero to autopilot.
            </p>

            <div className="space-y-12">
                {/* Step 1 */}
                <GuideStep
                    number="01"
                    title="Create an Account"
                    color="purple"
                    items={[
                        'Click "Start Creating Free" on the homepage.',
                        'Enter your email and choose a password.',
                        'You\'ll be taken straight to your Dashboard — no email verification needed.',
                    ]}
                />

                {/* Step 2 */}
                <GuideStep
                    number="02"
                    title="Choose Your Anime Niche"
                    color="cyan"
                    items={[
                        'On the Dashboard, click "Create New Video".',
                        'You\'ll see 16 anime niches to choose from: Shōnen Action, Isekai, Cyberpunk, Studio Ghibli, and more.',
                        'Click on a niche card to select it. It will glow with a purple border to confirm.',
                        'If you have a unique idea, select "Custom Niche" and describe it in the next step.',
                    ]}
                />

                {/* Step 3 */}
                <GuideStep
                    number="03"
                    title="Pick Video Duration"
                    color="purple"
                    items={[
                        'Choose how long your video should be:',
                        '⚡ 30 Seconds — Perfect for TikTok and Reels',
                        '🎬 1 Minute — Ideal for YouTube Shorts',
                        '📽️ 2 Minutes — Extended short-form content',
                        '🎥 5 Minutes — Full-length video',
                    ]}
                />

                {/* Step 4 */}
                <GuideStep
                    number="04"
                    title="Add a Custom Prompt (Optional)"
                    color="cyan"
                    items={[
                        'Write a description of what you want — or leave it blank and AI will create the story for you.',
                        'Example: "A lone samurai standing beneath cherry blossom trees with a katana drawn, moonlit background"',
                        'The more detail you add, the more specific the avatar will be.',
                    ]}
                />

                {/* Step 5 */}
                <GuideStep
                    number="05"
                    title="Review & Generate"
                    color="purple"
                    items={[
                        'Before generating, you\'ll see a full summary of your selections: Niche, Duration, and Prompt.',
                        'Click "Change" next to any setting to go back and modify it.',
                        'When you\'re happy, click "✨ Generate Avatar & Story".',
                        'AI will generate a detailed anime avatar and a story — usually takes 15–30 seconds.',
                    ]}
                />

                {/* Step 6 */}
                <GuideStep
                    number="06"
                    title="Edit Your Avatar"
                    color="cyan"
                    items={[
                        'Don\'t like the result? Click "✏️ Edit Avatar" to view and modify the AI prompt.',
                        'Change hair color, outfit, expression, background, or anything else.',
                        'Click "🔄 Regenerate Avatar with Edits" to create a new version instantly.',
                        'Repeat until you\'re satisfied with the look.',
                    ]}
                />

                {/* Step 7 */}
                <GuideStep
                    number="07"
                    title="Write a Video Story"
                    color="purple"
                    items={[
                        'In the "📖 Video Story" panel, describe what the avatar should DO in the video.',
                        'Or click "✨ Auto-Generate Story" and AI will write a cinematic scene for you.',
                        'The story includes camera movements, expressions, and dramatic moments.',
                    ]}
                />

                {/* Step 8 */}
                <GuideStep
                    number="08"
                    title="Add Background Music or Your Own Sound"
                    color="cyan"
                    items={[
                        'Choose from 9 built-in tracks (Epic Orchestral, Lo-fi Chill, J-Pop, Traditional Japanese, etc.).',
                        'Click the ▶ Play button next to any track to preview it before selecting.',
                        'Or upload your own audio file (MP3, WAV, OGG) for a custom soundtrack.',
                        'You can even record a voiceover directly in the browser using the 🎙️ Record button.',
                    ]}
                />

                {/* Step 9 */}
                <GuideStep
                    number="09"
                    title="Generate & Download Your Video"
                    color="purple"
                    items={[
                        'Click "🎬 Animate to Video" to generate the animated video from your avatar.',
                        'The video will appear with a built-in player so you can preview it.',
                        'Click "⬇ Download Video" to save the MP4 to your device.',
                    ]}
                />

                {/* Step 10 */}
                <GuideStep
                    number="10"
                    title="Automate & Publish"
                    color="cyan"
                    items={[
                        'Go to Dashboard → Settings to connect your YouTube, TikTok, and Instagram accounts.',
                        'Go to Dashboard → Automations to create posting schedules.',
                        'Set a niche, choose Daily / Weekly / Monthly, and AnimeForge does the rest.',
                        'Videos are auto-generated and posted without any manual action required.',
                    ]}
                />
            </div>

            {/* CTA */}
            <div className="mt-16 text-center">
                <h2 className="text-2xl font-bold text-white mb-4">Ready to Start?</h2>
                <Link href="/login" className="btn-primary text-lg px-10 py-4 inline-block">
                    Create Your First Video →
                </Link>
            </div>
        </div>
    )
}

function GuideStep({ number, title, color, items }: { number: string; title: string; color: 'purple' | 'cyan'; items: string[] }) {
    const borderColor = color === 'purple' ? 'border-purple-500/20' : 'border-cyan-500/20'
    const bgColor = color === 'purple' ? 'bg-purple-500/15' : 'bg-cyan-500/15'
    const numBorder = color === 'purple' ? 'border-purple-500/30' : 'border-cyan-500/30'

    return (
        <div className={`glass-card p-6 border-l-2 ${borderColor}`}>
            <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-full ${bgColor} border ${numBorder} flex items-center justify-center shrink-0`}>
                    <span className="text-sm font-bold gradient-text">{number}</span>
                </div>
                <h3 className="text-lg font-semibold text-white">{title}</h3>
            </div>
            <ul className="space-y-2 ml-13">
                {items.map((item, i) => (
                    <li key={i} className="text-sm text-gray-400 leading-relaxed flex items-start gap-2">
                        <span className="text-purple-500/50 mt-1 shrink-0">•</span>
                        <span>{item}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}
