import * as yup from "yup";

export const validate = (object: unknown, schema: yup.AnySchema): string[] | null => {
  try {
    schema.validateSync(object, { strict: true });
    return null;
  } catch (error) {
    if (error instanceof yup.ValidationError) return error.errors;
  }
  return ["Internal error"];
};
