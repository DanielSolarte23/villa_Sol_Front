'use client'
import React from 'react'
import { useAuth } from '../context/authContext';

function PrincipalAdmin() {
  const { user } = useAuth();
  return (
    <div className='w-full h-full text-left text-4xl flex flex-col justify-center items-center font-semibold gap-5'>
      <h1 className='font-extrabold text-5xl'>Bienvenido</h1>
      <div>
        <p><strong>Nombre:</strong>{user.nombres}</p>
        <p><strong>Rol:</strong>{user.rol}</p>
      </div>
    </div>
  )
}

export default PrincipalAdmin;