import { Feather, LockKeyhole } from 'lucide-react';
import { Link } from 'react-router-dom';

export function SiteHeader() {
  return (
    <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <Link
          className="flex items-center gap-3 text-sm font-bold tracking-[0.16em] text-slate-950 uppercase"
          to="/"
        >
          <span className="grid size-9 place-items-center rounded-full bg-blue-700 text-white">
            <Feather aria-hidden="true" size={18} />
          </span>
          Lorem Ipsum
        </Link>
        <Link
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-slate-300 px-4 text-sm font-semibold text-slate-700 transition hover:border-slate-950 hover:text-slate-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
          to="/admin/login"
        >
          <LockKeyhole aria-hidden="true" size={16} />
          Admin
        </Link>
      </div>
    </header>
  );
}
