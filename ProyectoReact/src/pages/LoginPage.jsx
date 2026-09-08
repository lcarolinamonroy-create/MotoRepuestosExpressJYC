import {useState} from "react";
import {Link} from "react-router-dom";

export default function LoginPage(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    alert(`Inicio de sesión de demostración para ${email}.`);
  }

  return <main className="auth-page"><section className="auth-card">
    <img className="auth-logo" src="/IMG/jyclogo.png" alt="Moto Repuestos Express JYC" />
    <h1>Bienvenido</h1><p>Ingresa a tu cuenta</p>
    <form onSubmit={handleSubmit} className="form">
      <label>Correo electrónico<input type="email" placeholder="tu@email.com" value={email} onChange={event => setEmail(event.target.value)} required /></label>
      <label>Contraseña<input type="password" placeholder="********" value={password} onChange={event => setPassword(event.target.value)} required /></label>
      <div className="login-options"><label className="checkbox-label"><input type="checkbox" /> Recordarme</label><Link to="/recuperar">¿Olvidaste tu contraseña?</Link></div>
      <button type="submit">Iniciar sesión</button>
      <Link className="secondary-button" to="/registro">Registrar nueva cuenta</Link>
    </form>
    <small>© 2026 MotoRepuestos Express – JYC</small>
  </section></main>;
}
