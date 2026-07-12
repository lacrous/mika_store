import { Link } from "react-router"
import { motion, AnimatePresence } from "framer-motion"
import { Minus, Plus, ShoppingBag, Trash2, Truck } from "lucide-react"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useCartStore } from "@/stores/cartStore"

export function CartPage() {
  const { items, removeItem, updateQuantity, totalItems, totalPrice, clearCart } = useCartStore()

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-28 pb-20" style={{ background: "var(--nv-bg-body)" }}>
        <div style={{ paddingInline: "clamp(5vw, 8vw, 10vw)" }}>
          <h1 className="text-3xl font-semibold text-[var(--nv-text-primary)] mb-2">Shopping Cart</h1>
          <p className="text-sm text-[var(--nv-text-tertiary)] mb-10">
            {totalItems() === 0
              ? "Your cart is empty."
              : `You have ${totalItems()} item${totalItems() === 1 ? "" : "s"} in your cart.`}
          </p>

          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <ShoppingBag className="h-16 w-16 text-[var(--nv-text-muted)] opacity-30 mb-4" />
              <p className="text-lg font-medium text-[var(--nv-text-primary)]">Your cart is empty</p>
              <p className="text-sm text-[var(--nv-text-tertiary)] mt-1 mb-6">
                Looks like you haven't added any anime gear yet.
              </p>
              <Button asChild>
                <Link to="/shop">Start Shopping</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2 space-y-4">
                <AnimatePresence initial={false}>
                  {items.map((item) => (
                    <motion.div
                      key={`${item.product.id}-${item.size}-${item.color}`}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex gap-4 rounded-2xl border border-[var(--nv-border)] bg-[var(--nv-bg-card)] p-4"
                    >
                      <Link to={`/product/${item.product.slug}`}>
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="h-28 w-28 rounded-xl object-cover"
                        />
                      </Link>
                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <Link
                            to={`/product/${item.product.slug}`}
                            className="text-base font-medium text-[var(--nv-text-primary)] hover:text-[var(--nv-gold)] transition-colors"
                          >
                            {item.product.name}
                          </Link>
                          <p className="text-sm text-[var(--nv-text-tertiary)]">
                            {item.size} / {item.color}
                          </p>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 rounded-lg border border-[var(--nv-border)] bg-[var(--nv-bg-input)]">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.size,
                                  item.color,
                                  item.quantity - 1
                                )
                              }
                              className="flex h-8 w-8 items-center justify-center text-[var(--nv-text-secondary)] hover:text-[var(--nv-gold)]"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="min-w-[1.5rem] text-center text-sm text-[var(--nv-text-primary)]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.size,
                                  item.color,
                                  item.quantity + 1
                                )
                              }
                              className="flex h-8 w-8 items-center justify-center text-[var(--nv-text-secondary)] hover:text-[var(--nv-gold)]"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-base font-semibold text-[var(--nv-gold)]">
                              ${(item.product.price * item.quantity).toFixed(2)}
                            </span>
                            <button
                              onClick={() =>
                                removeItem(item.product.id, item.size, item.color)
                              }
                              className="text-[var(--nv-text-tertiary)] transition-colors hover:text-red-400"
                              aria-label="Remove item"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                <Button variant="ghost" className="text-[var(--nv-text-tertiary)] hover:text-red-400" onClick={clearCart}>
                  Clear Cart
                </Button>
              </div>

              <div className="h-fit rounded-2xl border border-[var(--nv-border)] bg-[var(--nv-bg-card)] p-6">
                <h2 className="text-lg font-semibold text-[var(--nv-text-primary)] mb-4">Order Summary</h2>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between text-[var(--nv-text-secondary)]">
                    <span>Subtotal</span>
                    <span>${totalPrice().toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between text-[var(--nv-text-secondary)]">
                    <span>Shipping</span>
                    <span>{totalPrice() > 100 ? "Free" : "$8.00"}</span>
                  </div>
                  <div className="flex items-center justify-between text-[var(--nv-text-secondary)]">
                    <span>Tax</span>
                    <span>${(totalPrice() * 0.08).toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between text-base font-semibold text-[var(--nv-text-primary)]">
                    <span>Total</span>
                    <span>
                      ${(totalPrice() + (totalPrice() > 100 ? 0 : 8) + totalPrice() * 0.08).toFixed(2)}
                    </span>
                  </div>
                </div>

                <Button size="lg" className="mt-6 w-full">
                  Checkout
                </Button>

                <div className="mt-4 flex items-start gap-2 text-xs text-[var(--nv-text-tertiary)]">
                  <Truck className="h-4 w-4 text-[var(--nv-gold)] flex-shrink-0" />
                  <span>Free shipping on orders over $100. Taxes calculated at checkout.</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
