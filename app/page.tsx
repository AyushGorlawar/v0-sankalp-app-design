'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MandalaPattern, DiyaIcon } from '@/components/spiritual-icons'
import Link from 'next/link'

export default function SplashScreen() {
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence mode="wait">
      {showSplash ? (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 bg-gradient-to-br from-primary via-primary to-accent flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Mandala Background Pattern */}
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <MandalaPattern className="w-[800px] h-[800px] text-primary-foreground" />
          </div>
          
          {/* Floating Particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-primary-foreground/30"
                style={{
                  left: `${Math.random() * 100}%`,
                }}
                initial={{
                  y: '100vh',
                  scale: Math.random() * 0.5 + 0.5
                }}
                animate={{
                  y: '-10vh',
                }}
                transition={{
                  duration: Math.random() * 5 + 5,
                  repeat: Infinity,
                  ease: 'linear',
                  delay: Math.random() * 5
                }}
              />
            ))}
          </div>

          {/* Logo Animation */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', duration: 1.5, bounce: 0.4 }}
            className="relative z-10"
          >
            <div className="w-32 h-32 rounded-full bg-primary-foreground/20 backdrop-blur-sm flex items-center justify-center glow-gold">
              <DiyaIcon className="w-20 h-20 text-primary-foreground" />
            </div>
          </motion.div>

          {/* Brand Name */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="relative z-10 mt-8 text-center"
          >
            <h1 className="text-5xl font-serif font-bold text-primary-foreground tracking-wide">
              Sankalp
            </h1>
            <p className="text-lg text-primary-foreground/80 mt-2 font-light tracking-widest">
              संकल्प
            </p>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="relative z-10 mt-6 text-primary-foreground/70 text-sm text-center px-8 max-w-xs"
          >
            Connecting Devotees with Trusted Pandits
          </motion.p>

          {/* Loading indicator */}
          <motion.div
            className="absolute bottom-20 w-48 h-1 bg-primary-foreground/20 rounded-full overflow-hidden"
          >
            <motion.div
              className="h-full bg-primary-foreground rounded-full"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 2.8, ease: 'easeInOut' }}
            />
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          key="welcome"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="min-h-screen bg-background"
        >
          <WelcomeScreen />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function WelcomeScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary flex flex-col">
      {/* Top decorative pattern */}
      <div className="absolute top-0 left-0 right-0 h-64 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-5">
          <MandalaPattern className="w-full h-full text-primary" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 relative z-10">
        {/* Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-6"
        >
          <DiyaIcon className="w-14 h-14 text-primary" />
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-serif font-bold text-foreground"
        >
          Sankalp
        </motion.h1>
        
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-muted-foreground mt-2 text-center max-w-xs"
        >
          Your trusted companion for spiritual services and divine blessings
        </motion.p>

        {/* Features */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 w-full max-w-sm space-y-4"
        >
          {[
            { title: 'Book Trusted Pandits', desc: 'Verified and experienced' },
            { title: 'Order Pooja Samagri', desc: 'Pure and authentic items' },
            { title: 'Online Payments', desc: 'Safe and secure' }
          ].map((feature, i) => (
            <div
              key={i}
              className="flex items-center gap-4 p-4 bg-card rounded-2xl shadow-sm border border-border/50"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-primary" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="px-6 pb-10 space-y-3"
      >
        <Link
          href="/auth/login"
          className="block w-full py-4 bg-primary text-primary-foreground font-semibold rounded-2xl text-center shadow-lg hover:shadow-xl transition-all active:scale-[0.98]"
        >
          Get Started
        </Link>
        <Link
          href="/home"
          className="block w-full py-4 bg-secondary text-secondary-foreground font-medium rounded-2xl text-center border border-border hover:bg-accent transition-all"
        >
          Explore as Guest
        </Link>
      </motion.div>
    </div>
  )
}
