import type { InputHTMLAttributes } from "react";
import React from "react";
import { fn } from "~/utils";
import { InputWrapper } from "./InputWrapper";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  errorMessage?: string[] | string;
};

export const InputField = ({
  label,
  startIcon,
  endIcon,
  errorMessage,
  className,
  name,
  required,
  ...props
}: InputFieldProps) => {
  return (
    <InputWrapper
      label={label}
      startIcon={startIcon}
      endIcon={endIcon}
      errorMessage={errorMessage}
      required={required}
      name={name}
    >
      <input
        name={name}
        className={fn(
          "w-full rounded-md border border-gray-300 py-2 px-2  text-gray-800 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500",
          startIcon && "pl-10",
          endIcon && "pr-10",
          errorMessage &&
            "border-red-300 placeholder:text-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500",
          className
        )}
        aria-invalid={errorMessage ? true : undefined}
        aria-describedby={`${name}-error`}
        required={required}
        {...props}
      />
    </InputWrapper>
  );
};
