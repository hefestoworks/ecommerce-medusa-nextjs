import { Suspense } from "react"
import { Metadata } from "next"
import ProductsGrid from "@/components/ProductsGrid"
import Hero from "@/components/Hero"
import FeaturedCollection from "@/components/FeaturedCollection"
import { getProducts, getCollections } from "@/lib/medusa"

export const metadata: Metadata = {
  title: "Tienda - Tu E-commerce",
  description: "Descubre nuestra increíble colección de productos",
}

async function HomePage() {
  // Obtener productos y colecciones desde Medusa
  const [productsResponse, collectionsResponse] = await Promise.all([
    getProducts({ limit: 12 }),
    getCollections({ limit: 4 })
  ])

  const products = productsResponse?.products || []
  const collections = collectionsResponse?.collections || []

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <Hero />

      {/* Featured Collections */}
      {collections.length > 0 && (
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-8 text-center">
              Colecciones Destacadas
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {collections.map((collection) => (
                <FeaturedCollection 
                  key={collection.id} 
                  collection={collection} 
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Products Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">
              Nuestros Productos
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Descubre nuestra cuidadosa selección de productos de alta calidad
            </p>
          </div>
          
          <Suspense 
            fallback={
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-gray-300 aspect-square rounded-lg mb-4"></div>
                    <div className="h-4 bg-gray-300 rounded mb-2"></div>
                    <div className="h-6 bg-gray-300 rounded w-20"></div>
                  </div>
                ))}
              </div>
            }
          >
            <ProductsGrid products={products} />
          </Suspense>
        </div>
      </section>
    </div>
  )
}

export default HomePage