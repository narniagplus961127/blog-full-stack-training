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
                  Designing a thoughtful life
                </p>
                <h1 className="mt-6 max-w-3xl font-serif text-5xl leading-[1.04] tracking-tight sm:text-6xl lg:text-7xl">
                  The quiet architecture of a better morning
                </h1>
                <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">
                  Good days rarely begin by accident. They are built from small,
                  repeatable choices that make room for attention.
                </p>
                <div className="mt-10 flex flex-wrap items-center gap-5 text-sm text-slate-400">
                  <span className="font-semibold text-white">By Mira Chen</span>
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
                <p className="font-bold text-slate-900">In this essay</p>
                <p className="mt-2">
                  Attention, friction, and the rituals that help a day begin
                  gently.
                </p>
                <a
                  className="mt-5 inline-flex items-center gap-2 font-semibold text-blue-700 hover:text-blue-900"
                  href="#comments"
                >
                  Reader notes
                  <ArrowDown aria-hidden="true" size={15} />
                </a>
              </div>
            </aside>

            <div className="article-prose">
              <p className="lead">
                The first hour of the day carries an unusual kind of leverage.
                It does not need to be perfect, productive, or optimized. It
                only needs to belong to you long enough to establish a
                direction.
              </p>

              <h2>Begin before the noise does</h2>
              <p>
                Most mornings are lost in tiny handovers. The alarm gives the
                day to the phone. The phone gives it to messages, headlines, and
                other people’s priorities. By the time we stand up, our
                attention has already scattered into a dozen rooms.
              </p>
              <p>
                A calmer beginning is less about discipline than sequence. Put
                one deliberate action before the automatic ones: open a window,
                drink water, stretch, or write three unedited lines. The action
                matters less than the message it sends—you get to arrive before
                the world makes its requests.
              </p>

              <blockquote>
                “A ritual is simply a decision you no longer have to negotiate
                with yourself.”
              </blockquote>

              <h2>Design for the person you are at 7 a.m.</h2>
              <p>
                Evening ambition often creates complicated plans that morning
                energy cannot support. Reduce the number of decisions instead.
                Place the book on the chair. Fill the kettle. Leave a blank page
                beside a pen. Make the helpful action visible and the
                distracting action slightly inconvenient.
              </p>
              <p>
                This is not a grand reinvention. It is environmental kindness. A
                thoughtful room can carry part of the intention when motivation
                is still waking up.
              </p>

              <h2>Leave some space unclaimed</h2>
              <p>
                A useful morning routine should create capacity, not become
                another scorecard. Ten quiet minutes can be enough. The aim is
                not to win the morning; it is to notice your own mind before
                spending it.
              </p>
              <p>
                Start smaller than feels impressive. Repeat what feels
                restorative. Let the ritual change with the season. What remains
                is the simple architecture: less friction around what matters,
                more distance from what does not, and a little room for the day
                to become itself.
              </p>
            </div>
          </div>
        </article>

        <CommentsSection />
      </main>
      <footer className="border-t border-slate-200 bg-white px-5 py-8 text-center text-sm text-slate-500">
        Field Notes · Stories for a more considered everyday
      </footer>
    </div>
  );
}
