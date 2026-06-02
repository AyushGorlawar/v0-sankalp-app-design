'use client'

import { SVGProps } from 'react'

export function OmIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 100 100" fill="currentColor" {...props}>
      <path d="M50 10c-22 0-40 18-40 40s18 40 40 40 40-18 40-40-18-40-40-40zm15.5 55.8c-2.2 3.2-5.4 5.7-9.2 7.1-3.8 1.4-8 1.6-12.1.6-4.1-1-7.8-3.2-10.6-6.3-2.8-3.1-4.5-7-4.8-11.1-.3-4.1.8-8.2 3.1-11.6 2.3-3.4 5.6-6 9.5-7.4l.9 2.8c-3.2 1.2-6 3.3-7.9 6.2-1.9 2.9-2.8 6.3-2.6 9.7.3 3.4 1.7 6.6 4 9.2 2.3 2.6 5.4 4.4 8.8 5.2 3.4.8 7 .7 10.2-.5 3.2-1.2 5.9-3.3 7.7-6 1.8-2.7 2.7-5.9 2.5-9.2-.2-3.3-1.5-6.4-3.7-8.9l2.2-2c2.7 3 4.2 6.8 4.5 10.7.3 3.9-.7 7.9-2.9 11.1zM55 45c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5-2.2 5-5 5z"/>
    </svg>
  )
}

export function LotusIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 100 100" fill="currentColor" {...props}>
      <path d="M50 15c-5 15-20 25-20 40 0 10 8 20 20 25 12-5 20-15 20-25 0-15-15-25-20-40zM30 55c-10-5-15 0-15 10s10 15 20 15c-5-5-10-15-5-25zM70 55c10-5 15 0 15 10s-10 15-20 15c5-5 10-15 5-25z"/>
    </svg>
  )
}

export function DiyaIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 100 100" fill="currentColor" {...props}>
      <ellipse cx="50" cy="70" rx="35" ry="15"/>
      <path d="M25 70c0-10 11-18 25-18s25 8 25 18"/>
      <path d="M50 52c-3-10 0-20 0-30 0 10 3 20 0 30"/>
      <ellipse cx="50" cy="22" rx="8" ry="12" fill="currentColor" opacity="0.6"/>
    </svg>
  )
}

export function KalashIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 100 100" fill="currentColor" {...props}>
      <ellipse cx="50" cy="85" rx="25" ry="8"/>
      <path d="M30 85c0-35 5-50 20-50s20 15 20 50"/>
      <ellipse cx="50" cy="35" rx="15" ry="5"/>
      <path d="M40 35c0-8 5-15 10-15s10 7 10 15"/>
      <ellipse cx="50" cy="20" rx="8" ry="4"/>
      <path d="M44 20l6-10 6 10"/>
    </svg>
  )
}

export function MandalaPattern(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="0.5" {...props}>
      <circle cx="100" cy="100" r="95" opacity="0.2"/>
      <circle cx="100" cy="100" r="75" opacity="0.3"/>
      <circle cx="100" cy="100" r="55" opacity="0.4"/>
      <circle cx="100" cy="100" r="35" opacity="0.5"/>
      <circle cx="100" cy="100" r="15" opacity="0.6"/>
      {[...Array(12)].map((_, i) => (
        <line
          key={i}
          x1="100"
          y1="5"
          x2="100"
          y2="195"
          transform={`rotate(${i * 15} 100 100)`}
          opacity="0.15"
        />
      ))}
      {[...Array(8)].map((_, i) => (
        <path
          key={`petal-${i}`}
          d="M100 60 Q120 80 100 100 Q80 80 100 60"
          transform={`rotate(${i * 45} 100 100)`}
          fill="currentColor"
          opacity="0.1"
        />
      ))}
    </svg>
  )
}

export function SwastikIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 100 100" fill="currentColor" {...props}>
      <rect x="45" y="20" width="10" height="60"/>
      <rect x="20" y="45" width="60" height="10"/>
      <rect x="45" y="20" width="25" height="10"/>
      <rect x="30" y="70" width="25" height="10"/>
      <rect x="70" y="45" width="10" height="25"/>
      <rect x="20" y="30" width="10" height="25"/>
    </svg>
  )
}

export function BellIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 100 100" fill="currentColor" {...props}>
      <path d="M50 10c-3 0-5 2-5 5v3c-12 3-20 14-20 27v20l-5 10h60l-5-10V45c0-13-8-24-20-27v-3c0-3-2-5-5-5z"/>
      <circle cx="50" cy="85" r="8"/>
    </svg>
  )
}

export function TempleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 100 100" fill="currentColor" {...props}>
      <polygon points="50,5 80,35 20,35"/>
      <rect x="25" y="35" width="50" height="55"/>
      <rect x="40" y="55" width="20" height="35"/>
      <rect x="30" y="40" width="15" height="12"/>
      <rect x="55" y="40" width="15" height="12"/>
      <polygon points="50,10 60,25 40,25"/>
    </svg>
  )
}
