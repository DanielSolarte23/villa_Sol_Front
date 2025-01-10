"use client";

function ConjuntoResidencialLogin() {
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    // Aquí podrías agregar la lógica para validar el login.
    if (email === "admin@residencial.com" && password === "residencial123") {
      alert("Inicio de sesión exitoso");
    } else {
      alert("Credenciales incorrectas");
    }
  };

  return (
    <>
      <div style={styles.container}>
        <div style={styles.overlay}>
          <form onSubmit={handleLogin} style={styles.form}>
            {/* Logo al inicio */}
            <div style={styles.logoContainer}>
              <img
                src="/Logo-VillaSol.png" // Aquí haces referencia a la imagen en la carpeta public
                alt="Logo Conjunto Residencial"
                style={styles.logo}
              />
            </div>

            <h1 style={styles.title}>Iniciar Sesión</h1>

            <div style={styles.inputGroup}>
              <label style={styles.label} htmlFor="email">
                Correo Electrónico
              </label>
              <input
                type="email"
                id="email"
                name="email"
                style={styles.input}
                required
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label} htmlFor="password">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                name="password"
                style={styles.input}
                required
              />
            </div>

            <button type="submit" style={styles.button}>
              Iniciar Sesión
            </button>

            <div style={styles.forgotPassword}>
              <a href="/forgot-password" style={styles.forgotLink}>
                ¿Olvidaste tu contraseña?
              </a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh", // Asegura que ocupe toda la altura de la pantalla
    width: "100vw",  // Asegura que ocupe toda la anchura de la pantalla
    backgroundImage: "url('https://images.pexels.com/photos/250659/pexels-photo-250659.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')", // Reemplaza con la URL de la imagen
    backgroundSize: "cover", // Asegura que la imagen cubra toda el área
    backgroundPosition: "center", // Centra la imagen en la pantalla
    backgroundRepeat: "no-repeat", // Evita que la imagen se repita
    position: "fixed", // Fija el fondo en la pantalla
    top: 0,
    left: 0,
    zIndex: -1, // Para que la imagen de fondo quede detrás del formulario
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.6)", // Fondo oscuro semitransparente
    padding: "1rem", // Reduce el espacio interno
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
    maxWidth: "300px", // Reduce el tamaño máximo del cuadro
    width: "100%",
    margin: "0 10px", // Añade un pequeño margen
    position: "relative", // Asegura que el cuadro esté centrado
  },
  form: {
    background: "#fff",
    padding: "2rem", // Reduce el espacio interno
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  logoContainer: {
    
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: "150px", // Tamaño más pequeño del logo
    height: "150px", // Tamaño más pequeño del logo
  },
  title: {
    marginBottom: "0.5rem",
    color: "#333",
    fontSize: "1.5rem", // Reduce el tamaño del texto
    textAlign: "center",
  },
  subtitle: {
    marginBottom: "1rem",
    color: "#666",
    textAlign: "center",
    fontSize: "1rem",
  },
  inputGroup: {
    marginBottom: "1rem",
    width: "100%",
  },
  label: {
    display: "block",
    marginBottom: "0.5rem",
    color: "#555",
    fontSize: "1rem",
  },
  input: {
    width: "100%",
    padding: "0.75rem",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "1rem",
    marginBottom: "0.5rem",
  },
  button: {
    width: "100%",
    padding: "0.75rem",
    background: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "4px",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "background 0.3s",
    marginBottom: "1rem",
  },
  forgotPassword: {
    marginTop: "1rem",
    textAlign: "center",
  },
  forgotLink: {
    color: "#007bff",
    textDecoration: "none",
    fontSize: "0.9rem",
  },
};

export default ConjuntoResidencialLogin;