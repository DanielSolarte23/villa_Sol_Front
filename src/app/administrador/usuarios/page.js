"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState("");
  const [usuario, setUsuario] = useState({
    nombres: "",
    documentoIdentidad: "",
    nombreDeUsuario: "",
    password: "",
    rol: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // 🔹 Obtener los usuarios desde la API
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
    fetchUsuarios();
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
    setUsuario((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 🔹 Guardar o actualizar usuario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:3000/api/usuarios";

      if (isEditing) {
        await axios.put(`${url}/${usuario.id}`, usuario);
        setSuccess("Usuario actualizado exitosamente");
        showModal("Usuario actualizado exitosamente");
      } else {
        await axios.post(url, usuario);
        setSuccess("Usuario registrado exitosamente");
        showModal("Usuario registrado exitosamente");
      }

      setIsEditing(false);
      setUsuario({
        nombres: "",
        documentoIdentidad: "",
        nombreDeUsuario: "",
        password: "",
        rol: "",
      });

      fetchUsuarios();
    } catch (err) {
      setError("Error al guardar el usuario");
      showModal("Error al guardar el Usuario ");
    }
  };


  const handleEdit = (usr) => {
    setUsuario(usr);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Está seguro de eliminar este usuario?")) return;

    try {
      await axios.delete(`http://localhost:3000/api/usuarios/${id}`);
      setSuccess("Usuario eliminado exitosamente");
      showModal("Usuario eliminado exitosamente");
      fetchUsuarios();
    } catch (err) {
      setError("Error al eliminar el usuario");
      showModal("Error al eliminar el usuario");
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
        <div className="bg-white px-6 py-3 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-gray-700">
            {isEditing ? "Editar Usuario" : "Nuevo Usuario"}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nombres</label>
                <input
                  type="text"
                  name="nombres"
                  value={usuario.nombres}
                  onChange={handleChange}
                  className="mt-1 block w-full py-2 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-gray-700"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Documento de Identidad</label>
                <input
                  type="text"
                  name="documentoIdentidad"
                  value={usuario.documentoIdentidad}
                  onChange={handleChange}
                  className="mt-1 block w-full py-2 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-gray-700"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Nombre de Usuario</label>
                <input
                  type="text"
                  name="nombreDeUsuario"
                  value={usuario.nombreDeUsuario}
                  onChange={handleChange}
                  className="mt-1 block w-full py-2 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-gray-700"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Contraseña</label>
                <input
                  type="password"
                  name="password"
                  value={usuario.password}
                  onChange={handleChange}
                  className="mt-1 block w-full py-2 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-gray-700"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Rol</label>
                <select
                  name="rol"
                  value={usuario.rol}
                  onChange={handleChange}
                  className="mt-1 block w-full py-2 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-gray-700"
                  required
                >
                  <option value="">Selecciona un rol</option>
                  <option value="admin">Administrador</option>
                  <option value="seguridad">Seguridad</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                {isEditing ? "Actualizar" : "Registrar"} Usuario
              </button>
            </div>
          </form>
        </div>

        {/* Tabla de Usuarios */}
        <div className="bg-white p-6 rounded-lg shadow-lg overflow-x-auto">
          <h2 className="text-2xl font-bold mb-6 text-gray-700">Lista de Usuarios</h2>
          <table className="min-w-full border border-gray-300 text-gray-700">
            <thead className="bg-gray-50">
              <tr>
                <th className="border p-2">Nombres</th>
                <th className="border p-2">Documento de Identidad</th>
                <th className="border p-2">Nombre de Usuario</th>
                <th className="border p-2">Rol</th>
                <th className="border p-2">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {usuarios.map((usr) => (
                <tr key={usr.id} className="border">
                  <td className="p-2">{usr.nombres}</td>
                  <td className="p-2">{usr.documentoIdentidad}</td>
                  <td className="p-2">{usr.nombreDeUsuario}</td>
                  <td className="p-2">{usr.rol}</td>
                  <td className="p-2">
                    <button onClick={() => handleEdit(usr)} className="text-blue-500 hover:underline mr-2">Editar</button>
                    <button onClick={() => handleDelete(usr.id)} className="text-red-500 hover:underline">Eliminar</button>
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

export default Usuarios;
