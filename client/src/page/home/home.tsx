import {
  ArrowRight,
  CalendarCheck,
  CalendarDays,
  GraduationCap,
  Leaf,
  ShieldCheck,
  Users,
} from "lucide-react";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import SignUp from "../auth/register";
import { useAuthStore } from "../../store/auth.store";

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

const faqs = [
  {
    question: "Who can use CEMS?",
    answer:
      "CEMS is for students and college teams who create, manage, or take part in campus events.",
  },
  {
    question: "How do I create a student account?",
    answer:
      "Sign up with your name, email, faculty, and contact number. You will receive an email verification message, and your account will be reviewed before student access is approved.",
  },
  {
    question: "Can I use my account as soon as I sign up?",
    answer:
      "Student access is available after your college has reviewed and approved your account.",
  },
  {
    question: "Can I register with a team?",
    answer:
      "Yes. You can join as a team when the event supports team participation.",
  },
  {
    question: "Where can I find event details?",
    answer:
      "Browse available events in your student workspace to review dates, locations, and registration details.",
  },
  {
    question: "How can I keep up with my registrations?",
    answer:
      "Your workspace brings your event activity and notifications together, so it is easier to follow what you have joined.",
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
              <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                Every campus event,{" "}
                <span className="text-primary">all in one place.</span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
                CEMS brings students and college teams together to discover
                events, register individually or as a team, and keep up with
                what is happening on campus.
              </p>
              <div className="mt-8">
                <GetStartedAction />
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
              <div className="absolute -right-7 -top-7 h-40 w-40 rounded-full bg-accent/70 blur-3xl" />
              <div className="absolute -bottom-8 -left-8 h-40 w-40 rounded-full bg-secondary blur-3xl" />
              <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-2.5 shadow-[0_24px_80px_-38px_rgba(23,42,51,0.3)] sm:p-3">
                <div className="relative min-h-85 overflow-hidden rounded-2xl bg-secondary sm:min-h-[470px]">
                  <img
                    src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1200&q=85"
                    alt="College students taking part in a campus activity"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#102128]/90 via-[#102128]/20 to-transparent" />
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

        <TaglineReveal />

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

        <section
          id="faq"
          className="border-y border-border bg-card/60 px-4 py-16 sm:px-6 sm:py-20 lg:px-10"
        >
          <div className="mx-auto grid max-w-[1320px] gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Frequently asked questions
              </p>
              <h2 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl">
                A few things to know before you join.
              </h2>
              <p className="mt-4 leading-7 text-muted-foreground">
                Learn how student accounts, event registration, and campus
                participation work in CEMS.
              </p>
            </div>
            <div className="space-y-3">
              {faqs.map(({ question, answer }) => (
                <details
                  key={question}
                  className="group rounded-2xl border border-border bg-background px-5 py-4 open:bg-card"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold marker:content-none">
                    {question}
                    <span
                      aria-hidden="true"
                      className="text-xl font-normal text-primary transition-transform duration-300 group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-3 pr-8 text-sm leading-6 text-muted-foreground">
                    {answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 pb-16 sm:px-6 sm:pb-20 lg:px-10">
          <div className="mx-auto flex max-w-[1320px] flex-col gap-6 rounded-3xl bg-foreground px-6 py-9 text-background sm:px-10 sm:py-12 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-background/65">
                Your next campus memory starts here
              </p>
              <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
                Be part of what happens next.
              </h2>
              <p className="mt-3 text-sm leading-6 text-background/75 sm:text-base">
                Create your account to discover events and take part in campus
                activities.
              </p>
            </div>
            <GetStartedAction
              className="shrink-0 bg-primary text-primary-foreground hover:bg-primary/90"
            />
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

function GetStartedAction({ className = "" }: { className?: string }) {
  const { user } = useAuthStore();
  const buttonClassName = `h-12 rounded-xl px-6 ${className}`;

  if (user) {
    return (
      <Button asChild size="lg" className={buttonClassName}>
        <Link to={`/${user.role}`}>
          Go to your workspace <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    );
  }

  return (
    <SignUp
      trigger={
        <Button size="lg" className={buttonClassName}>
          Create your account <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      }
    />
  );
}

function TaglineReveal() {
  const text =
    "Show up for the moments that make campus feel like yours.";
  const words = text.split(" ");
  const wordRefs = useRef<Array<HTMLSpanElement | null>>([]);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const wordElements = wordRefs.current.filter(
      (word): word is HTMLSpanElement => word !== null,
    );

    if (reduceMotion || !("IntersectionObserver" in window)) {
      wordElements.forEach((word) => word.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -20% 0px", threshold: 0.1 },
    );

    wordElements.forEach((word) => observer.observe(word));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      aria-label="The CEMS promise"
      className="px-4 py-20 sm:px-6 sm:py-24 lg:px-10 lg:py-28"
    >
      <p className="mx-auto max-w-[900px] text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
        {words.map((word, index) => (
          <span
            key={`${word}-${index}`}
            ref={(element) => {
              wordRefs.current[index] = element;
            }}
            className="tagline-word"
          >
            {word}{" "}
          </span>
        ))}
      </p>
    </section>
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
