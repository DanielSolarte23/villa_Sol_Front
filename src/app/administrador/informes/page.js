// import React from 'react'

// function Informes() {
//   return (
//     <div>aqui el contenido de Informes</div>
//   )
// }

// export default Informes


'use client';  // Esto marca el archivo como un componente del lado del cliente

// Importaciones necesarias
import React, { useState } from 'react';

const QuejasReclamosInformes = () => {
  const [formData, setFormData] = useState({
    usuario: '',
    rol: '',
    motivo: '',
    descripcion: '',
    estado: 'no leido',
  });

  // Función para manejar el cambio de valor en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría el código para enviar el formulario
    console.log('Formulario enviado:', formData);
  };

  // Función para manejar la cancelación y limpiar los campos
  const handleCancel = () => {
    setFormData({
      usuario: '',
      rol: '',
      motivo: '',
      descripcion: '',
      estado: 'no leido',
    });
  };

  return (
    <div className="h-full bg-gradient-to-r py-2 px-4 fondo">
      {/* Contenedor principal */}
      <div className="flex flex-col items-center  h-full justify-between">
        {/* Logo */}
        <div className="flex justify-center h-[10%]">
          <img
            src="/Logo-VillaSol.png"  // Asegúrate de que la imagen esté en la carpeta 'public'
            alt="Logo Conjunto Residencial"
            className="w-20 h-20 md:w-28 md:h-28"  // Tamaño del logo
          />
        </div>

        {/* Formulario para quejas, reclamos o informes */}
        <div className="bg-black bg-opacity-60 p-4 rounded-lg shadow-lg max-w-xl w-full mx-4 h-[85%]">
          <div className="bg-white shadow-xl rounded-xl w-full max-w-2xl px-8 py-4 h-full">
            <h2 className="text-xl font-semibold text-start text-gray-800 mb-3">
              Registro de Quejas, Reclamos o Informes
            </h2>
            <form onSubmit={handleSubmit} className='flex flex-col gap-1'>
              {/* Nombre del usuario */}
              <div className="">
                <label htmlFor="usuario" className="block text-gray-700 text-base font-medium">Nombre del Usuario</label>
                <input
                  type="text"
                  id="usuario"
                  name="usuario"
                  value={formData.usuario}
                  onChange={handleChange}
                  className="w-full px-4 py-2  border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
                  placeholder="Ingrese el nombre del usuario"
                />
              </div>

              {/* Rol del usuario */}
              <div className="">
                <label htmlFor="rol" className="block text-gray-700 font-medium">Rol</label>
                <input
                  type="text"
                  id="rol"
                  name="rol"
                  value={formData.rol}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
                  placeholder="Ingrese el rol del usuario"
                />
              </div>

              {/* Motivo (queja, reclamo, informe) */}
              <div className="">
                <label htmlFor="motivo" className="block text-gray-700 font-medium">Motivo</label>
                <select
                  id="motivo"
                  name="motivo"
                  value={formData.motivo}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 text-gray-400"
                >
                  <option value="queja">Queja</option>
                  <option value="reclamo">Reclamo</option>
                  <option value="informe">Informe</option>
                </select>
              </div>

              {/* Descripción */}
              <div className="">
                <label htmlFor="descripcion" className="block text-gray-700  font-medium">Descripción</label>
                <textarea
                  id="descripcion"
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
                  placeholder="Ingrese la descripción del motivo"
                />
              </div>

              {/* Estado (leído/no leído) */}
              <div className="">
                <label htmlFor="estado" className="block text-gray-700 font-medium">Estado</label>
                <select
                  id="estado"
                  name="estado"
                  value={formData.estado}
                  onChange={handleChange}
                  className="w-full px-4  py-2  border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 text-gray-400"
                >
                  <option value="no leido">No Leído</option>
                  <option value="leido">Leído</option>
                </select>
              </div>

              {/* Botones de acción */}
              <div className="flex justify-between gap-2 mt-1">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300"
                >
                  Enviar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuejasReclamosInformes;
