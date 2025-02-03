"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useAuth } from "@/app/context/authContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

function page() {
  const { register: signUp } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [registerError, setRegisterError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      setRegisterError("");

      const result = await signUp({
        nombres: data.nombres,
        documentoIdentidad: data.documentoIdentidad,
        nombreDeUsuario: data.nombreDeUsuario,
        password: data.password,
        rol: data.rol
      });

      if (result.success) {
        router.push("/administrador");
      } else {
        setRegisterError(result.error || "Error en el registro");
      }
    } catch (error) {
      setRegisterError("Ocurrió un error durante el registro");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center  items-center h-screen w-screen bg-cover bg-center bg-no-repeat fixed top-0 left-0 z-[-1] fondo">
      <div className="bg-black bg-opacity-60 p-4 rounded-lg shadow-lg max-w-xl w-full mx-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white px-6 py-2 rounded-lg shadow-lg flex flex-col items-center"
        >
          <div className="flex justify-center items-center border">
            <Image
              src="/Logo-VillaSol.png"
              alt="Logo Conjunto Residencial"
              width={120}
              height={90}
              priority
            />
          </div>

          <h1 className="text-xl font-bold text-gray-800 text-center">
            Registro de Usuario
          </h1>

          {registerError && (
            <div className="w-full p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm">
              {registerError}
            </div>
          )}

          <div className="grid grid-cols-2 w-full gap-1">
            <div>
              <div className="mb-4 w-full">
                <label htmlFor="nombres" className="block text-gray-600 mb-1 text-sm">
                  Nombres
                </label>
                <input
                  {...register("nombres", {
                    required: "El nombre es requerido"
                  })}
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                />
                {errors.nombres && (
                  <span className="text-red-500 text-xs mt-1">
                    {errors.nombres.message}
                  </span>
                )}
              </div>

              <div className="mb-4 w-full">
                <label htmlFor="documentoIdentidad" className="block text-gray-600 mb-1 text-sm">
                  Documento de Identidad
                </label>
                <input
                  {...register("documentoIdentidad", {
                    required: "El documento de identidad es requerido"
                  })}
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                />
                {errors.documentoIdentidad && (
                  <span className="text-red-500 text-xs mt-1">
                    {errors.documentoIdentidad.message}
                  </span>
                )}
              </div>
            </div>

            <div>
              <div className="mb-4 w-full">
                <label htmlFor="nombreDeUsuario" className="block text-gray-600 mb-1 text-sm">
                  Nombre de Usuario
                </label>
                <input
                  {...register("nombreDeUsuario", {
                    required: "El nombre de usuario es requerido",
                    minLength: {
                      value: 3,
                      message: "El nombre de usuario debe tener al menos 3 caracteres"
                    }
                  })}
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                />
                {errors.nombreDeUsuario && (
                  <span className="text-red-500 text-xs mt-1">
                    {errors.nombreDeUsuario.message}
                  </span>
                )}
              </div>

              <div className="mb-4 w-full">
                <label htmlFor="password" className="block text-gray-600 mb-1 text-sm">
                  Contraseña
                </label>
                <input
                  {...register("password", {
                    required: "La contraseña es requerida",
                    minLength: {
                      value: 6,
                      message: "La contraseña debe tener al menos 6 caracteres"
                    }
                  })}
                  type="password"
                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                />
                {errors.password && (
                  <span className="text-red-500 text-xs mt-1">
                    {errors.password.message}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="mb-4 w-full">
            <label htmlFor="rol" className="block text-gray-600 mb-1 text-sm">
              Rol
            </label>
            <select
              {...register("rol", {
                required: "El rol es requerido"
              })}
              className="w-full p-2 border border-gray-300 rounded-md text-sm"
            >
              <option value="">Seleccionar rol</option>
              <option value="seguridad">Seguridad</option>
              <option value="admin">Administrador</option>
            </select>
            {errors.rol && (
              <span className="text-red-500 text-xs mt-1">
                {errors.rol.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full p-2 bg-green-500 text-white rounded-md text-sm transition duration-300 mb-4
              ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-600'}`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Registrando...
              </span>
            ) : (
              'Registrar'
            )}
          </button>

          <div className="mt-4 text-center">
            <Link href="/" className="text-blue-500 text-sm hover:underline">
              ¿Ya tienes cuenta? Inicia sesión
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default page;