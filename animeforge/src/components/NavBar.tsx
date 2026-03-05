'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function NavBar() {
    const pathname = usePathname()

    // Don't render on dashboard routes — they have their own headers
    if (pathname.startsWith('/dashboard')) return null

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.06] bg-[rgba(10,11,30,0.85)] backdrop-blur-xl">
            <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="text-lg font-extrabold gradient-text">
                    AnimeForge
                </Link>

                {/* Links */}
                <div className="hidden sm:flex items-center gap-6 text-sm text-gray-400">
                    <Link href="/how-it-works" className="hover:text-white transition">
                        How It Works
                    </Link>
                    <Link href="/pricing" className="hover:text-white transition">
                        Pricing
                    </Link>
                </div>

                {/* CTA */}
                <Link href="/login" className="btn-primary text-sm px-5 py-2">
                    Get Started
                </Link>
            </div>
        </nav>
    )
}
