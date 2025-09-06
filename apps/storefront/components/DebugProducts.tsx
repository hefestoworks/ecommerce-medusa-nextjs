"use client";

import { useState, useEffect } from "react";

interface Product {
  id: string;
  title: string;
  handle: string;
  status: string;
  thumbnail?: string;
  variants?: Array<{
    id: string;
    title: string;
  }>;
}

interface ConnectionTest {
  url: string;
  status: number;
  ok: boolean;
}

interface ProductsResponse {
  products: Product[];
  count?: number;
}

export default function DebugProducts() {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [rawResponse, setRawResponse] = useState<any>(null);
  const [connectionTest, setConnectionTest] = useState<ConnectionTest | null>(
    null
  );

  const backendUrl =
    process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000";
  const publishableKey =
    process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_API_KEY || null;

  useEffect(() => {
  async function testConnection() {
    try {
      setLoading(true);
      setError(null);

      // Test 1: Verificar conexión básica (este está bien)
      const healthResponse = await fetch(`${backendUrl}/health`, {
        method: "GET",
      });

      setConnectionTest({
        url: `${backendUrl}/health`,
        status: healthResponse.status,
        ok: healthResponse.ok,
      });

      // --- INICIO DE LA CORRECCIÓN ---
      // Test 2: Obtener productos
      const headers: HeadersInit = {
        "Content-Type": "application/json",
      };
      
      if (publishableKey) {
        headers["x-publishable-api-key"] = publishableKey;
      }

      const productsResponse = await fetch(`${backendUrl}/store/products`, {
        method: "GET",
        headers: headers, // Usamos las cabeceras actualizadas
      });
      // --- FIN DE LA CORRECCIÓN ---

      const data: ProductsResponse = await productsResponse.json();
      setRawResponse(data);

      if (!productsResponse.ok) {
        throw new Error(
          `HTTP error! status: ${productsResponse.status} - ${JSON.stringify(
            data
          )}`
        );
      }

      setProducts(data.products || []);
    } catch (err) {
      console.error("Error in debug test:", err);
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  }

  testConnection();
}, [backendUrl, publishableKey]);
  return (
    <div className="p-6 bg-gray-900 text-white rounded-lg my-4 font-mono text-sm">
      <h2 className="text-xl font-bold mb-4 text-green-400">
        🔍 Debug de Conexión Medusa
      </h2>

      {/* URLs de configuración */}
      <div className="mb-4 p-3 bg-gray-800 rounded">
        <div>
          <strong className="text-blue-400">Backend URL:</strong>{" "}
          <code className="text-yellow-300">{backendUrl}</code>
        </div>
        <div>
          <strong className="text-blue-400">Products API:</strong>{" "}
          <code className="text-yellow-300">{backendUrl}/store/products</code>
        </div>
        <div>
          <strong className="text-blue-400">Health Check:</strong>{" "}
          <code className="text-yellow-300">{backendUrl}/health</code>
        </div>
        <div>
          <strong className="text-blue-400">API Key:</strong>{" "}
          <code className="text-yellow-300">
            {publishableKey || "❌ NO CONFIGURADO"}
          </code>
        </div>
      </div>

      {/* Test de conexión */}
      {connectionTest && (
        <div className="mb-4 p-3 bg-gray-800 rounded">
          <strong className="text-blue-400">Test de Conexión:</strong>
          <div className="ml-2">
            <div>
              Status:{" "}
              <span
                className={
                  connectionTest.ok ? "text-green-400" : "text-red-400"
                }
              >
                {connectionTest.status}
              </span>
            </div>
            <div>
              Conexión: {connectionTest.ok ? "✅ Exitosa" : "❌ Fallida"}
            </div>
          </div>
        </div>
      )}

      {/* Estado de carga */}
      <div className="mb-4 p-3 bg-gray-800 rounded">
        <strong className="text-blue-400">Estado de Productos:</strong>
        <div className="ml-2">
          {loading && <span className="text-yellow-400">⏳ Cargando...</span>}
          {error && <span className="text-red-400">❌ Error: {error}</span>}
          {!loading && !error && (
            <span className="text-green-400">✅ Productos cargados</span>
          )}
        </div>
      </div>

      {/* Información de productos */}
      {products && (
        <div className="mb-4 p-3 bg-gray-800 rounded">
          <strong className="text-blue-400">Resumen de Productos:</strong>
          <div className="ml-2">
            <div>
              Total encontrados:{" "}
              <span className="text-yellow-300">{products.length}</span>
            </div>
            <div>
              Publicados:{" "}
              <span className="text-green-400">
                {
                  products.filter((p: Product) => p.status === "published")
                    .length
                }
              </span>
            </div>
            <div>
              En borrador:{" "}
              <span className="text-orange-400">
                {products.filter((p: Product) => p.status === "draft").length}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Lista de productos */}
      {products && products.length > 0 && (
        <div className="mb-4 p-3 bg-gray-800 rounded max-h-60 overflow-y-auto">
          <strong className="text-blue-400">Productos Encontrados:</strong>
          <div className="mt-2 space-y-2">
            {products.map((product: Product, index: number) => (
              <div key={product.id} className="p-2 bg-gray-700 rounded text-xs">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div>
                      <strong>#{index + 1}</strong> - {product.title}
                    </div>
                    <div className="text-gray-400">ID: {product.id}</div>
                    <div className="text-gray-400">
                      Handle: {product.handle}
                    </div>
                    <div className="text-gray-400">
                      Variants: {product.variants?.length || 0}
                    </div>
                  </div>
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      product.status === "published"
                        ? "bg-green-600 text-white"
                        : "bg-orange-600 text-white"
                    }`}
                  >
                    {product.status}
                  </span>
                </div>
                {product.thumbnail && (
                  <div className="text-gray-400 mt-1">Imagen: ✅</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Botones de acción */}
      <div className="flex gap-2 mb-4 flex-wrap">
        <button
          onClick={() => window.open(`${backendUrl}/store/products`, "_blank")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-xs transition-colors"
        >
          🌐 Ver API de productos
        </button>
        <button
          onClick={() => window.open(`${backendUrl}/health`, "_blank")}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-xs transition-colors"
        >
          🏥 Ver Health Check
        </button>
        <button
          onClick={() => window.open(`${backendUrl}/app`, "_blank")}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded text-xs transition-colors"
        >
          ⚙️ Abrir Admin
        </button>
      </div>

      {/* Respuesta completa de la API */}
      {rawResponse && (
        <details className="bg-gray-800 rounded p-3">
          <summary className="cursor-pointer text-blue-400 hover:text-blue-300">
            📄 Ver respuesta completa de la API (Click para expandir)
          </summary>
          <pre className="mt-2 p-4 bg-black rounded text-green-400 text-xs overflow-auto max-h-96 whitespace-pre-wrap">
            {JSON.stringify(rawResponse, null, 2)}
          </pre>
        </details>
      )}

      {/* Instrucciones */}
      <div className="mt-4 p-3 bg-blue-900 rounded border border-blue-700">
        <h3 className="text-blue-200 font-semibold mb-2">
          📋 Checklist de Solución:
        </h3>
        <ul className="text-xs space-y-1 text-blue-100">
          <li>✅ 1. Verificar que Medusa esté corriendo en puerto 9000</li>
          <li>✅ 2. Comprobar que la base de datos tenga productos</li>
          <li>
            🔍 3. Asegurarse de que los productos estén PUBLICADOS (status:
            published)
          </li>
          <li>🔍 4. Verificar que los productos tengan al menos un variant</li>
          <li>🔍 5. Confirmar CORS configurado correctamente en Medusa</li>
          <li>🔍 6. Revisar que las imágenes tengan URLs válidas</li>
        </ul>
      </div>
    </div>
  );
}
