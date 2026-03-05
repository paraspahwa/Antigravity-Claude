import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { logout } from '@/app/login/actions'

export default async function DashboardPage() {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        return redirect('/login')
    }

    return (
        <div className="relative min-h-screen flex flex-col px-4 sm:px-8 py-8 z-10">
            {/* Header */}
            <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4">
                <div>
                    <h1 className="text-3xl sm:text-4xl font-extrabold">
                        <span className="gradient-text">AnimeForge</span>
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">Welcome back, {user.email}</p>
                </div>
                <form action={logout}>
                    <button className="btn-secondary text-sm px-4 py-2">
                        Sign Out
                    </button>
                </form>
            </header>

            {/* Quick Actions */}
            <section className="mb-10">
                <h2 className="text-lg font-semibold text-gray-300 mb-4">Create Content</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                    {/* Faceless Series — featured card */}
                    <Link href="/dashboard/faceless" className="glass-card p-6 flex flex-col justify-between group relative overflow-hidden border-cyan-500/20">
                        <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-cyan-500/15 border border-cyan-500/30 text-cyan-400">
                            New
                        </div>
                        <div>
                            <div className="text-3xl mb-3">🎭</div>
                            <h3 className="text-lg font-semibold text-white mb-2">Faceless Series Creator</h3>
                            <p className="text-sm text-gray-400 leading-relaxed mb-3">
                                Pick a viral niche — dark facts, Reddit stories, mythology, psychology — and AI generates a full anime storyboard + auto-posts on schedule.
                            </p>
                            <div className="flex flex-wrap gap-1.5 mb-4">
                                {['🖤 Dark Facts', '📖 Reddit Stories', '👻 Horror', '🧠 Viral Facts', '⚡ Mythology'].map(tag => (
                                    <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-gray-500">{tag}</span>
                                ))}
                            </div>
                        </div>
                        <span className="inline-block text-sm font-medium text-cyan-400 group-hover:text-cyan-300 transition">
                            Create Faceless Series →
                        </span>
                    </Link>

                    <DashCard
                        emoji="🎬"
                        title="Anime Avatar Video"
                        description="Generate a custom anime avatar and animate it into a short cinematic video with your own prompt."
                        href="/dashboard/create"
                        cta="Start Generating"
                        primary
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <DashCard
                        emoji="⚡"
                        title="Automations"
                        description="Set up daily, weekly, or monthly auto-posting schedules."
                        href="/dashboard/automations"
                        cta="Manage Schedules"
                    />
                    <DashCard
                        emoji="🔗"
                        title="Linked Accounts"
                        description="Connect YouTube, TikTok, and Instagram for auto-publishing."
                        href="/dashboard/settings"
                        cta="Settings"
                    />
                </div>
            </section>

            {/* Recent Activity */}
            <section>
                <h2 className="text-lg font-semibold text-gray-300 mb-4">Recent Generations</h2>
                <div className="glass-card p-8 flex flex-col items-center justify-center text-center min-h-[200px]">
                    <p className="text-gray-500 text-sm">No generations yet. Create your first anime video!</p>
                    <Link href="/dashboard/create" className="btn-primary mt-4 inline-block">
                        Create First Video →
                    </Link>
                </div>
            </section>
        </div>
    )
}

function DashCard({
    emoji,
    title,
    description,
    href,
    cta,
    primary = false,
}: {
    emoji: string;
    title: string;
    description: string;
    href: string;
    cta: string;
    primary?: boolean;
}) {
    return (
        <Link href={href} className="glass-card p-6 flex flex-col justify-between group">
            <div>
                <div className="text-3xl mb-3">{emoji}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed mb-4">{description}</p>
            </div>
            <span className={`inline-block text-sm font-medium ${primary ? 'text-purple-400 group-hover:text-purple-300' : 'text-cyan-400 group-hover:text-cyan-300'} transition`}>
                {cta} →
            </span>
        </Link>
    )
}
