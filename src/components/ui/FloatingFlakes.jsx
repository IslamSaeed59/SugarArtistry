import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const FloatingFlakes = () => {
  const [flakes, setFlakes] = useState([]);

  useEffect(() => {
    // Generate random flakes on mount to avoid hydration mismatch if SSR (though Vite is CSR)
    const newFlakes = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 4 + 2, // 2px to 6px
      duration: Math.random() * 20 + 15, // 15s to 35s
      delay: Math.random() * 5,
    }));
    setFlakes(newFlakes);
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {flakes.map((flake) => (
        <motion.div
          key={flake.id}
          className="absolute rounded-full bg-rose-gold/60 shadow-[0_0_8px_rgba(192,127,115,0.8)]"
          style={{
            left: flake.left,
            top: flake.top,
            width: flake.size,
            height: flake.size,
          }}
          animate={{
            y: ["0vh", "-100vh"],
            x: ["0px", `${Math.random() * 100 - 50}px`, "0px"],
            opacity: [0, 0.8, 0],
            scale: [1, 1.5, 1],
          }}
          transition={{
            y: {
              duration: flake.duration,
              repeat: Infinity,
              ease: "linear",
              delay: flake.delay,
            },
            x: {
              duration: flake.duration / 2,
              repeat: Infinity,
              ease: "easeInOut",
              repeatType: "mirror",
              delay: flake.delay,
            },
            opacity: {
              duration: flake.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: flake.delay,
            },
            scale: {
              duration: flake.duration / 3,
              repeat: Infinity,
              ease: "easeInOut",
              repeatType: "mirror",
              delay: flake.delay,
            },
          }}
        />
      ))}
    </div>
  );
};

export default FloatingFlakes;
