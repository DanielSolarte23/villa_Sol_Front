// import React from 'react'

// function Pago() {
//   return (
//     <div>Aqui va el contenido de pagos</div>
//   )
// }

// export default Pago



'use client';

import React, { useState } from 'react';

const Pago = () => {
  const [pago, setPago] = useState({
    nombreUsuario: '',
    fecha: '',
    estado: 'Pagado',
    apartamento: '',
  });

  const [pagos, setPagos] = useState([]);
  const [filtro, setFiltro] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPago((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación de datos
    if (!pago.nombreUsuario || !pago.fecha || !pago.apartamento) {
      alert('Por favor, complete todos los campos.');
      return;
    }

    // Verificar si el pago ya fue registrado (duplicado)
    const pagoExistente = pagos.find((p) => p.nombreUsuario === pago.nombreUsuario && p.fecha === pago.fecha);
    if (pagoExistente) {
      alert('El pago para este usuario en esta fecha ya existe.');
      return;
    }

    const nuevoPago = {
      nombreUsuario: pago.nombreUsuario,
      fecha: pago.fecha,
      estado: pago.estado,
      apartamento: pago.apartamento,
      ultimoPago: new Date().toISOString(),
    };

    setPagos([nuevoPago, ...pagos]);
    setPago({ nombreUsuario: '', fecha: '', estado: 'Pagado', apartamento: '' });
    alert('Pago registrado exitosamente!');
  };

  const handleBusqueda = (e) => {
    setFiltro(e.target.value);
  };

  const pagosFiltrados = pagos.filter(
    (pago) =>
      pago.estado.toLowerCase().includes(filtro.toLowerCase()) ||
      pago.nombreUsuario.toLowerCase().includes(filtro.toLowerCase()) ||
      pago.apartamento.includes(filtro)
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


      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg sm:max-w-3xl">
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="nombreUsuario" className="block text-black text-lg font-medium">Nombre de Usuario</label>
            <input
              type="text"
              id="nombreUsuario"
              name="nombreUsuario"
              value={pago.nombreUsuario}
              onChange={handleChange}
              className="w-full p-4 mt-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300 shadow-md"
              placeholder="Ingrese el nombre del usuario"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="fecha" className="block text-black text-lg font-medium">Fecha del Pago</label>
            <input
              type="date"
              id="fecha"
              name="fecha"
              value={pago.fecha}
              onChange={handleChange}
              className="w-full p-4 mt-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300 shadow-md"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="estado" className="block text-black text-lg font-medium">Estado del Pago</label>
            <select
              id="estado"
              name="estado"
              value={pago.estado}
              onChange={handleChange}
              className="w-full p-4 mt-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300 shadow-md"
              required
            >
              <option value="Pagado">Pagado</option>
              <option value="Vencido">Vencido</option>
              
            </select>
          </div>

          <div className="mb-6">
            <label htmlFor="apartamento" className="block text-black text-lg font-medium">Número de Apartamento</label>
            <input
              type="text"
              id="apartamento"
              name="apartamento"
              value={pago.apartamento}
              onChange={handleChange}
              className="w-full p-4 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300 shadow-md"
              placeholder="Ingrese el número de apartamento"
              required
            />
          </div>

          <div className="mb-6">
            <button
              type="submit"
              className="w-full p-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300 shadow-lg"
            >
              Registrar Pago
            </button>
          </div>
        </form>
      </div>

      {/* Historial de Pagos */}
      <div className="bg-white p-8 mt-8 rounded-xl shadow-lg w-full max-w-lg sm:max-w-3xl">
        <div className="mb-6">
          <input
            type="text"
            value={filtro}
            onChange={handleBusqueda}
            placeholder="Buscar usuario o N° apartamento"
            className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300 shadow-md"
          />
        </div>

        {pagosFiltrados.length > 0 ? (
          <div className="space-y-4">
            {pagosFiltrados.map((pago) => (
              <div key={pago.nombreUsuario + pago.fecha} className="p-4 border border-gray-200 rounded-md shadow-sm">
                <p className="text-black"><strong>Nombre de Usuario:</strong> {pago.nombreUsuario}</p>
                <p className="text-black"><strong>Fecha:</strong> {pago.fecha}</p>
                
                <p className="text-black"><strong>Apartamento:</strong> {pago.apartamento}</p>
                <p className="text-black"><strong>Último Pago:</strong> {new Date(pago.ultimoPago).toLocaleString()}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-black">No se encontraron pagos.</p>
        )}
      </div>
    </div>
  );
}

export default Pago;
