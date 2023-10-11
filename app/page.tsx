import PhraseDisplay from "@/components/phrase-display";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between sm:px-8 p-2 bg-[#f55751]">
      <div className="flex justify-between items-center p-2 w-full">
        <h1 className="font-bold text-3xl">Répéter</h1>
        <div className="pr-2">
          <img
            alt="App Icon"
            src="/app-icon.png"
            width={40}
            height={40}
            className="rounded-lg"

            // layout="fill"
          />
        </div>
      </div>
      <div className="z-10 max-w-3xl w-full items-center justify-between font-mono text-sm lg:flex">
        <div className="">
          <PhraseDisplay />
        </div>
      </div>
      <div className="p-8 text-black opacity-80 text-sm">
        Répéter - French language learning app -{" "}
        <Link target="_blank" href="http://owolf.com">
          Built by Owolf
        </Link>
      </div>
    </main>
  );
}
