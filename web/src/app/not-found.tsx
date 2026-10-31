export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col justify-center bg-deep px-5 text-white md:px-8">
      <div className="mx-auto w-full max-w-2xl">
        <p className="display text-sm font-bold tracking-widest text-white/70">404</p>
        <h1 className="display mt-3 text-4xl font-bold leading-tight md:text-6xl">
          this page <span className="text-spark">wandered off.</span>
        </h1>
        <p className="mt-4 text-lg text-white/80">it happens to the best stories. today's is still waiting.</p>
        <a
          href="/"
          className="display mt-8 inline-flex min-h-12 items-center rounded bg-spark px-8 text-lg font-bold text-deep"
        >
          back to today's story
        </a>
      </div>
    </main>
  );
}
