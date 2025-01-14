// import React from 'react'

// function NavBar() {
//   return (
//     <div>aqui va la barra  NavBar</div>
//   )
// }

// export default NavBar


"use client"; // Para usar hooks en Next.js

import React, { useState } from "react";
import { FaBuilding, FaUserAlt, FaWalking, FaDollarSign, FaFileAlt, FaUsers } from "react-icons/fa";

function NavBar() {
  return (
    <div className="py-4 px-6 bg-gray-800 text-white text-center font-bold text-xl">
      Aquí va la barra NavBar
    </div>
  );
}

function Sidebar() {
  const [active, setActive] = useState("visitantes");

  const menuItems = [
    { id: "apartamentos", label: "Apartamentos", icon: <FaBuilding /> },
    { id: "propietarios", label: "Propietarios", icon: <FaUserAlt /> },
    { id: "visitantes", label: "Visitantes", icon: <FaWalking /> },
    { id: "pagos", label: "Pagos", icon: <FaDollarSign /> },
    { id: "informes", label: "Registro de informes", icon: <FaFileAlt /> },
    { id: "usuarios", label: "Gestion de usuarios", icon: <FaUsers /> },
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-60 bg-gray-100 shadow-lg flex flex-col">
        <div className="py-4 px-6 text-center bg-green-500 text-white text-lg font-bold">
          Panel de Gestión
        </div>
        <div className="flex-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              className={`flex items-center gap-3 p-4 w-full text-left text-white font-medium text-lg rounded-lg ${
                active === item.id ? "bg-black" : "bg-green-500"
              } hover:bg-green-600`}
            >
              <span className="text-2xl">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Main Content */}
      <div className="flex-1 bg-gray-50">
        {/* NavBar */}
        <NavBar />
        <div className="p-6">
          <h1 className="text-2xl font-bold">Contenido Principal</h1>
          <p>Aquí se mostrará el contenido de la aplicación.</p>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
