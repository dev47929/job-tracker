import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="space-y-8 pt-12 pb-10 lg:pt-20 lg:pb-0">
      <div className="inline-flex items-center gap-2 rounded-full bg-indigo-100/90 px-4 py-2 text-sm font-semibold text-indigo-700 shadow-sm ring-1 ring-indigo-200">
        <span className="h-2 w-2 rounded-full bg-indigo-600" />
        AI-enhanced application tracking for every role
      </div>

      <div className="space-y-6 max-w-3xl">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
          Accelerate hiring progress with a smarter job search workspace.
        </h1>
        <p className="text-lg leading-8 text-slate-600">
          Organize every application, interview, and follow-up in a single platform designed to help developers move faster and stay focused.
        </p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <Link
          to="/auth/signup"
          className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-700"
        >
          Create account
        </Link>
        <Link
          to="/auth/login"
          className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
        >
          Login
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-white/95 p-5 shadow-sm">
          <p className="text-sm text-slate-500">Applications tracked</p>
          <p className="mt-3 text-2xl font-bold text-slate-950">1,200+</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white/95 p-5 shadow-sm">
          <p className="text-sm text-slate-500">Automation accuracy</p>
          <p className="mt-3 text-2xl font-bold text-indigo-600">98%</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white/95 p-5 shadow-sm">
          <p className="text-sm text-slate-500">Average time saved</p>
          <p className="mt-3 text-2xl font-bold text-slate-950">6 hrs</p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
