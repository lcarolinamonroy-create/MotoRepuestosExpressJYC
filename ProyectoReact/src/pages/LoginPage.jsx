import {useState} from "react";
import {Link} from "react-router-dom";
import { loginUser } from "../services/authService";

export default function LoginPage(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");
    setErrorMessage("");

    try {
      setIsSubmitting(true);
      const data = await loginUser({ correo: email, contrasena: password });
      setMessage(`${data.mensaje}, ${data.nombre}.`);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return <main className="auth-page"><section className="auth-card">
    <img className="auth-logo" src="/IMG/jyclogo.png" alt="Moto Repuestos Express JYC" />
    <h1>Bienvenido</h1><p>Ingresa a tu cuenta</p>
    {message && <p className="success-message">{message}</p>}
    {errorMessage && <p className="error-message">{errorMessage}</p>}
    <form onSubmit={handleSubmit} className="form">
      <label>Correo electrónico<input type="email" placeholder="tu@email.com" value={email} onChange={event => setEmail(event.target.value)} required /></label>
      <label>Contraseña<input type="password" placeholder="********" value={password} onChange={event => setPassword(event.target.value)} required /></label>
      <div className="login-options"><label className="checkbox-label"><input type="checkbox" /> Recordarme</label><Link to="/recuperar">¿Olvidaste tu contraseña?</Link></div>
      <button type="submit" disabled={isSubmitting}>{isSubmitting ? "Validando..." : "Iniciar sesión"}</button>
      <Link className="secondary-button" to="/registro">Registrar nueva cuenta</Link>
    </form>
    <small>© 2026 MotoRepuestos Express – JYC</small>
  </section></main>;
}
