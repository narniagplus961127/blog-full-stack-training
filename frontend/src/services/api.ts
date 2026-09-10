import type { Comment, CommentInput, Session } from '../types';

export class ApiError extends Error {}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(path, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  if (response.status === 204) {
    return undefined as T;
  }

  const data = (await response.json()) as T & { message?: string };

  if (!response.ok) {
    throw new ApiError(data.message ?? 'The request could not be completed.');
  }

  return data;
}

export const api = {
  async listComments() {
    const data = await request<{ comments: Comment[] }>('/api/comments');
    return data.comments;
  },

  async createPublicComment(input: CommentInput) {
    const data = await request<{ comment: Comment }>('/api/comments', {
      method: 'POST',
      body: JSON.stringify(input),
    });
    return data.comment;
  },

  getSession: () => request<Session>('/api/auth/session'),

  login: (username: string, password: string) =>
    request<{ admin: { id: number; username: string } }>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    }),

  logout: () => request<void>('/api/auth/logout', { method: 'POST' }),

  createAdminComment: (input: CommentInput) =>
    request<{ comment: Comment }>('/api/admin/comments', {
      method: 'POST',
      body: JSON.stringify(input),
    }),

  updateComment: (id: number, input: CommentInput) =>
    request<{ comment: Comment }>(`/api/admin/comments/${id}`, {
      method: 'PUT',
      body: JSON.stringify(input),
    }),

  deleteComment: (id: number) =>
    request<void>(`/api/admin/comments/${id}`, { method: 'DELETE' }),
};
