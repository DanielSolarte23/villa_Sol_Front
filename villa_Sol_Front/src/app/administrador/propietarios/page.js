// import React from 'react'

// function Propietarios() {
//   return (
//     <div>aqui va el contenido de Propietarios</div>
//   )
// }

// export default Propietarios


import React from 'react';

function Propietarios() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Contenedor principal */}
      <div className="flex flex-col items-center justify-center py-16">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img
            src="/Logo-VillaSol.png"  // Asegúrate de que la imagen esté en la carpeta 'public'
            alt="Logo Conjunto Residencial"
            className="w-56 h-56"  // Aumenté el tamaño del logo
          />
        </div>

    

        {/* Formulario para gestionar propietarios */}
        <div className="bg-white p-10 rounded-xl shadow-xl w-full max-w-3xl bg-green-50 bg-opacity-70">
          <form>
            {/* Nombre del Propietario */}
            <div className="mb-6">
              <label htmlFor="nombre" className="block text-gray-700 text-lg font-medium">Nombre del Propietario</label>
              <input
                type="text"
                id="nombre"
                className="w-full p-4 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300 transition duration-300"
                placeholder="Ingrese el nombre del propietario"
              />
            </div>

            {/* Documento de Identidad */}
            <div className="mb-6">
              <label htmlFor="documento" className="block text-gray-700 text-lg font-medium">Documento de Identidad</label>
              <input
                type="text"
                id="documento"
                className="w-full p-4 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300 transition duration-300"
                placeholder="Ingrese el documento de identidad"
              />
            </div>

            {/* Teléfono */}
            <div className="mb-6">
              <label htmlFor="telefono" className="block text-gray-700 text-lg font-medium">Teléfono</label>
              <input
                type="tel"
                id="telefono"
                className="w-full p-4 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300 transition duration-300"
                placeholder="Ingrese el número de teléfono"
              />
            </div>

            {/* Unidad Asignada */}
            <div className="mb-6">
              <label htmlFor="unidad" className="block text-gray-700 text-lg font-medium">Unidad Asignada</label>
              <input
                type="text"
                id="unidad"
                className="w-full p-4 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300 transition duration-300"
                placeholder="Número de unidad asignada"
              />
            </div>

            {/* Verificación de Identidad (Simulada) */}
            <div className="mb-6">
              <button
                type="button"
                className="w-full p-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300"
              >
                Verificar Identidad
              </button>
            </div>

            {/* Botón de Guardar */}
            <div className="mb-6">
              <button
                type="submit"
                className="w-full p-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300"
              >
                Guardar Propietario
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Propietarios;


