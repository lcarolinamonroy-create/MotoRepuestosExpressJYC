import {productos} from "../data";

export default function AdminPage(){
  return <main className="admin-page">
    <h1>Administración de inventario</h1>
    <p>Vista inicial para el usuario administrador. La conexión en tiempo real se agregará con la API.</p>
    <div className="admin-table-wrapper">
      <table className="admin-table">
        <thead>
          <tr><th>Producto</th><th>Categoría</th><th>Precio</th><th>Estado</th></tr>
        </thead>
        <tbody>
          {productos.map(product => <tr key={product.id}>
            <td>{product.nombre}</td>
            <td>{product.categoria}</td>
            <td>${product.precio.toLocaleString("es-CO")}</td>
            <td className="stock-ok">Disponible</td>
          </tr>)}
        </tbody>
      </table>
    </div>
  </main>;
}
