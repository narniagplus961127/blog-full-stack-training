import type { FormEvent } from 'react';
import { useState } from 'react';
import { ArrowLeft, Feather, LogIn } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

import { api } from '../services/api';

export function AdminLoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      await api.login(username, password);
      navigate('/admin');
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : 'Unable to sign in.',
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="grid min-h-screen place-items-center bg-slate-950 px-5 py-12">
      <div className="w-full max-w-md">
        <Link
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-white"
          to="/"
        >
          <ArrowLeft aria-hidden="true" size={17} />
          Back to the article
        </Link>
        <section className="rounded-3xl bg-white p-7 shadow-2xl sm:p-10">
          <span className="grid size-11 place-items-center rounded-full bg-blue-700 text-white">
            <Feather aria-hidden="true" size={20} />
          </span>
          <p className="eyebrow mt-8">Field Notes</p>
          <h1 className="mt-3 font-serif text-4xl text-slate-950">
            Admin sign in
          </h1>
          <p className="mt-3 leading-7 text-slate-600">
            Manage the conversation around each story.
          </p>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <label className="space-y-2 text-sm font-semibold text-slate-800">
              Username
              <input
                autoComplete="username"
                className="field"
                onChange={(event) => setUsername(event.target.value)}
                required
                value={username}
              />
            </label>
            <label className="space-y-2 text-sm font-semibold text-slate-800">
              Password
              <input
                autoComplete="current-password"
                className="field"
                onChange={(event) => setPassword(event.target.value)}
                required
                type="password"
                value={password}
              />
            </label>
            {error && (
              <p
                className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700"
                role="alert"
              >
                {error}
              </p>
            )}
            <button
              className="button-primary w-full justify-center"
              disabled={submitting}
              type="submit"
            >
              <LogIn aria-hidden="true" size={17} />
              {submitting ? 'Signing in…' : 'Sign in'}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
