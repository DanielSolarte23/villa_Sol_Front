// export default function Registro() {
//     return (
//       <div>Aqui va el registro</div>
//     );
//   }



export default function Registro() {
  return (
    <div className="flex items-center justify-center h-screen fondo">
      <div className="bg-black bg-opacity-60 p-4 rounded-lg shadow-lg max-w-xl w-full mx-4">
        <div className="bg-white px-6 py-2 rounded-lg shadow-lg w-full max-w-2xl h-full flex flex-col items-center justify-between">
          {/* Logo */}
          <div className="flex justify-center h-[10%]">
            <img
              src="/Logo-VillaSol.png"
              alt="Logo Conjunto Residencial"
              className="w-24 h-24 sm:w-32 sm:h-32"
            />
          </div>



          {/* Formulario */}
          <form className="grid grid-cols-1 sm:grid-cols-2 gap-2 h-[80%]" >
            {/* Nombre */}
            <div>
              <input
                type="text"
                placeholder="Nombre"
                className="w-full px-4 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Apellido */}
            <div>
              <input
                type="text"
                placeholder="Apellido"
                className="w-full px-4 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Nombre de Usuario */}
            <div className="sm:col-span-2">
              <input
                type="text"
                placeholder="Nombre de usuario"
                className="w-full px-4 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Correo Electrónico */}
            <div className="sm:col-span-2">
              <input
                type="email"
                placeholder="Correo electrónico"
                className="w-full px-4 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Contraseña */}
            <div className="sm:col-span-2">
              <input
                type="password"
                placeholder="Contraseña"
                className="w-full px-4 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Documento de Identidad */}
            <div className="sm:col-span-2">
              <input
                type="text"
                placeholder="Documento de identidad"
                className="w-full px-4 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Teléfono */}
            <div className="sm:col-span-2">
              <input
                type="tel"
                placeholder="Teléfono"
                className="w-full px-4 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Cargo */}
            <div className="sm:col-span-2">
              <input
                type="text"
                placeholder="Cargo"
                className="w-full px-4 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Rol */}
            <div className="sm:col-span-2">
              <select
                className="w-full px-4 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
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
                className="w-full py-1 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                Registrar Usuario
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}


