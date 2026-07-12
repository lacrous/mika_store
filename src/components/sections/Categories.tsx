import { Link } from "react-router"
import { motion } from "framer-motion"

const categories = [
  {
    name: "Hoodies",
    href: "/shop?category=hoodies",
    image:
      "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "T-Shirts",
    href: "/shop?category=t-shirts",
    image:
      "https://images.unsplash.com/photo-1583743814966-4306a43cdbba?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Outerwear",
    href: "/shop?category=outerwear",
    image:
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Accessories",
    href: "/shop?category=accessories",
    image:
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=600&q=80",
  },
]

export function Categories() {
  return (
    <section
      className="py-24"
      style={{
        paddingInline: "clamp(5vw, 8vw, 10vw)",
        background: "var(--nv-bg-body)",
      }}
    >
      <div className="flex items-end justify-between mb-10">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-[var(--nv-gold)] mb-2">
            Browse by Category
          </p>
          <h2 className="text-2xl sm:text-3xl font-semibold text-[var(--nv-text-primary)]">
            Find Your Fit
          </h2>
        </div>
        <Link
          to="/shop"
          className="hidden sm:inline-flex text-sm font-medium text-[var(--nv-text-secondary)] hover:text-[var(--nv-gold)] transition-colors"
        >
          View All →
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
          >
            <Link to={cat.href} className="group relative block aspect-[4/5] overflow-hidden rounded-2xl">
              <img
                src={cat.image}
                alt={cat.name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute inset-0 flex items-end p-6">
                <h3 className="text-xl font-semibold text-white group-hover:text-[var(--nv-gold)] transition-colors">
                  {cat.name}
                </h3>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
