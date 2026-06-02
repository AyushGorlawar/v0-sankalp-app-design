'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  User, Mail, Phone, MapPin, ChevronRight, Bell, Shield, 
  HelpCircle, LogOut, Star, Calendar, Heart, Settings,
  CreditCard, Globe
} from 'lucide-react'
import { MandalaPattern, DiyaIcon } from '@/components/spiritual-icons'
import { useApp } from '@/lib/context'

export default function ProfilePage() {
  const { user, isLoggedIn } = useApp()

  const menuItems = [
    { 
      section: 'Account',
      items: [
        { icon: User, label: 'Edit Profile', href: '/profile/edit' },
        { icon: MapPin, label: 'Saved Addresses', href: '/profile/addresses' },
        { icon: CreditCard, label: 'Payment Methods', href: '/profile/payments' },
        { icon: Globe, label: 'Language', href: '/profile/language', value: 'English' }
      ]
    },
    {
      section: 'Activity',
      items: [
        { icon: Calendar, label: 'My Bookings', href: '/bookings' },
        { icon: Heart, label: 'Favorites', href: '/profile/favorites' },
        { icon: Star, label: 'My Reviews', href: '/profile/reviews' }
      ]
    },
    {
      section: 'Preferences',
      items: [
        { icon: Bell, label: 'Notifications', href: '/profile/notifications' },
        { icon: Shield, label: 'Privacy & Security', href: '/profile/privacy' },
        { icon: HelpCircle, label: 'Help & Support', href: '/profile/help' }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header with gradient */}
      <div className="relative">
        <div className="h-40 bg-gradient-to-br from-primary via-primary to-accent">
          <div className="absolute inset-0 opacity-10">
            <MandalaPattern className="w-full h-full text-primary-foreground" />
          </div>
        </div>

        {/* Profile Card */}
        <div className="px-4 -mt-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-2xl p-5 shadow-lg border border-border/50"
          >
            <div className="flex items-center gap-4">
              {/* Avatar */}
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center">
                {user?.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover rounded-2xl" />
                ) : (
                  <span className="text-3xl font-serif font-bold text-primary">
                    {user?.name?.charAt(0) || 'G'}
                  </span>
                )}
              </div>

              {/* Info */}
              <div className="flex-1">
                <h1 className="text-xl font-semibold text-foreground">
                  {user?.name || 'Guest User'}
                </h1>
                {user?.email && (
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                )}
                {user?.phone && (
                  <p className="text-sm text-muted-foreground">{user.phone}</p>
                )}
              </div>

              {/* Edit Button */}
              <Link
                href="/profile/edit"
                className="p-2.5 rounded-xl bg-secondary hover:bg-accent transition-colors"
              >
                <Settings className="w-5 h-5 text-foreground" />
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 mt-5">
              <div className="text-center p-3 bg-secondary rounded-xl">
                <p className="text-lg font-bold text-foreground">12</p>
                <p className="text-xs text-muted-foreground">Bookings</p>
              </div>
              <div className="text-center p-3 bg-secondary rounded-xl">
                <p className="text-lg font-bold text-foreground">5</p>
                <p className="text-xs text-muted-foreground">Reviews</p>
              </div>
              <div className="text-center p-3 bg-secondary rounded-xl">
                <p className="text-lg font-bold text-primary">Gold</p>
                <p className="text-xs text-muted-foreground">Member</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Menu Sections */}
      <main className="px-4 py-6 space-y-6">
        {menuItems.map((section, sectionIdx) => (
          <motion.div
            key={section.section}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: sectionIdx * 0.1 }}
          >
            <h2 className="text-sm font-medium text-muted-foreground mb-3 px-1">
              {section.section}
            </h2>
            <div className="bg-card rounded-2xl border border-border/50 overflow-hidden">
              {section.items.map((item, idx) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center justify-between p-4 hover:bg-secondary transition-colors ${
                    idx !== section.items.length - 1 ? 'border-b border-border/50' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="font-medium text-foreground">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {'value' in item && (
                      <span className="text-sm text-muted-foreground">{item.value}</span>
                    )}
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        ))}

        {/* Logout Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Link href="/">
            <div className="flex items-center justify-center gap-3 p-4 bg-destructive/10 rounded-2xl text-destructive font-medium hover:bg-destructive/20 transition-colors">
              <LogOut className="w-5 h-5" />
              <span>Log Out</span>
            </div>
          </Link>
        </motion.div>

        {/* App Version */}
        <p className="text-center text-xs text-muted-foreground">
          Sankalp v1.0.0
        </p>
      </main>
    </div>
  )
}
