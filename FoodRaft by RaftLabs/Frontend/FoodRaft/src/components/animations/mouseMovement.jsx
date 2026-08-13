import { useMotionValue, useTransform, useSpring, motion } from "motion/react";
import { useEffect } from "react";

export const useMouseMovement = () => {
  const valX = useMotionValue(0);
  const valY = useMotionValue(0);

  useEffect(() => {
    const moveMouse = (e) => {
      valX.set(e.clientX);
      valY.set(e.clientY);
    };

    window.addEventListener("mousemove", moveMouse);

    return () => {
      window.removeEventListener("mousemove", moveMouse);
    };
  }, [valX, valY]);

  const transformedX = useTransform(
    valX,
    (val) => (val - window.innerWidth / 2) / (window.innerWidth / 2),
  );
  const transformedY = useTransform(
    valY,
    (val) => (val - window.innerHeight / 2) / (window.innerHeight / 2),
  );

  const mouseX = useTransform(transformedX, [-1, 1], [-50, 50]);
  const mouseY = useTransform(transformedY, [-1, 1], [-50, 50]);

  const x = useSpring(mouseX, { stiffness: 350, damping: 35 });
  const y = useSpring(mouseY, { stiffness: 350, damping: 35 });

  return {
    x,
    y,
  };
};
