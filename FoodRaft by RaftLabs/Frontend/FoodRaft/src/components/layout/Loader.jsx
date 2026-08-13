import React from "react";

const Loader = () => {
  return (
    <div className="w-screen h-screen bg-white flex items-center justify-center">
      <div className="w-10 h-10 rounded-full border-t-4 border-t-neutral-900 animate-spin" />
    </div>
  );
};

export default Loader;
