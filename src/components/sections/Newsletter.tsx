import { useState } from "react"
import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
      setEmail("")
      setTimeout(() => setSubscribed(false), 4000)
    }
  }

  return (
    <section
      className="py-24"
      style={{
        paddingInline: "clamp(5vw, 8vw, 10vw)",
        background: "var(--nv-bg-elevated)",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl border border-[var(--nv-border)] bg-[var(--nv-bg-surface)] p-8 sm:p-12 lg:p-16"
      >
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(ellipse at top right, rgba(212,175,55,0.15), transparent 40%), radial-gradient(ellipse at bottom left, rgba(212,175,55,0.1), transparent 40%)",
          }}
        />
        <div className="relative z-10 mx-auto max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--nv-border-gold)] bg-[var(--nv-gold-glow)] px-3 py-1 text-xs font-medium uppercase tracking-wider text-[var(--nv-gold)]">
            <Sparkles className="h-3.5 w-3.5" />
            Join the Crew
          </div>
          <h2 className="mb-4 text-2xl sm:text-3xl font-semibold text-[var(--nv-text-primary)]">
            Get Early Access to Drops
          </h2>
          <p className="mb-8 text-sm text-[var(--nv-text-tertiary)]">
            Subscribe for exclusive releases, restock alerts, and member-only discounts.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="h-12 flex-1"
              disabled={subscribed}
            />
            <Button type="submit" size="lg" disabled={subscribed} className="h-12 px-8">
              {subscribed ? "Subscribed!" : "Subscribe"}
            </Button>
          </form>
          {subscribed && (
            <motion.p
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 text-xs text-green-400"
            >
              Welcome to the crew — check your inbox soon.
            </motion.p>
          )}
        </div>
      </motion.div>
    </section>
  )
}
