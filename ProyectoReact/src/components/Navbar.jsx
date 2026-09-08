import {Link} from "react-router-dom";
import {useCart} from "../context/CartContext";
import {WhatsAppIcon, FacebookIcon, InstagramIcon} from "./SocialIcons";
export default function Navbar(){
  const {cartCount} = useCart();
  return <header className="top-header"><section className="top-banner">
    <Link to="/" className="logo"><img src="/IMG/jyclogo.png" alt="Logo JYC"/><span>Moto Repuestos Express JYC</span></Link>
    <div className="search-box"><input placeholder="Buscar productos..."/><button>⌕</button></div>
    <div className="city-select"><label>Ciudad:</label><select defaultValue="Bello"><option>Bello</option><option>Medellín</option><option>Bogotá</option><option>Cali</option></select></div>
    <div className="header-actions"><Link to="/carrito" aria-label="Ver carrito">🛒<span className="cart-count">{cartCount}</span></Link><Link to="/login" aria-label="Iniciar sesión">👤</Link><a href="https://wa.me/3117149312" target="_blank" rel="noreferrer" aria-label="WhatsApp"><WhatsAppIcon /></a><a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook"><FacebookIcon /></a><a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><InstagramIcon /></a></div>
  </section><nav className="menu-categorias"><ul><li><Link to="/productos?categoria=aceite">Aceite</Link></li><li><Link to="/productos?categoria=llanta">Llantas</Link></li><li><Link to="/productos?categoria=frenos">Frenos</Link></li><li><Link to="/productos?categoria=transmision">Transmisión</Link></li><li><Link to="/productos?categoria=lubricantes">Lubricantes</Link></li><li><Link to="/productos?categoria=accesorios">Accesorios</Link></li><li><Link to="/promociones" className="promo-link">🏷 Promociones</Link></li><li><Link to="/admin">Administración</Link></li></ul></nav></header>;
}
