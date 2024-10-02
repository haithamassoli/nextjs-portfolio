import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div>
      <title>Page Not Found</title>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <h1 className="text-[clamp(100px,25vw,200px)] leading-none text-emerald-500">
          404
        </h1>
        <h2 className="text-[clamp(30px,5vw,50px)] font-normal">
          Page Not Found
        </h2>
        <Link as="button" href="/">
          <div className="flex w-full justify-center">
            <button className="btn mx-auto mt-12 rounded border border-green-400 bg-transparent px-4 py-2 text-green-400 transition-all duration-300 hover:bg-green-400 hover:bg-opacity-10">
              Go Home
            </button>
          </div>
        </Link>
      </main>
    </div>
  );
};

export default NotFoundPage;
