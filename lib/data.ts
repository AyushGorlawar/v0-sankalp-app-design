import { Pandit, Pooja, Samagri, Booking, Review } from './types'

export const pandits: Pandit[] = [
  {
    id: '1',
    name: 'Pandit Ramesh Sharma',
    age: 52,
    address: 'Sector 15, Near Hanuman Temple',
    city: 'Varanasi',
    experience: 25,
    specializations: ['Griha Pravesh', 'Satyanarayan Katha', 'Vivah Sanskar', 'Mundan'],
    rating: 4.9,
    totalReviews: 234,
    hourlyRate: 2100,
    profileImage: '/pandits/pandit1.jpg',
    isAvailable: true,
    languages: ['Hindi', 'Sanskrit', 'English'],
    bio: 'Learned Vedic scholar with deep knowledge of Hindu scriptures. Performing poojas for over 25 years with dedication.',
    completedPoojas: 1250
  },
  {
    id: '2',
    name: 'Acharya Suresh Tripathi',
    age: 45,
    address: 'Dashashwamedh Ghat Area',
    city: 'Varanasi',
    experience: 18,
    specializations: ['Rudra Abhishek', 'Navgraha Shanti', 'Kaal Sarp Dosh Nivaran'],
    rating: 4.8,
    totalReviews: 189,
    hourlyRate: 1800,
    profileImage: '/pandits/pandit2.jpg',
    isAvailable: true,
    languages: ['Hindi', 'Sanskrit'],
    bio: 'Specialist in planetary remedies and tantric poojas. Trained at Kashi Vidyapeeth.',
    completedPoojas: 890
  },
  {
    id: '3',
    name: 'Pandit Vishnu Datt Shastri',
    age: 60,
    address: 'Assi Ghat, Near Tulsi Ghat',
    city: 'Varanasi',
    experience: 35,
    specializations: ['Pitra Dosh Nivaran', 'Shraddha Karma', 'Asthi Visarjan'],
    rating: 4.95,
    totalReviews: 312,
    hourlyRate: 2500,
    profileImage: '/pandits/pandit3.jpg',
    isAvailable: false,
    languages: ['Hindi', 'Sanskrit', 'English', 'Bhojpuri'],
    bio: 'Senior most pandit with vast experience in ancestral rituals. Expert in Garuda Puran recitation.',
    completedPoojas: 2100
  },
  {
    id: '4',
    name: 'Pandit Anand Mishra',
    age: 38,
    address: 'Godowlia, Main Market',
    city: 'Varanasi',
    experience: 12,
    specializations: ['Lakshmi Pooja', 'Vastu Shanti', 'Ganesh Pooja'],
    rating: 4.7,
    totalReviews: 156,
    hourlyRate: 1500,
    profileImage: '/pandits/pandit4.jpg',
    isAvailable: true,
    languages: ['Hindi', 'Sanskrit', 'English'],
    bio: 'Young and dynamic pandit, perfect blend of tradition and modern understanding.',
    completedPoojas: 520
  },
  {
    id: '5',
    name: 'Acharya Devendra Pandey',
    age: 48,
    address: 'Ramnagar Fort Area',
    city: 'Varanasi',
    experience: 22,
    specializations: ['Sunderkand Path', 'Hanuman Chalisa', 'Durga Saptashati'],
    rating: 4.85,
    totalReviews: 278,
    hourlyRate: 1900,
    profileImage: '/pandits/pandit5.jpg',
    isAvailable: true,
    languages: ['Hindi', 'Sanskrit', 'Awadhi'],
    bio: 'Devotee of Lord Hanuman. Melodious voice and deep spiritual knowledge.',
    completedPoojas: 980
  }
]

