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
    <div className="min-h-screen bg-gradient-to-r from-green-500 to-teal-400 py-12 px-4">
      {/* Contenedor principal */}
      <div className="flex flex-col items-center justify-center">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img
            src="/Logo-VillaSol.png"  // Asegúrate de que la imagen esté en la carpeta 'public'
            alt="Logo Conjunto Residencial"
            className="w-40 h-40 md:w-56 md:h-56"  // Tamaño del logo
          />
        </div>

        {/* Formulario para quejas, reclamos o informes */}
        <div className="bg-white shadow-xl rounded-xl w-full max-w-2xl p-8">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
            Registro de Quejas, Reclamos o Informes
          </h2>
          <form onSubmit={handleSubmit}>
            {/* Nombre del usuario */}
            <div className="mb-6">
              <label htmlFor="usuario" className="block text-gray-700 text-lg font-medium">Nombre del Usuario</label>
              <input
                type="text"
                id="usuario"
                name="usuario"
                value={formData.usuario}
                onChange={handleChange}
                className="w-full p-4 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
                placeholder="Ingrese el nombre del usuario"
              />
            </div>

            {/* Rol del usuario */}
            <div className="mb-6">
              <label htmlFor="rol" className="block text-gray-700 text-lg font-medium">Rol</label>
              <input
                type="text"
                id="rol"
                name="rol"
                value={formData.rol}
                onChange={handleChange}
                className="w-full p-4 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
                placeholder="Ingrese el rol del usuario"
              />
            </div>

            {/* Motivo (queja, reclamo, informe) */}
            <div className="mb-6">
              <label htmlFor="motivo" className="block text-gray-700 text-lg font-medium">Motivo</label>
              <select
                id="motivo"
                name="motivo"
                value={formData.motivo}
                onChange={handleChange}
                className="w-full p-4 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
              >
                <option value="queja">Queja</option>
                <option value="reclamo">Reclamo</option>
                <option value="informe">Informe</option>
              </select>
            </div>

            {/* Descripción */}
            <div className="mb-6">
              <label htmlFor="descripcion" className="block text-gray-700 text-lg font-medium">Descripción</label>
              <textarea
                id="descripcion"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                className="w-full p-4 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
                placeholder="Ingrese la descripción del motivo"
              />
            </div>

            {/* Estado (leído/no leído) */}
            <div className="mb-6">
              <label htmlFor="estado" className="block text-gray-700 text-lg font-medium">Estado</label>
              <select
                id="estado"
                name="estado"
                value={formData.estado}
                onChange={handleChange}
                className="w-full p-4 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
              >
                <option value="no leido">No Leído</option>
                <option value="leido">Leído</option>
              </select>
            </div>

            {/* Botones de acción */}
            <div className="flex justify-between gap-4">
              <button
                type="button"
                onClick={handleCancel}
                className="w-full p-4 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300"
              >
                Cancelar
              </button>

              <button
                type="submit"
                className="w-full p-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300"
              >
                Enviar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default QuejasReclamosInformes;
