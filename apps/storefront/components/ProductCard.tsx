import type { StoreProduct as Product } from "@medusajs/types"
import Image from "next/image"
import Link from "next/link"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const priceObject = product.variants?.[0]?.calculated_price
  const amount = priceObject?.calculated_amount
  const currencyCode = priceObject?.currency_code

  const formattedPrice =
    typeof amount === "number" && currencyCode
      ? new Intl.NumberFormat("es-ES", {
          style: "currency",
          currency: currencyCode,
        }).format(amount / 100) // Dividimos por 100 para obtener el valor real
      : "Precio no disponible"

  return (
    <Link href={`/products/${product.handle}`} className="group block">
      <div className="relative h-80 w-full overflow-hidden rounded-lg bg-gray-700">
        {product.thumbnail ? (
          <Image
            src={product.thumbnail}
            alt={product.title || "Imagen del producto"}
            fill
            style={{ objectFit: "cover" }}
            className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-80
           flex items-center justify-center text-gray-500">
            Sin imagen
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-white truncate group-hover:text-blue-400">
          {product.title}
        </h3>
        <p className="mt-2 text-xl font-bold text-green-400">
          {formattedPrice}
        </p>
      </div>
    </Link>
  )
}