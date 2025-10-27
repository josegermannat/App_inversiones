# 📊 Sistema de Inversiones - Documentación de Base de Datos

## 🎯 Descripción del Sistema

Sistema de gestión de portafolio de inversiones que permite a los usuarios:
- Registrarse e iniciar sesión con nombre, email y contraseña
- Gestionar su cartera de inversiones personal
- Realizar compras y ventas de acciones
- Visualizar cotizaciones en tiempo real
- Hacer seguimiento de rendimientos y movimientos
- Gestionar saldo de dinero disponible

## 🗄️ Estructura de Base de Datos

### 📋 Tabla: `usuarios`
Almacena la información básica de los usuarios registrados.

| Campo | Tipo | Restricciones | Descripción |
|-------|------|---------------|-------------|
| `id` | INT | PRIMARY KEY, AUTO_INCREMENT | Identificador único del usuario |
| `nombre` | VARCHAR(100) | NOT NULL | Nombre completo del usuario |
| `email` | VARCHAR(255) | NOT NULL, UNIQUE | Email único del usuario |
| `password` | VARCHAR(255) | NOT NULL | Contraseña |


### 💰 Tabla: `saldos_usuarios`
Gestiona el dinero disponible de cada usuario.

| Campo | Tipo | Restricciones | Descripción |
|-------|------|---------------|-------------|
| `id` | INT | PRIMARY KEY, AUTO_INCREMENT | Identificador único |
| `usuario_id` | INT | FOREIGN KEY, NOT NULL | Referencia al usuario |
| `saldo_disponible` | DECIMAL(15,2) | DEFAULT 0.00 | Dinero disponible para invertir |
| `saldo_invertido` | DECIMAL(15,2) | DEFAULT 0.00 | Dinero actualmente en acciones |
| `saldo_total` | DECIMAL(15,2) | DEFAULT 0.00 | Saldo total (disponible + invertido) |


### 🛒 Tabla: `transacciones`
Registro histórico de todas las compras y ventas.

| Campo | Tipo | Restricciones | Descripción |
|-------|------|---------------|-------------|
| `id` | INT | PRIMARY KEY, AUTO_INCREMENT | Identificador único |
| `usuario_id` | INT | FOREIGN KEY, NOT NULL | Usuario que realiza la transacción |
| `accion` | INT | FOREIGN KEY, NOT NULL | Acción involucrada |
| `tipo` | ENUM('compra', 'venta') | NOT NULL | Tipo de transacción |
| `cantidad` | INT | NOT NULL | Cantidad de acciones |
| `precio_unitario` | DECIMAL(10,4) | NOT NULL | Precio por acción en el momento |


### 📊 Tabla: `portafolio_usuarios`
Resumen actual de las acciones que posee cada usuario.

| Campo | Tipo | Restricciones | Descripción |
|-------|------|---------------|-------------|
| `id` | INT | PRIMARY KEY, AUTO_INCREMENT | Identificador único |
| `usuario_id` | INT | FOREIGN KEY, NOT NULL | Usuario propietario |
| `acciones` | INT | FOREIGN KEY, NOT NULL | Acción  |
| `cantidad_total` | INT | DEFAULT 0 | Cantidad total de acciones |
| `precio_promedio` | DECIMAL(10,4) | DEFAULT 0.00 | Precio promedio de compra |
| `monto_invertido` | DECIMAL(15,2) | DEFAULT 0.00 | Total invertido en esta acción |
| `valor_actual` | DECIMAL(15,2) | DEFAULT 0.00 | Valor actual de la posición |
| `rendimiento_porcentaje` | DECIMAL(8,2) | DEFAULT 0.00 | Rendimiento porcentual |
| `rendimiento_dinero` | DECIMAL(15,2) | DEFAULT 0.00 | Rendimiento en dinero |


### 💸 Tabla: `movimientos_dinero`
Registro de ingresos y retiros de dinero.

| Campo | Tipo | Restricciones | Descripción |
|-------|------|---------------|-------------|
| `id` | INT | PRIMARY KEY, AUTO_INCREMENT | Identificador único |
| `usuario_id` | INT | FOREIGN KEY, NOT NULL | Usuario que realiza el movimiento |
| `tipo` | ENUM('ingreso', 'retiro') | NOT NULL | Tipo de movimiento |
| `monto` | DECIMAL(15,2) | NOT NULL | Cantidad de dinero |
| `saldo_anterior` | DECIMAL(15,2) | NOT NULL | Saldo antes del movimiento |
| `saldo_nuevo` | DECIMAL(15,2) | NOT NULL | Saldo después del movimiento |
| `descripcion` | VARCHAR(255) | NULL | Descripción opcional |
| `fecha_hora` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Momento del movimiento |

