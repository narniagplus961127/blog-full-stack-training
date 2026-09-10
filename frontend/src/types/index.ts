export type Comment = {
  id: number;
  authorName: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

export type CommentInput = {
  authorName: string;
  email: string;
  content: string;
};

export type Session =
  | { authenticated: false }
  | {
      authenticated: true;
      admin: { id: number; username: string };
    };
