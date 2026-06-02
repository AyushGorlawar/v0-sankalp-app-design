'use client'

import { useState, Suspense } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowLeft, MapPin, CreditCard, Wallet, Building2, CheckCircle2 } from 'lucide-react'
import { MandalaPattern } from '@/components/spiritual-icons'
import { useApp } from '@/lib/context'

function CheckoutContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const amount = parseInt(searchParams.get('amount') || '0')
  const { user, clearCart } = useApp()
  
  const [address, setAddress] = useState(user?.address || '')
  const [city, setCity] = useState(user?.city || '')
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi')
  const [isProcessing, setIsProcessing] = useState(false)

  const handlePayment = async () => {
    setIsProcessing(true)
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    clearCart()
    router.push('/payment-success?type=order')
  }

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-lg border-b border-border/50">
        <div className="px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/cart" className="p-2 -ml-2 rounded-full hover:bg-secondary transition-colors">
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </Link>
            <h1 className="text-lg font-semibold text-foreground">Checkout</h1>
          </div>
        </div>
      </header>

      <main className="px-4 py-6 space-y-6">
        {/* Delivery Address */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-2xl p-5 border border-border/50"
        >
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-5 h-5 text-primary" />
            <h2 className="font-semibold text-foreground">Delivery Address</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">Full Address</label>
              <textarea
                value={address}
                onChange={e => setAddress(e.target.value)}
                placeholder="House/Flat No., Street, Area"
                rows={2}
                className="w-full px-4 py-3 bg-secondary rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">City</label>
              <input
                type="text"
                value={city}
                onChange={e => setCity(e.target.value)}
                placeholder="Enter city"
                className="w-full px-4 py-3 bg-secondary rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
          </div>
        </motion.div>

        {/* Payment Method */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-2xl p-5 border border-border/50"
        >
          <div className="flex items-center gap-2 mb-4">
            <CreditCard className="w-5 h-5 text-primary" />
            <h2 className="font-semibold text-foreground">Payment Method</h2>
          </div>

          <div className="space-y-3">
            {[
              { id: 'upi', icon: Wallet, label: 'UPI', desc: 'Pay via GPay, PhonePe, Paytm' },
              { id: 'card', icon: CreditCard, label: 'Credit/Debit Card', desc: 'Visa, Mastercard, RuPay' },
              { id: 'netbanking', icon: Building2, label: 'Net Banking', desc: 'All major banks supported' }
            ].map((method) => (
              <button
                key={method.id}
                onClick={() => setPaymentMethod(method.id as 'upi' | 'card' | 'netbanking')}
                className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all text-left ${
                  paymentMethod === method.id
                    ? 'bg-primary/10 border-primary'
                    : 'bg-secondary border-transparent hover:border-primary/30'
                }`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  paymentMethod === method.id ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}>
                  <method.icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">{method.label}</p>
                  <p className="text-sm text-muted-foreground">{method.desc}</p>
                </div>
                {paymentMethod === method.id && (
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                )}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Order Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-5 border border-primary/20"
        >
          <h2 className="font-semibold text-foreground mb-4">Order Summary</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Order Total</span>
              <span className="font-bold text-primary text-lg">₹{amount.toLocaleString()}</span>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Fixed Bottom CTA */}
      <div className="fixed bottom-20 left-0 right-0 px-4 py-3 bg-background/95 backdrop-blur-lg border-t border-border/50">
        <button
          onClick={handlePayment}
          disabled={isProcessing || !address || !city}
          className="w-full py-4 bg-primary text-primary-foreground font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isProcessing ? (
            <>
              <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <CreditCard className="w-5 h-5" />
              Pay ₹{amount.toLocaleString()}
            </>
          )}
        </button>
      </div>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
    </div>}>
      <CheckoutContent />
    </Suspense>
  )
}
