import { MessageCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

import { api } from '../services/api';
import type { Comment, CommentInput } from '../types';
import { CommentForm } from './CommentForm';

function formatDate(date: string) {
  return new Intl.DateTimeFormat('en', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(date));
}

export function CommentsSection() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  useEffect(() => {
    let active = true;

    void api
      .listComments()
      .then((nextComments) => {
        if (!active) return;
        setComments(nextComments);
        setError('');
      })
      .catch(() => {
        if (active) {
          setError(
            'Comments are unavailable. Check that the local API is running.',
          );
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const context = document.modelContext;
    if (!context?.registerTool) return;

    const lifecycle = new AbortController();
    const registration = context.registerTool(
      {
        name: 'publish_blog_comment',
        title: 'Publish a blog comment',
        description:
          'Publish a public reader comment and add it to the visible comment list.',
        inputSchema: {
          type: 'object',
          properties: {
            authorName: { type: 'string', minLength: 2, maxLength: 80 },
            email: { type: 'string', maxLength: 255 },
            content: { type: 'string', minLength: 3, maxLength: 1000 },
          },
          required: ['authorName', 'content'],
          additionalProperties: false,
        },
        annotations: {
          readOnlyHint: false,
          untrustedContentHint: true,
        },
        async execute(input) {
          if (!input || typeof input !== 'object') {
            throw new Error('A comment object is required.');
          }

          const values = input as Record<string, unknown>;
          if (
            typeof values.authorName !== 'string' ||
            typeof values.content !== 'string'
          ) {
            throw new Error('Author name and comment content are required.');
          }

          const comment = await api.createPublicComment({
            authorName: values.authorName,
            email: typeof values.email === 'string' ? values.email : '',
            content: values.content,
          });
          setComments((current) => [comment, ...current]);
          setNotice('Your comment has been published.');

          return {
            id: comment.id,
            authorName: comment.authorName,
            status: 'published',
          };
        },
      },
      { signal: lifecycle.signal },
    );

    void Promise.resolve(registration).catch((registrationError: unknown) => {
      console.error('Unable to register the comment tool.', registrationError);
    });

    return () => lifecycle.abort();
  }, []);

  async function addComment(input: CommentInput) {
    const comment = await api.createPublicComment(input);
    setComments((current) => [comment, ...current]);
    setNotice('Your comment has been published.');
  }

  return (
    <section className="border-t border-slate-200 bg-slate-50" id="comments">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="eyebrow">Lorem ipsum</p>
          <h2 className="mt-4 font-serif text-4xl leading-tight text-slate-950">
            Dolor sit amet, consectetur adipiscing?
          </h2>
          <p className="mt-5 max-w-md leading-7 text-slate-600">
            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation.
          </p>
          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <CommentForm onSubmit={addComment} />
            {notice && (
              <p
                className="mt-4 rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-800"
                role="status"
              >
                {notice}
              </p>
            )}
          </div>
        </div>

        <div>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="flex items-center gap-3 text-xl font-bold text-slate-950">
              <MessageCircle aria-hidden="true" className="text-blue-700" />
              Lorem notes
            </h2>
            <span className="text-sm text-slate-500">
              {comments.length} {comments.length === 1 ? 'comment' : 'comments'}
            </span>
          </div>

          {loading && <p className="text-slate-500">Loading comments…</p>}
          {error && (
            <p className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-amber-900">
              {error}
            </p>
          )}
          {!loading && !error && comments.length === 0 && (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
              <p className="font-semibold text-slate-800">No comments yet.</p>
              <p className="mt-2 text-sm text-slate-500">
                Be the first reader to leave a note.
              </p>
            </div>
          )}
          <div className="space-y-4">
            {comments.map((comment) => (
              <article
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                key={comment.id}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="grid size-10 shrink-0 place-items-center rounded-full bg-blue-100 font-bold text-blue-800">
                    {comment.authorName.charAt(0).toUpperCase()}
                  </div>
                  <time
                    className="text-xs text-slate-500"
                    dateTime={comment.createdAt}
                  >
                    {formatDate(comment.createdAt)}
                  </time>
                </div>
                <h3 className="mt-4 font-bold text-slate-950">
                  {comment.authorName}
                </h3>
                <p className="mt-2 leading-7 whitespace-pre-wrap text-slate-600">
                  {comment.content}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
