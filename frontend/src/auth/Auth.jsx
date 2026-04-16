import { Outlet } from "react-router-dom";
import Nav from "../components/public/LandingComponents/Navbar";

export default function Auth() {
  return (<>
    <Nav></Nav>
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl">
        <Outlet />
      </div>
    </div>
  </>
  );
}
