import type { StoreProduct as Product } from "@medusajs/types"
import Image from "next/image"
import Link from "next/link"

interface ProductCardProps {
  product: Product
  userSelectedVariantId?: string
  region?: { currency_code: string }
  defaultPriceText?: string // mensaje por defecto si no hay precio
}

export default function ProductCard({
  product,
  userSelectedVariantId,
  region,
  defaultPriceText = "Precio no disponible",
}: ProductCardProps) {
  // Seleccionar variante
  const selectedVariant =
    product?.variants?.find(v => v.id === userSelectedVariantId) ??
    product?.variants?.sort(
      (a, b) =>
        (a.calculated_price?.calculated_amount ?? Infinity) -
        (b.calculated_price?.calculated_amount ?? Infinity)
    )[0] ??
    { id: "no-variant", title: "Sin variantes", calculated_price: undefined } // fallback seguro

  // Extraer precio
  const amount = selectedVariant?.calculated_price?.calculated_amount
  const currencyCode = region?.currency_code ?? selectedVariant?.calculated_price?.currency_code

  // Formateo seguro
  function formatPrice(amount: number|null|undefined, currencyCode: string|null|undefined) {
    return typeof amount === "number" && currencyCode
      ? new Intl.NumberFormat("es-ES", {
          style: "currency",
          currency: currencyCode,
        }).format(amount)
      : defaultPriceText
  }

  const formattedPrice = formatPrice(amount, currencyCode)

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
          <div className="w-full h-80 flex items-center justify-center text-gray-500">
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
