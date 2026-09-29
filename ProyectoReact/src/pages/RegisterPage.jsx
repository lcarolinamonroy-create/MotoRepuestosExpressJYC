import {useState} from "react";
import { registerUser } from "../services/authService";

export default function RegisterPage(){
  const [form, setForm] = useState({
    name:"", lastName:"", documentType:"CC", documentNumber:"", phone:"",
    email:"", username:"", password:"", confirmPassword:"", acceptsTerms:false
  });
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event) {
    const newValue = event.target.type === "checkbox" ? event.target.checked : event.target.value;
    setForm({...form, [event.target.name]: newValue});
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");
    setErrorMessage("");
    if (form.password !== form.confirmPassword) {
      setErrorMessage("Las contraseñas no coinciden.");
      return;
    }

    try {
      setIsSubmitting(true);
      await registerUser({
        nombre: form.name,
        apellido: form.lastName,
        tipoDocumento: form.documentType,
        numeroDocumento: form.documentNumber,
        telefono: form.phone,
        correo: form.email,
        nombreUsuario: form.username,
        contrasena: form.password
      });
      setMessage("Cuenta creada correctamente. Ya puedes iniciar sesión.");
      setForm({ ...form, password: "", confirmPassword: "" });
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return <main className="auth-page"><section className="auth-card register-card">
    <img className="auth-logo" src="/IMG/jyclogo.png" alt="Moto Repuestos Express JYC" />
    <h1>Registro</h1><p>Crea tu cuenta en Moto Repuestos Express JYC</p>
    {message && <p className="success-message">{message}</p>}
    {errorMessage && <p className="error-message">{errorMessage}</p>}
    <form className="form" onSubmit={handleSubmit}>
      <label>* Nombre<input name="name" value={form.name} onChange={handleChange} required /></label>
      <label>* Apellido<input name="lastName" value={form.lastName} onChange={handleChange} required /></label>
      <label>Tipo de documento<select name="documentType" value={form.documentType} onChange={handleChange}>
        <option value="CC">Cédula de Ciudadanía</option><option value="CE">Cédula de Extranjería</option><option value="TI">Tarjeta de Identidad</option>
      </select></label>
      <label>Número de documento<input name="documentNumber" value={form.documentNumber} onChange={handleChange} required /></label>
      <label>Teléfono<input name="phone" type="tel" value={form.phone} onChange={handleChange} /></label>
      <label>* Correo electrónico<input name="email" type="email" value={form.email} onChange={handleChange} required /></label>
      <label>* Nombre de usuario<input name="username" value={form.username} onChange={handleChange} required /></label>
      <label>* Contraseña<input name="password" type="password" value={form.password} onChange={handleChange} required /></label>
      <label>* Confirmar contraseña<input name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} required /></label>
      <label className="checkbox-label"><input name="acceptsTerms" type="checkbox" checked={form.acceptsTerms} onChange={handleChange} required /> Acepto los términos y condiciones.</label>
      <button type="submit" disabled={isSubmitting}>{isSubmitting ? "Registrando..." : "Registrarme"}</button>
    </form>
  </section></main>;
}
