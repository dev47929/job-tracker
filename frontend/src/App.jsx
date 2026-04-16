import { use, useContext, useState } from "react";
import "./App.css";
import Landing from "./components/public/landing";
import Grainient from "./reactbits/gradient";
import { userContext } from "./components/private/UserContext";
function App() {
  const [token , setToken]= useState();
  const [userName , setUserName]= useState();

  const userContext = useContext();
  return (
    <userContext.Provider value={{userName , setUserName , setToken , token}}>
      <div style={{ width: "100%", position: "relative" }} className="h-full">
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: -1,
          }}
        >
          <Grainient
            color1="#000000"
            color2="#57498d"
            color3="#515053"
            timeSpeed={2.55}
            colorBalance={0}
            warpStrength={1}
            warpFrequency={5}
            warpSpeed={2}
            warpAmplitude={50}
            blendAngle={0}
            blendSoftness={0.05}
            rotationAmount={500}
            noiseScale={2}
            grainAmount={0.1}
            grainScale={2}
            grainAnimated={false}
            contrast={1.5}
            gamma={1}
            saturation={1}
            centerX={0}
            centerY={0}
            zoom={0.9}
          />
        </div>
        <Landing />
      </div>
    </userContext.Provider>
  );
}

export default App;
