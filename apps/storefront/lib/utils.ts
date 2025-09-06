import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Utility function para combinar clases de Tailwind CSS
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formatear precio/moneda
 */
export function formatCurrency(
  amount: number,
  currencyCode: string = "USD",
  locale: string = "es-ES"
): string {
  try {
    // Convertir de centavos a unidad principal si es necesario
    const displayAmount = amount / 100

    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currencyCode.toUpperCase(),
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(displayAmount)
  } catch (error) {
    console.error("Error formatting currency:", error)
    return `${currencyCode.toUpperCase()} ${(amount / 100).toFixed(2)}`
  }
}

/**
 * Formatear fecha
 */
export function formatDate(
  date: string | Date,
  locale: string = "es-ES",
  options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  }
): string {
  try {
    const dateObj = typeof date === "string" ? new Date(date) : date
    return new Intl.DateTimeFormat(locale, options).format(dateObj)
  } catch (error) {
    console.error("Error formatting date:", error)
    return date.toString()
  }
}

/**
 * Truncar texto
 */
export function truncateText(text: string, maxLength: number = 100): string {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength).trim() + "..."
}

/**
 * Generar slug desde un string
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remover acentos
    .replace(/[^\w\s-]/g, "") // Remover caracteres especiales
    .replace(/\s+/g, "-") // Reemplazar espacios con guiones
    .replace(/-+/g, "-") // Remover guiones duplicados
    .trim()
}

/**
 * Validar email
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Obtener initiales de un nombre
 */
export function getInitials(name: string): string {
  return name
    .split(" ")
    .map(word => word.charAt(0).toUpperCase())
    .join("")
    .substring(0, 2)
}

/**
 * Debounce function para optimizar búsquedas
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func(...args), delay)
  }
}

/**
 * Función para obtener URL de imagen optimizada
 */
export function getOptimizedImageUrl(
  url: string,
  width?: number,
  height?: number,
  quality: number = 80
): string {
  if (!url) return ""

  // Si ya es una URL completa, devolverla tal como está
  if (url.startsWith("http")) return url

  // Si es una URL relativa de Medusa, construir la URL completa
  const baseUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000"
  
  if (url.startsWith("/")) {
    return `${baseUrl}${url}`
  }
  
  return `${baseUrl}/${url}`
}

/**
 * Calcular porcentaje de descuento
 */
export function calculateDiscountPercentage(
  originalPrice: number,
  salePrice: number
): number {
  if (originalPrice <= 0) return 0
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100)
}

/**
 * Verificar si un producto tiene descuento
 */
export function hasDiscount(originalPrice: number, salePrice: number): boolean {
  return salePrice < originalPrice && originalPrice > 0
}

/**
 * Obtener mensaje de stock
 */
export function getStockMessage(quantity: number): {
  message: string
  status: "in-stock" | "low-stock" | "out-of-stock"
} {
  if (quantity === 0) {
    return {
      message: "Agotado",
      status: "out-of-stock"
    }
  }
  
  if (quantity <= 5) {
    return {
      message: `Solo quedan ${quantity} unidades`,
      status: "low-stock"
    }
  }
  
  return {
    message: "En stock",
    status: "in-stock"
  }
}

/**
 * Normalizar handle de URL
 */
export function normalizeHandle(handle: string): string {
  return handle.toLowerCase().replace(/\s+/g, "-")
}

/**
 * Convertir objeto a query string
 */
export function objectToQueryString(obj: Record<string, any>): string {
  const params = new URLSearchParams()
  
  Object.entries(obj).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      params.append(key, String(value))
    }
  })
  
  return params.toString()
}