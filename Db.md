quiero un sistema donde los usuarios puedan registarse con una nombre contraseña y email 
donde despues puedan iniciar seccion con el nombre y contraseña 
cada usuario va a tener un cartera distinto 
en el portfolio vamos a encontrar...


La parte del dinero:
El dinero actual del usuario...
El dinero q esta en transacciones del usuario...


PORTAFOLIO:


La parte de los movimientos financiores del usuario:
Accion q compro/vendio cuando la compro Precio de accione en el momento de compra y Si fue compra o venta
ejemplo: Compro Tesla $933 21/03/2025

Historial-de-movimientos:
Tipo : Si el usuario compro o vendio
Simbolo : Simbolo de la accion comprado o vendida
Costo : Costo total de la transaccion del usario
Fecha:Fecha del momento de la transaccion




Acciones del usuario:
En esta parte vamos a guardar las dintintas acciones q tiene en este momento el usuario
Esto se guarda junto a su cantidad y rentabilidad de ese momento
Tambien se guarda el saldo del usuario q esta involucrado en esta accion 






📊 Ejemplo de Cálculo de Rendimiento en Portafolio
Para reflejar correctamente el rendimiento de las inversiones de un usuario, el sistema utiliza dos tablas:

🗃️ 1. Tabla compras – Registro histórico de cada compra
Esta tabla almacena todas las compras individuales que hizo el usuario, incluso si son del mismo símbolo pero en diferentes momentos y precios.

| id | usuario\_id | símbolo | cantidad | precio\_unitario | fecha\_compra |
| -- | ----------- | ------- | -------- | ---------------- | ------------- |
| 1  | 5           | AAPL    | 1        | \$100            | 2025-07-01    |
| 2  | 5           | AAPL    | 2        | \$150            | 2025-07-02    |

🧮 2. Tabla resumen_portafolio – Resumen general por acción
A partir de los registros de compras y el precio actual, se genera un resumen con los siguientes cálculos:

| símbolo | cantidad\_total | monto\_invertido | monto\_rendimiento | rendimiento\_porcentaje |
| ------- | --------------- | ---------------- | ------------------ | ----------------------- |
| AAPL    | 3               | \$400            | \$850              | 212.5%                  |

