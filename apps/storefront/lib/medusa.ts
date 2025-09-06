import Medusa from "@medusajs/medusa-js"

const MEDUSA_BACKEND_URL =
  process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000"

const PUBLISHABLE_API_KEY =
  process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_API_KEY

if (!PUBLISHABLE_API_KEY) {
  throw new Error(
    "NEXT_PUBLIC_MEDUSA_PUBLISHABLE_API_KEY is not set in .env.local"
  )
}

const medusaClient = new Medusa({
  baseUrl: MEDUSA_BACKEND_URL,
  publishableApiKey: PUBLISHABLE_API_KEY,
  maxRetries: 3,
})

export default medusaClient