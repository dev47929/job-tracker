import { Outlet } from "react-router-dom";
import Navbar from "../../components/landing/Navbar";

export default function AuthLayout() {
  return (
    <>
      <Navbar />
      <div className="min-h-[calc(100vh-80px)] bg-transparent flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-2xl p-8 shadow-2xl">
          <Outlet />
        </div>
      </div>
    </>
  );
}
