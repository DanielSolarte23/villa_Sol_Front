"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";

const Apartamentos = () => {
  const [apartamentos, setApartamentos] = useState([]);
  const [apartamento, setApartamento] = useState({
    numeroApartamento: "",
    metros: "",
    estado: "ocupado",
    propietarioId: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState("");
  const [propietarios, setPropietarios] = useState([]);

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
    fetchApartamentos();
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setApartamento((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(apartamento);
    try {
      const url = "http://localhost:3000/api/apartamentos";

      if (isEditing) {
        await axios.put(`${url}/${apartamento.id}`, apartamento);
        setSuccess("Apartamento actualizado exitosamente");
        showModal("Apartamento actualizado exitosamente", "success");
      } else {
        await axios.post(url, apartamento);
        setSuccess("Apartamento creado exitosamente");
        showModal("Apartamento creado exitosamente", "success");
      }

      setIsEditing(false);
      setApartamento({
        numeroApartamento: "",
        metros: "",
        estado: "ocupado",
        propietarioId: "",
      });

      fetchApartamentos();
    } catch (err) {
      setError("Error al guardar el apartamento");
      showModal("Error al guardar el apartamento", "error");
    }
  };


  const handleEdit = (apt) => {
    setApartamento(apt);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Está seguro de eliminar este apartamento?")) return;

    try {
      await axios.delete(`http://localhost:3000/api/apartamentos/${id}`);
      setSuccess("Apartamento eliminado exitosamente");
      showModal("Apartamento eliminado exitosamente", "success");
      fetchApartamentos();
    } catch (err) {
      setError("Error al eliminar el apartamento");
      showModal("Error al eliminar el apartamento", "error");
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
        <div className="bg-white py-2 px-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-gray-700">
            {isEditing ? "Editar Apartamento" : "Nuevo Apartamento"}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Número de Apartamento</label>
                <input
                  type="text"
                  name="numeroApartamento"
                  value={apartamento.numeroApartamento}
                  onChange={handleChange}
                  className="mt-1 block w-full py-2 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-gray-700"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Metros Cuadrados</label>
                <input
                  type="number"
                  name="metros"
                  value={apartamento.metros}
                  onChange={handleChange}
                  className="mt-1 text-gray-700 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Estado</label>
                <select
                  name="estado"
                  value={apartamento.estado}
                  onChange={handleChange}
                  className="mt-1 block w-full py-2 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  required
                >
                  <option value="ocupado">Ocupado</option>
                  <option value="desocupado">Desocupado</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Propietario</label>
                <select name="propietarioId"
                  value={apartamento.propietarioId}
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
                {isEditing ? "Actualizar" : "Crear"} Apartamento
              </button>
            </div>
          </form>
        </div>

        {/* Tabla de Apartamentos */}
        <div className="bg-white py-2 px-6 rounded-lg shadow-lg overflow-x-auto">
          <h2 className="text-2xl font-bold mb-6 text-gray-700">Lista de Apartamentos</h2>
          <table className="min-w-full border border-gray-300 text-gray-700">
            <thead className="bg-gray-50">
              <tr>
                <th className="border p-2">Número de Apartamento</th>
                <th className="border p-2">Metros Cuadrados</th>
                <th className="border p-2">Estado</th>
                <th className="border p-2">Propietario</th>
                <th className="border p-2">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {apartamentos.map((apt) => (
                <tr key={apt.id} className="border">
                  <td className="p-2">{apt.numeroApartamento}</td>
                  <td className="p-2">{apt.metros}</td>
                  <td className="p-2">{apt.estado}</td>
                  <td className="p-2">{apt.Propietario?.nombres || "No asignado"}</td>
                  <td className="p-2">
                    <button onClick={() => handleEdit(apt)} className="text-blue-500 hover:underline mr-2">Editar</button>
                    <button onClick={() => handleDelete(apt.id)} className="text-red-500 hover:underline">Eliminar</button>
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

export default Apartamentos;
