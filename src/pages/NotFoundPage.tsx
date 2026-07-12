import { Link } from "react-router"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Button } from "@/components/ui/button"

export function NotFoundPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center text-center" style={{ background: "var(--nv-bg-body)" }}>
        <h1 className="text-8xl font-bold text-[var(--nv-gold)] opacity-20">404</h1>
        <h2 className="text-2xl font-semibold text-[var(--nv-text-primary)] mt-4">
          Page Not Found
        </h2>
        <p className="text-sm text-[var(--nv-text-tertiary)] mt-2 max-w-sm">
          The page you're looking for doesn't exist. Maybe it got lost in another dimension.
        </p>
        <Button className="mt-8" asChild>
          <Link to="/">Back Home</Link>
        </Button>
      </main>
      <Footer />
    </>
  )
}
