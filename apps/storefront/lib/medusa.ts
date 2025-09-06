import Medusa from "@medusajs/js-sdk"

// Inicializar el cliente de Medusa
const medusa = new Medusa({
  baseUrl: process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000",
  publishableKey: process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_API_KEY!,
  debug: process.env.NODE_ENV === "development",
})

// Tipos para las respuestas de la API
export interface Product {
  id: string
  title: string
  handle: string
  description?: string
  thumbnail?: string
  images?: Array<{
    id: string
    url: string
  }>
  variants?: Array<{
    id: string
    title: string
    sku?: string
    calculated_price?: {
      calculated_amount: number
      currency_code: string
    }
  }>
  collection_id?: string
  collection?: Collection
  created_at: string
  updated_at: string
}

export interface Collection {
  id: string
  title: string
  handle: string
  description?: string
  thumbnail?: string
  products?: Product[]
  created_at: string
  updated_at: string
}

export interface ProductsResponse {
  products: Product[]
  count: number
  offset: number
  limit: number
}

export interface CollectionsResponse {
  collections: Collection[]
  count: number
  offset: number
  limit: number
}

// Parámetros para las consultas
interface GetProductsParams {
  limit?: number
  offset?: number
  collection_id?: string
  region_id?: string
  currency_code?: string
}

interface GetCollectionsParams {
  limit?: number
  offset?: number
}

/**
 * Obtener productos desde Medusa
 */
export async function getProducts(params: GetProductsParams = {}): Promise<ProductsResponse | null> {
  try {
    const {
      limit = 10,
      offset = 0,
      collection_id,
      region_id,
      currency_code = "usd"
    } = params

    const queryParams: any = {
      limit,
      offset,
      currency_code,
    }

    if (collection_id) {
      queryParams.collection_id = collection_id
    }

    if (region_id) {
      queryParams.region_id = region_id
    }

    const response = await medusa.store.product.list(queryParams)
    
    return response as ProductsResponse
  } catch (error) {
    console.error("Error fetching products:", error)
    return null
  }
}

/**
 * Obtener un producto específico por handle
 */
export async function getProduct(handle: string, region_id?: string): Promise<Product | null> {
  try {
    const queryParams: any = {}
    
    if (region_id) {
      queryParams.region_id = region_id
    }

    const response = await medusa.store.product.retrieve(handle, queryParams)
    
    return response.product as Product
  } catch (error) {
    console.error("Error fetching product:", error)
    return null
  }
}

/**
 * Obtener colecciones desde Medusa
 */
export async function getCollections(params: GetCollectionsParams = {}): Promise<CollectionsResponse | null> {
  try {
    const { limit = 10, offset = 0 } = params

    const response = await medusa.store.collection.list({
      limit,
      offset,
    })
    
    return response as CollectionsResponse
  } catch (error) {
    console.error("Error fetching collections:", error)
    return null
  }
}

/**
 * Obtener una colección específica por handle
 */
export async function getCollection(handle: string): Promise<Collection | null> {
  try {
    const response = await medusa.store.collection.retrieve(handle)
    
    return response.collection as Collection
  } catch (error) {
    console.error("Error fetching collection:", error)
    return null
  }
}

/**
 * Obtener productos de una colección específica
 */
export async function getProductsByCollection(
  collectionId: string, 
  params: GetProductsParams = {}
): Promise<ProductsResponse | null> {
  return getProducts({
    ...params,
    collection_id: collectionId
  })
}

/**
 * Buscar productos
 */
export async function searchProducts(query: string, params: GetProductsParams = {}): Promise<ProductsResponse | null> {
  try {
    const { limit = 10, offset = 0 } = params

    const response = await medusa.store.product.list({
      limit,
      offset,
      q: query,
    })
    
    return response as ProductsResponse
  } catch (error) {
    console.error("Error searching products:", error)
    return null
  }
}

export default medusa