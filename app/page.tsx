import PhraseDisplay from "@/components/phrase-display";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between sm:p-24 p-2">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <PhraseDisplay />
      </div>
    </main>
  );
}
