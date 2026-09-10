import { LogOut, MessageSquarePlus, Pencil, Trash2, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { CommentForm } from '../components/CommentForm';
import { api } from '../services/api';
import type { Comment, CommentInput } from '../types';

function toInput(comment?: Comment): CommentInput {
  return {
    authorName: comment?.authorName ?? '',
    email: '',
    content: comment?.content ?? '',
  };
}

export function AdminDashboardPage() {
  const navigate = useNavigate();
  const [comments, setComments] = useState<Comment[]>([]);
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editor, setEditor] = useState<Comment | 'new' | null>(null);

  useEffect(() => {
    let active = true;

    void api
      .getSession()
      .then(async (session) => {
        if (!session.authenticated) {
          navigate('/admin/login', { replace: true });
          return;
        }

        const nextComments = await api.listComments();
        if (!active) return;
        setUsername(session.admin.username);
        setComments(nextComments);
      })
      .catch(() => {
        if (active) {
          setError('Unable to load the dashboard. Check the API and database.');
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [navigate]);

  async function saveComment(input: CommentInput) {
    if (editor === 'new') {
      await api.createAdminComment(input);
    } else if (editor) {
      await api.updateComment(editor.id, input);
    }
    setEditor(null);
    setComments(await api.listComments());
  }

  async function removeComment(comment: Comment) {
    const confirmed = window.confirm(
      `Delete the comment from ${comment.authorName}? This cannot be undone.`,
    );
    if (!confirmed) return;

    try {
      await api.deleteComment(comment.id);
      setComments((current) =>
        current.filter((item) => item.id !== comment.id),
      );
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : 'Unable to delete the comment.',
      );
    }
  }

  async function signOut() {
    await api.logout();
    navigate('/admin/login');
  }

  if (loading) {
    return (
      <main className="grid min-h-screen place-items-center">
        Loading dashboard…
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-5 sm:px-8">
          <div>
            <Link
              className="text-sm font-bold tracking-[0.15em] text-blue-700 uppercase"
              to="/"
            >
              Field Notes
            </Link>
            <h1 className="mt-1 text-2xl font-bold text-slate-950">
              Comment desk
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-slate-500 sm:block">
              Signed in as {username}
            </span>
            <button
              className="button-secondary"
              onClick={() => void signOut()}
              type="button"
            >
              <LogOut aria-hidden="true" size={16} />
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="eyebrow">Administration</p>
            <h2 className="mt-3 font-serif text-4xl text-slate-950">
              Reader comments
            </h2>
            <p className="mt-2 text-slate-600">
              {comments.length} {comments.length === 1 ? 'comment' : 'comments'}{' '}
              published
            </p>
          </div>
          <button
            className="button-primary"
            onClick={() => setEditor('new')}
            type="button"
          >
            <MessageSquarePlus aria-hidden="true" size={17} />
            Add comment
          </button>
        </div>

        {error && (
          <p
            className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-red-700"
            role="alert"
          >
            {error}
          </p>
        )}

        <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {comments.length === 0 ? (
            <p className="p-10 text-center text-slate-500">
              There are no comments to manage.
            </p>
          ) : (
            <div className="divide-y divide-slate-200">
              {comments.map((comment) => (
                <article
                  className="grid gap-5 p-6 md:grid-cols-[180px_1fr_auto]"
                  key={comment.id}
                >
                  <div>
                    <p className="font-bold text-slate-950">
                      {comment.authorName}
                    </p>
                    <time
                      className="mt-1 block text-xs text-slate-500"
                      dateTime={comment.createdAt}
                    >
                      {new Date(comment.createdAt).toLocaleString()}
                    </time>
                  </div>
                  <p className="leading-7 whitespace-pre-wrap text-slate-600">
                    {comment.content}
                  </p>
                  <div className="flex items-start gap-2">
                    <button
                      aria-label={`Edit comment from ${comment.authorName}`}
                      className="icon-button"
                      onClick={() => setEditor(comment)}
                      type="button"
                    >
                      <Pencil aria-hidden="true" size={17} />
                    </button>
                    <button
                      aria-label={`Delete comment from ${comment.authorName}`}
                      className="icon-button text-red-600 hover:border-red-300 hover:bg-red-50"
                      onClick={() => void removeComment(comment)}
                      type="button"
                    >
                      <Trash2 aria-hidden="true" size={17} />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>

      {editor && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-slate-950/70 px-5 py-10"
          role="presentation"
        >
          <section
            aria-labelledby="comment-editor-title"
            aria-modal="true"
            className="max-h-full w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl sm:p-8"
            role="dialog"
          >
            <div className="mb-7 flex items-start justify-between gap-5">
              <div>
                <p className="eyebrow">Comment editor</p>
                <h2
                  className="mt-2 font-serif text-3xl text-slate-950"
                  id="comment-editor-title"
                >
                  {editor === 'new' ? 'Add a comment' : 'Edit comment'}
                </h2>
              </div>
              <button
                aria-label="Close editor"
                className="icon-button"
                onClick={() => setEditor(null)}
                type="button"
              >
                <X aria-hidden="true" size={18} />
              </button>
            </div>
            <CommentForm
              initialValue={toInput(editor === 'new' ? undefined : editor)}
              onCancel={() => setEditor(null)}
              onSubmit={saveComment}
              submitLabel={editor === 'new' ? 'Add comment' : 'Save changes'}
            />
          </section>
        </div>
      )}
    </div>
  );
}
