import  '../../styles/components/CardMovimientos.css'
import { useCardAnimation } from '../../hooks/hooksAnimations/useCardAnimation'
function CardMovimientos({title, movimientos = [] }) {
   const cardRef  = useCardAnimation('up',0.1)

return(
            <div className="card-movimientos" ref={cardRef}>
                <h2>{title}</h2>
                <div className="card-movimientos__container">
                    {movimientos.length === 0 ? (
                        <p className="card-movimientos__vacio">No hay movimientos aún.</p>
                    ) : (
                    movimientos.map((movimiento) => (
                        <div key={movimiento.id} className="card-movimientos__item">
                            <p className="card-movimientos__item__tipo">{movimiento.tipo}</p>
                            <p className="card-movimientos__item__simbolo">{movimiento.accion}</p>
                            <p className="card-movimientos__item__cantidad">{movimiento.cantidad}</p>
                            <p className="card-movimientos__item__precio_unitario">{movimiento.precio_unitario}</p>
                            <p className="card-movimientos__item__fecha_hora">{movimiento.fecha_hora}</p>
                        </div>
                    )))}
                </div>
            </div>
        )
}
export default CardMovimientos;

