export interface Product {
  id: string
  name: string
  slug: string
  price: number
  originalPrice?: number
  category: string
  anime: string
  description: string
  image: string
  gallery?: string[]
  sizes: string[]
  colors: { name: string; value: string }[]
  rating: number
  reviewCount: number
  badges: ("new" | "bestseller" | "sale" | "limited")[]
  inStock: boolean
}

export interface CartItem {
  product: Product
  size: string
  color: string
  quantity: number
}
