import { json } from "@remix-run/node";
import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { z } from "zod";

export const badRequest = <T>(data: T) => json(data, { status: 400 });

export const validateForm = async <T>(
  request: Request,
  schema: z.ZodSchema<T>
) => {
  const formData = await request.formData();
  const fields = Object.fromEntries(formData) as unknown as z.infer<
    typeof schema
  >;
  const result = schema.safeParse(fields);
  if (!result.success) {
    return {
      fields,
      errors: result.error.flatten(),
    };
  }
  return {
    fields,
    errors: undefined,
  };
};

export const fn = (...classes: ClassValue[]) => {
  return twMerge(clsx(classes));
};
