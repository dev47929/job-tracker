import Hero from "./LandingComponents/Hero";
import Mobile from "./LandingComponents/iphone";
import Nav from "./LandingComponents/Navbar";

function Landing() {
  return (
    <>
      <Nav></Nav>
      <div className="flex flex-col md:flex-row gap-0 bg-transparent ">
        <div className="h-screen w-full md:w-1/2 flex items-center justify-center px-6 md:px-12">
          <Hero></Hero>
        </div>
        <div className="h-screen w-full md:w-1/2">
          <Mobile></Mobile>
        </div>
      </div>
    </>
  );
}

export default Landing;
