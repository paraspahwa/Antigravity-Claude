import Link from "next/link";

export default function Home() {
  return (
    <div className="relative z-10">
      {/* Floating orbs */}
      <div className="fixed top-20 left-10 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl animate-pulse pointer-events-none" />
      <div className="fixed bottom-20 right-10 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl animate-pulse pointer-events-none" style={{ animationDelay: '1s' }} />

      {/* ── HERO ── */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20 text-center">
        <div className="mb-6 animate-fade-in">
          <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-widest uppercase rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300">
            ✨ AI-Powered Anime Studio
          </span>
        </div>

        <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <span className="gradient-text">AnimeForge</span>
        </h1>

        <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mb-10 animate-fade-in leading-relaxed" style={{ animationDelay: '0.2s' }}>
          Generate stunning Japanese-style anime avatars, animate them into cinematic videos with background music, and auto-publish to YouTube, TikTok & Instagram — all on autopilot.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <Link href="/login" className="btn-primary text-center text-lg px-10 py-4">
            Start Creating Free →
          </Link>
          <Link href="/how-it-works" className="btn-secondary text-center text-lg px-10 py-4">
            See How It Works
          </Link>
        </div>
      </section>

      {/* ── EXAMPLE SHOWCASE ── */}
      <section className="px-6 py-20 max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-4">
          <span className="gradient-text">See What You Can Create</span>
        </h2>
        <p className="text-center text-gray-500 mb-12 max-w-xl mx-auto text-sm">
          From epic samurai battles to magical girl transformations — AnimeForge generates it all in seconds.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <ExampleCard
            title="Cyberpunk Hacker"
            prompt="A hooded hacker in a neon-lit room, holographic screens floating around, blue and pink lighting, rain on the window..."
            niche="🌃 Cyberpunk"
          />
          <ExampleCard
            title="Sakura Samurai"
            prompt="A stoic female samurai in white and crimson armor, standing beneath cherry blossom trees, petals swirling, golden sunset..."
            niche="🏯 Samurai"
          />
          <ExampleCard
            title="Demon King Rising"
            prompt="A dark lord with glowing red eyes, black horns, and a flowing cape, standing atop a volcanic mountain, lava rivers below..."
            niche="😈 Demon"
          />
        </div>
      </section>

      {/* ── HOW IT WORKS (Summary) ── */}
      <section className="px-6 py-20 bg-white/[0.01]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-4">
            <span className="gradient-text">How It Works</span>
          </h2>
          <p className="text-center text-gray-500 mb-12 max-w-lg mx-auto text-sm">
            Three simple steps from idea to published video.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <StepCard step="01" title="Pick a Niche" desc="Choose from 16 anime genres — Shōnen, Isekai, Cyberpunk, Studio Ghibli, and more." />
            <StepCard step="02" title="Generate & Edit" desc="AI creates your avatar and story. Edit the prompt, tweak the look, add background music." />
            <StepCard step="03" title="Publish Everywhere" desc="Download the video, or auto-post to YouTube, TikTok, and Instagram on a daily schedule." />
          </div>

          <div className="text-center mt-10">
            <Link href="/how-it-works" className="text-sm text-purple-400 hover:text-purple-300 transition underline underline-offset-4">
              Read the full step-by-step guide →
            </Link>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="px-6 py-20 max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-12">
          <span className="gradient-text">Built for Creators</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard emoji="🎨" title="AI Anime Avatars" description="Generate stunning Japanese-style anime characters from text prompts using state-of-the-art AI." />
          <FeatureCard emoji="🎬" title="Video Animation" description="Transform static avatars into short cinematic animations perfect for TikTok, YouTube Shorts & Reels." />
          <FeatureCard emoji="🤖" title="Full Automation" description="Set a niche, pick a schedule, and AnimeForge generates & posts content daily, weekly, or monthly." />
          <FeatureCard emoji="🎵" title="Add Sound & Music" description="Choose from 9 background tracks, upload your own audio, or record a voiceover directly in the app." />
          <FeatureCard emoji="📱" title="Mobile Friendly" description="Create and manage your content anywhere — fully responsive on Android and iOS devices." />
          <FeatureCard emoji="💳" title="Pay-Per-Use Credits" description="Buy only what you need. Flexible credit tiers for India and international users via Razorpay." />
        </div>

        <div className="text-center mt-8">
          <Link href="/pricing" className="text-sm text-purple-400 hover:text-purple-300 transition underline underline-offset-4">
            View pricing tiers →
          </Link>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section className="px-6 py-20 bg-white/[0.01]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-4">
            <span className="gradient-text">What Creators Are Saying</span>
          </h2>
          <p className="text-center text-gray-500 mb-12 text-sm">
            Join hundreds of creators who automate their anime content.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <ReviewCard
              name="Yuki T."
              handle="@yuki_anime_shorts"
              stars={5}
              text="AnimeForge literally runs my TikTok account on autopilot. I just set the niche to 'Dark Fantasy' and it posts daily. Already at 12K followers!"
            />
            <ReviewCard
              name="Marco R."
              handle="@marcodigital"
              stars={5}
              text="The avatar quality is insane. It looks like actual anime key visuals. I was paying artists $50 per image before this — now it costs me 4 cents."
            />
            <ReviewCard
              name="Sarah L."
              handle="@sarah.creates"
              stars={4}
              text="I love the video story feature. I describe what I want the character to do and the AI writes a full cinematic storyboard. Game changer."
            />
            <ReviewCard
              name="Dev P."
              handle="@devpatel_ai"
              stars={5}
              text="The background music selection is a nice touch. Being able to upload my own soundtrack and record voiceovers makes it feel like a full production studio."
            />
            <ReviewCard
              name="Luna K."
              handle="@luna.kawaii"
              stars={5}
              text="I run 3 different anime channels now — all automated with AnimeForge. The Chibi niche is my favorite. My audience loves it!"
            />
            <ReviewCard
              name="Alex M."
              handle="@alexmotionvfx"
              stars={4}
              text="The prompt editing feature is powerful. I can tweak the avatar until it's exactly what I want before generating the video. Super satisfying workflow."
            />
          </div>
        </div>
      </section>

      {/* ── POWERED BY ── */}
      <section className="px-6 py-16 text-center">
        <p className="text-sm text-gray-600 mb-4">Powered by</p>
        <div className="flex flex-wrap justify-center gap-4 text-gray-500 text-sm font-medium">
          <span className="px-4 py-2 glass-card">Google Gemini</span>
          <span className="px-4 py-2 glass-card">Replicate AI</span>
          <span className="px-4 py-2 glass-card">Supabase</span>
          <span className="px-4 py-2 glass-card">Vercel</span>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="px-6 py-20 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 text-white">Ready to Forge Your Anime?</h2>
        <p className="text-gray-500 mb-8 max-w-md mx-auto text-sm">Create your first video in under a minute. No credit card required.</p>
        <Link href="/login" className="btn-primary text-lg px-12 py-4 inline-block">
          Start Creating Free →
        </Link>
      </section>
    </div>
  );
}

/* ── COMPONENT: Example Card ── */
function ExampleCard({ title, prompt, niche }: { title: string; prompt: string; niche: string }) {
  return (
    <div className="glass-card p-5 flex flex-col">
      <div className="w-full aspect-video rounded-lg bg-gradient-to-br from-purple-900/40 to-cyan-900/30 border border-white/5 flex items-center justify-center mb-4">
        <span className="text-4xl opacity-50">🎨</span>
      </div>
      <span className="text-xs text-cyan-400 font-medium mb-1">{niche}</span>
      <h3 className="text-base font-semibold text-white mb-2">{title}</h3>
      <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">&ldquo;{prompt}&rdquo;</p>
    </div>
  );
}

/* ── COMPONENT: Step Card ── */
function StepCard({ step, title, desc }: { step: string; title: string; desc: string }) {
  return (
    <div className="text-center">
      <div className="w-14 h-14 rounded-full bg-purple-500/15 border border-purple-500/30 flex items-center justify-center mx-auto mb-4">
        <span className="text-lg font-bold gradient-text">{step}</span>
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
    </div>
  );
}

/* ── COMPONENT: Feature Card ── */
function FeatureCard({ emoji, title, description }: { emoji: string; title: string; description: string }) {
  return (
    <div className="glass-card p-6 text-left">
      <div className="text-3xl mb-3">{emoji}</div>
      <h3 className="text-lg font-semibold mb-2 text-white">{title}</h3>
      <p className="text-sm text-gray-400 leading-relaxed">{description}</p>
    </div>
  );
}

/* ── COMPONENT: Review Card ── */
function ReviewCard({ name, handle, stars, text }: { name: string; handle: string; stars: number; text: string }) {
  return (
    <div className="glass-card p-5">
      <div className="flex items-center gap-1 mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className={`text-sm ${i < stars ? 'text-yellow-400' : 'text-gray-700'}`}>★</span>
        ))}
      </div>
      <p className="text-sm text-gray-300 leading-relaxed mb-4">&ldquo;{text}&rdquo;</p>
      <div>
        <p className="text-sm font-semibold text-white">{name}</p>
        <p className="text-xs text-gray-600">{handle}</p>
      </div>
    </div>
  );
}