export const poojas: Pooja[] = [
  {
    id: '1',
    name: 'Satyanarayan Katha',
    nameHindi: 'सत्यनारायण कथा',
    description: 'A sacred ritual dedicated to Lord Vishnu for prosperity and success in all endeavors.',
    duration: '2-3 hours',
    price: 3100,
    image: '/poojas/satyanarayan.jpg',
    category: 'Prosperity',
    benefits: ['Brings prosperity', 'Removes obstacles', 'Fulfills wishes', 'Family harmony'],
    requiredSamagri: ['Panchamrit', 'Prasad items', 'Flowers', 'Fruits', 'Betel leaves'],
    isFeatured: true
  },
  {
    id: '2',
    name: 'Griha Pravesh',
    nameHindi: 'गृह प्रवेश',
    description: 'House warming ceremony to invoke divine blessings for a new home.',
    duration: '3-4 hours',
    price: 5100,
    image: '/poojas/grihapravesh.jpg',
    category: 'Home',
    benefits: ['Purifies new home', 'Removes negative energy', 'Brings peace', 'Ensures prosperity'],
    requiredSamagri: ['Kalash', 'Coconut', 'Mango leaves', 'Havan samagri', 'Swastik items'],
    isFeatured: true
  },
  {
    id: '3',
    name: 'Rudra Abhishek',
    nameHindi: 'रुद्र अभिषेक',
    description: 'Powerful Shiva pooja for removing negativity and attaining moksha.',
    duration: '2-3 hours',
    price: 4100,
    image: '/poojas/rudrabhishek.jpg',
    category: 'Shiva',
    benefits: ['Health benefits', 'Mental peace', 'Spiritual growth', 'Removes sins'],
    requiredSamagri: ['Bilva patra', 'Milk', 'Honey', 'Gangajal', 'Sandalwood'],
    isFeatured: true
  },
  {
    id: '4',
    name: 'Navgraha Shanti',
    nameHindi: 'नवग्रह शांति',
    description: 'Pacify all nine planets for harmony and balance in life.',
    duration: '3-4 hours',
    price: 5500,
    image: '/poojas/navgraha.jpg',
    category: 'Planetary',
    benefits: ['Planetary harmony', 'Career growth', 'Removes doshas', 'Overall well-being'],
    requiredSamagri: ['9 types of grains', 'Colored cloth', 'Navgraha yantra', 'Specific flowers'],
    isFeatured: false
  },
  {
    id: '5',
    name: 'Lakshmi Pooja',
    nameHindi: 'लक्ष्मी पूजा',
    description: 'Invoke Goddess Lakshmi for wealth, fortune, and abundance.',
    duration: '1-2 hours',
    price: 2100,
    image: '/poojas/lakshmi.jpg',
    category: 'Prosperity',
    benefits: ['Wealth attraction', 'Business success', 'Financial stability', 'Family prosperity'],
    requiredSamagri: ['Lotus flowers', 'Coins', 'Rice', 'Turmeric', 'Kumkum'],
    isFeatured: true
  },
  {
    id: '6',
    name: 'Ganesh Pooja',
    nameHindi: 'गणेश पूजा',
    description: 'Worship Lord Ganesha for removing obstacles and new beginnings.',
    duration: '1-2 hours',
    price: 1800,
    image: '/poojas/ganesh.jpg',
    category: 'Auspicious',
    benefits: ['Removes obstacles', 'New beginnings', 'Success in ventures', 'Wisdom'],
    requiredSamagri: ['Modak', 'Durva grass', 'Red flowers', 'Sindoor', 'Coconut'],
    isFeatured: false
  },
  {
    id: '7',
    name: 'Mundan Sanskar',
    nameHindi: 'मुंडन संस्कार',
    description: 'Sacred first head-shaving ceremony for children.',
    duration: '1-2 hours',
    price: 2500,
    image: '/poojas/mundan.jpg',
    category: 'Sanskar',
    benefits: ['Removes past karma', 'Hair growth', 'Brain development', 'Tradition blessing'],
    requiredSamagri: ['New clothes', 'Scissors', 'Havan items', 'Prasad'],
    isFeatured: false
  },
  {
    id: '8',
    name: 'Sunderkand Path',
    nameHindi: 'सुंदरकांड पाठ',
    description: 'Recitation of Sunderkand from Ramcharitmanas for protection.',
    duration: '2-3 hours',
    price: 2800,
    image: '/poojas/sunderkand.jpg',
    category: 'Protection',
    benefits: ['Protection from evil', 'Mental strength', 'Family unity', 'Wish fulfillment'],
    requiredSamagri: ['Ramcharitmanas', 'Flowers', 'Prasad', 'Oil lamp'],
    isFeatured: false
  }
]

