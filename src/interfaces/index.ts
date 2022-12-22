export interface Lesson {
  id: number;
  title: string;
  content: string;
  author: User;
  authorId: number;
  creationDate: string;
  updateDate: string;
  imageUrl: string;
  views: number;
  upvotes: number;
  downvotes: number;
  tags: Tag[];
}

export interface CreateLesson {
  title: string;
  content: string;
  authorId: number;
  frontImageName: string|undefined;
  tags: string[];
}

export interface Tag {
  id: number;
  tagName: string;
}

export interface User {
  id: number;
  email: string;
  userName: string;
  fullName: string;
  creationDate: string;
  iconUrl: string;
}

export interface Page<T> {
  page: number;
  limit: number;
  page_count: number;
  items: T[];
}
export interface ContentElement {
  type: ContentType;
  value: string;
  image: string;
  code: string;
}

export enum ContentType {
  Subtitle = "subtitle",
  Emphasis = "emphasis",
  Paragraph = "paragraph",
  Image = "image",
  Bar = "bar",
  Code = "code",
}

export interface CreateLessonState {
  title: string;
  titleError: string;
  content: CreateContentElement[];
  contentError: string;
  contentKey: number;
  tags: string[];
  tagError: string;
}

export interface CreateContentElement {
  key: number;
  type: ContentType;
  value: string;
  imageInputId: string;
  code: string;
  error: string;
}