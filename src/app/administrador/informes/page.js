"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

const Informes = () => {
  const [informes, setInformes] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState("");
  const [informe, setInforme] = useState({
    motivo: "",
    descripcion: "",
    remitenteId: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // 🔹 Obtener los informes desde la API
  const fetchInformes = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/informes");
      setInformes(response.data);
    } catch (err) {
      setError("Error al cargar los informes");
      showModal("Error al cargar los informes");
    }
  };

  const fetchUsuarios = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/usuarios");
      setUsuarios(response.data);
    } catch (err) {
      setError("Error al cargar los usuarios");
      showModal("Error al cargar los usuarios");
    }
  };

  useEffect(() => {
    fetchInformes();
    fetchUsuarios()
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
    setInforme((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 🔹 Guardar o actualizar informe
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:3000/api/informes";

      if (isEditing) {
        await axios.put(`${url}/${informe.id}`, informe);
        setSuccess("Informe actualizado exitosamente");
      } else {
        await axios.post(url, informe);
        setSuccess("Informe registrado exitosamente");
        showModal("Informe registrado exitosamente");
      }

      setIsEditing(false);
      setInforme({
        motivo: "",
        descripcion: "",
        remitenteId: "",
      });

      fetchInformes();
    } catch (err) {
      setError("Error al guardar el informe");
      showModal("Error al guardar el informe");
    }
  };


  const handleEdit = (inf) => {
    setInforme(inf);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Está seguro de eliminar este informe?")) return;

    try {
      await axios.delete(`http://localhost:3000/api/informes/${id}`);
      setSuccess("Informe eliminado exitosamente");
      showModal("Informe eliminado exitosamente");
      fetchInformes();
    } catch (err) {
      setError("Error al eliminar el informe");
      showModal("Error al eliminar el informe");
    }
  };

  return (
    <div className="h-full bg-gray-100 p-2">
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
            {isEditing ? "Editar Informe" : "Nuevo Informe"}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Motivo</label>
                <input
                  type="text"
                  name="motivo"
                  value={informe.motivo}
                  onChange={handleChange}
                  className="mt-1 block w-full py-2 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-gray-700"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Descripción</label>
                <textarea
                  name="descripcion"
                  value={informe.descripcion}
                  onChange={handleChange}
                  className="mt-1 text-gray-700 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">ID Remitente</label>
                <select name="remitenteId"
                  value={informe.remitenteId}
                  onChange={handleChange}
                  className="mt-1 block w-full py-2 text-gray-700 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500">
                  <option>Seleccione el remitente</option>
                  {usuarios.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.nombres}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                {isEditing ? "Actualizar" : "Registrar"} Informe
              </button>
            </div>
          </form>
        </div>

        {/* Tabla de Informes */}
        <div className="bg-white p-6 rounded-lg shadow-lg overflow-x-auto">
          <h2 className="text-2xl font-bold mb-6 text-gray-700">Lista de Informes</h2>
          <table className="min-w-full border border-gray-300 text-gray-700">
            <thead className="bg-gray-50">
              <tr>
                <th className="border p-2">Motivo</th>
                <th className="border p-2">Descripción</th>
                <th className="border p-2">Remitente</th>
                <th className="border p-2">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {informes.map((inf) => (
                <tr key={inf.id} className="border">
                  <td className="p-2">{inf.motivo}</td>
                  <td className="p-2">{inf.descripcion}</td>
                  <td className="p-2">{inf.Usuario?.nombres || "Sin remitente"}</td>
                  <td className="p-2">
                    <button onClick={() => handleEdit(inf)} className="text-blue-500 hover:underline mr-2">Editar</button>
                    <button onClick={() => handleDelete(inf.id)} className="text-red-500 hover:underline">Eliminar</button>
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

export default Informes;
