const API_URL = "http://localhost:8080/api/usuarios";

export async function registerUser(user) {
  const response = await fetch(`${API_URL}/registro`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "No fue posible registrar el usuario.");
  return data;
}

export async function loginUser(credentials) {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials)
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "No fue posible iniciar sesión.");
  return data;
}
