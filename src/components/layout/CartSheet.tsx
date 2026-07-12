import { Link } from "react-router"
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useCartStore } from "@/stores/cartStore"

export function CartSheet() {
  const { items, isOpen, setOpen, removeItem, updateQuantity, totalPrice, totalItems } =
    useCartStore()

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          className="relative flex h-9 w-9 items-center justify-center rounded-xl text-[var(--nv-text-secondary)] transition-all duration-200 hover:bg-[var(--nv-gold-glow)] hover:text-[var(--nv-gold)] nv-glass"
          style={{ border: "1px solid var(--nv-border)" }}
          aria-label="Open cart"
        >
          <ShoppingBag className="h-4 w-4" />
          {totalItems() > 0 && (
            <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[var(--nv-gold)] px-1 text-[10px] font-bold text-[#050505]">
              {totalItems()}
            </span>
          )}
        </button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-[var(--nv-gold)]" />
            Your Cart
          </SheetTitle>
          <SheetDescription>
            {totalItems() === 0
              ? "Your cart is empty."
              : `${totalItems()} item${totalItems() === 1 ? "" : "s"} in your cart`}
          </SheetDescription>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 text-[var(--nv-text-tertiary)]">
            <ShoppingBag className="h-12 w-12 opacity-30" />
            <p className="text-sm">Start adding some anime heat.</p>
            <Button variant="outline" onClick={() => setOpen(false)} asChild>
              <Link to="/shop">Browse Shop</Link>
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 px-6">
              <div className="space-y-4 py-4">
                <AnimatePresence initial={false}>
                  {items.map((item) => (
                    <motion.div
                      key={`${item.product.id}-${item.size}-${item.color}`}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex gap-3 rounded-xl border border-[var(--nv-border)] bg-[var(--nv-bg-card)] p-3"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="h-20 w-20 rounded-lg object-cover"
                      />
                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <Link
                            to={`/product/${item.product.slug}`}
                            onClick={() => setOpen(false)}
                            className="line-clamp-2 text-sm font-medium text-[var(--nv-text-primary)] hover:text-[var(--nv-gold)]"
                          >
                            {item.product.name}
                          </Link>
                          <p className="text-xs text-[var(--nv-text-tertiary)]">
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
                              className="flex h-7 w-7 items-center justify-center text-[var(--nv-text-secondary)] hover:text-[var(--nv-gold)]"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="min-w-[1.5rem] text-center text-xs text-[var(--nv-text-primary)]">
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
                              className="flex h-7 w-7 items-center justify-center text-[var(--nv-text-secondary)] hover:text-[var(--nv-gold)]"
                              aria-label="Increase quantity"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-medium text-[var(--nv-gold)]">
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
              </div>
            </ScrollArea>

            <SheetFooter className="gap-3">
              <div className="flex w-full items-center justify-between text-sm">
                <span className="text-[var(--nv-text-secondary)]">Subtotal</span>
                <span className="text-lg font-semibold text-[var(--nv-text-primary)]">
                  ${totalPrice().toFixed(2)}
                </span>
              </div>
              <p className="text-xs text-[var(--nv-text-tertiary)]">
                Shipping and taxes calculated at checkout.
              </p>
              <Button className="w-full" size="lg" onClick={() => setOpen(false)}>
                Checkout
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setOpen(false)}
                asChild
              >
                <Link to="/cart">View Cart</Link>
              </Button>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
