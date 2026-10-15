
import Link from "next/link";
import { ArrowLeft, ArrowRight, Home, Plane } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 px-5 py-16">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1800&q=80')",
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/90 to-white" />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-2xl text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-50 text-teal-700">
          <Plane size={32} strokeWidth={1.7} />
        </div>

        <p className="mt-8 text-sm font-bold uppercase tracking-[0.25em] text-teal-700">
          Lost in transit?
        </p>

        <h1 className="mt-3 text-8xl font-extrabold tracking-tight text-slate-900 sm:text-9xl">
          404
        </h1>

        <h2 className="mt-4 text-2xl font-bold text-slate-800 sm:text-3xl">
          Oops! Page not found
        </h2>

        <p className="mx-auto mt-4 max-w-md text-base leading-7 text-slate-600">
          Looks like this destination doesn't exist. The page may have
          moved, or the link you followed might be incorrect.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-teal-700 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-teal-800 sm:w-auto"
          >
            <Home size={18} />
            Back to Home
            <ArrowRight size={16} />
          </Link>

          <Link
            href="/"
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-teal-700 hover:text-teal-700 sm:w-auto"
          >
            <ArrowLeft size={17} />
            Return to Safety
          </Link>
        </div>

        <p className="mt-12 text-sm text-slate-500">
          Need help?{" "}
          <Link
            href="/contact"
            className="font-semibold text-teal-700 hover:underline"
          >
            Contact our team
          </Link>
        </p>

        <div className="mt-8 border-t border-slate-200 pt-5">
          <Link
            href="/"
            className="text-sm font-bold tracking-wide text-slate-700"
          >
            SkyFly<span className="text-teal-700">WithUs</span>
          </Link>

          <p className="mt-1 text-xs text-slate-400">
            Your journey starts here.
          </p>
        </div>
      </div>
    </main>
  );
}
 