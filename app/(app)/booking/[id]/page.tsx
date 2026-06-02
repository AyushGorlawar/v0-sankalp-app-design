'use client'

import { use, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { 
  ArrowLeft, Calendar, Clock, MapPin, ChevronRight, 
  CheckCircle2, Info, CreditCard
} from 'lucide-react'
import { MandalaPattern, DiyaIcon } from '@/components/spiritual-icons'
import { poojas, pandits } from '@/lib/data'
import { useApp } from '@/lib/context'
import { notFound } from 'next/navigation'

export default function BookingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const searchParams = useSearchParams()
  const panditId = searchParams.get('pandit')
  const { addBooking, user } = useApp()
  
  const pooja = poojas.find(p => p.id === id)
  const selectedPandit = panditId ? pandits.find(p => p.id === panditId) : null
  
  const [step, setStep] = useState(1)
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [address, setAddress] = useState(user?.address || '')
  const [notes, setNotes] = useState('')
  const [chosenPandit, setChosenPandit] = useState(selectedPandit)
  
  if (!pooja) {
    notFound()
  }

  const availablePandits = pandits.filter(p => 
    p.isAvailable && p.specializations.some(s => 
      pooja.category === 'Prosperity' || pooja.category === 'Home' || 
      pooja.category === s || pooja.name.includes(s)
    )
  )

  const timeSlots = [
    '06:00 AM', '07:00 AM', '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM',
    '04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM'
  ]

  // Generate next 14 days
  const dates = [...Array(14)].map((_, i) => {
    const date = new Date()
    date.setDate(date.getDate() + i + 1)
    return date
  })

  const totalAmount = pooja.price + (chosenPandit?.hourlyRate || 0)

  const handleConfirm = () => {
    if (!chosenPandit || !selectedDate || !selectedTime) return

    const booking = {
      id: `b${Date.now()}`,
      panditId: chosenPandit.id,
      poojaId: pooja.id,
      userId: user?.id || 'guest',
      date: selectedDate,
      time: selectedTime,
      status: 'pending' as const,
      totalAmount,
      address,
      notes,
      createdAt: new Date().toISOString()
    }

    addBooking(booking)
    router.push(`/payment?amount=${totalAmount}&booking=${booking.id}`)
  }

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-lg border-b border-border/50">
        <div className="px-4 py-4">
          <div className="flex items-center gap-4">
            <Link
              href={panditId ? `/pandit/${panditId}` : '/home'}
              className="p-2 -ml-2 rounded-full hover:bg-secondary transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </Link>
            <div>
              <h1 className="text-lg font-semibold text-foreground">Book Pooja</h1>
              <p className="text-sm text-muted-foreground">Step {step} of 3</p>
            </div>
          </div>
          
          {/* Progress */}
          <div className="flex gap-2 mt-4">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`flex-1 h-1.5 rounded-full transition-all ${
                  s <= step ? 'bg-primary' : 'bg-secondary'
                }`}
              />
            ))}
          </div>
        </div>
      </header>

      <main className="px-4 py-6">
        {/* Pooja Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-4 mb-6 border border-primary/20"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl bg-primary/20 flex items-center justify-center">
              <DiyaIcon className="w-10 h-10 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-primary font-medium">{pooja.nameHindi}</p>
              <h2 className="font-semibold text-foreground">{pooja.name}</h2>
              <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{pooja.duration}</span>
                </div>
                <span className="font-bold text-primary">₹{pooja.price.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Step 1: Select Pandit */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <h3 className="font-semibold text-foreground">Select Pandit</h3>
            
            {availablePandits.map((pandit) => (
              <button
                key={pandit.id}
                onClick={() => setChosenPandit(pandit)}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all text-left ${
                  chosenPandit?.id === pandit.id
                    ? 'bg-primary/10 border-primary'
                    : 'bg-card border-border/50 hover:border-primary/50'
                }`}
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-xl font-serif font-bold text-primary">
                    {pandit.name.split(' ').slice(-1)[0].charAt(0)}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-foreground">{pandit.name}</h4>
                  <p className="text-sm text-muted-foreground">{pandit.experience} yrs experience</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-primary">₹{pandit.hourlyRate}/hr</p>
                  {chosenPandit?.id === pandit.id && (
                    <CheckCircle2 className="w-5 h-5 text-primary ml-auto mt-1" />
                  )}
                </div>
              </button>
            ))}
          </motion.div>
        )}

        {/* Step 2: Select Date & Time */}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Date Selection */}
            <div>
              <h3 className="font-semibold text-foreground mb-3">Select Date</h3>
              <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
                {dates.map((date) => {
                  const dateStr = date.toISOString().split('T')[0]
                  const isSelected = selectedDate === dateStr
                  return (
                    <button
                      key={dateStr}
                      onClick={() => setSelectedDate(dateStr)}
                      className={`flex-shrink-0 w-16 py-3 rounded-xl border text-center transition-all ${
                        isSelected
                          ? 'bg-primary border-primary text-primary-foreground'
                          : 'bg-card border-border/50 hover:border-primary/50 text-foreground'
                      }`}
                    >
                      <p className={`text-xs ${isSelected ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                        {date.toLocaleDateString('en', { weekday: 'short' })}
                      </p>
                      <p className="text-lg font-semibold">{date.getDate()}</p>
                      <p className={`text-xs ${isSelected ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                        {date.toLocaleDateString('en', { month: 'short' })}
                      </p>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Time Selection */}
            <div>
              <h3 className="font-semibold text-foreground mb-3">Select Time</h3>
              <div className="grid grid-cols-3 gap-3">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`py-3 rounded-xl border text-sm font-medium transition-all ${
                      selectedTime === time
                        ? 'bg-primary border-primary text-primary-foreground'
                        : 'bg-card border-border/50 hover:border-primary/50 text-foreground'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 3: Address & Confirm */}
        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Address */}
            <div>
              <h3 className="font-semibold text-foreground mb-3">Pooja Location</h3>
              <div className="relative">
                <MapPin className="absolute left-4 top-4 w-5 h-5 text-muted-foreground" />
                <textarea
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  placeholder="Enter complete address"
                  rows={3}
                  className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground placeholder:text-muted-foreground resize-none"
                />
              </div>
            </div>

            {/* Notes */}
            <div>
              <h3 className="font-semibold text-foreground mb-3">Special Instructions (Optional)</h3>
              <textarea
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder="Any special requirements..."
                rows={2}
                className="w-full px-4 py-3 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground placeholder:text-muted-foreground resize-none"
              />
            </div>

            {/* Booking Summary */}
            <div className="bg-card rounded-2xl p-5 border border-border/50 space-y-4">
              <h3 className="font-semibold text-foreground">Booking Summary</h3>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Pooja</span>
                  <span className="font-medium text-foreground">{pooja.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Pandit</span>
                  <span className="font-medium text-foreground">{chosenPandit?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date</span>
                  <span className="font-medium text-foreground">
                    {new Date(selectedDate).toLocaleDateString('en-IN', { 
                      day: 'numeric', month: 'long', year: 'numeric' 
                    })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Time</span>
                  <span className="font-medium text-foreground">{selectedTime}</span>
                </div>
                
                <div className="border-t border-border pt-3 mt-3 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Pooja Charges</span>
                    <span className="text-foreground">₹{pooja.price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Pandit Dakshina</span>
                    <span className="text-foreground">₹{chosenPandit?.hourlyRate.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-base font-semibold pt-2 border-t border-border">
                    <span className="text-foreground">Total Amount</span>
                    <span className="text-primary">₹{totalAmount.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </main>

      {/* Fixed Bottom CTA */}
      <div className="fixed bottom-20 left-0 right-0 px-4 py-3 bg-background/95 backdrop-blur-lg border-t border-border/50">
        <div className="flex gap-3 max-w-lg mx-auto">
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="flex-1 py-4 bg-secondary rounded-xl text-foreground font-medium hover:bg-accent transition-all"
            >
              Back
            </button>
          )}
          <button
            onClick={() => {
              if (step < 3) {
                if (step === 1 && !chosenPandit) return
                if (step === 2 && (!selectedDate || !selectedTime)) return
                setStep(step + 1)
              } else {
                handleConfirm()
              }
            }}
            disabled={
              (step === 1 && !chosenPandit) ||
              (step === 2 && (!selectedDate || !selectedTime)) ||
              (step === 3 && !address)
            }
            className="flex-[2] py-4 bg-primary rounded-xl text-primary-foreground font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {step === 3 ? (
              <>
                <CreditCard className="w-5 h-5" />
                Proceed to Pay ₹{totalAmount.toLocaleString()}
              </>
            ) : (
              <>
                Continue
                <ChevronRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
