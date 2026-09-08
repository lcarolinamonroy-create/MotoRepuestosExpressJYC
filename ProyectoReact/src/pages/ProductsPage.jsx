import {useState} from "react";
import {useSearchParams} from "react-router-dom";
import {productos} from "../data";
import ProductCard from "../components/ProductCard";
import {useCart} from "../context/CartContext";
import ProductFilters from "../components/ProductFilters";

export default function ProductsPage(){
  const [params] = useSearchParams();
  // La categoría llega desde los enlaces del inicio, por ejemplo ?categoria=llanta.
  const category = params.get("categoria");
  const [filters, setFilters] = useState({searchText: "", selectedCategory: ""});
  const activeCategory = filters.selectedCategory || category;
  const visibleProducts = productos.filter(product => {
    const matchesCategory = !activeCategory || product.categoria === activeCategory;
    const matchesSearch = product.nombre.toLowerCase().includes(filters.searchText.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  const {addToCart} = useCart();

  function handleAddToCart(product) {
    addToCart(product);
    alert(`${product.nombre} fue agregado al carrito.`);
  }

  return <main>
    <h1>Productos {activeCategory && `de ${activeCategory}`}</h1>
    <ProductFilters onFilter={setFilters} />
    <section className="productos">
      {visibleProducts.length > 0
        ? visibleProducts.map(product => <ProductCard key={product.id} producto={product} onAdd={handleAddToCart} />)
        : <p>No se encontraron productos con esos criterios.</p>}
    </section>
  </main>;
}
