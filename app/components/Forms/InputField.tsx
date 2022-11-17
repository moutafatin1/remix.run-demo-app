import type { InputHTMLAttributes } from "react";
import React from "react";
import { AiFillExclamationCircle } from "react-icons/ai";
import { fn } from "~/utils";

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
    <label className="w-full space-y-1">
      {label && (
        <span className="text-sm font-medium capitalize text-gray-700">
          {label} {required && "*"}
        </span>
      )}
      <div className="relative rounded-md shadow-sm">
        {startIcon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-xl text-gray-600">
            {startIcon}
          </div>
        )}
        <input
          name={name}
          className={fn(
            "w-full rounded-md border border-gray-300 py-2  px-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500",
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
        {endIcon && !errorMessage && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-xl text-gray-600">
            {endIcon}
          </div>
        )}
        {errorMessage && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-xl text-red-500">
            <AiFillExclamationCircle className="" />
          </div>
        )}
      </div>
      {errorMessage && (
        <p
          id={`${name}-error`}
          role="alert"
          className="mt-2 text-sm text-red-600"
        >
          {errorMessage}
        </p>
      )}
    </label>
  );
};
