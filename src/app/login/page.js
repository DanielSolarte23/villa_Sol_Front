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
      <div className="flex justify-center items-center h-screen w-screen bg-cover bg-center bg-no-repeat fixed top-0 left-0 z-[-1] fondo" >
        <div className="bg-black bg-opacity-60 p-4 rounded-lg shadow-lg max-w-xl w-full mx-4">
          <form onSubmit={handleLogin} className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
            {/* Logo al inicio */}
            <div className="flex justify-center items-center mb-4">
              <img
                src="/Logo-VillaSol.png"
                alt="Logo Conjunto Residencial"
                className="w-36 h-36"
              />
            </div>

            <h1 className="text-xl font-bold text-gray-800 mb-2 text-center">
              Iniciar Sesión
            </h1>

            <div className="mb-4 w-full">
              <label htmlFor="email" className="block text-gray-600 mb-1 text-sm">
                Correo Electrónico
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full p-2 border border-gray-300 rounded-md text-sm"
                required
              />
            </div>

            <div className="mb-4 w-full">
              <label htmlFor="password" className="block text-gray-600 mb-1 text-sm">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full p-2 border border-gray-300 rounded-md text-sm"
                required
              />
            </div>

            <button type="submit" className="w-full p-2 bg-green-500 text-white rounded-md text-sm hover:bg-green-600 transition duration-300 mb-4">
              Iniciar Sesión
            </button>

            <div className="mt-4 text-center">
              <a href="/forgot-password" className="text-blue-500 text-sm hover:underline">
                ¿Olvidaste tu contraseña?
              </a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default ConjuntoResidencialLogin;