export const samagri: Samagri[] = [
  {
    id: '1',
    name: 'Complete Pooja Kit',
    nameHindi: 'संपूर्ण पूजा किट',
    description: 'All-in-one pooja kit with essential items for daily worship.',
    price: 599,
    image: '/samagri/kit.jpg',
    category: 'Kits',
    inStock: true
  },
  {
    id: '2',
    name: 'Havan Samagri',
    nameHindi: 'हवन सामग्री',
    description: 'Premium quality havan samagri with 51 sacred herbs.',
    price: 299,
    image: '/samagri/havan.jpg',
    category: 'Havan',
    inStock: true
  },
  {
    id: '3',
    name: 'Gangajal (1L)',
    nameHindi: 'गंगाजल',
    description: 'Pure holy water from Gangotri glacier.',
    price: 199,
    image: '/samagri/gangajal.jpg',
    category: 'Holy Items',
    inStock: true
  },
  {
    id: '4',
    name: 'Brass Kalash Set',
    nameHindi: 'पीतल कलश सेट',
    description: 'Traditional brass kalash with stand and accessories.',
    price: 1299,
    image: '/samagri/kalash.jpg',
    category: 'Utensils',
    inStock: true
  },
  {
    id: '5',
    name: 'Camphor (Kapur) 100g',
    nameHindi: 'कपूर',
    description: 'Pure edible camphor for aarti and pooja.',
    price: 149,
    image: '/samagri/camphor.jpg',
    category: 'Essentials',
    inStock: true
  },
  {
    id: '6',
    name: 'Chandan Powder',
    nameHindi: 'चंदन पाउडर',
    description: 'Pure sandalwood powder from Mysore.',
    price: 349,
    image: '/samagri/chandan.jpg',
    category: 'Essentials',
    inStock: true
  },
  {
    id: '7',
    name: 'Cotton Wicks (Pack of 100)',
    nameHindi: 'रुई की बत्ती',
    description: 'Hand-rolled pure cotton wicks for diya.',
    price: 79,
    image: '/samagri/wicks.jpg',
    category: 'Essentials',
    inStock: true
  },
  {
    id: '8',
    name: 'Incense Sticks (Mixed)',
    nameHindi: 'अगरबत्ती',
    description: 'Premium incense sticks with divine fragrances.',
    price: 199,
    image: '/samagri/incense.jpg',
    category: 'Fragrance',
    inStock: true
  },
  {
    id: '9',
    name: 'Rudraksha Mala',
    nameHindi: 'रुद्राक्ष माला',
    description: 'Original 5 mukhi rudraksha mala with 108 beads.',
    price: 899,
    image: '/samagri/rudraksha.jpg',
    category: 'Spiritual',
    inStock: true
  },
  {
    id: '10',
    name: 'Brass Diya Set (5 pcs)',
    nameHindi: 'पीतल दीया सेट',
    description: 'Beautifully crafted brass diyas for daily worship.',
    price: 449,
    image: '/samagri/diya.jpg',
    category: 'Utensils',
    inStock: true
  }
]

export const reviews: Review[] = [
  {
    id: '1',
    panditId: '1',
    userId: 'u1',
    userName: 'Rajesh Kumar',
    rating: 5,
    comment: 'Panditji performed our Griha Pravesh with such devotion. Very knowledgeable and explains every ritual beautifully.',
    date: '2024-01-15'
  },
  {
    id: '2',
    panditId: '1',
    userId: 'u2',
    userName: 'Priya Sharma',
    rating: 5,
    comment: 'Excellent experience! Very punctual and conducted the Satyanarayan Katha with complete vidhi.',
    date: '2024-01-10'
  },
  {
    id: '3',
    panditId: '2',
    userId: 'u3',
    userName: 'Amit Singh',
    rating: 4,
    comment: 'Very good knowledge of planetary remedies. Helped us understand the significance of each step.',
    date: '2024-01-08'
  }
]

export const bookings: Booking[] = [
  {
    id: 'b1',
    panditId: '1',
    poojaId: '1',
    userId: 'user1',
    date: '2024-02-15',
    time: '09:00 AM',
    status: 'confirmed',
    totalAmount: 5200,
    address: '123, Green Park, Delhi',
    createdAt: '2024-01-20'
  },
  {
    id: 'b2',
    panditId: '2',
    poojaId: '3',
    userId: 'user1',
    date: '2024-02-20',
    time: '06:00 AM',
    status: 'pending',
    totalAmount: 4100,
    address: '456, Sector 15, Noida',
    createdAt: '2024-01-22'
  },
  {
    id: 'b3',
    panditId: '4',
    poojaId: '5',
    userId: 'user1',
    date: '2024-01-10',
    time: '10:00 AM',
    status: 'completed',
    totalAmount: 2100,
    address: '789, Vaishali, Ghaziabad',
    createdAt: '2024-01-05'
  }
]

export const categories = [
  { id: 'all', name: 'All Poojas', icon: '🕉️' },
  { id: 'Prosperity', name: 'Prosperity', icon: '✨' },
  { id: 'Home', name: 'Home', icon: '🏠' },
  { id: 'Shiva', name: 'Shiva', icon: '🔱' },
  { id: 'Planetary', name: 'Planetary', icon: '🌟' },
  { id: 'Sanskar', name: 'Sanskar', icon: '👶' },
  { id: 'Protection', name: 'Protection', icon: '🛡️' }
]
