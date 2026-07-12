import { useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Heart, Instagram, Send, Twitter, Youtube } from "lucide-react"
import { Link } from "react-router"
import { Input } from "@/components/ui/input"

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Shop All", href: "/shop" },
  { label: "New Arrivals", href: "/shop?sort=new" },
  { label: "Bestsellers", href: "/shop?sort=bestseller" },
]

const categories = [
  { label: "Hoodies", href: "/shop?category=hoodies" },
  { label: "T-Shirts", href: "/shop?category=t-shirts" },
  { label: "Outerwear", href: "/shop?category=outerwear" },
  { label: "Accessories", href: "/shop?category=accessories" },
]

const support = [
  { label: "About Us", href: "#" },
  { label: "Shipping", href: "#" },
  { label: "Returns", href: "#" },
  { label: "Contact", href: "#" },
]

const socials = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Youtube, href: "#", label: "YouTube" },
]

export function Footer() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const { scrollYProgress } = useScroll()
  const watermarkY = useTransform(scrollYProgress, [0.7, 1], [100, 0])
  const watermarkOpacity = useTransform(scrollYProgress, [0.7, 0.9], [0, 0.04])

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
      setEmail("")
      setTimeout(() => setSubscribed(false), 4000)
    }
  }

  return (
    <footer className="relative overflow-hidden" style={{ background: "var(--nv-bg-body)" }}>
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, var(--nv-gold-dim), var(--nv-gold-bright), var(--nv-gold-dim), transparent)",
        }}
      />

      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none select-none"
        style={{
          y: watermarkY,
          opacity: watermarkOpacity,
          fontSize: "clamp(140px, 22vw, 360px)",
          fontWeight: 900,
          letterSpacing: "0.12em",
          lineHeight: 1,
          background: "linear-gradient(to top, var(--nv-gold-glow), transparent)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          transform: "translateX(-50%) translateY(30%)",
        }}
      >
        MIKA
      </motion.div>

      <div
        className="relative z-10 pt-20 pb-8"
        style={{
          paddingInlineStart: "clamp(5vw, 8vw, 10vw)",
          paddingInlineEnd: "clamp(5vw, 8vw, 10vw)",
        }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-14 text-start">
          <div className="sm:col-span-2 lg:col-span-1">
            <span className="text-[var(--nv-gold)] text-[22px] font-bold tracking-[0.15em] block mb-3">
              MIKA
            </span>
            <p className="text-[13px] leading-relaxed mb-6 max-w-[280px]" style={{ color: "var(--nv-text-tertiary)" }}>
              Premium anime clothing and streetwear for fans who wear their
              obsession with pride.
            </p>

            <form onSubmit={handleSubscribe} className="relative max-w-[300px]">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email..."
                className="h-11 pr-12"
                disabled={subscribed}
              />
              <button
                type="submit"
                className={`absolute top-1/2 -translate-y-1/2 right-1 w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 ${
                  subscribed
                    ? "bg-green-500/20 text-green-400"
                    : "text-[var(--nv-gold)] hover:bg-[var(--nv-gold-glow)]"
                }`}
                style={{ border: "1px solid rgba(212, 175, 55, 0.15)" }}
              >
                {subscribed ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 15 }}
                  >
                    <Heart className="h-3.5 w-3.5 fill-current" />
                  </motion.div>
                ) : (
                  <Send className="h-3.5 w-3.5" />
                )}
              </button>
              {subscribed && (
                <motion.p
                  className="text-[11px] text-green-400 mt-1.5"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  Subscribed successfully!
                </motion.p>
              )}
            </form>
          </div>

          <div>
            <h3 className="text-[13px] font-semibold text-[var(--nv-text-primary)] uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-[13px] text-[var(--nv-text-tertiary)] hover:text-[var(--nv-gold)] transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[13px] font-semibold text-[var(--nv-text-primary)] uppercase tracking-wider mb-4">
              Categories
            </h3>
            <ul className="space-y-2.5">
              {categories.map((cat) => (
                <li key={cat.label}>
                  <Link
                    to={cat.href}
                    className="text-[13px] text-[var(--nv-text-tertiary)] hover:text-[var(--nv-gold)] transition-colors duration-200"
                  >
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[13px] font-semibold text-[var(--nv-text-primary)] uppercase tracking-wider mb-4">
              Support
            </h3>
            <ul className="space-y-2.5">
              {support.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[13px] text-[var(--nv-text-tertiary)] hover:text-[var(--nv-gold)] transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3 mb-10">
          {socials.map((social) => (
            <motion.a
              key={social.label}
              href={social.href}
              className="w-10 h-10 rounded-full flex items-center justify-center nv-glass text-[var(--nv-text-tertiary)] hover:text-[var(--nv-gold)] hover:border-[var(--nv-border-gold)] transition-colors duration-200"
              whileHover={{ scale: 1.15, y: -2 }}
              whileTap={{ scale: 0.95 }}
              aria-label={social.label}
            >
              <social.icon className="h-4 w-4" />
            </motion.a>
          ))}
        </div>

        <div className="pt-6 border-t border-[var(--nv-border)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[12px]" style={{ color: "var(--nv-text-muted)" }}>
            © {new Date().getFullYear()} MIKA Store. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-[12px]" style={{ color: "var(--nv-text-muted)" }}>
            <span>Made with</span>
            <Heart className="h-3 w-3 text-[var(--nv-gold)] fill-[var(--nv-gold)]" />
            <span>for anime fans</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
