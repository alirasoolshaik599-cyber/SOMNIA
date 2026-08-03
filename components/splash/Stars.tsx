"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const starColors = ["#FFFFFF", "#F8FBFF", "#E6F0FF", "#FFF8E1"];

type Star = {
  id: number;
  size: number;
  top: number;
  left: number;
  opacity: number;
  duration: number;
  color: string;
};

export default function Stars() {
  const [stars, setStars] = useState<Star[]>([]);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handleChange);

    // Fewer stars on narrow viewports keeps first paint light on mobile devices.
    const starCount = window.innerWidth < 640 ? 400 : 1000;

    const generatedStars: Star[] = Array.from({ length: starCount }, (_, i) => ({
      id: i,
      size: Math.random() * 2.5 + 0.4,
      top: Math.random() * 100,
      left: Math.random() * 100,
      opacity: Math.random() * 0.8 + 0.2,
      duration: Math.random() * 5 + 2,
      color: starColors[Math.floor(Math.random() * starColors.length)],
    }));

    setStars(generatedStars);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full"
          style={{
            width: star.size,
            height: star.size,
            top: `${star.top}%`,
            left: `${star.left}%`,
            backgroundColor: star.color,
            opacity: star.opacity,
            boxShadow: `0 0 ${star.size * 6}px ${star.color}`,
          }}
          animate={
            reducedMotion
              ? undefined
              : {
                  opacity: [star.opacity, star.opacity * 0.35, star.opacity],
                  scale: [1, 1.2, 1],
                }
          }
          transition={{
            duration: star.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}