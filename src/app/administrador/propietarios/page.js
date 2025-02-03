"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

const Propietarios = () => {
  const [propietarios, setPropietarios] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState("");
  const [propietario, setPropietario] = useState({

    nombres: "",
    documentoIdentidad: "",
    estadoPago: false,
    correo: "",
    telefono: ""
  });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // 🔹 Obtener propietarios desde la API
  const fetchPropietarios = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/propietarios");
      setPropietarios(response.data);
    } catch (err) {
      setError("Error al cargar los propietarios");
      showModal("Error al cargar los propietarios");
    }
  };

  useEffect(() => {
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


  // 🔹 Manejar cambios en los inputs del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPropietario((prev) => ({ ...prev, [name]: value }));
  };

  // 🔹 Guardar o actualizar propietario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:3000/api/propietarios";

      if (isEditing) {
        await axios.put(`${url}/${propietario.id}`, propietario);
        setSuccess("Propietario actualizado exitosamente");
      } else {
        await axios.post(url, propietario);
        setSuccess("Propietario creado exitosamente");
        showModal("Propietario creado exitosamente");
      }

      setIsEditing(false);
      setPropietario({
        nombres: "",
        documentoIdentidad: "",
        estadoPago: false,
        correo: "",
        telefono: ""
      });

      fetchPropietarios();
    } catch (err) {
      setError("Error al guardar el propietario");
      showModal("Error al guardar los propietarios");
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
        <div className="bg-white py-2 px-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-gray-700">
            {isEditing ? "Editar Propietario" : "Nuevo Propietario"}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <input
                type="text"
                name="nombres"
                value={propietario.nombres}
                onChange={handleChange}
                placeholder="Nombre Completo"
                className="block w-full py-2 rounded-md border-gray-300 shadow-sm"
                required
              />
              <input
                type="text"
                name="documentoIdentidad"
                value={propietario.documentoIdentidad}
                onChange={handleChange}
                placeholder="Documento de Identidad"
                className="block w-full py-2 rounded-md border-gray-300 shadow-sm"
                required
              />
              <input
                type="email"
                name="correo"
                value={propietario.correo}
                onChange={handleChange}
                placeholder="Correo Electrónico"
                className="block w-full py-2 rounded-md border-gray-300 shadow-sm"
                required
              />
              <input
                type="text"
                name="telefono"
                value={propietario.telefono}
                onChange={handleChange}
                placeholder="Teléfono"
                className="block w-full py-2 rounded-md border-gray-300 shadow-sm"
                required
              />
              <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-md">
                {isEditing ? "Actualizar" : "Crear"} Propietario
              </button>
            </div>
          </form>
        </div>

        <div className="bg-white py-2 px-6 rounded-lg shadow-lg overflow-x-auto">
          <h2 className="text-2xl font-bold mb-6 text-gray-700">Lista de Propietarios</h2>
          <table className="min-w-full border border-gray-300 text-gray-700">
            <thead className="bg-gray-50">
              <tr>
                <th className="border p-2">Nombre</th>
                <th className="border p-2">Documento</th>
                <th className="border p-2">Correo</th>
                <th className="border p-2">Teléfono</th>
              </tr>
            </thead>
            <tbody>
              {propietarios.map((prop) => (
                <tr key={prop.id} className="border">
                  <td className="p-2">{prop.nombres}</td>
                  <td className="p-2">{prop.documentoIdentidad}</td>
                  <td className="p-2">{prop.correo}</td>
                  <td className="p-2">{prop.telefono}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Propietarios;