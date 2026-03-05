'use client'

import { usePathname } from 'next/navigation'

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const isDashboard = pathname.startsWith('/dashboard')

    return (
        <div className={isDashboard ? '' : 'pt-14'}>
            {children}
        </div>
    )
}
