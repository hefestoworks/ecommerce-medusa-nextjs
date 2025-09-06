import ProductList from "@/components/ProductList"
import { Suspense } from "react"

export default function HomePage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white">
          Nuestra Colección
        </h1>
        <p className="mt-4 text-lg text-gray-400">
          Explora los mejores productos seleccionados para ti.
        </p>
      </div>

      <Suspense fallback={<p className="text-center text-white">Cargando productos...</p>}>
        <ProductList />
      </Suspense>
    </main>
  )
}