import {useState} from "react";
import {Link} from "react-router-dom";

export default function ForgotPasswordPage(){
  const [email, setEmail] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    alert(`Solicitud de recuperación enviada para ${email}.`);
  }

  return <main className="auth-page"><section className="auth-card recovery-card">
    <img className="auth-logo" src="/IMG/jyclogo.png" alt="Moto Repuestos Express JYC" />
    <h1>Recuperar contraseña</h1><p>Ingresa tu correo electrónico para restablecer tu contraseña</p>
    <form className="form" onSubmit={handleSubmit}>
      <label>Correo electrónico<input type="email" placeholder="tu@email.com" value={email} onChange={event => setEmail(event.target.value)} required /></label>
      <button type="submit">Enviar enlace de recuperación</button>
      <Link className="secondary-button" to="/login">Volver al inicio de sesión</Link>
    </form>
  </section></main>;
}
