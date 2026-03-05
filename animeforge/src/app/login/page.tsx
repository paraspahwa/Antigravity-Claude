import { login, signup } from './actions'

export default async function LoginPage({
    searchParams,
}: {
    searchParams: Promise<{ message: string }>
}) {
    const resolvedSearchParams = await searchParams;
    return (
        <div className="relative min-h-screen flex items-center justify-center px-6 py-12 z-10">
            {/* Orbs */}
            <div className="absolute top-10 right-20 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-10 left-20 w-72 h-72 bg-cyan-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

            <div className="glass-card p-8 sm:p-10 w-full max-w-md animate-fade-in">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-extrabold mb-2">
                        <span className="gradient-text">AnimeForge</span>
                    </h1>
                    <p className="text-sm text-gray-400">Sign in or create an account to start generating</p>
                </div>

                <form className="flex flex-col gap-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="email">
                            Email Address
                        </label>
                        <input
                            className="input-field"
                            name="email"
                            type="email"
                            placeholder="you@example.com"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="input-field"
                            type="password"
                            name="password"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-3 mt-2">
                        <button formAction={login} className="btn-primary w-full text-center py-3">
                            Sign In
                        </button>
                        <button formAction={signup} className="btn-secondary w-full text-center py-3">
                            Create Account
                        </button>
                    </div>

                    {resolvedSearchParams?.message && (
                        <div className="mt-2 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                            {resolvedSearchParams.message}
                        </div>
                    )}
                </form>
            </div>
        </div>
    )
}
