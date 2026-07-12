import { Link } from "react-router"
import { motion } from "framer-motion"
import { Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { Product } from "@/types"

interface ProductCardProps {
  product: Product
  index?: number
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const hasDiscount = product.originalPrice && product.originalPrice > product.price

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link to={`/product/${product.slug}`} className="group block">
        <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-[var(--nv-bg-surface)] border border-[var(--nv-border)] mb-3">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 nv-card-overlay-gradient opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            {product.badges.includes("sale") && hasDiscount && (
              <Badge variant="default">
                -{Math.round((1 - product.price / product.originalPrice!) * 100)}%
              </Badge>
            )}
            {product.badges.includes("new") && <Badge variant="gold">New</Badge>}
            {product.badges.includes("limited") && <Badge variant="destructive">Limited</Badge>}
            {product.badges.includes("bestseller") && !product.badges.includes("sale") && (
              <Badge variant="secondary">Bestseller</Badge>
            )}
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <div className="nv-glass-elevated rounded-xl py-2.5 text-center text-sm font-medium text-[var(--nv-text-primary)]">
              Quick View
            </div>
          </div>
        </div>

        <div className="space-y-1">
          <p className="text-xs font-medium uppercase tracking-wider text-[var(--nv-gold)]">
            {product.anime}
          </p>
          <h3 className="text-[15px] font-medium leading-snug text-[var(--nv-text-primary)] line-clamp-2 group-hover:text-[var(--nv-gold)] transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center gap-1.5">
            <Star className="h-3.5 w-3.5 fill-[var(--nv-gold)] text-[var(--nv-gold)]" />
            <span className="text-xs text-[var(--nv-text-secondary)]">
              {product.rating} ({product.reviewCount})
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-[var(--nv-text-primary)]">
              ${product.price.toFixed(2)}
            </span>
            {hasDiscount && (
              <span className="text-xs text-[var(--nv-text-muted)] line-through">
                ${product.originalPrice!.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
