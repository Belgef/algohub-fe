import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ContentType, CreateContentElement, CreateLessonState } from "../../interfaces";
import {
  createLessonParameterSchemas as paramSchemas,
  contentArrayOnlyScheme,
  contentSchema,
} from "../../validationSchemes/createLessonSchema";
import { validate } from "../../validationSchemes/validation";

//TODO: Change All Validate As In Title

const initialState: CreateLessonState = {
  title: "",
  titleError: "",
  content: [
    {
      key: 0,
      type: ContentType.Paragraph,
      value: "",
      imageInputId: "",
      code: "",
      error: "",
    },
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
      const errors = validate(action.payload, paramSchemas.title);
      return {
        ...state,
        title: errors ? state.title : action.payload,
        titleError: errors?.[0] ?? "",
      };
    },
    addContent: (state, action: PayloadAction<ContentType>) => {
      const newContent: CreateContentElement = {
        key: state.contentKey,
        type: action.payload,
        value: action.payload === ContentType.Code ? "javascript" : "",
        imageInputId: "",
        code: "",
        error: "",
      };
      const errors = validate([...state.content, newContent], contentArrayOnlyScheme);
      return {
        ...state,
        content: errors ? [...state.content, newContent] : state.content,
        contentError: errors?.[0] ?? "",
        contentKey: state.contentKey + (errors ? 0 : 1),
      };
    },
    setContent: (state, action: PayloadAction<{ key: number; content: CreateContentElement }>) => {
      const id = state.content.findIndex((c) => c.key === action.payload.key);
      const errors = validate(action.payload.content, contentSchema);
      return {
        ...state,
        content: [
          ...state.content.slice(0, id),
          { ...action.payload.content, error: errors?.[0] ?? "" },
          ...state.content.slice(id + 1),
        ],
      };
    },
    deleteContent: (state, action: PayloadAction<number>) => {
      const id = state.content.findIndex((c) => c.key === action.payload);
      const newContent = state.content.filter((_, i) => i !== id);
      return {
        ...state,
        content: newContent,
        contentError: "",
      };
    },
    addTag: (state, action: PayloadAction<string>) => {
      const errors = validate([...state.tags, action.payload], paramSchemas.tags);
      return {
        ...state,
        tags: errors ? state.tags : [...state.tags, action.payload],
        tagError: errors?.[0] ?? "",
      };
    },
    deleteTag: (state, action: PayloadAction<number>) => {
      return { ...state, tags: state.tags.filter((_, i) => i !== action.payload) };
    },
  },
});

export const { setTitle, setContent, addContent, deleteContent, addTag, deleteTag } =
  createLessonSlice.actions;

export default createLessonSlice.reducer;
