import {
  ArrowRight,
  CalendarDays,
  ChevronDown,
  GraduationCap,
  Users,
  Sparkles,
  Trophy,
} from "lucide-react";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { animateScroll as scroll } from "react-scroll";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main>
        {/* =========================================================
            HERO
        ========================================================= */}
        <section className="relative min-h-[calc(100vh-72px)] overflow-hidden">
          {/* Background image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=2200&q=85')",
              // "url('https://portal.tu.edu.np/medias/AdministrativeBuildingPNC_2024_05_16_13_27_01.jpg')",
            }}
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/55" />

          {/* Subtle gradient */}
          <div className="absolute inset-0 bg-linear-to-r from-black/75 via-black/45 to-black/20" />

          <div className="relative mx-auto flex min-h-[calc(100vh-72px)] max-w-7xl items-center px-6 py-20 lg:px-8">
            <div className="max-w-3xl text-white">
              <Badge
                variant="secondary"
                className="mb-6 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-white backdrop-blur-md"
              >
                <Sparkles className="mr-2 h-3.5 w-3.5" />
                College Event Management System
              </Badge>

              <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
                Where campus life
                <span className="block text-white/70">comes together.</span>
              </h1>

              <p className="mt-7 max-w-2xl text-base leading-7 text-white/75 sm:text-lg">
                Discover what is happening around campus, take part in student
                activities, connect with your community, and make your college
                experience more memorable.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button
                  size="lg"
                  className="group rounded-full px-6"
                  onClick={() =>
                    scroll.scrollToBottom({
                      duration: 9000,
                      smooth: "easeInOut",
                    })
                  }
                >
                  Explore
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full border-white/30 bg-white/5 px-6 text-white backdrop-blur-sm hover:bg-white/10 hover:text-white"
                  onClick={() => {
                    const element = document.getElementById("about");
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                >
                  About CEMS
                </Button>
              </div>

              {/* Small stats */}
              <div className="mt-14 grid max-w-xl grid-cols-3 border-t border-white/20 pt-6">
                <div>
                  <p className="text-2xl font-semibold">25+</p>
                  <p className="mt-1 text-xs text-white/60 sm:text-sm">
                    Faculties
                  </p>
                </div>

                <div className="border-l border-white/20 pl-5">
                  <p className="text-2xl font-semibold">Easy</p>
                  <p className="mt-1 text-xs text-white/60 sm:text-sm">
                    Registration
                  </p>
                </div>

                <div className="border-l border-white/20 pl-5">
                  <p className="text-2xl font-semibold">One</p>
                  <p className="mt-1 text-xs text-white/60 sm:text-sm">
                    Event hub
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/50 md:flex">
            <span className="text-[10px] uppercase tracking-[0.25em]">
              Scroll to explore
            </span>

            <ChevronDown className="h-4 w-4 animate-bounce" />
          </div>
        </section>

        {/* =========================================================
            INTRODUCTION
        ========================================================= */}
        <section className="px-6 py-24 lg:px-8 lg:py-32" id="about">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
              <div>
                <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-primary">
                  More than academics
                </p>

                <h2 className="max-w-xl text-4xl font-semibold tracking-tight sm:text-5xl">
                  College is also about the moments you remember.
                </h2>
              </div>

              <div>
                <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
                  CEMS brings the different sides of campus life into one place.
                  From academic programs and student activities to competitions,
                  cultural programs, and other events, the platform helps
                  students stay connected with what is happening around them.
                </p>

                <p className="mt-5 max-w-2xl leading-7 text-muted-foreground">
                  Instead of searching through messages, notices, and different
                  channels, students can discover events and participate in the
                  activities that matter to them.
                </p>
              </div>
            </div>

            {/* Feature cards */}
            <div className="mt-20 grid gap-5 md:grid-cols-3">
              <FeatureCard
                icon={<CalendarDays />}
                number="01"
                title="Discover events"
                description="Find upcoming college events, competitions, workshops, programs, and student activities in one place."
              />

              <FeatureCard
                icon={<Users />}
                number="02"
                title="Be part of campus life"
                description="Join activities, connect with students from different faculties, and participate beyond the classroom."
              />

              <FeatureCard
                icon={<Trophy />}
                number="03"
                title="Create experiences"
                description="Student organizers can bring ideas to life and create events that contribute to a stronger campus community."
              />
            </div>
          </div>
        </section>

        {/* =========================================================
            IMAGE / CAMPUS LIFE
        ========================================================= */}
        <section className="px-6 pb-24 lg:px-8 lg:pb-32">
          <div className="mx-auto max-w-7xl">
            <div className="grid overflow-hidden rounded-3xl bg-muted lg:grid-cols-[1.1fr_0.9fr]">
              <div
                className="min-h-[420px] bg-cover bg-center lg:min-h-[560px]"
                style={{
                  backgroundImage:
                    // "url('https://www.collegenp.com/uploads/2022/08/Prithvi-Narayan-Campus-(PN-Campus).jpg')",
                    "url('https://upload.wikimedia.org/wikipedia/commons/c/c0/Sagarmatha_Engineering_College_-_Building_2.jpg')",
                }}
              />

              <div
                className="flex flex-col justify-center p-8 sm:p-12 lg:p-16"
                id="explore"
              >
                <Badge className="mb-6 w-fit rounded-full">
                  Campus Community
                </Badge>

                <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                  Learn, participate, connect.
                </h2>

                <p className="mt-6 leading-7 text-muted-foreground">
                  A college experience extends beyond lectures and examinations.
                  Student clubs, sports, cultural activities, competitions,
                  workshops, and social events create opportunities to discover
                  new interests and meet people across the campus.
                </p>

                <div className="mt-8 space-y-5">
                  <InfoRow
                    icon={<GraduationCap />}
                    title="Academic community"
                    description="Students and teachers coming together across different fields."
                  />

                  <InfoRow
                    icon={<Users />}
                    title="Student participation"
                    description="Opportunities to contribute, organize, compete, and collaborate."
                  />

                  <InfoRow
                    icon={<CalendarDays />}
                    title="One place for events"
                    description="A simpler way to discover what's happening around campus."
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            ABOUT CAMPUS
        ========================================================= */}

        {/* =========================================================
            ACADEMIC COMMUNITY
        ========================================================= */}
        <section className="px-6 py-24 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-2xl">
              <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-primary">
                Academic community
              </p>

              <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                Different disciplines.
                <span className="block text-muted-foreground">
                  One community.
                </span>
              </h2>

              <p className="mt-6 leading-7 text-muted-foreground">
                The campus brings together students from a broad range of
                academic disciplines. CEMS provides a common space where those
                communities can meet through events and activities.
              </p>
            </div>

            <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <AcademicCard
                title="Humanities & Social Sciences"
                description="Culture, economics, geography, sociology, BCA, and more."
              />

              <AcademicCard
                title="Management"
                description="Business, finance, accounting, marketing, and management."
              />

              <AcademicCard
                title="Education"
                description="Education, teaching practice, social studies, and related fields."
              />

              <AcademicCard
                title="Science & Technology"
                description="Computer science, mathematics, biology, chemistry, and other sciences."
              />
            </div>
          </div>
        </section>

        {/* =========================================================
            FACILITIES / EXPERIENCE
        ========================================================= */}
        <section className="px-6 pb-24 lg:px-8 lg:pb-32">
          <div className="mx-auto max-w-7xl">
            <div className="relative overflow-hidden rounded-3xl">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&w=1800&q=85')",
                }}
              />

              <div className="absolute inset-0 bg-black/65" />

              <div className="relative grid gap-12 p-8 text-white sm:p-12 lg:grid-cols-[1fr_0.8fr] lg:p-16">
                <div>
                  <p className="text-sm font-medium uppercase tracking-[0.2em] text-white/60">
                    The student experience
                  </p>

                  <h2 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
                    Your campus experience doesn't end at the classroom door.
                  </h2>

                  <p className="mt-6 max-w-xl leading-7 text-white/70">
                    From the library and learning spaces to student activities
                    and campus events, the environment around students plays an
                    important role in their college journey.
                  </p>
                </div>

                <div className="space-y-3">
                  <ExperienceItem
                    title="Library & learning resources"
                    description="Spaces and resources that support academic learning."
                  />

                  <ExperienceItem
                    title="Student activities"
                    description="A place for students to participate and build connections."
                  />

                  <ExperienceItem
                    title="Events & competitions"
                    description="Opportunities to showcase skills and enjoy campus life."
                  />

                  <ExperienceItem
                    title="Community"
                    description="Meet people, share ideas, and create lasting memories."
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            FINAL CTA
        ========================================================= */}
        <section className="border-t px-6 py-24 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-4xl text-center">
            <Badge variant="outline" className="rounded-full px-4 py-2">
              What's happening on campus?
            </Badge>

            <h2 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              There is always something
              <span className="block text-muted-foreground">
                worth being part of.
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              Explore upcoming events, discover opportunities, and become an
              active part of your college community.
            </p>

            <Button size="lg" className="group mt-9 rounded-full px-7">
              View Upcoming Events
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </section>
      </main>

      {/* =========================================================
          FOOTER
      ========================================================= */}
      <footer className="border-t bg-muted/30">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <div>
            <p className="font-medium text-foreground">
              College Event Management System
            </p>
            <p className="mt-1">Connecting students through campus life.</p>
          </div>

          <p>Prithvi Narayan Campus · Pokhara, Nepal</p>
        </div>
      </footer>
    </div>
  );
}

/* 
   REUSABLE COMPONENTS
 */

function FeatureCard({
  icon,
  number,
  title,
  description,
}: {
  icon: React.ReactNode;
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="group rounded-2xl border bg-background p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
          {icon}
        </div>

        <span className="text-sm text-muted-foreground">{number}</span>
      </div>

      <h3 className="mt-7 text-xl font-semibold">{title}</h3>

      <p className="mt-3 text-sm leading-6 text-muted-foreground">
        {description}
      </p>
    </div>
  );
}

function InfoRow({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-background shadow-sm">
        {icon}
      </div>

      <div>
        <h4 className="font-medium">{title}</h4>

        <p className="mt-1 text-sm leading-6 text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
}

function AcademicCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="group rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-muted/50">
      <div className="mb-10 flex justify-end">
        <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-primary" />
      </div>

      <h3 className="text-lg font-semibold">{title}</h3>

      <p className="mt-3 text-sm leading-6 text-muted-foreground">
        {description}
      </p>
    </div>
  );
}

export function ExperienceItem({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-sm">
      <h3 className="font-medium">{title}</h3>

      <p className="mt-1 text-sm leading-6 text-white/60">{description}</p>
    </div>
  );
}
