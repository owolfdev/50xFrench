import PhraseDisplay from "@/components/phrase-display";
import Link from "next/link";
import Navigation from "@/components/navigation";

export default function Home() {
  return (
    <div className="z-10 max-w-3xl w-full items-center justify-between  lg:flex">
      <div className="pb-4">
        <PhraseDisplay />
      </div>
    </div>
  );
}
