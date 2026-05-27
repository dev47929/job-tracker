import { Outlet } from "react-router-dom";
import Navbar from "../../components/landing/Navbar";

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-slate-950 via-slate-900 to-slate-950 text-white">
      <Navbar />
      <div className="mx-auto flex min-h-[calc(100vh-80px)] items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="w-full max-w-md overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/95 p-8 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
