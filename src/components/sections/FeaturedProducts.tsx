import { Link } from "react-router"
import { getFeaturedProducts } from "@/data/products"
import { ProductCard } from "./ProductCard"

export function FeaturedProducts() {
  const products = getFeaturedProducts(4)

  return (
    <section
      className="py-24"
      style={{
        paddingInline: "clamp(5vw, 8vw, 10vw)",
        background: "var(--nv-bg-elevated)",
      }}
    >
      <div className="flex items-end justify-between mb-10">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-[var(--nv-gold)] mb-2">
            Curated Picks
          </p>
          <h2 className="text-2xl sm:text-3xl font-semibold text-[var(--nv-text-primary)]">
            Featured Products
          </h2>
        </div>
        <Link
          to="/shop"
          className="hidden sm:inline-flex text-sm font-medium text-[var(--nv-text-secondary)] hover:text-[var(--nv-gold)] transition-colors"
        >
          Shop All →
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product, i) => (
          <ProductCard key={product.id} product={product} index={i} />
        ))}
      </div>
    </section>
  )
}
