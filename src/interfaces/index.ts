export interface Lesson {
  id: number;
  title: string;
  content: string;
  author: User;
  authorId: User;
  creationDate: string;
  updateDate: string;
  imageUrl: string;
  views: number;
  upvotes: number;
  downvotes: number;
  tags: Tag[];
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