import Image from "next/image"
import Link from "next/link"

interface Collection {
  id: string
  title: string
  handle: string
  description?: string
  thumbnail?: string
}

interface FeaturedCollectionProps {
  collection: Collection
}

export default function FeaturedCollection({ collection }: FeaturedCollectionProps) {
  return (
    <Link 
      href={`/collections/${collection.handle}`}
      className="group cursor-pointer"
    >
      <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
        {/* Collection Image */}
        <div className="aspect-[4/3] relative bg-gray-100">
          {collection.thumbnail ? (
            <Image
              src={collection.thumbnail}
              alt={collection.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-200"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
              <div className="text-center">
                <svg
                  className="w-12 h-12 text-gray-400 mx-auto mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
                <span className="text-sm text-gray-500">Colección</span>
              </div>
            </div>
          )}
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
        </div>

        {/* Collection Info */}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
            {collection.title}
          </h3>
          
          {collection.description && (
            <p className="text-sm text-gray-600 line-clamp-2">
              {collection.description}
            </p>
          )}
          
          <div className="mt-3 flex items-center text-blue-600 text-sm font-medium">
            <span>Explorar colección</span>
            <svg
              className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  )
}