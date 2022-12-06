import * as yup from "yup";
import { ContentType } from "../interfaces/index";

export const tagSchema = yup
  .string()
  .required("Tag is required")
  .max(20, "Tag is too long")
  .matches(/^[a-z0-9-]+$/, "Tag must consist of lowercase letters, digits, or hyphen ('-')");

export const contentSchema = yup
  .object({ type: yup.string(), value: yup.string(), image: yup.string(), code: yup.string() })
  .test({
    name: "valueRequired",
    message: "This content cannot be empty",
    test: (value) => {
      return (
        (value.type !== ContentType.Paragraph &&
          value.type !== ContentType.Emphasis &&
          value.type !== ContentType.Subtitle) ||
        (value.value?.length ?? 0) > 0
      );
    },
  })
  .test({
    name: "imageRequired",
    message: "Select image to upload",
    test: (value) => {
      return value.type !== ContentType.Image || (value.image?.length ?? 0) > 0;
    },
  })
  .test({
    name: "codeRequired",
    message: "Code block cannot be empty",
    test: (value) => {
      return value.type !== ContentType.Code || (value.code?.trim().length ?? 0) > 0;
    },
  });

export const contentArrayOnlyScheme = yup
  .array()
  .min(1, "Content of a lesson must have at least one element")
  .max(40, "Maximum number of content elements reached");

export const createLessonParameterSchemas = {
  title: yup
    .string()
    .required("Title is required")
    .min(2, "Title is too short")
    .max(120, "Title is too long"),
  tags: yup
    .array()
    .of(tagSchema)
    .max(20, "Maximum number of tags reached")
    .test({
      name: "unique",
      message: "Tags should be unique",
      test: (list) => list?.length === new Set(list).size,
    }),
  content: yup
    .array(contentSchema)
    .min(1, "Content of a lesson must have at least one element")
    .max(40, "Maximum number of content elements reached"),
};

export const createLessonScheme = yup.object().shape({
  title: createLessonParameterSchemas.title,
  content: createLessonParameterSchemas.content,
  tags: createLessonParameterSchemas.tags
})
