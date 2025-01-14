// import React from 'react'

// function apartamentos() {
//   return (
//     <div>aqui va el contenido de apartamentos</div>
//   )
// }

// export default apartamentos

'use client';

import React, { useState } from 'react';

function Apartamentos() {
  const [apartamento, setApartamento] = useState({
    identificador: '',
    propietario: '',
    detalles: '',
    historial: [],
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setApartamento((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setApartamento((prev) => ({
        ...prev,
        historial: [...prev.historial, `Propietario cambiado a: ${apartamento.propietario}`],
      }));
    }
    alert('Apartamento guardado exitosamente');
  };

  return (
    <div className="h-full bg-gray-100 flex flex-col items-center justify-center py-5 px-4 fondo">
      {/* Logo */}
      <div className="flex justify-center ">
        <img
          src="/Logo-VillaSol.png"
          alt="Logo Conjunto Residencial"
          className="w-40 h-40"
        />
      </div>


      {/* Formulario */}
      <div className='bg-black bg-opacity-60 p-4 rounded-lg shadow-lg max-w-xl w-full mx-4'>
        <div className="bg-white p-5 rounded-xl shadow-lg w-full max-w-3xl">
          <form onSubmit={handleSubmit}>
            {/* Identificador */}
            <div className="mb-2">
              <label htmlFor="identificador" className="block text-gray-700 text-lg font-medium">Identificador del Apartamento</label>
              <input
                type="text"
                id="identificador"
                name="identificador"
                value={apartamento.identificador}
                onChange={handleChange}
                className="w-full px-4 py-3  border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-700 transition duration-300 shadow-md"
                placeholder="Ingrese el identificador del apartamento"
                required
              />
            </div>

            {/* Propietario */}
            <div className="mb-2">
              <label htmlFor="propietario" className="block text-gray-700 text-lg font-medium">Propietario</label>
              <input
                type="text"
                id="propietario"
                name="propietario"
                value={apartamento.propietario}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-700 transition duration-300 shadow-md"
                placeholder="Ingrese el nombre del propietario"
                required
              />
            </div>

            {/* Detalles */}
            <div className="mb-2">
              <label htmlFor="detalles" className="block text-gray-700 text-lg font-medium">Detalles del Apartamento</label>
              <textarea
                id="detalles"
                name="detalles"
                value={apartamento.detalles}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gree-300 transition duration-300 shadow-md"
                placeholder="Ingrese los detalles del apartamento"
                required
              />
            </div>

            {/* Botón */}
            <div className="mb-2">
              <button
                type="submit"
                className="w-full px-4 py-4 bg-green-700 text-white rounded-md hover:bg-green-700 transition duration-300 shadow-lg"
              >
                {isEditing ? 'Modificar Apartamento' : 'Registrar Apartamento'}
              </button>
            </div>

            {/* Historial */}
            {apartamento.historial.length > 0 && (
              <div className="mt-8 bg-gray-100 p-6 rounded-md shadow-md">
                <h2 className="text-xl text-gray-800 font-medium mb-4">Historial de Cambios de Propietario</h2>
                <ul className="space-y-2">
                  {apartamento.historial.map((cambio, index) => (
                    <li key={index} className="text-gray-700">{cambio}</li>
                  ))}
                </ul>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Apartamentos;
