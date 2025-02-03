"use client";
import PrivateRoute from "@/app/components/PrivateRoute";
import Sidebar from "@/app/components/NavBar"
import NavBar from "../components/Header";

export default function ProtectedLayout({ children }) {
  return (
    <PrivateRoute>
      <main className="flex h-screen">
        <div className="h-full"><Sidebar /></div>
        <div className="flex-1 bg-gray-50">
          {/* NavBar */}
          <NavBar />
          <div className="p-2 h-[85%] w-full">
            {children}
          </div>
        </div>
      </main>
    </PrivateRoute>
  );
}