import SectionHeader from "@/components/SectionHeader";

export default function Blog() {
  return (
    <div
      dir="rtl"
      className="bg-dark-mode mx-auto mt-24 flex w-full max-w-xl flex-col gap-5 p-5 font-ibm"
    >
      <SectionHeader
        eyebrow="المدونة"
        className="font-ibm"
        description="مقالات ومصادر ومقاطع وشروحات وأدوات والمزيد"
      />
      <div className="mt-16 flex flex-col items-center justify-center rounded-2xl p-12 text-center backdrop-blur-sm">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500">
          <svg
            className="h-10 w-10 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
        </div>
        <h2 className="mb-4 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-4xl font-bold text-transparent">
          قريبًا
        </h2>
        <p className="mb-6 text-lg text-gray-300">
          نعمل على إضافة محتوى رائع ومفيد هنا
        </p>
        <div className="flex space-x-2 space-x-reverse">
          <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-500"></div>
          <div className="animation-delay-200 h-2 w-2 animate-pulse rounded-full bg-emerald-500"></div>
          <div className="animation-delay-400 h-2 w-2 animate-pulse rounded-full bg-emerald-500"></div>
        </div>
      </div>
    </div>
  );
}
