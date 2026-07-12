import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Hero } from "@/components/sections/Hero"
import { Categories } from "@/components/sections/Categories"
import { FeaturedProducts } from "@/components/sections/FeaturedProducts"
import { NewArrivals } from "@/components/sections/NewArrivals"
import { Newsletter } from "@/components/sections/Newsletter"

export function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Categories />
        <FeaturedProducts />
        <NewArrivals />
        <Newsletter />
      </main>
      <Footer />
    </>
  )
}
