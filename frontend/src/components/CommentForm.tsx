import type { FormEvent } from 'react';
import { useState } from 'react';
import { Send } from 'lucide-react';

import type { CommentInput } from '../types';

const emptyForm: CommentInput = {
  authorName: '',
  email: '',
  content: '',
};

type CommentFormProps = {
  initialValue?: CommentInput;
  submitLabel?: string;
  onSubmit: (input: CommentInput) => Promise<void>;
  onCancel?: () => void;
};

export function CommentForm({
  initialValue = emptyForm,
  submitLabel = 'Post comment',
  onSubmit,
  onCancel,
}: CommentFormProps) {
  const [form, setForm] = useState(initialValue);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      await onSubmit(form);
      if (!initialValue.content) setForm(emptyForm);
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : 'Unable to save the comment.',
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="space-y-2 text-sm font-semibold text-slate-800">
          Name
          <input
            className="field"
            maxLength={80}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                authorName: event.target.value,
              }))
            }
            placeholder="Your name"
            required
            value={form.authorName}
          />
        </label>
        <label className="space-y-2 text-sm font-semibold text-slate-800">
          Email <span className="font-normal text-slate-500">(private)</span>
          <input
            className="field"
            maxLength={255}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                email: event.target.value,
              }))
            }
            placeholder="you@example.com"
            type="email"
            value={form.email}
          />
        </label>
      </div>
      <label className="space-y-2 text-sm font-semibold text-slate-800">
        Comment
        <textarea
          className="field min-h-32 resize-y"
          maxLength={1000}
          onChange={(event) =>
            setForm((current) => ({
              ...current,
              content: event.target.value,
            }))
          }
          placeholder="What stayed with you?"
          required
          value={form.content}
        />
        <span className="block text-sm font-normal text-slate-500">
          {form.content.length}/1,000
        </span>
      </label>
      <div className="flex flex-wrap items-center justify-end gap-5">
        {onCancel && (
          <button className="button-secondary" onClick={onCancel} type="button">
            Cancel
          </button>
        )}
        <button className="button-primary" disabled={submitting} type="submit">
          <Send aria-hidden="true" size={16} />
          {submitting ? 'Saving…' : submitLabel}
        </button>
      </div>
      {error && (
        <p
          className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700"
          role="alert"
        >
          {error}
        </p>
      )}
    </form>
  );
}
