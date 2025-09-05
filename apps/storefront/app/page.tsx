import Image from "next/image";
import medusaClient from "./_lib/medusa-client";
import Product from "@medusajs/medusa-js";

// Función para obtener los datos desde el servidor
async function getProducts() {
  const { products } = await medusaClient.products.list({ limit: 10 });
  return products;
}

export default async function HomePage() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Nuestros Productos</h1>
      <div className="grid grid-cols-3 gap-4"></div>
    </main>
  );
}
