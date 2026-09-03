// Autenticación local únicamente para demostración front-end.
// Un proyecto real debe validar usuarios en un servidor y nunca guardar claves sin protección.
const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

const registro = document.getElementById('form-registro');
if (registro) {
  registro.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const datos = Object.fromEntries(new FormData(registro));
    if (usuarios.some((usuario) => usuario.correo === datos.correo)) {
      alert('Ya existe una cuenta con ese correo.');
      return;
    }
    usuarios.push(datos);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    alert('Cuenta creada correctamente.');
    window.location.href = 'login.html';
  });
}

const login = document.getElementById('form-login');
if (login) {
  login.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const datos = Object.fromEntries(new FormData(login));
    const encontrado = usuarios.find((usuario) => usuario.correo === datos.correo && usuario.clave === datos.clave);
    if (!encontrado) {
      alert('Correo o contraseña incorrectos.');
      return;
    }
    sessionStorage.setItem('usuarioActivo', JSON.stringify({ nombre: encontrado.nombre, correo: encontrado.correo }));
    alert(`Bienvenido, ${encontrado.nombre}.`);
    window.location.href = 'index.html';
  });
}

const recuperar = document.getElementById('form-recuperar');
if (recuperar) {
  recuperar.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const correo = new FormData(recuperar).get('correo');
    const existe = usuarios.some((usuario) => usuario.correo === correo);
    alert(existe ? 'Solicitud registrada. En un sistema real recibirías un enlace por correo.' : 'No encontramos una cuenta con ese correo.');
  });
}
