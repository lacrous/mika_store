import { useState } from "react"
import { Link, useLocation } from "react-router"
import { Menu, Search, X, Moon, Sun } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useScroll } from "@/hooks/useScroll"
import { useTheme } from "@/components/theme-provider"
import { CartSheet } from "./CartSheet"
import { Input } from "@/components/ui/input"

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "New Arrivals", href: "/shop?sort=new" },
  { label: "Bestsellers", href: "/shop?sort=bestseller" },
]

export function Navbar() {
  const { isScrolled } = useScroll(50)
  const location = useLocation()
  const { theme, setTheme } = useTheme()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-[200] flex items-center justify-between bg-transparent transition-all duration-300"
        style={{
          paddingInline: "clamp(3vw, 6vw, 8vw)",
          paddingTop: 12,
          height: isScrolled ? 68 : 76,
        }}
      >
        {/* Rounded border frame */}
        <div
          className="absolute inset-x-[clamp(3vw,6vw,8vw)] top-3 bottom-3 rounded-full pointer-events-none transition-all duration-300"
          style={{
            border: "1px solid var(--nv-border)",
            background: "transparent",
          }}
        />

        <div
          className="relative z-10 grid w-full grid-cols-[1fr_auto_1fr] items-center"
          style={{
            paddingLeft: "clamp(2vw, 4vw, 6vw)",
            paddingRight: "clamp(2vw, 4vw, 6vw)",
          }}
        >
          <Link
            to="/"
            className="relative z-10 justify-self-start text-[var(--nv-gold)] text-[18px] font-bold tracking-[0.15em] select-none flex-shrink-0 group"
          >
          <span className="relative z-10 transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]">
            MIKA
          </span>
          <span className="absolute inset-0 blur-lg bg-[var(--nv-gold)] rounded-lg opacity-20" />
        </Link>

        <div className="hidden lg:flex items-center justify-center gap-6 relative z-10">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? location.pathname === "/"
                : location.pathname === link.href.split("?")[0]
            return (
              <Link
                key={link.label}
                to={link.href}
                className={`relative text-[14px] font-medium tracking-[0.02em] transition-all duration-200 ${
                  isActive
                    ? "text-[var(--nv-gold)]"
                    : "text-[var(--nv-text-secondary)] hover:text-[var(--nv-gold)]"
                }`}
              >
                {link.label}
                {isActive && (
                  <div
                    className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, var(--nv-gold), var(--nv-gold-bright), transparent)",
                      boxShadow:
                        "0 0 8px rgba(212, 175, 55, 0.4), 0 0 16px rgba(212, 175, 55, 0.2)",
                    }}
                  />
                )}
              </Link>
            )
          })}
        </div>

        <div className="flex items-center justify-end gap-2.5 relative z-10">
          <div className="relative hidden md:flex items-center gap-2.5">
            <AnimatePresence>
              {searchOpen && (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 220, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <Input
                    type="text"
                    placeholder="Search anime gear..."
                    autoFocus
                    className="h-9"
                  />
                </motion.div>
              )}
            </AnimatePresence>
            <button
              onClick={() => setSearchOpen((p) => !p)}
              className="flex h-9 w-9 items-center justify-center rounded-xl text-[var(--nv-text-secondary)] transition-all duration-200 hover:bg-[var(--nv-gold-glow)] hover:text-[var(--nv-gold)] nv-glass"
              style={{
                border: searchOpen
                  ? "1px solid var(--nv-border-gold)"
                  : "1px solid var(--nv-border)",
              }}
              aria-label="Toggle search"
            >
              {searchOpen ? <X className="h-4 w-4" /> : <Search className="h-4 w-4" />}
            </button>
          </div>

          <button
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-[var(--nv-text-secondary)] transition-all duration-200 hover:bg-[var(--nv-gold-glow)] hover:text-[var(--nv-gold)] nv-glass"
            style={{ border: "1px solid var(--nv-border)" }}
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>

          <CartSheet />

          <button
            onClick={() => setMobileOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-[var(--nv-text-secondary)] transition-all duration-200 hover:bg-[var(--nv-gold-glow)] hover:text-[var(--nv-gold)] nv-glass lg:hidden"
            style={{ border: "1px solid var(--nv-border)" }}
            aria-label="Open menu"
          >
            <Menu className="h-4 w-4" />
          </button>
        </div>
        </div>
      </nav>

      <MobileNav isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  )
}

function MobileNav({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[250] bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 z-[260] w-[min(320px,85vw)] bg-[var(--nv-bg-elevated)] border-l border-[var(--nv-border)] p-6 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-10">
              <span className="text-[var(--nv-gold)] text-lg font-bold tracking-[0.15em]">
                MIKA
              </span>
              <button
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center rounded-xl text-[var(--nv-text-secondary)] hover:bg-[var(--nv-gold-glow)] hover:text-[var(--nv-gold)]"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={onClose}
                  className="rounded-xl px-4 py-3 text-[15px] font-medium text-[var(--nv-text-secondary)] transition-colors hover:bg-[var(--nv-gold-glow)] hover:text-[var(--nv-gold)]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