### 📊 Tabla: `rendimientos_diarios`
Seguimiento diario del rendimiento del portafolio.

| Campo | Tipo | Restricciones | Descripción |
|-------|------|---------------|-------------|
| `id` | INT | PRIMARY KEY, AUTO_INCREMENT | Identificador único |
| `usuario_id` | INT | FOREIGN KEY, NOT NULL | Usuario |
| `valor_inicial` | DECIMAL(15,2) | NOT NULL | Valor del portafolio al inicio |
| `valor_final` | DECIMAL(15,2) | NOT NULL | Valor del portafolio al final |
| `rendimiento_diario` | DECIMAL(8,2) | NOT NULL | Rendimiento porcentual del día |
| `rendimiento_acumulado` | DECIMAL(8,2) | NOT NULL | Rendimiento acumulado |

## 🔗 Relaciones entre Tablas

```
usuarios (1) ←→ (1) saldos_usuarios
usuarios (1) ←→ (N) transacciones
usuarios (1) ←→ (N) portafolio_usuarios
usuarios (1) ←→ (N) movimientos_dinero
usuarios (1) ←→ (N) rendimientos_diarios

```

## 🎯 Funcionalidades Soportadas

### ✅ Implementadas Actualmente
- **Autenticación**: Registro e inicio de sesión de usuarios
- **Gestión de Saldo**: Ingreso y retiro de dinero
- **Cotizaciones**: Visualización de precios de acciones
- **Dashboard**: Vista general del portafolio
- **Movimientos**: Historial de transacciones

### 🚧 En Desarrollo
- **Compra/Venta**: Sistema de trading de acciones
- **Cálculo de Rendimientos**: Automatización de cálculos
- **Notificaciones**: Alertas de precios y movimientos
- **Gráficos**: Visualización de tendencias

### 🔮 Funcionalidades Futuras
- **Stop Loss/Take Profit**: Órdenes automáticas
- **Diversificación**: Análisis de distribución del portafolio
- **Reportes**: Generación de reportes financieros
- **API Externa**: Integración con brokers reales
- **Múltiples Monedas**: Soporte para diferentes divisas
- **Fondos Mutuos**: Inversión en fondos indexados

## 📊 Ejemplo de Cálculo de Rendimiento

### Escenario: Usuario compra AAPL en diferentes momentos

**Tabla `transacciones`:**
| id | usuario_id | accion_id | tipo   | cantidad | precio_unitario | monto_total | fecha_hora |
|----|------------|-----------|--------|----------|-----------------|-------------|------------|
| 1  | 5          | 1         | compra | 10       | $150.00         | $1,500.00   | 2025-01-15 |
| 2  | 5          | 1         | compra | 5        | $160.00         | $800.00     | 2025-01-20 |

**Tabla `portafolio_usuarios`:**
| usuario_id | accion_id | cantidad_total |  monto_invertido| valor_actual  | rendimiento_porcentaje |
|------------|-----------|----------------|-----------------|---------------|------------------------|---------------|
| 5          | 1         | 15             |   $2,300.00     | $2,700.00     |      17.39%            |

**Cálculo:**
- Cantidad total: 10 + 5 = 15 acciones
- monto invertido: ($1500 + $800) = $2300
- Valor actual:  (cantidad de acciones) × (precio actual) = $2,700
- Rendimiento: (($2,700 - $2,300) ÷ $2,300) × 100 = 17.39%

## 🔧 Consideraciones Técnicas

### Índices Recomendados
```sql
-- Para optimizar consultas frecuentes
CREATE INDEX idx_usuarios_email ON usuarios(email);
CREATE INDEX idx_transacciones_usuario_fecha ON transacciones(usuario_id, fecha_hora);
CREATE INDEX idx_cotizaciones_accion_fecha ON cotizaciones(accion_id, fecha_hora);
CREATE INDEX idx_portafolio_usuario ON portafolio_usuarios(usuario_id);
```

### Triggers Necesarios
- Actualización automática de `saldos_usuarios` al realizar transacciones
- Cálculo automático de rendimientos en `portafolio_usuarios`

### Seguridad
- Encriptación de contraseñas con bcrypt
- Validación de datos en frontend y backend
- Sanitización de inputs para prevenir SQL injection
- Autenticación con JWT tokens

Esta estructura de base de datos está diseñada para escalar con el crecimiento del sistema y soportar todas las funcionalidades actuales y futuras de la aplicación de inversiones.

