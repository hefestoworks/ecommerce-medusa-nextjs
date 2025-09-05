# **Proyecto E-commerce: Next.js \+ MedusaJS**

Este es un proyecto de e-commerce completo construido con una arquitectura moderna de monorepo, utilizando Next.js con TypeScript para el frontend y MedusaJS para el backend.

* **Frontend**: apps/storefront \- Una tienda headless construida con [Next.js](https://nextjs.org/), [React](https://react.dev/), y [Tailwind CSS](https://tailwindcss.com/).  
* **Backend**: apps/admin \- Un potente backend de e-commerce headless de [MedusaJS](https://medusajs.com/).  
* **Infraestructura**: infra \- Contenedores de [Docker](https://www.docker.com/) para gestionar la base de datos (PostgreSQL) y el servidor de caché/eventos (Redis).

## **🚀 Getting Started**

Sigue estos pasos para levantar el entorno de desarrollo completo.

### **\#\#\# Prerrequisitos**

Asegúrate de tener instalado lo siguiente en tu sistema:

* [Node.js](https://nodejs.org/) (v18 o superior)  
* [pnpm](https://pnpm.io/installation) (gestor de paquetes)  
* [Docker](https://www.docker.com/products/docker-desktop/) y Docker Compose

### **\#\#\# Instalación**

1. **Clona el repositorio**:  
   git clone \<URL\_DE\_TU\_REPOSITORIO\>  
   cd \<NOMBRE\_DE\_TU\_PROYECTO\>

2. **Instala las dependencias**: Desde la raíz del proyecto, ejecuta el siguiente comando. pnpm leerá los workspaces y instalará todas las dependencias del monorepo.  
   pnpm install

## **🛠️ Corriendo el Entorno de Desarrollo**

1. **Levanta la infraestructura**: Antes de iniciar las aplicaciones, necesitas tener la base de datos y Redis en ejecución. Desde la raíz del proyecto, ejecuta:  
   docker-compose \-f infra/docker-compose.yml up \-d

2. **Inicia los servidores de desarrollo**: Este único comando iniciará el frontend de Next.js y el backend de Medusa al mismo tiempo.  
   pnpm dev

Una vez que el comando finalice, tendrás los siguientes servicios corriendo:

* **Tienda (Frontend)**: http://localhost:3000  
* **Panel de Administración (Backend)**: http://localhost:7001  
* **API del Backend (Medusa)**: http://localhost:9000

### **\#\#\# Crear un usuario administrador**

La primera vez que inicies el backend, necesitarás crear un usuario para poder acceder al panel de administración. Abre una **nueva terminal** y ejecuta:

pnpm \--filter admin exec medusa user \-e admin@medusajs.com \-p supersecret

## **📂 Estructura del Proyecto (Monorepo)**

Este proyecto utiliza un monorepo gestionado por pnpm workspaces para mantener el código del frontend y del backend en un solo lugar.

/  
|-- /apps  
|   |-- /admin           \# El backend de MedusaJS  
|   \`-- /storefront      \# La tienda con Next.js  
|  
|-- /infra  
|   \`-- docker-compose.yml \# Archivo de Docker para PostgreSQL y Redis  
|  
|-- package.json         \# Scripts y dependencias para la raíz del monorepo  
|-- pnpm-workspace.yaml  \# Define los workspaces  
\`-- README.md            \# Este archivo

## **📜 Scripts Disponibles**

Puedes ejecutar los siguientes scripts desde la raíz del proyecto:

* **pnpm dev**: Inicia ambos servidores (storefront y admin) en modo de desarrollo y en paralelo.  
* **pnpm build**: Construye ambos proyectos para producción.  
* **pnpm format**: Formatea todo el código del proyecto usando Prettier.
La primera vez que inicies el backend, necesitarás crear un usuario para poder acceder al panel de administración. Abre una nueva terminal y ejecuta:
pnpm --filter admin exec medusa user -e admin@medusajs.com -p supersecret


📂 Estructura del Proyecto (Monorepo)
Este proyecto utiliza un monorepo gestionado por pnpm workspaces para mantener el código del frontend y del backend en un solo lugar.
/
|-- /apps
|   |-- /admin           # El backend de MedusaJS
|   `-- /storefront      # La tienda con Next.js
|
|-- /infra
|   `-- docker-compose.yml # Archivo de Docker para PostgreSQL y Redis
|
|-- package.json         # Scripts y dependencias para la raíz del monorepo
|-- pnpm-workspace.yaml  # Define los workspaces
`-- README.md            # Este archivo


📜 Scripts Disponibles
Puedes ejecutar los siguientes scripts desde la raíz del proyecto:
pnpm dev: Inicia ambos servidores (storefront y admin) en modo de desarrollo y en paralelo.
pnpm build: Construye ambos proyectos para producción.
pnpm format: Formatea todo el código del proyecto usando Prettier.
