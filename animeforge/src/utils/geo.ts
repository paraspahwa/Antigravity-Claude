// Geolocation utility — determines whether the user is from India or international
// Uses a free IP geolocation API to detect country

export type GeoRegion = 'IN' | 'INTL'

export interface GeoData {
    region: GeoRegion
    country: string
    countryCode: string
    currency: 'INR' | 'USD'
}

export async function detectGeoRegion(): Promise<GeoData> {
    try {
        const res = await fetch('https://ipapi.co/json/', { next: { revalidate: 3600 } })
        if (!res.ok) throw new Error('Geo API failed')
        const data = await res.json()

        const isIndia = data.country_code === 'IN'

        return {
            region: isIndia ? 'IN' : 'INTL',
            country: data.country_name || 'Unknown',
            countryCode: data.country_code || 'XX',
            currency: isIndia ? 'INR' : 'USD',
        }
    } catch {
        // Default to international if geo detection fails
        return {
            region: 'INTL',
            country: 'Unknown',
            countryCode: 'XX',
            currency: 'USD',
        }
    }
}

// Credit pricing tiers
export const PRICING_TIERS = {
    IN: [
        { id: 'starter_in', name: 'Starter', credits: 50, price: 99, currency: 'INR', symbol: '₹', perCredit: '₹1.98', bestFor: 'Try 10 short videos' },
        { id: 'creator_in', name: 'Creator', credits: 200, price: 349, currency: 'INR', symbol: '₹', perCredit: '₹1.75', bestFor: '~40 short videos/month', popular: true },
        { id: 'pro_in', name: 'Pro', credits: 500, price: 799, currency: 'INR', symbol: '₹', perCredit: '₹1.60', bestFor: 'Power users, daily posting' },
        { id: 'studio_in', name: 'Studio', credits: 1500, price: 1999, currency: 'INR', symbol: '₹', perCredit: '₹1.33', bestFor: 'Multi-channel automation' },
    ],
    INTL: [
        { id: 'starter_intl', name: 'Starter', credits: 50, price: 299, currency: 'USD', symbol: '$', perCredit: '$0.06', bestFor: 'Try 10 short videos' },
        { id: 'creator_intl', name: 'Creator', credits: 200, price: 999, currency: 'USD', symbol: '$', perCredit: '$0.05', bestFor: '~40 short videos/month', popular: true },
        { id: 'pro_intl', name: 'Pro', credits: 500, price: 1999, currency: 'USD', symbol: '$', perCredit: '$0.04', bestFor: 'Power users, daily posting' },
        { id: 'studio_intl', name: 'Studio', credits: 1500, price: 4999, currency: 'USD', symbol: '$', perCredit: '$0.03', bestFor: 'Multi-channel automation' },
    ],
} as const

export const CREDIT_COSTS = {
    avatar_only: { credits: 1, label: 'Generate Avatar' },
    video_30s: { credits: 5, label: '30s Video' },
    video_60s: { credits: 10, label: '1min Video' },
    video_2min: { credits: 20, label: '2min Video' },
    video_5min: { credits: 50, label: '5min Video' },
    story_gen: { credits: 0, label: 'Auto-Generate Story (Free)' },
    avatar_edit: { credits: 1, label: 'Edit & Regenerate Avatar' },
} as const
