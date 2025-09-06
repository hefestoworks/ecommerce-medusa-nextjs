import medusaClient from "@/lib/medusa"
import { notFound } from "next/navigation"
import ProductCard from "@/components/ProductCard"
import type { StoreProduct as Product } from "@medusajs/types"

async function getProducts() : Promise<Product[]>  {
  try {
    const { products } = await medusaClient.products.list({
      // Puedes añadir filtros como limit, etc. aquí
      limit: 10,
    })

    if (!products) {
      return notFound()
    }

    return products
  } catch (error) {
    // En un caso real, aquí podrías registrar el error
    console.error("Failed to fetch products:", error)
    return notFound()
  }
}

export default async function ProductList() {
  const products: Product[] = await getProducts()

  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
      {products.map((product:Product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
