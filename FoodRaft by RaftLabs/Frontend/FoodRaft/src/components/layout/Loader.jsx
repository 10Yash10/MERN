import React from "react";

const Loader = () => {
  return (
    <div className="w-screen h-screen bg-white flex items-center justify-center">
      <div className="w-10 h-10 rounded-full border-t-4 border-t-neutral-900 animate-spin" />
    </div>
  );
};

export const MiniLoader = ({ theme = "light" }) => {
  const isDark = theme === "dark";

  return (
    <div
      className={`w-4 h-4 rounded-full flex items-center justify-center border ${
        isDark
          ? "border-neutral-700 bg-neutral-900"
          : "border-neutral-200 bg-white"
      }`}
    >
      <div
        className={`w-4 h-4 rounded-full border border-transparent animate-spin ${
          isDark ? "border-t-white" : "border-t-neutral-900"
        }`}
      />
    </div>
  );
};

export default Loader;
