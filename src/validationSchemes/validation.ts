import * as yup from "yup";

export const validateSchema = (schema: yup.AnySchema, object: any) => {
  return {
    then: (onSuccess: () => void) => ({
      catch: (onFailure: (errors: string[]) => void): boolean => {
        try {
          schema.validateSync(object, { strict: true });
          onSuccess();
          return true;
        } catch (error) {
          if (error instanceof yup.ValidationError) onFailure(error.errors);
          return false;
        }
      },
    }),
    catch: (onFailure: (errors: string[]) => void): boolean => {
      try {
        schema.validateSync(object, { strict: true });
        return true;
      } catch (error) {
        if (error instanceof yup.ValidationError) onFailure(error.errors);
        return false;
      }
    },
  };
};

export const validateField = async (
  schema: yup.AnySchema,
  object: unknown,
  onError: (error: string) => void
): Promise<boolean> => {
  try {
    schema.validateSync(object, { strict: true });
    return true;
  } catch (error) {
    if (error instanceof yup.ValidationError) onError(error.errors[0]);
  }
  return false;
};
