import ProductCard from "../components/ProductCard";
import {productos} from "../data";
import {useCart} from "../context/CartContext";

export default function PromotionsPage(){
  const promotions = productos.filter(product => [1, 3, 5].includes(product.id));
  const {addToCart} = useCart();

  function handleAddPromotion(product) {
    addToCart(product);
    alert(`${product.nombre} fue agregado al carrito.`);
  }

  return <main><h1>Promociones</h1><section className="productos">
    {promotions.map(product => {
      const discountedProduct = {...product, precio: product.precio * 0.85};
      return <ProductCard key={product.id} producto={discountedProduct} onAdd={handleAddPromotion} />;
    })}
  </section></main>;
}
