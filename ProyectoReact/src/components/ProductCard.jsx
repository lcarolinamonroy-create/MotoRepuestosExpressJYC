export default function ProductCard({producto,onAdd}){
  return <article className="producto">
    <img src={producto.imagen} alt={producto.nombre}/>
    <h3>{producto.nombre}</h3>
    <p>$ {producto.precio.toLocaleString("es-CO")}</p>
    <button onClick={() => onAdd(producto)}>Agregar al carrito</button>
  </article>;
}
