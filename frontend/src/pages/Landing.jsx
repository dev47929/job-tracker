import Hero from "../components/landing/Hero";
import Navbar from "../components/landing/Navbar";

const logos = ["Sharekhan", "Blackstone", "Indiabulls", "Business Standard"];
const features = [
  {
    title: "A single source of truth",
    description: "Manage every application, interview, and follow-up from one clean workspace with smart filters and status tracking.",
  },
  {
    title: "Automate follow-ups",
    description: "Never miss a deadline with automated reminders, scheduled updates, and AI-assisted next steps.",
  },
  {
    title: "Built for fast workflows",
    description: "Create reusable hiring pipelines and keep your priorities visible at every stage.",
  },
];

const solutions = [
  {
    title: "Integrated insights",
    subtitle: "See every opportunity in one place",
    detail: "Custom dashboards show your progress across applications, companies, and status updates.",
  },
  {
    title: "Campaign builder",
    subtitle: "Create automated follow-up sequences",
    detail: "Set up messages, reminders, and next-step actions with minimal effort.",
  },
  {
    title: "Actionable workflows",
    subtitle: "Boost interaction with automation",
    detail: "Build sequences that help you move opportunities from applied to interview to offer.",
  },
];

function Landing() {
  return (
    <div className="bg-slate-50 text-slate-950">
      <Navbar />
      <main className="relative overflow-hidden">
        <div className="absolute left-1/2 top-16 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-indigo-200/40 blur-3xl" />
        <div className="absolute right-0 top-32 -z-10 h-80 w-80 rounded-full bg-cyan-200/30 blur-3xl" />

        <section className="mx-auto max-w-7xl px-6 pt-10 pb-20 sm:px-8 lg:px-10 lg:pt-16">
          <div className="grid gap-16 xl:grid-cols-[1.05fr_0.95fr] xl:items-center">
            <article className="space-y-10">
              <Hero />

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {logos.map((logo) => (
                  <div key={logo} className="rounded-3xl border border-slate-200 bg-white/90 px-4 py-5 text-center text-sm font-semibold text-slate-600 shadow-sm">
                    {logo}
                  </div>
                ))}
              </div>
            </article>

            <article className="relative">
              <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-slate-950/80 via-slate-900/80 to-indigo-950/80 blur-3xl opacity-70" />
              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/95 p-8 shadow-[0_40px_120px_-50px_rgba(15,23,42,0.45)] backdrop-blur-xl">
                <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-3xl bg-slate-900/90 p-4 text-white shadow-lg shadow-slate-950/30">
                  <div>
                    <p className="text-xs uppercase tracking-[0.32em] text-slate-400">Job pipeline</p>
                    <p className="mt-2 text-lg font-semibold">Your active applications</p>
                  </div>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.3em] text-slate-300">
                    Live overview
                  </span>
                </div>

                <div className="space-y-5">
                  <div className="rounded-[1.75rem] border border-slate-800/80 bg-slate-900/90 p-6">
                    <div className="flex flex-wrap items-center justify-between gap-4 text-slate-300">
                      <div>
                        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Open roles</p>
                        <p className="mt-2 text-3xl font-bold text-white">18</p>
                      </div>
                      <p className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase text-emerald-300">
                        Up 14%
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4 rounded-[1.75rem] border border-slate-800/80 bg-slate-900/90 p-5">
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="rounded-3xl bg-slate-950/95 p-4">
                        <p className="text-sm text-slate-400">Acme Corp</p>
                        <p className="mt-2 text-base font-semibold text-white">Interview scheduled</p>
                      </div>
                      <div className="rounded-3xl bg-slate-950/95 p-4">
                        <p className="text-sm text-slate-400">ByteLabs</p>
                        <p className="mt-2 text-base font-semibold text-white">Follow-up due</p>
                      </div>
                    </div>
                    <div className="rounded-3xl bg-slate-950/95 p-4">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-sm text-slate-400">DevMonk</p>
                          <p className="mt-2 text-base font-semibold text-white">Offer received</p>
                        </div>
                        <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs uppercase text-emerald-300">
                          Offer
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-3xl bg-white/5 p-5 text-white shadow-sm">
                      <p className="text-sm text-slate-400">Response rate</p>
                      <p className="mt-3 text-2xl font-bold">73%</p>
                    </div>
                    <div className="rounded-3xl bg-indigo-600 p-5 text-white shadow-sm">
                      <p className="text-sm text-indigo-100">Avg. time saved</p>
                      <p className="mt-3 text-2xl font-bold">6 hrs</p>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section id="features" className="bg-white py-24">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
            <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
              <div className="space-y-6">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-600">One hub for your search</p>
                <h2 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                  Manage your job search like a modern workspace.
                </h2>
                <p className="max-w-xl text-lg leading-8 text-slate-600">
                  Centralize applications, reminders, and interview details in one place so you can apply with confidence and never miss a follow-up.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {features.map((feature) => (
                  <div key={feature.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                    <h3 className="text-lg font-semibold text-slate-950">{feature.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="solutions" className="bg-slate-50 py-24">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
            <div className="mb-12 max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-600">Boost interaction</p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                Automate your workflow while keeping full control.
              </h2>
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
              {solutions.map((item) => (
                <div key={item.title} className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-600">{item.subtitle}</p>
                  <h3 className="mt-4 text-2xl font-bold text-slate-950">{item.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-600">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-24">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div className="space-y-6">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-600">More out-of-the-box solutions</p>
                <h2 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                  Connect your process, secure your workflow, and customize every step.
                </h2>
                <p className="max-w-xl text-lg leading-8 text-slate-600">
                  Use integrations, security controls, and tailored workflows to keep your job search efficient and adaptable.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-center shadow-sm">
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Integrations</p>
                  <p className="mt-4 text-xl font-bold text-slate-950">CRM & apps</p>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-center shadow-sm">
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Data security</p>
                  <p className="mt-4 text-xl font-bold text-slate-950">Secure by default</p>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-center shadow-sm">
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Customization</p>
                  <p className="mt-4 text-xl font-bold text-slate-950">Adapt your flow</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="trust" className="bg-slate-900 py-24 text-white">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div className="space-y-6">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-400">Trusted worldwide</p>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Bring clarity to every step of your search with one unified workspace.
                </h2>
                <p className="max-w-xl text-lg leading-8 text-slate-300">
                  Recruiters, students, and developers use JobStack to stay aligned, save time, and move more applications to the finish line.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-slate-950/90 p-8 text-center shadow-lg shadow-slate-950/50">
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Rating</p>
                  <p className="mt-4 text-5xl font-extrabold text-white">4.8/5</p>
                </div>
                <div className="rounded-3xl bg-slate-950/90 p-8 text-center shadow-lg shadow-slate-950/50">
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Customers</p>
                  <p className="mt-4 text-5xl font-extrabold text-indigo-400">15k+</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-800 bg-slate-950 text-slate-400">
        <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-lg font-semibold text-white">JobStack</p>
              <p className="mt-2 max-w-md text-sm text-slate-400">
                Keep every application, deadline, and follow-up aligned from first pitch to offer.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 text-sm">
              <a href="#features" className="transition hover:text-white">Features</a>
              <a href="#solutions" className="transition hover:text-white">Solutions</a>
              <a href="#trust" className="transition hover:text-white">Trusted</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Landing;
