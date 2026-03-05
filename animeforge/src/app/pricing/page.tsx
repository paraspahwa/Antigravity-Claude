'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { detectGeoRegion, PRICING_TIERS, CREDIT_COSTS, type GeoRegion } from '@/utils/geo'

export default function PricingPage() {
    const [region, setRegion] = useState<GeoRegion>('INTL')
    const [country, setCountry] = useState('Detecting...')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        detectGeoRegion().then((geo) => {
            setRegion(geo.region)
            setCountry(geo.country)
            setLoading(false)
        })
    }, [])

    const tiers = PRICING_TIERS[region]

    return (
        <div className="relative min-h-screen z-10 px-6 py-16 max-w-5xl mx-auto">
            <Link href="/" className="text-sm text-purple-400 hover:text-purple-300 transition mb-6 inline-block">
                ← Back to Home
            </Link>

            <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
                <span className="gradient-text">Pricing & Credits</span>
            </h1>

            {/* Region Indicator */}
            <div className="flex items-center gap-3 mb-8">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-sm text-gray-400">
                    <span>📍</span>
                    <span>{loading ? 'Detecting location...' : country}</span>
                </div>
                <div className="flex gap-1">
                    <button
                        type="button"
                        onClick={() => setRegion('IN')}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition ${region === 'IN' ? 'bg-purple-500/20 border border-purple-500/40 text-purple-300' : 'bg-white/5 border border-white/10 text-gray-500 hover:text-gray-300'}`}
                    >
                        🇮🇳 INR
                    </button>
                    <button
                        type="button"
                        onClick={() => setRegion('INTL')}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition ${region === 'INTL' ? 'bg-purple-500/20 border border-purple-500/40 text-purple-300' : 'bg-white/5 border border-white/10 text-gray-500 hover:text-gray-300'}`}
                    >
                        🌍 USD
                    </button>
                </div>
            </div>

            <p className="text-gray-500 text-sm mb-10 max-w-lg">
                Buy credits and use them to generate avatars, videos, and more. No subscriptions — pay only for what you create.
            </p>

            {/* Free Tier */}
            <div className="glass-card p-5 mb-8 flex items-center justify-between">
                <div>
                    <h3 className="text-white font-semibold">🎁 Free Tier</h3>
                    <p className="text-xs text-gray-500 mt-1">Every new account gets <strong className="text-green-400">10 free credits</strong> — enough for 2 short videos.</p>
                </div>
                <Link href="/login" className="btn-primary text-sm px-5 py-2 shrink-0">
                    Get Started
                </Link>
            </div>

            {/* Pricing Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
                {tiers.map((tier) => (
                    <div
                        key={tier.id}
                        className={`glass-card p-6 flex flex-col relative ${'popular' in tier && tier.popular ? 'border-purple-500/40 shadow-[0_0_30px_rgba(124,58,237,0.15)]' : ''
                            }`}
                    >
                        {'popular' in tier && tier.popular && (
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-purple-500 rounded-full text-[10px] font-bold uppercase tracking-wider text-white">
                                Most Popular
                            </div>
                        )}
                        <h3 className="text-lg font-bold text-white mb-1">{tier.name}</h3>
                        <div className="mb-3">
                            <span className="text-3xl font-extrabold text-white">{tier.symbol}{tier.currency === 'USD' ? (tier.price / 100).toFixed(2) : tier.price.toLocaleString()}</span>
                        </div>
                        <div className="space-y-2 mb-6 flex-1">
                            <div className="flex items-center gap-2 text-sm text-gray-300">
                                <span className="text-green-400">✓</span>
                                <span><strong>{tier.credits.toLocaleString()}</strong> credits</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-400">
                                <span className="text-green-400">✓</span>
                                <span>{tier.perCredit} per credit</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <span className="text-green-400">✓</span>
                                <span>{tier.bestFor}</span>
                            </div>
                        </div>
                        <button type="button" className={'popular' in tier && tier.popular ? 'btn-primary w-full' : 'btn-secondary w-full'}>
                            Buy {tier.name}
                        </button>
                    </div>
                ))}
            </div>

            {/* Credit Usage Table */}
            <div className="glass-card p-6">
                <h2 className="text-lg font-bold text-white mb-4">Credit Usage</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-white/10">
                                <th className="text-left py-2 text-gray-500 font-medium">Action</th>
                                <th className="text-right py-2 text-gray-500 font-medium">Credits</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.values(CREDIT_COSTS).map((cost) => (
                                <tr key={cost.label} className="border-b border-white/5">
                                    <td className="py-3 text-gray-300">{cost.label}</td>
                                    <td className="py-3 text-right">
                                        {cost.credits === 0 ? (
                                            <span className="text-green-400 font-medium">Free</span>
                                        ) : (
                                            <span className="text-white font-semibold">{cost.credits}</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Razorpay note */}
            <div className="mt-8 text-center">
                <p className="text-xs text-gray-600">
                    Payments processed securely by <strong className="text-gray-400">Razorpay</strong> • UPI, Cards, Wallets, Net Banking accepted
                </p>
            </div>
        </div>
    )
}
