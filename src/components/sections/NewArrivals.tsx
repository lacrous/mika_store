import { Link } from "react-router"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { getNewArrivals } from "@/data/products"
import { ProductCard } from "./ProductCard"
import { Button } from "@/components/ui/button"

export function NewArrivals() {
  const products = getNewArrivals(4)

  return (
    <section
      className="py-24"
      style={{
        paddingInline: "clamp(5vw, 8vw, 10vw)",
        background: "var(--nv-bg-body)",
      }}
    >
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-[var(--nv-gold)] mb-2">
            Just Dropped
          </p>
          <h2 className="text-2xl sm:text-3xl font-semibold text-[var(--nv-text-primary)]">
            New Arrivals
          </h2>
          <p className="mt-2 max-w-md text-sm text-[var(--nv-text-tertiary)]">
            The freshest anime drops, from limited jackets to graphic tees.
          </p>
        </div>
        <motion.div whileHover={{ x: 4 }}>
          <Button variant="outline" asChild>
            <Link to="/shop?sort=new">
              View New Arrivals
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product, i) => (
          <ProductCard key={product.id} product={product} index={i} />
        ))}
      </div>
    </section>
  )
}
