import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-xl shadow-sm">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 sm:px-8">
        <Link to="/" className="text-xl font-extrabold tracking-tight text-slate-950">
          Job<span className="text-indigo-600">Stack</span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-semibold text-slate-600 md:flex">
          <a href="#features" className="transition hover:text-slate-950">
            Features
          </a>
          <a href="#solutions" className="transition hover:text-slate-950">
            Solutions
          </a>
          <a href="#trust" className="transition hover:text-slate-950">
            Trusted
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/auth/login"
            className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Login
          </Link>
          <Link
            to="/auth/signup"
            className="rounded-full bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-700"
          >
            Create account
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
