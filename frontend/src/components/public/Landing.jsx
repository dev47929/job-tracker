import Hero from "./LandingComponents/Hero";
import Mobile from "./LandingComponents/iphone";
import Nav from "./LandingComponents/Navbar";

function Landing() {
  return (
    <>
      <Nav></Nav>
      <div className="flex justify-between md:flex-row flex-col bg-transparent">
        <Hero></Hero>
        <Mobile></Mobile>
      </div>
    </>
  );
}

export default Landing;
