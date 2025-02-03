"use client"
import { useAuth } from "../context/authContext";
import Link from "next/link";
import Image from "next/image";

function NavBar() {
  const { logout, isAuthenticated } = useAuth()

  return (
    <div className="py-4 px-6 bg-gray-800 w-full h-[15%] text-white text-center font-bold text-xl flex justify-end">
      {isAuthenticated ? (<button onClick={logout} className="px-2 py-3 rounded-md bg-green-600">
        Cerrar Sesión
      </button>) : (<div className="flex justify-between items-center w-full"> <Image
        src="/Logo-VillaSol.png"
        alt="Logo Conjunto Residencial"
        width={144}
        height={144}
        priority
      /> <div className="flex items-center gap-2"><Link href="auth/registro" className="px-2 py-3 rounded-md bg-green-600">
        Registrarse
      </Link><Link href="auth/login" className="px-2 py-3 rounded-md bg-green-600">
            Iniciar Sesión
          </Link></div></div>)}
    </div>
  );
}

export default NavBar;