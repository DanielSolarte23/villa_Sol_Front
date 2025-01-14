// import React from 'react'

// function Visitas() {
//   return (
//     <div>Aqui va el contenido de visitas</div>
//   )
// }

// export default Visitas


'use client';

import React, { useState } from 'react';

function Visitas() {
  const [visitante, setVisitante] = useState({
    nombre: '',
    documentoIdentidad: '',
    fecha: '',
  });

  const [historial, setHistorial] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [busqueda, setBusqueda] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVisitante((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación: Comprobar si ya existe el visitante (por nombre o documento)
    const visitanteExistente = historial.find(
      (visita) =>
        visita.documentoIdentidad === visitante.documentoIdentidad ||
        visita.nombre.toLowerCase() === visitante.nombre.toLowerCase()
    );

    if (visitanteExistente) {
      alert('¡Acceso denegado! El visitante ya está registrado.');
      return;
    }

    const nuevoHistorial = { ...visitante, fecha: new Date().toLocaleString() };
    setHistorial([nuevoHistorial, ...historial]);
    setVisitante({ nombre: '', documentoIdentidad: '', fecha: '' });
    alert('¡Visitante registrado exitosamente!');
  };

  const handleBusqueda = (e) => {
    setFiltro(e.target.value);
    setBusqueda(true);
  };

  const historialFiltrado = historial.filter(
    (visita) =>
      visita.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
      visita.documentoIdentidad.includes(filtro)
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-16 px-4 overflow-x-hidden">
      {/* Logo */}
      <div className="flex justify-center mb-8 w-full">
        <img
          src="/Logo-VillaSol.png"
          alt="Logo Conjunto Residencial"
          className="w-32 sm:w-40 md:w-56 lg:w-64 h-auto"
        />
      </div>

      {/* <h1 className="text-3xl sm:text-4xl text-gray-800 font-semibold mb-8 text-center">Gestión de Acceso de Visitantes</h1> */}

      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-3xl">
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="nombre" className="block text-gray-700 text-lg font-medium">Nombre del Visitante</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={visitante.nombre}
              onChange={handleChange}
              className="w-full p-4 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-700 transition duration-300 shadow-md"
              placeholder="Ingrese el nombre del visitante"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="documentoIdentidad" className="block text-gray-700 text-lg font-medium">Documento de Identidad</label>
            <input
              type="text"
              id="documentoIdentidad"
              name="documentoIdentidad"
              value={visitante.documentoIdentidad}
              onChange={handleChange}
              className="w-full p-4 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-700 transition duration-300 shadow-md"
              placeholder="Ingrese el documento de identidad"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="fecha" className="block text-gray-700 text-lg font-medium">Fecha de Visita</label>
            <input
              type="date"
              id="fecha"
              name="fecha"
              value={visitante.fecha}
              onChange={handleChange}
              className="w-full p-4 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300 transition duration-300 shadow-md"
              required
            />
          </div>

          <div className="mb-6">
            <button
              type="submit"
              className="w-full p-4 bg-green-700 text-white rounded-md hover:bg-green-700 transition duration-300 shadow-lg"
            >
              Registrar Visitante
            </button>
          </div>
        </form>
      </div>

      {/* Historial de Visitas */}
      <div className="bg-white p-8 mt-8 rounded-xl shadow-lg w-full max-w-3xl">
        <div className="mb-6">
          <input
            type="text"
            value={filtro}
            onChange={handleBusqueda}
            placeholder="Buscar por nombre o documento"
            className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-700 transition duration-300 shadow-md"
          />
        </div>

        {historialFiltrado.length > 0 ? (
          <div className="space-y-4">
            {historialFiltrado.map((visita, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-md shadow-sm">
                <p className="text-gray-700"><strong>Nombre:</strong> {visita.nombre}</p>
                <p className="text-gray-700"><strong>Documento de Identidad:</strong> {visita.documentoIdentidad}</p>
                <p className="text-gray-700"><strong>Fecha de Visita:</strong> {visita.fecha}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No se encontraron visitas.</p>
        )}
      </div>
    </div>
  );
}

export default Visitas;
