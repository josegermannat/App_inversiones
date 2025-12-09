# 📈 Simulador de Inversiones

Una aplicación web fullstack que permite simular operaciones en el mercado de valores con datos en tiempo real de acciones estadounidenses.


## 🌟 Características Principales

### 👤 Sistema de Autenticación
- Registro e inicio de sesión seguro con email y contraseña
- Persistencia de sesión entre visitas

### 💰 Gestión de Cartera Personal
- Visualización en tiempo real de saldo disponible e invertido
- Depósitos y retiros de fondos
- Dashboard interactivo con métricas de rendimiento
- Gráficos de distribución de inversiones por acción
- Cálculo automático de ganancias/pérdidas

### 📊 Mercado en Tiempo Real
- Cotizaciones actualizadas de acciones del mercado estadounidense
- Información de variaciones diarias y precios históricos
- Filtros por rendimiento (acciones en alza/baja)
- Búsqueda y exploración de activos

### 💱 Sistema de Trading
- Compra y venta de acciones con precios reales
- Validación automática de fondos disponibles
- Registro completo de todas las transacciones
- Historial detallado de operaciones

## 🛠️ Stack Tecnológico

### Frontend
- **React 18**
- **Vite** - Build tool y dev server
- **React Router DOM** - Navegación SPA
- **Context API** - Gestión de estado global
- **Recharts** - Visualización de datos
- **CSS Modules** - Estilos encapsulados
- **GSAP** - Animaciones 
- **Shadcn** - Biblitoeca de Componentes

### Backend
- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **PostgreSQL** - Base de datos relacional
- **TwelveData API** - Datos del mercado en tiempo real

## 📁 Estructura del Proyecto

```
simulador-inversiones/
│
├── client/                    # Aplicación Frontend
│   ├── public/               # Archivos estáticos
│   ├── src/
│   │   ├── components/       # Componentes reutilizables
│   │   ├── context/          # Contextos de React
│   │   ├── hooks/            # Custom hooks
│   │   ├── pages/            # Páginas/vistas principales
│   │   ├── styles/           # Archivos CSS
│   │   ├── App.jsx           # Componente raíz
│   │   └── main.jsx          # Punto de entrada
│   ├── package.json
│   └── vite.config.js
│
└── server/                    # Aplicación Backend
    ├── src/
    │   ├── config/           # Configuración (DB, env)
    │   ├── controllers/      # Lógica de negocio
    │   ├── models/           # Modelos de datos
    │   ├── routes/           # Definición de rutas API
    │   ├── services/         # Servicios externos
    │   ├── middleware/       # Middlewares personalizados
    │   └── server.js         # Punto de entrada
    ├── package.json
    └── .env.example
```

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js (v16 o superior)
- PostgreSQL (v12 o superior)
- Cuenta en [TwelveData](https://twelvedata.com/) para obtener API key

### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/simulador-inversiones.git
cd simulador-inversiones
```

### 2. Configurar Backend

```bash
cd server
npm install
```

Crear archivo `.env` en la carpeta `server/`:
```env
PORT=3000
DATABASE_URL=postgresql://usuario:password@localhost:5432/simulador_inversiones
TWELVE_DATA_API_KEY=tu_api_key_aqui
NODE_ENV=development
```

### 3. Configurar Base de Datos

```bash
# Crear la base de datos
createdb simulador_inversiones
```

### 4. Configurar Frontend

```bash
cd ../client
npm install
```

### 5. Iniciar la aplicación

```bash
# Terminal 1 - Backend (puerto 3000)
cd server
npm run dev

# Terminal 2 - Frontend (puerto 5173)
cd client
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## 📱 Páginas y Rutas

| Ruta | Descripción | Requiere Auth |
|------|-------------|---------------|
| `/` | Página de inicio con resumen general | No |
| `/login` | Inicio de sesión | No |
| `/register` | Registro de nuevo usuario | No |
| `/home` | Dashboard principal del usuario | Sí |
| `/cotizaciones` | Explorador de acciones disponibles | Sí |
| `/cartera` | Vista detallada de cartera personal | Sí |
| `/movimientos` | Historial de transacciones | Sí |

## 🔌 API Endpoints

### Usuarios
- `POST /usuarios/registro` - Registrar nuevo usuario
- `POST /usuarios/login` - Iniciar sesión
- `GET /usuarios/verificar` - Verificar token

### Saldos
- `GET /saldos/:usuario_id` - Obtener saldo del usuario
- `POST /saldos/ingresar` - Depositar dinero
- `POST /saldos/retirar` - Retirar dinero
- `POST /saldos/invertir` - Invertir dinero
- `POST /saldos/desinvertir` - Desinvertir dinero

### Transacciones
- `POST /transacciones` - Registrar nueva transacción (compra/venta)
- `GET /transacciones/:usuario_id` - Obtener todas las transacciones del usuario
- `GET /transacciones/:usuario_id/accion/:simbolo` - Obtener transacciones por acción específica

### Portafolio
- `POST /portafolio/obtener` - Obtener portafolio completo
- `POST /portafolio/obtener-accion` - Obtener detalle de una acción específica
- `PUT /portafolio/actualizar-valores` - Actualizar valores actuales

### Cotizaciones
- `GET /api/cotizaciones` - Obtener cotizaciones del mercado

## 🗄️ Esquema de Base de Datos

`````sql
-- Tabla de usuarios
usuarios (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
)

-- Tabla de saldos
saldos_usuarios (
  id SERIAL PRIMARY KEY,
  usuario_id INTEGER REFERENCES usuarios(id),
  saldo_disponible DECIMAL(15,2) DEFAULT 0.00,
  saldo_invertido DECIMAL(15,2) DEFAULT 0.00,
  saldo_total DECIMAL(15,2) DEFAULT 0.00
)

-- Tabla de transacciones
transacciones (
  id SERIAL PRIMARY KEY,
  usuario_id INTEGER REFERENCES usuarios(id),
  accion INTEGER NOT NULL,
  tipo ENUM('compra', 'venta') NOT NULL,
  cantidad INTEGER NOT NULL,
  precio_unitario DECIMAL(10,4) NOT NULL
)

-- Tabla de portafolio
portafolio_usuarios (
  id SERIAL PRIMARY KEY,
  usuario_id INTEGER REFERENCES usuarios(id),
  acciones INTEGER NOT NULL,
  cantidad_total INTEGER DEFAULT 0,
  precio_promedio DECIMAL(10,4) DEFAULT 0.00,
  monto_invertido DECIMAL(15,2) DEFAULT 0.00,
  valor_actual DECIMAL(15,2) DEFAULT 0.00,
  rendimiento_porcentaje DECIMAL(8,2) DEFAULT 0.00,
  rendimiento_dinero DECIMAL(15,2) DEFAULT 0.00
)

```

