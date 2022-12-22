import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ValidationError } from "yup";
import { ContentType, CreateContentElement, CreateLessonState } from "../../interfaces";
import {
  createLessonParameterSchemas,
  contentArrayOnlyScheme,
  contentSchema,
  tagSchema,
  createLessonSchema,
} from "../../validationSchemes/createLessonSchema";
import { validateSchema } from "../../validationSchemes/validation";

//TODO: Change All Validate As In Title

const initialState: CreateLessonState = {
  title: "",
  titleError: "",
  content: [
    { key: 0, type: ContentType.Paragraph, value: "write here...", imageInputId: "", code: "", error: "" },
  ],
  contentError: "",
  contentKey: 1,
  tags: [],
  tagError: "",
};

export const createLessonSlice = createSlice({
  name: "createLesson",
  initialState: initialState,
  reducers: {
    setTitle: (state, action: PayloadAction<string>) => {
      let res: CreateLessonState = { ...state };
      validateSchema(createLessonParameterSchemas.title, action.payload)
        .then(
          () =>
            (res = {
              ...state,
              title: action.payload,
              titleError: "",
            })
        )
        .catch(
          (errors) =>
            (res = {
              ...state,
              title: action.payload,
              titleError: errors[0],
            })
        );
      return res;
    },
    addContent: (state, action: PayloadAction<ContentType>) => {
      const newContent:CreateContentElement = {
        key: state.contentKey,
        type: action.payload,
        value: action.payload === ContentType.Code ? "language-javascript" : "",
        imageInputId: "",
        code: action.payload === ContentType.Code ? "dsfdf" : "",
        error: "",
      };
      try {
        contentArrayOnlyScheme.validateSync([...state.content, newContent], { strict: true });
        return {
          ...state,
          content: [...state.content, newContent],
          contentError: "",
          contentKey: state.contentKey + 1,
        };
      } catch (error) {
        if (error instanceof ValidationError)
          return {
            ...state,
            contentError: error.errors[0],
          };
      }
    },
    setContent: (state, action: PayloadAction<{ key: number; content: CreateContentElement }>) => {
      const id = state.content.findIndex(c=>c.key===action.payload.key);
      try {
        contentSchema.validateSync(action.payload.content, { strict: true });
        return {
          ...state,
          content: [
            ...state.content.slice(0, id),
            { ...action.payload.content, error: "" },
            ...state.content.slice(id + 1),
          ],
        };
      } catch (error) {
        if (error instanceof ValidationError)
          return {
            ...state,
            content: [
              ...state.content.slice(0, id),
              { ...action.payload.content, error: error.errors[0] },
              ...state.content.slice(id + 1),
            ],
          };
      }
    },
    deleteContent: (state, action: PayloadAction<number>) => {
      const id = state.content.findIndex(c=>c.key===action.payload)
      const newContent = state.content.filter((_, i) => i !== id);
      return {
        ...state,
        content: newContent,
        contentError: "",
      };
    },
    addTag: (state, action: PayloadAction<string>) => {
      try {
        const newTags = state.tags.concat(action.payload);
        createLessonParameterSchemas.tags.validateSync(newTags, { strict: true });
        tagSchema.validateSync(action.payload, { strict: true });
        return { ...state, tags: newTags, tagError: "" };
      } catch (error) {
        if (error instanceof ValidationError) return { ...state, tagError: error.errors[0] };
      }
    },
    deleteTag: (state, action: PayloadAction<number>) => {
      return { ...state, tags: state.tags.filter((_, i) => i !== action.payload) };
    },
    validateLesson: (state) => {
      let res: CreateLessonState = { ...state };
      validateSchema(createLessonSchema, state)
        .catch(
          (errors) =>
            (res = {
              ...state,
              title: action.payload,
              titleError: errors[0],
            })
        );
      return res;
    },
  },
});

export const { setTitle, setContent, addContent, deleteContent, addTag, deleteTag } =
  createLessonSlice.actions;

export default createLessonSlice.reducer;
