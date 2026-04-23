import DomeGallery from "../../../reactbits/LandingGlobe";

const Mobile = () => {
  return (
    <>
      <DomeGallery
        fit={1}
        minRadius={1000}
        maxVerticalRotationDeg={0}
        segments={60}
        dragDampening={2}
        grayscale = {false}
        overlayBlurColor="transparent"
      />
    </>
  );
};

export default Mobile;
