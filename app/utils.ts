import type { z } from "zod";

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
