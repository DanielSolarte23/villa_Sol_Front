"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

const Pagos = () => {
  const [pagos, setPagos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState("");
  const [pago, setPago] = useState({
    monto: "",
    fechaVencimiento: "",
    propietarioId: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [propietarios, setPropietarios] = useState([]);

  // 🔹 Obtener los pagos desde la API
  const fetchPagos = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/pagos");
      setPagos(response.data);
    } catch (err) {
      setError("Error al cargar los pagos");
      showModal("Error al cargar los pagos");
    }
  };

  const fetchPropietarios = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/propietarios");
      setPropietarios(response.data);
      // console.log(`Estos son los porpietarios ${response.data}`);
    } catch (err) {
      setError("Error al cargar los propietarios");
      showModal("Error al cargar los propietarios");
    }
  };

  useEffect(() => {
    fetchPagos();
    fetchPropietarios();
  }, []);

  const showModal = (message, type) => {
    setModalMessage(message);
    setModalType(type);
    setModalVisible(true);
    setTimeout(() => {
      setModalVisible(false);
    }, 2000);
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setPago((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:3000/api/pagos";

      if (isEditing) {
        await axios.put(`${url}/${pago.id}`, pago);
        setSuccess("Pago actualizado exitosamente");
      } else {
        await axios.post(url, pago);
        setSuccess("Pago registrado exitosamente");
        showModal("Pago registrado exitosamente");
      }

      setIsEditing(false);
      setPago({
        monto: "",
        fechaVencimiento: "",
        propietarioId: "",
      });

      fetchPagos();
    } catch (err) {
      setError("Error al guardar el pago");
      showModal("Error al guardar el pago");
    }
  };

  const handleEdit = (pay) => {
    setPago(pay);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Está seguro de eliminar este pago?")) return;

    try {
      await axios.delete(`http://localhost:3000/api/pagos/${id}`);
      setSuccess("Pago eliminado exitosamente");
      showModal("Pago eliminado exitosamente");
      fetchPagos();
    } catch (err) {
      setError("Error al eliminar el pago");
      showModal("Error al eliminar el pago");
    }
  };

  return (
    <div className="h-full bg-gray-100 p-2">
      {/* Modal de Error o Éxito */}
      {modalVisible && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg max-w-sm w-full text-center">
            <p className={`font-bold ${modalType === "error" ? "text-red-700" : "text-green-700"}`}>
              {modalMessage}
            </p>
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Formulario */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-gray-700">
            {isEditing ? "Editar Pago" : "Nuevo Pago"}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Monto</label>
                <input
                  type="number"
                  name="monto"
                  value={pago.monto}
                  onChange={handleChange}
                  className="mt-1 block w-full py-2 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-gray-700"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Fecha de Vencimiento</label>
                <input
                  type="date"
                  name="fechaVencimiento"
                  value={pago.fechaVencimiento.split("T")[0]}
                  onChange={handleChange}
                  className="mt-1 text-gray-700 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Propietario</label>
                <select name="propietarioId"
                  value={pago.propietarioId}
                  onChange={handleChange}
                  className="mt-1 block w-full py-2 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                >
                  <option>Seleccione un propietario</option>
                  {propietarios.map((item) => (
                    <option
                      key={item.id}
                      value={item.id}
                    >
                      {item.nombres}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                {isEditing ? "Actualizar" : "Registrar"} Pago
              </button>
            </div>
          </form>
        </div>

        {/* Tabla de Pagos */}
        <div className="bg-white p-6 rounded-lg shadow-lg overflow-x-auto">
          <h2 className="text-2xl font-bold mb-6 text-gray-700">Lista de Pagos</h2>
          <table className="min-w-full border border-gray-300 text-gray-700">
            <thead className="bg-gray-50">
              <tr>
                <th className="border p-2">Monto</th>
                <th className="border p-2">Fecha de Vencimiento</th>
                <th className="border p-2">Propietario</th>
                <th className="border p-2">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {pagos.map((pay) => (
                <tr key={pay.id} className="border">
                  <td className="p-2">${pay.monto}</td>
                  <td className="p-2">{new Date(pay.fechaVencimiento).toLocaleDateString()}</td>
                  <td className="p-2">{pay.Propietario?.nombres || "Sin propietario"}</td>
                  <td className="p-2">
                    <button onClick={() => handleEdit(pay)} className="text-blue-500 hover:underline mr-2">Editar</button>
                    <button onClick={() => handleDelete(pay.id)} className="text-red-500 hover:underline">Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Pagos;
