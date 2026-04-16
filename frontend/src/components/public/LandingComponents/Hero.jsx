import { Link, Links } from "react-router";

const Hero = () => {
  return (
    <>
      <div className="hero min-h-screen">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Hello there</h1>
            <p className="py-6">
              Applied to 20 jobs and forgot half of them? JobStack keeps your
              entire job hunt organized.
            </p>
            <div className="flex justify-center">
              <Link to="/auth/login">
                <button className="btn btn-primary mx-1  ">Login
              </button>
              </Link>
                <Link to="/auth/signup">
              <button className="btn btn-primary mx-1">Signup</button>
                </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
