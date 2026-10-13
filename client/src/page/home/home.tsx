import {
  ArrowRight,
  CalendarCheck,
  CalendarDays,
  GraduationCap,
  Leaf,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Button } from "../../components/ui/button";

const features = [
  {
    icon: CalendarDays,
    title: "Discover campus events",
    text: "Find workshops, competitions, cultural programs, and activities shared by your college community.",
  },
  {
    icon: Users,
    title: "Join with your community",
    text: "Register individually or take part with a team when an event supports team participation.",
  },
  {
    icon: CalendarCheck,
    title: "Keep everything organized",
    text: "Review your registrations, follow event updates, and keep your campus plans in one place.",
  },
];

export default function HomePage() {
  return (
    <div className="overflow-hidden bg-background">
      <main>
        <section className="relative px-4 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-14 lg:px-10 lg:pb-24 lg:pt-20">
          <div className="mx-auto grid max-w-330 items-center gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
            <div className="relative z-10">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-accent/70 px-3.5 py-2 text-xs font-medium text-accent-foreground">
                <Leaf className="h-3.5 w-3.5" /> A better way to be part of
                campus life
              </div>
              <h1 className="max-w-3xl text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-[4.35rem]">
                Campus life happens{" "}
                <span className="text-primary">outside the classroom.</span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                Discover college events, connect with students, and take part in
                the experiences that make your campus journey memorable — all
                from one place.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button
                  size="lg"
                  className="h-12 rounded-xl px-6"
                  onClick={() =>
                    document
                      .getElementById("features")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Explore CEMS <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 rounded-xl px-6"
                  onClick={() =>
                    document
                      .getElementById("about")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  How it works
                </Button>
              </div>
              <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-border pt-6 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-primary" /> Faculty-based
                  approvals
                </span>
                <span className="inline-flex items-center gap-2">
                  <CalendarCheck className="h-4 w-4 text-primary" /> Event
                  registration in one place
                </span>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-150 lg:ml-auto">
              <div className="absolute -right-7 -top-7 h-40 w-40 rounded-full bg-[#dce7d7] blur-3xl dark:bg-[#49644c]/40" />
              <div className="absolute -bottom-8 -left-8 h-40 w-40 rounded-full bg-[#e9e4cf] blur-3xl dark:bg-[#625e3e]/25" />
              <div className="relative overflow-hidden rounded-[28px] border border-border bg-card p-2.5 shadow-[0_24px_80px_-38px_rgba(41,58,50,0.28)] sm:p-3">
                <div className="relative min-h-85 overflow-hidden rounded-[21px] bg-[#dce7d7] dark:bg-[#334438] sm:min-h-[470px]">
                  <img
                    src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1200&q=85"
                    alt="College students taking part in a campus activity"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1d3025]/85 via-[#1d3025]/10 to-transparent" />
                  <div className="absolute inset-x-5 bottom-5 text-white sm:inset-x-7 sm:bottom-7">
                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-white/75">
                      Find your next experience
                    </p>
                    <h2 className="mt-2 max-w-sm text-2xl font-semibold leading-tight sm:text-3xl">
                      More to learn. More to share. More to experience.
                    </h2>
                    <div className="mt-5 flex items-center gap-3 text-sm text-white/85">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 backdrop-blur">
                        <GraduationCap className="h-4 w-4" />
                      </span>{" "}
                      Made for campus communities
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-5 right-3 hidden items-center gap-3 rounded-2xl border border-border bg-card p-3.5 shadow-lg sm:flex sm:right-0">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                  <CalendarDays className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-sm font-semibold">
                    Your campus, connected
                  </span>
                  <span className="mt-0.5 block text-xs text-muted-foreground">
                    Events in one place
                  </span>
                </span>
              </div>
            </div>
          </div>
        </section>

        <section
          id="features"
          className="border-y border-border bg-card/60 px-4 py-16 sm:px-6 sm:py-20 lg:px-10"
        >
          <div className="mx-auto max-w-[1320px]">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                What you can do
              </p>
              <h2 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl">
                Everything you need to take part.
              </h2>
              <p className="mt-4 text-base leading-7 text-muted-foreground">
                Less time searching for information. More time showing up,
                participating, and making something happen.
              </p>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {features.map(({ icon: Icon, title, text }, index) => (
                <article
                  key={title}
                  className="group rounded-2xl border border-border bg-background p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-md sm:p-7"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="text-xs font-medium text-muted-foreground">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="mt-7 text-xl font-semibold">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="about"
          className="px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24"
        >
          <div className="mx-auto grid max-w-[1320px] gap-10 rounded-3xl border border-border bg-accent/35 p-6 sm:p-9 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16 lg:p-12">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                How CEMS works
              </p>
              <h2 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl">
                A clearer path from discovering an event to taking part.
              </h2>
              <p className="mt-4 leading-7 text-muted-foreground">
                CEMS helps students and college administrators manage event
                participation with clearer information and faculty-based
                approval workflows.
              </p>
            </div>
            <div className="space-y-3">
              <Step
                number="01"
                title="Explore"
                text="Browse events and review dates, location, and registration details."
              />
              <Step
                number="02"
                title="Register or organize"
                text="Join an event individually or as a team, or create an event when your role allows it."
              />
              <Step
                number="03"
                title="Stay informed"
                text="Use your workspace to follow registrations and manage event activity."
              />
            </div>
          </div>
        </section>

        <section className="px-4 pb-16 sm:px-6 sm:pb-20 lg:px-10">
          <div className="mx-auto flex max-w-[1320px] flex-col gap-6 rounded-3xl bg-[#334b3c] px-6 py-9 text-white sm:px-10 sm:py-12 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/65">
                Your next campus memory starts here
              </p>
              <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
                Be part of what happens next.
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/70 sm:text-base">
                Sign in to discover events and manage your campus activities.
              </p>
            </div>
            <Button
              variant="secondary"
              size="lg"
              className="h-12 shrink-0 rounded-xl bg-[#e5ede2] px-6 text-[#293a32] hover:bg-white"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              Get started <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </section>
      </main>
      <footer className="border-t border-border px-4 py-7 sm:px-6 lg:px-10">
        <div className="mx-auto flex max-w-[1320px] flex-col gap-2 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span className="font-medium text-foreground">
            CEMS · College Event Management System
          </span>
          <span>Connecting students through campus life.</span>
        </div>
      </footer>
    </div>
  );
}

function Step({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="flex gap-4 rounded-2xl border border-border/80 bg-card p-4 sm:p-5">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent text-xs font-semibold text-accent-foreground">
        {number}
      </span>
      <div>
        <h3 className="font-semibold">{title}</h3>
        <p className="mt-1 text-sm leading-6 text-muted-foreground">{text}</p>
      </div>
    </div>
  );
}
