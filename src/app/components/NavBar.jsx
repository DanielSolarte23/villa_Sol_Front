"use client";

import React, { useState } from "react";
import Link from "next/link";
import '@fortawesome/fontawesome-free/css/all.min.css';

function Sidebar() {
  const [active, setActive] = useState("");

  const menuItems = [
    { id: "apartamentos", label: "Apartamentos", icon: "fa-hotel", href: "/administrador/apartamentos" },
    { id: "propietarios", label: "Propietarios", icon: "fa-user", href: "/administrador/propietarios" },
    { id: "visitantes", label: "Visitantes", icon: "fa-users", href: "/administrador/visitas" },
    { id: "pagos", label: "Pagos", icon: "fa-credit-card", href: "/administrador/pagos" },
    { id: "informes", label: "Registro de informes", icon: "fa-file-alt", href: "/administrador/informes" },
    { id: "usuarios", label: "Gestión de usuarios", icon: "fa-user-cog", href: "/administrador/usuarios" },
  ];

  return (
    <div className="w-60 bg-gray-100 shadow-lg flex flex-col h-full">
      <div className="py-4 px-6 text-center border border-black bg-green-500 text-white text-lg font-bold">
        Panel de Gestión
      </div>
      <div className="h-full w-full grid grid-rows-6">
        {menuItems.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className={`flex items-center gap-3 border border-black p-4 w-full text-left text-white font-medium text-lg 
              ${active === item.id ? "bg-black" : "bg-green-500"} hover:bg-green-600`}
            onClick={() => setActive(item.id)}
          >
            <i className={`fa-solid ${item.icon} text-2xl`} aria-hidden="true"></i>
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
