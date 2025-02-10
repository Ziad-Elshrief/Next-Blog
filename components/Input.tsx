import React from "react";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(({ type, ...props }, ref) => {
  return (
    <input
      type={type}
      className="border-background-400 bg-background-800 caret-primary-hover w-full rounded-lg p-1.5 placeholder-gray-400 shadow"
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";
