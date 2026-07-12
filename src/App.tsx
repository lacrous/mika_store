import { Suspense, lazy } from "react"
import { BrowserRouter, Routes, Route, useLocation, useNavigationType } from "react-router"
import { AnimatePresence, motion } from "framer-motion"
import { HomePage } from "@/pages/HomePage"

const ShopPage = lazy(() => import("@/pages/ShopPage").then((m) => ({ default: m.ShopPage })))
const ProductDetailPage = lazy(() =>
  import("@/pages/ProductDetailPage").then((m) => ({ default: m.ProductDetailPage }))
)
const CartPage = lazy(() => import("@/pages/CartPage").then((m) => ({ default: m.CartPage })))
const NotFoundPage = lazy(() =>
  import("@/pages/NotFoundPage").then((m) => ({ default: m.NotFoundPage }))
)

function PageLoader() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: "var(--nv-bg-body)" }}
    >
      <div className="flex flex-col items-center gap-4">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, #D4AF37, #F0D878)" }}
        >
          <span className="text-[#050505] font-bold text-lg">M</span>
        </div>
        <div className="w-6 h-6 rounded-full border-2 border-[var(--nv-gold)] border-t-transparent animate-spin" />
      </div>
    </div>
  )
}

function AnimatedRoutes() {
  const location = useLocation()
  const navigationType = useNavigationType()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, x: navigationType === "POP" ? -20 : 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: navigationType === "POP" ? 20 : -20 }}
        transition={{ duration: 0.2 }}
      >
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/product/:slug" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <AnimatedRoutes />
      </Suspense>
    </BrowserRouter>
  )
}

export default App
