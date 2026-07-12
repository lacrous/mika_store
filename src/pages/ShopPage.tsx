import { useMemo, useState } from "react"
import { useSearchParams } from "react-router"
import { motion } from "framer-motion"
import { SlidersHorizontal, X } from "lucide-react"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { ProductCard } from "@/components/sections/ProductCard"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { products } from "@/data/products"

const categories = ["all", "hoodies", "t-shirts", "outerwear", "accessories"]
const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "new", label: "New Arrivals" },
  { value: "bestseller", label: "Bestsellers" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
]

export function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const category = searchParams.get("category") || "all"
  const sort = searchParams.get("sort") || "featured"
  const query = searchParams.get("q") || ""

  const updateParam = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams)
    if (value && value !== "all" && value !== "featured") {
      next.set(key, value)
    } else {
      next.delete(key)
    }
    setSearchParams(next, { replace: true })
  }

  const filtered = useMemo(() => {
    let list = [...products]

    if (category && category !== "all") {
      list = list.filter((p) => p.category === category)
    }

    if (query.trim()) {
      const q = query.toLowerCase()
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.anime.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      )
    }

    switch (sort) {
      case "new":
        list = list.filter((p) => p.badges.includes("new"))
        break
      case "bestseller":
        list = list.filter((p) => p.badges.includes("bestseller"))
        break
      case "price-asc":
        list.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        list.sort((a, b) => b.price - a.price)
        break
    }

    return list
  }, [category, sort, query])

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-20" style={{ background: "var(--nv-bg-body)" }}>
        <div
          style={{
            paddingInline: "clamp(5vw, 8vw, 10vw)",
          }}
        >
          <div className="mb-10">
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-[var(--nv-gold)] mb-2">
              Anime Streetwear
            </p>
            <h1 className="text-3xl sm:text-4xl font-semibold text-[var(--nv-text-primary)]">
              Shop All
            </h1>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Desktop filters */}
            <aside className="hidden lg:block w-64 flex-shrink-0 space-y-8">
              <div>
                <h3 className="text-sm font-semibold text-[var(--nv-text-primary)] uppercase tracking-wider mb-4">
                  Search
                </h3>
                <Input
                  type="text"
                  value={query}
                  onChange={(e) => updateParam("q", e.target.value)}
                  placeholder="Search products..."
                />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-[var(--nv-text-primary)] uppercase tracking-wider mb-4">
                  Categories
                </h3>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => updateParam("category", cat)}
                      className={`block w-full text-left rounded-lg px-3 py-2 text-sm transition-colors ${
                        category === cat
                          ? "bg-[var(--nv-gold-glow)] text-[var(--nv-gold)]"
                          : "text-[var(--nv-text-secondary)] hover:bg-[var(--nv-bg-card)] hover:text-[var(--nv-text-primary)]"
                      }`}
                    >
                      {cat === "all" ? "All Products" : cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </aside>

            {/* Mobile filter toggle + sort */}
            <div className="lg:hidden flex items-center justify-between gap-3 mb-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
              </Button>
              <select
                value={sort}
                onChange={(e) => updateParam("sort", e.target.value)}
                className="h-9 rounded-lg border border-[var(--nv-border)] bg-[var(--nv-bg-input)] px-3 text-sm text-[var(--nv-text-primary)] outline-none focus:border-[var(--nv-border-gold)]"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Mobile filters drawer */}
            {mobileFiltersOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setMobileFiltersOpen(false)}
                  className="fixed inset-0 z-[270] bg-black/60 backdrop-blur-sm lg:hidden"
                />
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  className="fixed top-0 left-0 bottom-0 z-[280] w-[min(320px,85vw)] bg-[var(--nv-bg-elevated)] border-r border-[var(--nv-border)] p-6 lg:hidden"
                >
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-[var(--nv-gold)] font-bold tracking-[0.15em]">FILTERS</span>
                    <button
                      onClick={() => setMobileFiltersOpen(false)}
                      className="p-2 text-[var(--nv-text-secondary)] hover:text-[var(--nv-gold)]"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-semibold text-[var(--nv-text-primary)] uppercase tracking-wider mb-3">
                        Search
                      </h3>
                      <Input
                        type="text"
                        value={query}
                        onChange={(e) => updateParam("q", e.target.value)}
                        placeholder="Search products..."
                      />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-[var(--nv-text-primary)] uppercase tracking-wider mb-3">
                        Categories
                      </h3>
                      <div className="space-y-1">
                        {categories.map((cat) => (
                          <button
                            key={cat}
                            onClick={() => {
                              updateParam("category", cat)
                              setMobileFiltersOpen(false)
                            }}
                            className={`block w-full text-left rounded-lg px-3 py-2 text-sm transition-colors ${
                              category === cat
                                ? "bg-[var(--nv-gold-glow)] text-[var(--nv-gold)]"
                                : "text-[var(--nv-text-secondary)] hover:bg-[var(--nv-bg-card)]"
                            }`}
                          >
                            {cat === "all" ? "All Products" : cat.charAt(0).toUpperCase() + cat.slice(1)}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </>
            )}

            <div className="flex-1">
              <div className="hidden lg:flex items-center justify-between mb-6">
                <p className="text-sm text-[var(--nv-text-tertiary)]">
                  Showing {filtered.length} product{filtered.length === 1 ? "" : "s"}
                </p>
                <select
                  value={sort}
                  onChange={(e) => updateParam("sort", e.target.value)}
                  className="h-9 rounded-lg border border-[var(--nv-border)] bg-[var(--nv-bg-input)] px-3 text-sm text-[var(--nv-text-primary)] outline-none focus:border-[var(--nv-border-gold)]"
                >
                  {sortOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 text-center">
                  <p className="text-lg font-medium text-[var(--nv-text-primary)]">No products found</p>
                  <p className="text-sm text-[var(--nv-text-tertiary)] mt-1">
                    Try adjusting your filters or search query.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filtered.map((product, i) => (
                    <ProductCard key={product.id} product={product} index={i} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
