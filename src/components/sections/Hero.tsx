import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from "lucide-react"
import { Link } from "react-router"
import { Button } from "@/components/ui/button"

const slides = [
  {
    id: 1,
    title: "Wear Your Obsession",
    subtitle: "Premium anime clothing crafted for true fans.",
    cta: "Shop Now",
    href: "/shop",
    image:
      "https://images.unsplash.com/photo-1556905054-8f5e68f1e9c5?auto=format&fit=crop&w=1920&q=80",
  },
  {
    id: 2,
    title: "New Drop: Survey Corps",
    subtitle: "Limited edition Attack on Titan outerwear.",
    cta: "View Collection",
    href: "/shop?category=outerwear",
    image:
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=1920&q=80",
  },
  {
    id: 3,
    title: "Streetwear Meets Anime",
    subtitle: "Oversized hoodies, graphic tees, and accessories.",
    cta: "Explore",
    href: "/shop",
    image:
      "https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=1920&q=80",
  },
]

export function Hero() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)

  const { scrollY } = useScroll()
  const bgY = useTransform(scrollY, [0, 800], [0, 150])
  const textY = useTransform(scrollY, [0, 800], [0, -50])
  const opacity = useTransform(scrollY, [0, 600], [1, 0])

  const paginate = useCallback(
    (dir: number) => {
      setDirection(dir)
      setCurrent((prev) => (prev + dir + slides.length) % slides.length)
    },
    []
  )

  useEffect(() => {
    const timer = setInterval(() => paginate(1), 7000)
    return () => clearInterval(timer)
  }, [paginate])

  const slide = slides[current]

  return (
    <section className="relative w-full h-screen overflow-hidden" style={{ background: "var(--nv-bg-body)" }}>
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={slide.id}
            className="absolute inset-0"
            custom={direction}
            initial={{ x: direction > 0 ? "100%" : "-100%", opacity: 0, scale: 1.1 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            exit={{ x: direction > 0 ? "-100%" : "100%", opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
              initial={{ scale: 1.15 }}
              animate={{ scale: 1.02 }}
              transition={{ duration: 10, ease: "linear" }}
              style={{ opacity: 0.65 }}
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, transparent 0%, rgba(5,5,5,0.4) 100%)" }}
      />
      <div
        className="absolute inset-0 z-[2]"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 75% 60%, rgba(5,5,5,0.92) 0%, rgba(5,5,5,0.4) 40%, transparent 75%)",
        }}
      />
      <div
        className="absolute inset-0 z-[2]"
        style={{
          background: "linear-gradient(to top, rgba(5,5,5,1) 0%, rgba(5,5,5,0.7) 30%, transparent 55%)",
        }}
      />
      <div
        className="absolute inset-0 z-[2]"
        style={{
          background: "linear-gradient(to right, rgba(5,5,5,0.5) 0%, transparent 40%)",
        }}
      />

      <motion.div
        className="absolute inset-0 z-10 flex items-center"
        style={{ paddingInline: "clamp(5vw, 8vw, 10vw)", y: textY, opacity }}
      >
        <div className="max-w-[640px] ml-auto items-start flex flex-col" style={{ transformOrigin: "left" }}>
          <motion.div
            className="relative inline-flex items-center mb-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <motion.div
              className="absolute inset-0 rounded-lg"
              style={{
                background: "linear-gradient(to right, var(--nv-gold), var(--nv-gold-bright))",
                filter: "blur(12px)",
                opacity: 0.3,
              }}
              animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.08, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <div
              className="relative flex items-center gap-2 px-3.5 py-1.5 rounded-lg"
              style={{
                background: "linear-gradient(to right, var(--nv-gold), var(--nv-gold-bright))",
              }}
            >
              <Sparkles className="h-3.5 w-3.5 text-[#050505]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#050505]">
                Premium Anime Wear
              </span>
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.h1
              key={slide.id}
              className="font-normal text-white leading-[1.05] tracking-[-0.02em] mb-5"
              style={{
                fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                fontFamily: '"SF Pro Display", -apple-system, sans-serif',
                textShadow: "0 2px 30px rgba(0,0,0,0.6), 0 4px 50px rgba(0,0,0,0.4)",
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              {slide.title}
            </motion.h1>
          </AnimatePresence>

          <motion.p
            className="leading-relaxed max-w-[480px] mb-8 line-clamp-3"
            style={{
              fontSize: "var(--font-body, 0.9375rem)",
              color: "var(--nv-text-secondary)",
              textShadow: "0 1px 15px rgba(0,0,0,0.7)",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            {slide.subtitle}
          </motion.p>

          <motion.div
            className="flex gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <Button size="lg" asChild>
              <Link to={slide.href}>
                {slide.cta}
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/shop">Browse All</Link>
            </Button>
          </motion.div>
        </div>
      </motion.div>

      <div className="absolute top-1/2 -translate-y-1/2 right-6 z-10 flex flex-col items-center gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setDirection(i > current ? 1 : -1)
              setCurrent(i)
            }}
            className="relative group"
            aria-label={`Go to slide ${i + 1}`}
          >
            <div
              className="w-1 rounded-full transition-all duration-500"
              style={{
                height: i === current ? 32 : 8,
                background:
                  i === current
                    ? "linear-gradient(to bottom, var(--nv-gold), var(--nv-gold-bright))"
                    : "rgba(255,255,255,0.15)",
                boxShadow: i === current ? "0 0 12px rgba(212, 175, 55, 0.4)" : "none",
              }}
            />
            {i === current && (
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: "linear-gradient(to bottom, var(--nv-gold), var(--nv-gold-bright))",
                  filter: "blur(6px)",
                  opacity: 0.5,
                }}
                layoutId="hero-indicator-glow"
              />
            )}
          </button>
        ))}
      </div>

      <div className="absolute bottom-10 right-10 z-10 flex items-center gap-3">
        <motion.button
          onClick={() => paginate(-1)}
          className="w-11 h-11 rounded-full flex items-center justify-center text-white/50 hover:text-[var(--nv-gold)] nv-glass transition-colors duration-200"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-5 w-5" />
        </motion.button>
        <motion.button
          onClick={() => paginate(1)}
          className="w-11 h-11 rounded-full flex items-center justify-center text-white/50 hover:text-[var(--nv-gold)] nv-glass transition-colors duration-200"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Next slide"
        >
          <ChevronRight className="h-5 w-5" />
        </motion.button>
      </div>
    </section>
  )
}
