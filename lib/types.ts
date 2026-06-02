export interface Pandit {
  id: string
  name: string
  age: number
  address: string
  city: string
  experience: number
  specializations: string[]
  rating: number
  totalReviews: number
  hourlyRate: number
  profileImage: string
  isAvailable: boolean
  languages: string[]
  bio: string
  completedPoojas: number
}

export interface Pooja {
  id: string
  name: string
  nameHindi: string
  description: string
  duration: string
  price: number
  image: string
  category: string
  benefits: string[]
  requiredSamagri: string[]
  isFeatured: boolean
}

export interface Samagri {
  id: string
  name: string
  nameHindi: string
  description: string
  price: number
  image: string
  category: string
  inStock: boolean
  quantity?: number
}

export interface Booking {
  id: string
  panditId: string
  poojaId: string
  userId: string
  date: string
  time: string
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  totalAmount: number
  address: string
  notes?: string
  createdAt: string
}

export interface CartItem {
  id: string
  type: 'samagri' | 'pooja'
  item: Samagri | Pooja
  quantity: number
}

export interface User {
  id: string
  name: string
  email: string
  phone: string
  avatar?: string
  address?: string
  city?: string
}

export interface Review {
  id: string
  panditId: string
  userId: string
  userName: string
  rating: number
  comment: string
  date: string
}
