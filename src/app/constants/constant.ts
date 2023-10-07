export interface User {
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  password: string;
}

export interface Article {
  title: string;
  content: string;
  authorName: string;
}

export interface ArticleList {
  _id: string;
  title: string;
  content: string;
  authorName: string;
}