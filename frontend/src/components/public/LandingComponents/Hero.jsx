import { Link, Links } from "react-router";

const Hero = () => {
  return (
    <>
      <div className="flex flex-col gap-1">
  <h1 className="pt-20 mb-4 text-4xl font-bold tracking-tight text-heading md:text-5xl lg:text-6xl">
    Take{" "}
    <span className="px-2 py-0.5 text-white bg-blue-800 rounded-md">
      control
    </span>{" "}
    of your job search
  </h1>

  <p className="text-lg font-normal text-body lg:text-xl">
    Track applications, manage deadlines, and stay organized, all in one
    simple dashboard built for students.
  </p>
  <div className="flex justify-center flex-row items-center gap-3">

  <button class="btn btn-soft btn-primary ">Login</button>
<button class="btn btn-soft btn-secondary ">Signup</button>
  </div>
</div>
    </>
  );
};

export default Hero;
