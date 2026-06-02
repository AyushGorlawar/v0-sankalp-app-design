'use client'

import { useState, Suspense } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowLeft, CreditCard, Wallet, Building2, CheckCircle2, Lock, Shield } from 'lucide-react'
import { MandalaPattern } from '@/components/spiritual-icons'

function PaymentContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const amount = parseInt(searchParams.get('amount') || '0')
  const bookingId = searchParams.get('booking')
  
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi')
  const [upiId, setUpiId] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)

  const handlePayment = async () => {
    setIsProcessing(true)
    await new Promise(resolve => setTimeout(resolve, 2500))
    router.push('/payment-success?type=booking')
  }

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-lg border-b border-border/50">
        <div className="px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/home" className="p-2 -ml-2 rounded-full hover:bg-secondary transition-colors">
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </Link>
            <div>
              <h1 className="text-lg font-semibold text-foreground">Payment</h1>
              <p className="text-sm text-muted-foreground">Secure checkout</p>
            </div>
          </div>
        </div>
      </header>

      <main className="px-4 py-6 space-y-6">
        {/* Amount Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden bg-gradient-to-br from-primary to-accent rounded-2xl p-6 text-center"
        >
          <div className="absolute inset-0 opacity-10">
            <MandalaPattern className="w-full h-full text-primary-foreground" />
          </div>
          <div className="relative z-10">
            <p className="text-primary-foreground/70 text-sm mb-1">Total Amount</p>
            <p className="text-4xl font-bold text-primary-foreground">
              ₹{amount.toLocaleString()}
            </p>
            <div className="flex items-center justify-center gap-2 mt-3">
              <Shield className="w-4 h-4 text-primary-foreground/70" />
              <span className="text-sm text-primary-foreground/70">100% Secure Payment</span>
            </div>
          </div>
        </motion.div>

        {/* Payment Methods */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-2xl p-5 border border-border/50"
        >
          <h2 className="font-semibold text-foreground mb-4">Select Payment Method</h2>

          <div className="space-y-3">
            {[
              { id: 'upi', icon: Wallet, label: 'UPI', desc: 'GPay, PhonePe, Paytm, BHIM' },
              { id: 'card', icon: CreditCard, label: 'Card', desc: 'Credit/Debit Cards' },
              { id: 'netbanking', icon: Building2, label: 'Net Banking', desc: 'All Banks' }
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

        {/* UPI Input */}
        {paymentMethod === 'upi' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-card rounded-2xl p-5 border border-border/50"
          >
            <h3 className="font-medium text-foreground mb-3">Enter UPI ID</h3>
            <input
              type="text"
              value={upiId}
              onChange={e => setUpiId(e.target.value)}
              placeholder="yourname@upi"
              className="w-full px-4 py-3 bg-secondary rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            
            {/* Quick UPI Options */}
            <div className="flex gap-2 mt-4">
              {['@ybl', '@paytm', '@okaxis', '@oksbi'].map((suffix) => (
                <button
                  key={suffix}
                  onClick={() => setUpiId(prev => prev.split('@')[0] + suffix)}
                  className="px-3 py-1.5 bg-secondary rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-all"
                >
                  {suffix}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Security Note */}
        <div className="flex items-center gap-3 p-4 bg-secondary/50 rounded-xl">
          <Lock className="w-5 h-5 text-muted-foreground flex-shrink-0" />
          <p className="text-sm text-muted-foreground">
            Your payment information is encrypted and secure. We never store your card details.
          </p>
        </div>
      </main>

      {/* Fixed Bottom CTA */}
      <div className="fixed bottom-20 left-0 right-0 px-4 py-3 bg-background/95 backdrop-blur-lg border-t border-border/50">
        <button
          onClick={handlePayment}
          disabled={isProcessing || (paymentMethod === 'upi' && !upiId)}
          className="w-full py-4 bg-primary text-primary-foreground font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isProcessing ? (
            <>
              <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              Processing Payment...
            </>
          ) : (
            <>
              <Lock className="w-5 h-5" />
              Pay Securely ₹{amount.toLocaleString()}
            </>
          )}
        </button>
      </div>
    </div>
  )
}

export default function PaymentPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
    </div>}>
      <PaymentContent />
    </Suspense>
  )
}
