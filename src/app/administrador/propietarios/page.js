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
    <div className="h-full fondo">
      {/* Contenedor principal */}
      <div className="flex flex-col items-center justify-center">
        {/* Logo */}
        <div className="flex justify-center">
          <img
            src="/Logo-VillaSol.png"  // Asegúrate de que la imagen esté en la carpeta 'public'
            alt="Logo Conjunto Residencial"
            className="w-28 h-28"  // Aumenté el tamaño del logo
          />
        </div>



        {/* Formulario para gestionar propietarios */}
        <div className='bg-black bg-opacity-60 p-4 rounded-lg shadow-lg max-w-xl w-full mx-4'>
          <div className="bg-white px-8 py-5 rounded-xl shadow-xl w-full max-w-3xl">
            <form className='flex flex-col gap-5'>
              {/* Nombre del Propietario */}
              <div className="">
                <label htmlFor="nombre" className="block text-gray-700  font-medium">Nombre del Propietario</label>
                <input
                  type="text"
                  id="nombre"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300 transition duration-300"
                  placeholder="Ingrese el nombre del propietario"
                />
              </div>

              {/* Documento de Identidad */}
              <div className="">
                <label htmlFor="documento" className="block text-gray-700  font-medium">Documento de Identidad</label>
                <input
                  type="text"
                  id="documento"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300 transition duration-300"
                  placeholder="Ingrese el documento de identidad"
                />
              </div>

              {/* Teléfono */}
              <div className="">
                <label htmlFor="telefono" className="block text-gray-700  font-medium">Teléfono</label>
                <input
                  type="tel"
                  id="telefono"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300 transition duration-300"
                  placeholder="Ingrese el número de teléfono"
                />
              </div>

              {/* Unidad Asignada */}
              <div className="">
                <label htmlFor="unidad" className="block text-gray-700  font-medium">Unidad Asignada</label>
                <input
                  type="text"
                  id="unidad"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300 transition duration-300"
                  placeholder="Número de unidad asignada"
                />
              </div>

              {/* Verificación de Identidad (Simulada) */}
              <div className="">
                <button
                  type="button"
                  className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300"
                >
                  Verificar Identidad
                </button>
              </div>

              {/* Botón de Guardar */}
              <div className="">
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300"
                >
                  Guardar Propietario
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Propietarios;


