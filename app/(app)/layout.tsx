'use client'

import { AppProvider } from '@/lib/context'
import { BottomNav } from '@/components/bottom-nav'

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AppProvider>
      <div className="min-h-screen bg-background pb-20">
        {children}
        <BottomNav />
      </div>
    </AppProvider>
  )
}
