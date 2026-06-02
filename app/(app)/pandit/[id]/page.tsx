'use client'

import { use, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  ArrowLeft, Star, MapPin, Clock, Phone, MessageCircle, 
  Calendar, Award, Languages, CheckCircle2, ChevronRight
} from 'lucide-react'
import { MandalaPattern } from '@/components/spiritual-icons'
import { pandits, reviews, poojas } from '@/lib/data'
import { notFound } from 'next/navigation'

export default function PanditDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const pandit = pandits.find(p => p.id === id)
  const [activeTab, setActiveTab] = useState<'about' | 'reviews' | 'poojas'>('about')
  
  if (!pandit) {
    notFound()
  }

  const panditReviews = reviews.filter(r => r.panditId === id)

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header with gradient */}
      <div className="relative">
        <div className="h-48 bg-gradient-to-br from-primary via-primary to-accent">
          <div className="absolute inset-0 opacity-10">
            <MandalaPattern className="w-full h-full text-primary-foreground" />
          </div>
        </div>
        
        {/* Back Button */}
        <Link
          href="/pandits"
          className="absolute top-4 left-4 p-2.5 rounded-full bg-primary-foreground/20 backdrop-blur-sm text-primary-foreground hover:bg-primary-foreground/30 transition-all z-10"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>

        {/* Profile Card */}
        <div className="absolute -bottom-20 left-4 right-4">
          <div className="bg-card rounded-3xl p-5 shadow-lg border border-border/50">
            <div className="flex gap-4">
              {/* Avatar */}
              <div className="relative">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center">
                  <span className="text-4xl font-serif font-bold text-primary">
                    {pandit.name.split(' ').slice(-1)[0].charAt(0)}
                  </span>
                </div>
                {pandit.isAvailable && (
                  <div className="absolute -bottom-1 -right-1 px-2 py-0.5 bg-green-500 text-white text-xs font-medium rounded-full">
                    Available
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1">
                <h1 className="text-xl font-semibold text-foreground">{pandit.name}</h1>
                <div className="flex items-center gap-1.5 mt-1">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{pandit.address}, {pandit.city}</span>
                </div>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-accent text-accent" />
                    <span className="font-semibold text-foreground">{pandit.rating}</span>
                    <span className="text-sm text-muted-foreground">({pandit.totalReviews})</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-3 mt-5">
              <div className="text-center p-3 bg-secondary rounded-xl">
                <p className="text-lg font-bold text-foreground">{pandit.experience}</p>
                <p className="text-xs text-muted-foreground">Years Exp</p>
              </div>
              <div className="text-center p-3 bg-secondary rounded-xl">
                <p className="text-lg font-bold text-foreground">{pandit.completedPoojas}</p>
                <p className="text-xs text-muted-foreground">Poojas Done</p>
              </div>
              <div className="text-center p-3 bg-secondary rounded-xl">
                <p className="text-lg font-bold text-primary">₹{pandit.hourlyRate}</p>
                <p className="text-xs text-muted-foreground">Per Hour</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="px-4 pt-28">
        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {(['about', 'reviews', 'poojas'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'about' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Bio */}
            <div className="bg-card rounded-2xl p-5 border border-border/50">
              <h2 className="font-semibold text-foreground mb-3">About</h2>
              <p className="text-muted-foreground leading-relaxed">{pandit.bio}</p>
            </div>

            {/* Specializations */}
            <div className="bg-card rounded-2xl p-5 border border-border/50">
              <div className="flex items-center gap-2 mb-4">
                <Award className="w-5 h-5 text-primary" />
                <h2 className="font-semibold text-foreground">Specializations</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {pandit.specializations.map((spec, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div className="bg-card rounded-2xl p-5 border border-border/50">
              <div className="flex items-center gap-2 mb-4">
                <Languages className="w-5 h-5 text-primary" />
                <h2 className="font-semibold text-foreground">Languages</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {pandit.languages.map((lang, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 bg-secondary text-foreground text-sm rounded-full"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            {/* Details */}
            <div className="bg-card rounded-2xl p-5 border border-border/50 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Age</p>
                    <p className="font-medium text-foreground">{pandit.age} years</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'reviews' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {panditReviews.length > 0 ? (
              panditReviews.map((review) => (
                <div key={review.id} className="bg-card rounded-2xl p-5 border border-border/50">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-sm font-semibold text-primary">
                          {review.userName.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{review.userName}</p>
                        <p className="text-xs text-muted-foreground">{review.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? 'fill-accent text-accent'
                              : 'text-muted-foreground/30'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-muted-foreground">{review.comment}</p>
                </div>
              ))
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                No reviews yet
              </div>
            )}
          </motion.div>
        )}

        {activeTab === 'poojas' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            {poojas.slice(0, 5).map((pooja) => (
              <Link key={pooja.id} href={`/booking/${pooja.id}?pandit=${pandit.id}`}>
                <div className="flex items-center justify-between p-4 bg-card rounded-2xl border border-border/50 hover:shadow-md transition-all">
                  <div className="flex-1">
                    <p className="text-xs text-primary font-medium">{pooja.nameHindi}</p>
                    <h3 className="font-medium text-foreground">{pooja.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{pooja.duration}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-primary">₹{pooja.price.toLocaleString()}</span>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                </div>
              </Link>
            ))}
          </motion.div>
        )}
      </main>

      {/* Fixed Bottom CTA */}
      <div className="fixed bottom-20 left-0 right-0 px-4 py-3 bg-background/95 backdrop-blur-lg border-t border-border/50">
        <div className="flex gap-3 max-w-lg mx-auto">
          <button className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-secondary rounded-xl text-foreground font-medium hover:bg-accent transition-all">
            <Phone className="w-5 h-5" />
            Call
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-secondary rounded-xl text-foreground font-medium hover:bg-accent transition-all">
            <MessageCircle className="w-5 h-5" />
            Chat
          </button>
          <Link
            href={`/booking/select?pandit=${pandit.id}`}
            className="flex-[2] flex items-center justify-center gap-2 py-3.5 bg-primary rounded-xl text-primary-foreground font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            <Calendar className="w-5 h-5" />
            Book Now
          </Link>
        </div>
      </div>
    </div>
  )
}
