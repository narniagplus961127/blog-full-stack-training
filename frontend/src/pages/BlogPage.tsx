import { ArrowDown, Clock3 } from 'lucide-react';

import heroImage from '../assets/hero.png';
import { CommentsSection } from '../components/CommentsSection';
import { SiteHeader } from '../components/SiteHeader';

export function BlogPage() {
  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />
      <main>
        <article>
          <header className="overflow-hidden border-b border-slate-200 bg-slate-950 text-white">
            <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1.2fr_0.8fr] lg:py-28">
              <div>
                <p className="eyebrow text-blue-300">
                  Lorem ipsum dolor sit amet
                </p>
                <h1 className="mt-6 max-w-3xl font-serif text-5xl leading-[1.04] tracking-tight sm:text-6xl lg:text-7xl">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit
                </h1>
                <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">
                  Sed do eiusmod tempor incididunt ut labore et dolore magna
                  aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
                </p>
                <div className="mt-10 flex flex-wrap items-center gap-5 text-sm text-slate-400">
                  <span className="font-semibold text-white">
                    By Lorem Ipsum
                  </span>
                  <span aria-hidden="true">·</span>
                  <time dateTime="2026-09-10">September 10, 2026</time>
                  <span className="inline-flex items-center gap-2">
                    <Clock3 aria-hidden="true" size={16} />6 min read
                  </span>
                </div>
              </div>
              <div className="relative mx-auto w-full max-w-sm">
                <div className="absolute inset-0 rounded-full bg-blue-600/30 blur-3xl" />
                <img
                  alt="Two luminous layers floating in balance"
                  className="relative mx-auto w-full drop-shadow-2xl"
                  src={heroImage}
                />
              </div>
            </div>
          </header>

          <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[180px_minmax(0,680px)] lg:py-24">
            <aside className="hidden lg:block">
              <div className="sticky top-8 border-l-2 border-blue-700 pl-5 text-sm leading-6 text-slate-500">
                <p className="font-bold text-slate-900">In this lorem</p>
                <p className="mt-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor.
                </p>
                <a
                  className="mt-5 inline-flex items-center gap-2 font-semibold text-blue-700 hover:text-blue-900"
                  href="#comments"
                >
                  Lorem notes
                  <ArrowDown aria-hidden="true" size={15} />
                </a>
              </div>
            </aside>

            <div className="article-prose">
              <p className="lead">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris.
              </p>

              <h2>Lorem ipsum dolor sit amet</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
              <p>
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum.
              </p>

              <blockquote>
                “Lorem ipsum dolor sit amet, consectetur adipiscing elit.”
              </blockquote>

              <h2>Consectetur adipiscing elit</h2>
              <p>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis et quasi architecto beatae.
              </p>
              <p>
                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
                aut fugit, sed quia consequuntur magni dolores eos qui ratione
                voluptatem sequi nesciunt.
              </p>

              <h2>Ut enim ad minima veniam</h2>
              <p>
                Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
                consectetur, adipisci velit, sed quia non numquam eius modi
                tempora incidunt ut labore et dolore magnam aliquam quaerat.
              </p>
              <p>
                Quis autem vel eum iure reprehenderit qui in ea voluptate velit
                esse quam nihil molestiae consequatur, vel illum qui dolorem eum
                fugiat quo voluptas nulla pariatur.
              </p>
            </div>
          </div>
        </article>

        <CommentsSection />
      </main>
      <footer className="border-t border-slate-200 bg-white px-5 py-8 text-center text-sm text-slate-500">
        Lorem Ipsum · Dolor sit amet, consectetur adipiscing elit
      </footer>
    </div>
  );
}
