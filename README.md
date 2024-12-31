# Backend for Product and Payment Management System

Este proyecto constituye el backend del sistema de gestión de productos y pagos. Ha sido desarrollado con **NestJS**, utilizando **TypeScript**, y siguiendo principios de desarrollo modular y escalable. El backend maneja funcionalidades clave como la gestión de productos, clientes, transacciones y envíos.

## Tecnologías Principales

- [NestJS](https://nestjs.com/) - Framework progresivo para aplicaciones de servidor.
- [TypeScript](https://www.typescriptlang.org/) - Superconjunto tipado de JavaScript.
- [Axios](https://axios-http.com/) - Cliente HTTP para integraciones con APIs externas.
- [Wompi API](https://docs.wompi.co/) - Pasarela de pagos para la gestión de transacciones.

## Estructura del Proyecto

El proyecto sigue la estructura modular de NestJS:

```
backend/
├── src/
│   ├── customers/                # Módulo para la gestión de clientes
│   ├── deliveries/               # Módulo para la gestión de envíos
│   ├── products/                 # Módulo para la gestión de productos
│   ├── transactions/             # Módulo para la gestión de transacciones
│   ├── wompi_apis/               # Módulo para integraciones con Wompi
│   ├── entities/                 # Entidades compartidas entre los módulos
│   ├── app.module.ts             # Módulo principal
│   └── main.ts                   # Punto de entrada de la aplicación
```

### Descripción de Módulos

#### Customers
Gestiona la creación y consulta de clientes.

- **Archivo clave**: `customers.controller.ts`
- **Endpoint**: `/customers`

#### Deliveries
Gestiona los envíos vinculados a transacciones aprobadas.

- **Archivo clave**: `deliveries.controller.ts`
- **Endpoint**: `/deliveries`

#### Products
Gestiona la creación y consulta de productos.

- **Archivo clave**: `products.controller.ts`
- **Endpoint**: `/products`

#### Transactions
Maneja la lógica de creación y consulta de transacciones con Wompi.

- **Archivo clave**: `transactions.controller.ts`
- **Endpoint**: `/transactions`

#### Wompi APIs
Integra la pasarela de pagos Wompi para la tokenización de tarjetas y creación de transacciones.

- **Archivo clave**: `wompi_service.controller.ts`
- **Endpoint**: `/wompi`

## Instalación

1. Clona el repositorio:

   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd backend
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Configura las variables de entorno creando un archivo `.env` en la raíz del proyecto. Un ejemplo:

   ```env
   DATABASE_URL=postgresql://user:password@localhost:5432/db_name
   WOMPI_API_KEY=your_wompi_api_key
   ```

4. Ejecuta las migraciones de base de datos si aplica:

   ```bash
   npm run migrate
   ```

5. Inicia el servidor:

   ```bash
   npm run start:dev
   ```

   El backend estará disponible en `http://localhost:3000`.

## Scripts Disponibles

- `npm run start`: Inicia el servidor en modo producción.
- `npm run start:dev`: Inicia el servidor en modo desarrollo.
- `npm run test`: Ejecuta pruebas unitarias.
- `npm run test:e2e`: Ejecuta pruebas de integración.
- `npm run lint`: Ejecuta ESLint para analizar el código.

## Endpoints Principales

### Productos
- `GET /products`: Obtiene la lista de productos.
- `POST /products`: Crea un nuevo producto.

### Transacciones
- `POST /transactions`: Crea una nueva transacción.
- `GET /transactions/:id`: Consulta el detalle de una transacción.

### Wompi
- `POST /wompi/tokenize-card`: Tokeniza una tarjeta de crédito.
- `POST /wompi/create-transaction`: Crea una transacción en Wompi.

## Pruebas

Ejecuta las pruebas unitarias y de integración para asegurar la calidad del código:

```bash
# Pruebas unitarias
npm run test

# Pruebas de integración
npm run test:e2e
```

## Mejoras Futuras

- Integrar autenticación y autorización.
- Optimizar la gestión de errores para respuestas más consistentes.
- Agregar soporte para múltiples pasarelas de pago.

## Licencia

Este proyecto está bajo la licencia **MIT**.

