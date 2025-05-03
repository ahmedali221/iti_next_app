import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main>
        <div>
          <h1 className="text-4xl font-bold text-center">
            Welcome to My Website
          </h1>
          <p className="text-center mt-4">
            This is a simple example of a Next.js application with a custom
            layout.
          </p>
        </div>
      </main>
    </div>
  );
}
