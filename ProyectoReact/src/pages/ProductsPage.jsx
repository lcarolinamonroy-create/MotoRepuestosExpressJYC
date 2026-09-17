import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import ProductFilters from "../components/ProductFilters";
import { useCart } from "../context/CartContext";
import { getProducts } from "../services/productService";

// Relaciona cada categoría con una imagen existente del proyecto.
const categoryImages = {
  aceite: "/IMG/aceite20w50.jpg",
  llanta: "/IMG/llanta9090.jpg",
  frenos: "/IMG/pastillas.jpg",
  transmision: "/IMG/kitarrastre.jpg",
  lubricantes: "/IMG/grasa.jpg",
  accesorios: "/IMG/casco.jpg"
};

export default function ProductsPage() {
  const [params] = useSearchParams();
  const category = params.get("categoria");

  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    searchText: "",
    selectedCategory: ""
  });
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const { addToCart } = useCart();

  useEffect(() => {
    async function loadProducts() {
      try {
        const apiProducts = await getProducts();

        const productsWithImages = apiProducts.map(product => ({
          ...product,
          imagen: categoryImages[product.categoria] || "/IMG/aceite.png"
        }));

        setProducts(productsWithImages);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    loadProducts();
  }, []);

  const activeCategory = filters.selectedCategory || category;

  const visibleProducts = products.filter(product => {
    const matchesCategory =
      !activeCategory || product.categoria === activeCategory;

    const matchesSearch = product.nombre
      .toLowerCase()
      .includes(filters.searchText.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  function handleAddToCart(product) {
    addToCart(product);
    alert(`${product.nombre} fue agregado al carrito.`);
  }

  if (isLoading) {
    return <main><p>Cargando productos...</p></main>;
  }

  if (errorMessage) {
    return <main><p>{errorMessage}</p></main>;
  }

  return (
    <main>
      <h1>
        Productos {activeCategory && `de ${activeCategory}`}
      </h1>

      <ProductFilters onFilter={setFilters} />

      <section className="productos">
        {visibleProducts.length > 0 ? (
          visibleProducts.map(product => (
            <ProductCard
              key={product.id}
              producto={product}
              onAdd={handleAddToCart}
            />
          ))
        ) : (
          <p>No se encontraron productos.</p>
        )}
      </section>
    </main>
  );
}
