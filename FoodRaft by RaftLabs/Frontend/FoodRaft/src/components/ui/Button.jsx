import { motion } from "framer-motion";
import { MiniLoader } from "../layout/Loader";

export const FillButton = ({
  text,
  style,
  theme,
  isLoading = false,
  ...props
}) => {
  return (
    <motion.button
      className={`relative px-6 py-3 font-semibold text-black border border-black overflow-hidden cursor-pointer ${style}`}
      whileHover="hover"
      initial="initial"
      {...props}
    >
      {/* Filling background layer */}
      <motion.div
        className="absolute inset-0 bg-black z-0"
        variants={{
          initial: { width: "0%" },
          hover: { width: "100%" },
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      />

      {/* Button text (must have z-index to stay visible) */}
      {isLoading ? (
        <MiniLoader theme={theme} />
      ) : (
        <motion.span
          className="relative z-10 block"
          variants={{
            initial: { color: "#000000" },
            hover: { color: "#ffffff" },
          }}
        >
          {text ? text : "Hover Me"}
        </motion.span>
      )}
    </motion.button>
  );
};

export const UnderlineButton = ({
  onClick,
  children,
  disabled,
  width,
  color = "oklch(20.5% 0 none)",
}) => {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      style={{
        width: width,
        background: "none",
        border: "none",
        padding: "8px 16px",
        fontSize: "16px",
        // fontWeight: "semibold",
        cursor: "pointer",
        position: "relative",
        outline: "none",
        color: color,
      }}
      className="font-semibold"
      whileHover="hover"
      initial="initial"
    >
      {/* button text */}
      <motion.span
        variants={{
          initial: { opacity: 0.85 },
          hover: { opacity: 1 },
        }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.span>

      {/* The Animated Underline */}
      <motion.div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "1px",
          backgroundColor: color,
          originX: 0,
        }}
        variants={{
          initial: { scaleX: 0 },
          hover: { scaleX: 1 },
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      />
    </motion.button>
  );
};
