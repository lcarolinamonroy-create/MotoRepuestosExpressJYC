import { useEffect, useState } from "react";
import {
  deleteProduct,
  getProducts,
  updateProduct
} from "../services/productService";

const emptyForm = {
  nombre: "",
  categoria: "",
  precio: "",
  stock: ""
};

export default function AdminPage() {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function loadProducts() {
    try {
      setErrorMessage("");
      setProducts(await getProducts());
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  function startEditing(product) {
    setEditingId(product.id);
    setFormData({
      nombre: product.nombre,
      categoria: product.categoria,
      precio: product.precio,
      stock: product.stock
    });
    setMessage("");
    setErrorMessage("");
  }

  function cancelEditing() {
    setEditingId(null);
    setFormData(emptyForm);
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData(current => ({ ...current, [name]: value }));
  }

  async function saveProduct(event) {
    event.preventDefault();

    try {
      const updatedProduct = await updateProduct(editingId, {
        nombre: formData.nombre,
        categoria: formData.categoria,
        precio: Number(formData.precio),
        stock: Number(formData.stock)
      });

      setProducts(current => current.map(product =>
        product.id === editingId ? updatedProduct : product
      ));
      setMessage("Producto actualizado correctamente.");
      cancelEditing();
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  async function removeProduct(id) {
    if (!window.confirm("¿Deseas eliminar este producto?")) {
      return;
    }

    try {
      await deleteProduct(id);
      setProducts(current => current.filter(product => product.id !== id));
      setMessage("Producto eliminado correctamente.");
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  return (
    <main className="admin-page">
      <h1>Administración de inventario</h1>
      <p>Esta vista consulta y administra los productos almacenados en MySQL.</p>

      {message && <p role="status">{message}</p>}
      {errorMessage && <p role="alert">{errorMessage}</p>}

      {editingId && (
        <form className="form" onSubmit={saveProduct}>
          <h2>Editar producto</h2>
          <label>
            Nombre
            <input name="nombre" value={formData.nombre} onChange={handleChange} required />
          </label>
          <label>
            Categoría
            <input name="categoria" value={formData.categoria} onChange={handleChange} required />
          </label>
          <label>
            Precio
            <input name="precio" type="number" min="0.01" step="0.01" value={formData.precio} onChange={handleChange} required />
          </label>
          <label>
            Stock
            <input name="stock" type="number" min="0" value={formData.stock} onChange={handleChange} required />
          </label>
          <div>
            <button type="submit">Guardar cambios</button>
            <button type="button" onClick={cancelEditing}>Cancelar</button>
          </div>
        </form>
      )}

      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td>{product.nombre}</td>
                <td>{product.categoria}</td>
                <td>$ {product.precio.toLocaleString("es-CO")}</td>
                <td>{product.stock}</td>
                <td>
                  <button type="button" onClick={() => startEditing(product)}>Editar</button>{" "}
                  <button type="button" onClick={() => removeProduct(product.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
