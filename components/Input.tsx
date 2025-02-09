import React from "react";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(({ type, ...props }, ref) => {
  return (
    <input
      type={type}
      className="w-full rounded-lg border-gray-700 bg-gray-800 p-1.5 text-white placeholder-gray-400 caret-primary-hover"
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";
