import React from "react";

const InputBox = (props, className) => {
  return (
    <input
      className={`px-2 border-b border-b-black min-w-24 max-w-full min-h-10  outline-none placeholder:text-neutral-700 text-neutral-700 ${className}`}
      {...props}
    />
  );
};

export default InputBox;
