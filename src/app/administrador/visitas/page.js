"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

const Visitantes = () => {
  const [visitantes, setVisitantes] = useState([]);
  const [apartamentos, setApartamentos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState(""); // 'error' o 'success'
  const [visitante, setVisitante] = useState({
    nombres: "",
    documento: "",
    telefono: "",
    apartamentoId: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");


  const fetchVisitantes = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/visitantes");
      setVisitantes(response.data);
    } catch (err) {
      setError("Error al cargar los visitantes");
      showModal("Error al cargar los visitantes", "error");
    }
  };

  const fetchApartamentos = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/apartamentos");
      setApartamentos(response.data);
    } catch (err) {
      setError("Error al cargar los apartamentos");
      showModal("Error al cargar los apartamentos", "error");
    }
  };

  useEffect(() => {
    fetchVisitantes();
    fetchApartamentos();
  }, []);

  const showModal = (message, type) => {
    setModalMessage(message);
    setModalType(type);
    setModalVisible(true);
    setTimeout(() => {
      setModalVisible(false);
    }, 2000);
  };

  // 🔹 Manejar cambios en los inputs del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setVisitante((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 🔹 Guardar o actualizar visitante
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:3000/api/visitantes";

      if (isEditing) {
        await axios.put(`${url}/${visitante.id}`, visitante);
        setSuccess("Visitante actualizado exitosamente");
      } else {
        await axios.post(url, visitante);
        setSuccess("Visitante creado exitosamente");
        showModal("Visitante registrado exitosamente", "success");
      }

      setIsEditing(false);
      setVisitante({
        nombres: "",
        documento: "",
        telefono: "",
        apartamentoId: "",
      });

      fetchVisitantes();
    } catch (err) {
      setError("Error al guardar el visitante");
      showModal("Error al guardar el visitante");
    }
  };

  // 🔹 Editar un visitante
  const handleEdit = (vis) => {
    setVisitante(vis);
    setIsEditing(true);
  };

  // 🔹 Eliminar un visitante
  const handleDelete = async (id) => {
    if (!window.confirm("¿Está seguro de eliminar este visitante?")) return;

    try {
      await axios.delete(`http://localhost:3000/api/visitantes/${id}`);
      setSuccess("Visitante eliminado exitosamente");
      fetchVisitantes();
    } catch (err) {
      setError("Error al eliminar el visitante");
      showModal("Error al eliminar el visitante");
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
            {isEditing ? "Editar Visitante" : "Nuevo Visitante"}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nombre</label>
                <input
                  type="text"
                  name="nombres"
                  value={visitante.nombres}
                  onChange={handleChange}
                  className="mt-1 block w-full py-2 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-gray-700"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Documento</label>
                <input
                  type="text"
                  name="documento"
                  value={visitante.documento}
                  onChange={handleChange}
                  className="mt-1 text-gray-700 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Teléfono</label>
                <input
                  type="text"
                  name="telefono"
                  value={visitante.telefono}
                  onChange={handleChange}
                  className="mt-1 block w-full py-2 text-gray-700 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Apartamento al que se dirige</label>
                <select type="number"
                  name="apartamentoId"
                  value={visitante.apartamentoId}
                  onChange={handleChange}
                  className="mt-1 block w-full py-2 text-gray-700 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500">
                  <option>Seleccione un apartamentos</option>
                  {apartamentos.map((item) => (
                    <option
                      key={item.id}
                      value={item.id}
                    >
                      {item.numeroApartamento}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                {isEditing ? "Actualizar" : "Crear"} Visitante
              </button>
            </div>
          </form>
        </div>

        {/* Tabla de Visitantes */}
        <div className="bg-white p-6 rounded-lg shadow-lg overflow-x-auto">
          <h2 className="text-2xl font-bold mb-6 text-gray-700">Lista de Visitantes</h2>
          <table className="min-w-full border border-gray-300 text-gray-700">
            <thead className="bg-gray-50">
              <tr>
                <th className="border p-2">Nombre</th>
                <th className="border p-2">Documento</th>
                <th className="border p-2">Teléfono</th>
                <th className="border p-2">Apartamento</th>
                <th className="border p-2">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {visitantes.map((vis) => (
                <tr key={vis.id} className="border">
                  <td className="p-2">{vis.nombres}</td>
                  <td className="p-2">{vis.documento}</td>
                  <td className="p-2">{vis.telefono}</td>
                  <td className="p-2">{vis.Apartamento?.numeroApartamento || "Sin apartamento"}</td>
                  <td className="p-2">
                    <button onClick={() => handleEdit(vis)} className="text-blue-500 hover:underline mr-2">Editar</button>
                    <button onClick={() => handleDelete(vis.id)} className="text-red-500 hover:underline">Eliminar</button>
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

export default Visitantes;
