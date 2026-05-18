import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <>
      <div className="flex flex-col gap-4 text-center md:text-left">
        <h1 className="pt-20 mb-4 text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl leading-tight">
          Take{" "}
          <span className="px-3 py-1 text-white bg-indigo-650 rounded-xl shadow-lg shadow-indigo-650/30">
            control
          </span>{" "}
          of your job search
        </h1>

        <p className="text-lg font-normal text-slate-350 lg:text-xl max-w-xl">
          Track applications, manage deadlines, and stay organized, all in one
          simple dashboard built for student developers and tech job seekers.
        </p>
        
        <div className="flex justify-center md:justify-start flex-row items-center gap-4 mt-6">
          <Link className="px-6 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-semibold shadow-lg shadow-indigo-500/25 transition cursor-pointer" to={"/auth/login"}>
            Login
          </Link>
          <Link className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold transition cursor-pointer" to={"/auth/signup"}>
            Signup
          </Link>
        </div>
      </div>
    </>
  );
};

export default Hero;
