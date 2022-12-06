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
  };
};
