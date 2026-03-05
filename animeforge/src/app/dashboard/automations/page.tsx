import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function AutomationsPage() {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        return redirect('/login')
    }

    return (
        <div className="relative min-h-screen flex flex-col px-4 sm:px-8 py-8 z-10">
            <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
                <div>
                    <Link href="/dashboard" className="text-sm text-purple-400 hover:text-purple-300 transition mb-2 inline-block">
                        ← Back to Dashboard
                    </Link>
                    <h1 className="text-3xl font-extrabold text-white">Automations</h1>
                </div>
                <button className="btn-primary text-sm">
                    + New Schedule
                </button>
            </header>

            <main className="max-w-4xl mx-auto w-full">
                <div className="glass-card p-12 flex flex-col items-center justify-center text-center">
                    <div className="text-5xl mb-4 opacity-30">⚡</div>
                    <h2 className="text-xl font-semibold text-white mb-2">No Automations Yet</h2>
                    <p className="text-gray-500 mb-6 max-w-md text-sm leading-relaxed">
                        Create a schedule to automatically generate anime stories, avatars, videos, and post them to your linked accounts — daily, weekly, or monthly.
                    </p>
                    <button className="btn-primary">
                        Create First Automation
                    </button>
                </div>
            </main>
        </div>
    )
}
