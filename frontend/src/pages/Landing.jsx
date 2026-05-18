import Hero from "../components/landing/Hero";
import Iphone from "../components/ui/Iphone";
import Navbar from "../components/landing/Navbar";

function Landing() {
  return (
    <div className="min-h-screen flex flex-col bg-transparent">
      <Navbar />
      <div className="flex-1 flex flex-col md:flex-row gap-0 max-w-7xl mx-auto w-full px-6">
        {/* Left column: Hero text */}
        <div className="w-full md:w-1/2 flex items-center justify-center py-12 md:py-0">
          <Hero />
        </div>
        {/* Right column: Interactive 3D dome/globe */}
        <div className="w-full md:w-1/2 h-[50vh] md:h-auto flex items-center justify-center relative">
          <div className="absolute inset-0">
            <Iphone />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
