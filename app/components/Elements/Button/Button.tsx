import type { ButtonHTMLAttributes } from "react";
import React from "react";
import { Spinner } from "../Spinner";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  isLoading?: boolean;
};

const Button = ({
  children,
  isLoading,
  startIcon,
  endIcon,
  ...props
}: ButtonProps) => {
  return (
    <button
      className="flex items-center  rounded-md bg-indigo-500 px-6 py-2 font-medium text-white transition-all"
      {...props}
    >
      {isLoading && <Spinner className="animate-spin text-3xl" />}
      {!isLoading && startIcon && <span className="text-3xl">{startIcon}</span>}
      <span className="mx-2">{children}</span>
      {!isLoading && endIcon && <span className="text-3xl">{endIcon}</span>}
    </button>
  );
};

export default Button;
