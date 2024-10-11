export const skills = [
  {
    title: "Web Frontend Development",
    description:
      "Performance obsessed, accessible, and responsive web applications. Mostly React, Next.js, Framer Motion, and TailwindCSS.",
  },
  {
    title: "Mobile App Development",
    description:
      "Cross-platform mobile applications for iOS and Android. Mostly React Native.",
  },
  {
    title: "Backend Web Development",
    description:
      "RESTful APIs, GraphQL, and realtime applications. Mostly Node.js, NestJS, and Drizzle.",
  },
  {
    title: "Other",
    description: `Familar with various deployment strategies, CI/CD, and cloud providers.
Professional code reviews, mentoring, and more.`,
  },
] as const;

export const locations = [
  {
    title: "Remote",
    value: "remote",
  },
  {
    title: "On Site",
    value: "onsite",
  },
] as const;

export const deals = [
  {
    title: "Part Time",
    value: "part",
  },
  {
    title: "Full Time",
    value: "full",
  },
  {
    title: "Contract",
    value: "contract",
  },
  {
    title: "Freelance",
    value: "freelance",
  },
  {
    title: "Hourly",
    value: "hourly",
  },
] as const;

export const techStack = [
  {
    id: "backend",
    label: "Backend",
  },
  {
    id: "frontend",
    label: "Frontend",
  },
  {
    id: "mobile",
    label: "Mobile App",
  },
  {
    id: "other",
    label: "Other",
  },
] as const;
