// export default function Registro() {
//     return (
//       <div>Aqui va el registro</div>
//     );
//   }
  


export default function Registro() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src="/Logo-VillaSol.png"
            alt="Logo Conjunto Residencial"
            className="w-24 h-24 sm:w-32 sm:h-32"
          />
        </div>

        

        {/* Formulario */}
        <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Nombre */}
          <div>
            <input
              type="text"
              placeholder="Nombre"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Apellido */}
          <div>
            <input
              type="text"
              placeholder="Apellido"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Nombre de Usuario */}
          <div className="sm:col-span-2">
            <input
              type="text"
              placeholder="Nombre de usuario"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Correo Electrónico */}
          <div className="sm:col-span-2">
            <input
              type="email"
              placeholder="Correo electrónico"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Contraseña */}
          <div className="sm:col-span-2">
            <input
              type="password"
              placeholder="Contraseña"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Documento de Identidad */}
          <div className="sm:col-span-2">
            <input
              type="text"
              placeholder="Documento de identidad"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Teléfono */}
          <div className="sm:col-span-2">
            <input
              type="tel"
              placeholder="Teléfono"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Cargo */}
          <div className="sm:col-span-2">
            <input
              type="text"
              placeholder="Cargo"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Rol */}
          <div className="sm:col-span-2">
            <select
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Selecciona un rol</option>
              <option>Administrador de la plataforma</option>
              <option>Miembro del equipo de seguridad</option>
              <option>Usuario propietario</option>
            </select>
          </div>

          {/* Botón de Enviar */}
          <div className="sm:col-span-2">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              Registrar Usuario
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


