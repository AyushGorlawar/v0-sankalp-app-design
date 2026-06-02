'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Users, ShoppingBag, Calendar, User } from 'lucide-react'
import { useApp } from '@/lib/context'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/home', icon: Home, label: 'Home' },
  { href: '/pandits', icon: Users, label: 'Pandits' },
  { href: '/store', icon: ShoppingBag, label: 'Store' },
  { href: '/bookings', icon: Calendar, label: 'Bookings' },
  { href: '/profile', icon: User, label: 'Profile' },
]

export function BottomNav() {
  const pathname = usePathname()
  const { cartCount } = useApp()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-lg border-t border-border safe-area-pb">
      <div className="max-w-lg mx-auto px-2">
        <div className="flex items-center justify-around py-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
            const Icon = item.icon
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all relative',
                  isActive
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                <div className="relative">
                  <Icon className={cn('w-6 h-6', isActive && 'stroke-[2.5]')} />
                  {item.href === '/store' && cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                      {cartCount > 9 ? '9+' : cartCount}
                    </span>
                  )}
                </div>
                <span className={cn('text-xs', isActive ? 'font-medium' : 'font-normal')}>
                  {item.label}
                </span>
                {isActive && (
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
                )}
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
