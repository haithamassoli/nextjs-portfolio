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
        <h2 className="mb-4 bg-gradient-to-r from-cyan-400 to-primary bg-clip-text text-4xl font-bold text-transparent">
          قريبًا
        </h2>
        <p className="mb-6 text-base text-gray-300">
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
