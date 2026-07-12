import { useMemo, useState } from "react"
import { useParams, useNavigate, Link } from "react-router"
import { motion } from "framer-motion"
import { ArrowLeft, Check, Minus, Plus, Share2, ShoppingBag, Star, Truck } from "lucide-react"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getProductBySlug, products } from "@/data/products"
import { useCartStore } from "@/stores/cartStore"

export function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const product = useMemo(() => getProductBySlug(slug || ""), [slug])
  const addItem = useCartStore((s) => s.addItem)

  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || "")
  const [selectedColor, setSelectedColor] = useState(product?.colors[0]?.name || "")
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  if (!product) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center" style={{ background: "var(--nv-bg-body)" }}>
          <h1 className="text-2xl font-semibold text-[var(--nv-text-primary)]">Product not found</h1>
          <Button variant="outline" className="mt-4" asChild>
            <Link to="/shop">Back to Shop</Link>
          </Button>
        </main>
        <Footer />
      </>
    )
  }

  const hasDiscount = product.originalPrice && product.originalPrice > product.price
  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3)

  const handleAdd = () => {
    addItem(product, selectedSize, selectedColor, quantity)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-28 pb-20" style={{ background: "var(--nv-bg-body)" }}>
        <div style={{ paddingInline: "clamp(5vw, 8vw, 10vw)" }}>
          <button
            onClick={() => navigate(-1)}
            className="mb-6 inline-flex items-center gap-2 text-sm text-[var(--nv-text-secondary)] hover:text-[var(--nv-gold)] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-[var(--nv-border)] bg-[var(--nv-bg-surface)]"
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover"
              />
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                {product.badges.includes("sale") && hasDiscount && (
                  <Badge variant="default">
                    -{Math.round((1 - product.price / product.originalPrice!) * 100)}%
                  </Badge>
                )}
                {product.badges.includes("new") && <Badge variant="gold">New</Badge>}
                {product.badges.includes("limited") && <Badge variant="destructive">Limited</Badge>}
              </div>
            </motion.div>

            {/* Details */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-col"
            >
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-[var(--nv-gold)] mb-2">
                {product.anime}
              </p>
              <h1 className="text-3xl sm:text-4xl font-semibold text-[var(--nv-text-primary)] mb-4">
                {product.name}
              </h1>

              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-[var(--nv-gold)] text-[var(--nv-gold)]" />
                  <span className="text-sm font-medium text-[var(--nv-text-primary)]">
                    {product.rating}
                  </span>
                </div>
                <span className="text-sm text-[var(--nv-text-tertiary)]">
                  {product.reviewCount} reviews
                </span>
              </div>

              <div className="flex items-center gap-3 mb-8">
                <span className="text-3xl font-semibold text-[var(--nv-text-primary)]">
                  ${product.price.toFixed(2)}
                </span>
                {hasDiscount && (
                  <span className="text-lg text-[var(--nv-text-muted)] line-through">
                    ${product.originalPrice!.toFixed(2)}
                  </span>
                )}
              </div>

              <p className="text-sm leading-relaxed text-[var(--nv-text-secondary)] mb-8">
                {product.description}
              </p>

              {/* Colors */}
              <div className="mb-6">
                <span className="text-sm font-medium text-[var(--nv-text-primary)] mb-3 block">
                  Color: <span className="text-[var(--nv-text-secondary)]">{selectedColor}</span>
                </span>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`relative h-10 w-10 rounded-full border-2 transition-all ${
                        selectedColor === color.name
                          ? "border-[var(--nv-gold)] scale-110"
                          : "border-[var(--nv-border)] hover:border-[var(--nv-border-hover)]"
                      }`}
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                      aria-label={`Select ${color.name}`}
                    >
                      {selectedColor === color.name && (
                        <Check
                          className={`absolute inset-0 m-auto h-4 w-4 ${
                            color.value.toLowerCase() === "#f5f5f5" || color.value.toLowerCase() === "#ffffff"
                              ? "text-black"
                              : "text-white"
                          }`}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div className="mb-8">
                <span className="text-sm font-medium text-[var(--nv-text-primary)] mb-3 block">Size</span>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[3rem] rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                        selectedSize === size
                          ? "bg-[var(--nv-gold)] text-[#050505]"
                          : "border border-[var(--nv-border)] bg-[var(--nv-bg-card)] text-[var(--nv-text-secondary)] hover:border-[var(--nv-border-gold)] hover:text-[var(--nv-gold)]"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity + Actions */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="flex items-center gap-1 rounded-xl border border-[var(--nv-border)] bg-[var(--nv-bg-input)] h-12">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="flex h-12 w-12 items-center justify-center text-[var(--nv-text-secondary)] hover:text-[var(--nv-gold)]"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="min-w-[2rem] text-center text-[var(--nv-text-primary)] font-medium">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="flex h-12 w-12 items-center justify-center text-[var(--nv-text-secondary)] hover:text-[var(--nv-gold)]"
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                <Button
                  size="lg"
                  className="h-12 flex-1 text-base"
                  onClick={handleAdd}
                  disabled={added}
                >
                  {added ? (
                    <>
                      <Check className="h-5 w-5" />
                      Added to Cart
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="h-5 w-5" />
                      Add to Cart — ${(product.price * quantity).toFixed(2)}
                    </>
                  )}
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  className="h-12 w-12"
                  aria-label="Share product"
                >
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-[var(--nv-border)] bg-[var(--nv-bg-card)] p-4 text-sm text-[var(--nv-text-secondary)]">
                <Truck className="h-5 w-5 text-[var(--nv-gold)]" />
                <span>Free shipping on orders over $100. Estimated delivery 5-7 business days.</span>
              </div>
            </motion.div>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <div className="mt-24">
              <h2 className="text-2xl font-semibold text-[var(--nv-text-primary)] mb-8">
                You May Also Like
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {related.map((p) => (
                  <div
                    key={p.id}
                    className="group rounded-2xl border border-[var(--nv-border)] bg-[var(--nv-bg-card)] overflow-hidden"
                  >
                    <Link to={`/product/${p.slug}`} className="block">
                      <div className="aspect-[4/3] overflow-hidden">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-4">
                        <p className="text-xs text-[var(--nv-gold)] uppercase tracking-wider">{p.anime}</p>
                        <h3 className="mt-1 font-medium text-[var(--nv-text-primary)] group-hover:text-[var(--nv-gold)] transition-colors">
                          {p.name}
                        </h3>
                        <p className="mt-2 text-sm font-semibold text-[var(--nv-text-primary)]">
                          ${p.price.toFixed(2)}
                        </p>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
