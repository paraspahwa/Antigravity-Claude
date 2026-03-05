import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function SettingsPage() {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        return redirect('/login')
    }

    return (
        <div className="relative min-h-screen flex flex-col px-4 sm:px-8 py-8 z-10">
            <header className="mb-8">
                <Link href="/dashboard" className="text-sm text-purple-400 hover:text-purple-300 transition mb-2 inline-block">
                    ← Back to Dashboard
                </Link>
                <h1 className="text-3xl font-extrabold text-white">Settings & Integrations</h1>
            </header>

            <main className="max-w-3xl space-y-8">
                {/* Profile */}
                <section className="glass-card p-6">
                    <h2 className="text-lg font-semibold text-white mb-4">Profile</h2>
                    <div>
                        <label className="block text-sm text-gray-400 mb-2">Email</label>
                        <input
                            type="text"
                            disabled
                            value={user.email}
                            className="input-field opacity-60 cursor-not-allowed"
                        />
                    </div>
                </section>

                {/* Social Integrations */}
                <section className="glass-card p-6">
                    <h2 className="text-lg font-semibold text-white mb-2">Social Media Integrations</h2>
                    <p className="text-sm text-gray-500 mb-6">Link your accounts to enable automated posting.</p>

                    <div className="space-y-4">
                        <SocialRow
                            icon="▶️"
                            name="YouTube"
                            color="bg-red-500/10 text-red-400 border-red-500/20"
                        />
                        <SocialRow
                            icon="♪"
                            name="TikTok"
                            color="bg-white/5 text-white border-white/10"
                        />
                        <SocialRow
                            icon="📷"
                            name="Instagram"
                            color="bg-pink-500/10 text-pink-400 border-pink-500/20"
                        />
                    </div>
                </section>
            </main>
        </div>
    )
}

function SocialRow({ icon, name, color }: { icon: string; name: string; color: string }) {
    return (
        <div className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-white/[0.02]">
            <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border ${color}`}>
                    {icon}
                </div>
                <div>
                    <h3 className="font-semibold text-white text-sm">{name}</h3>
                    <p className="text-xs text-gray-600">Not connected</p>
                </div>
            </div>
            <button className="btn-secondary text-xs px-3 py-1.5">
                Connect
            </button>
        </div>
    )
}
