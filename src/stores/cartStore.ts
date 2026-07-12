import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { CartItem, Product } from "@/types"

interface CartState {
  items: CartItem[]
  isOpen: boolean
  addItem: (product: Product, size: string, color: string, quantity?: number) => void
  removeItem: (productId: string, size: string, color: string) => void
  updateQuantity: (productId: string, size: string, color: string, quantity: number) => void
  clearCart: () => void
  setOpen: (open: boolean) => void
  totalItems: () => number
  totalPrice: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product, size, color, quantity = 1) => {
        const items = get().items
        const existing = items.find(
          (i) => i.product.id === product.id && i.size === size && i.color === color
        )

        if (existing) {
          set({
            items: items.map((i) =>
              i.product.id === product.id && i.size === size && i.color === color
                ? { ...i, quantity: i.quantity + quantity }
                : i
            ),
            isOpen: true,
          })
        } else {
          set({ items: [...items, { product, size, color, quantity }], isOpen: true })
        }
      },

      removeItem: (productId, size, color) => {
        set({
          items: get().items.filter(
            (i) => !(i.product.id === productId && i.size === size && i.color === color)
          ),
        })
      },

      updateQuantity: (productId, size, color, quantity) => {
        if (quantity < 1) {
          get().removeItem(productId, size, color)
          return
        }
        set({
          items: get().items.map((i) =>
            i.product.id === productId && i.size === size && i.color === color
              ? { ...i, quantity }
              : i
          ),
        })
      },

      clearCart: () => set({ items: [] }),
      setOpen: (open) => set({ isOpen: open }),

      totalItems: () => get().items.reduce((acc, item) => acc + item.quantity, 0),
      totalPrice: () =>
        get().items.reduce((acc, item) => acc + item.product.price * item.quantity, 0),
    }),
    { name: "mika-store-cart" }
  )
)
