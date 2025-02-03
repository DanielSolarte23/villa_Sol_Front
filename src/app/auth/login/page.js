"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useAuth } from "@/app/context/authContext";
import { useRouter } from "next/navigation";
import Image from "next/image";

function page() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loginError, setLoginError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      setLoginError("");

      const result = await login({
        nombreDeUsuario: data.nombreDeUsuario,
        password: data.password
      });

      if (result.success) {
        router.push("/administrador");
      } else {
        setLoginError(result.error || "Error al iniciar sesión");
      }
    } catch (error) {
      setLoginError("Ocurrió un error durante el inicio de sesión");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen bg-cover bg-center bg-no-repeat fixed top-0 left-0 z-[-1] fondo">
      <div className="bg-black bg-opacity-60 p-4 rounded-lg shadow-lg max-w-xl w-full mx-4">
        <form 
          onSubmit={handleSubmit(onSubmit)} 
          className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center"
        >
          <div className="flex justify-center items-center mb-4">
            <Image
              src="/Logo-VillaSol.png"
              alt="Logo Conjunto Residencial"
              width={144}
              height={144}
              priority
            />
          </div>

          <h1 className="text-xl font-bold text-gray-800 mb-2 text-center">
            Iniciar Sesión
          </h1>

          {loginError && (
            <div className="w-full p-3 mb-4 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm">
              {loginError}
            </div>
          )}

          <div className="mb-4 w-full">
            <label htmlFor="nombreDeUsuario" className="block text-gray-600 mb-1 text-sm">
              Nombre de Usuario
            </label>
            <input
              id="nombreDeUsuario"
              {...register("nombreDeUsuario", {
                required: "El nombre de usuario es requerido",
                minLength: {
                  value: 3,
                  message: "El nombre de usuario debe tener al menos 3 caracteres"
                }
              })}
              type="text"
              autoComplete="username"
              className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              aria-label="Nombre de Usuario"
              aria-required="true"
              aria-invalid={errors.nombreDeUsuario ? "true" : "false"}
            />
            {errors.nombreDeUsuario && (
              <span className="text-red-500 text-xs mt-1" role="alert">
                {errors.nombreDeUsuario.message}
              </span>
            )}
          </div>

          <div className="mb-4 w-full">
            <label htmlFor="password" className="block text-gray-600 mb-1 text-sm">
              Contraseña
            </label>
            <input
              id="password"
              {...register("password", {
                required: "La contraseña es requerida",
                minLength: {
                  value: 6,
                  message: "La contraseña debe tener al menos 6 caracteres"
                }
              })}
              type="password"
              autoComplete="current-password"
              className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              aria-label="Contraseña"
              aria-required="true"
              aria-invalid={errors.password ? "true" : "false"}
            />
            {errors.password && (
              <span className="text-red-500 text-xs mt-1" role="alert">
                {errors.password.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full p-2 bg-green-500 text-white rounded-md text-sm transition duration-300 mb-4 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2
              ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-600'}`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Iniciando sesión...
              </span>
            ) : (
              'Iniciar Sesión'
            )}
          </button>

          <div className="mt-4 text-center">
            <a 
              href="/forgot-password" 
              className="text-blue-500 text-sm hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
            >
              ¿Olvidaste tu contraseña?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default page;