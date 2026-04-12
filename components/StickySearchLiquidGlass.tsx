export const StickySearchLiquidGlass = () => {
  return (
    <div className="fixed top-1/2 left-0 z-50 w-full flex justify-center">
      <div
        className="relative w-1/2 h-32 bg-white/50 shadow backdrop-blur-sm
       rounded-2xl overflow-hidden"
      >
        <div className="liquidGlass-effect"></div>
        <svg>
          <filter id="glass-distortion">
            <feTurbulence
              type="fractalNoise"
              baseFrequency={"0.01 0.01"}
              numOctaves={"1"}
              seed={5}
              result="turbulence"
            />
            <feGaussianBlur in="turbulence" stdDeviation={3} result="softMap" />
            <feDisplacementMap in="SourceGraphic" in2={"softMap"} scale={150} />
          </filter>
        </svg>
      </div>
    </div>
  );
};
