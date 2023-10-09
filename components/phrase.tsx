// "use client";

// import * as React from "react";

// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";

// import { useRouter } from "next/navigation";

// // import { PHRASES } from "@/data/french_phrases";

// interface Phrase {
//   phrase: string;
//   translation: string;
// }

// export function PhraseCard() {
//   const [phrase, setPhrase] = React.useState<Phrase | null>(null);
//   const [playAudio, setPlayAudio] = React.useState(false);
//   const [cacheBuster, setCacheBuster] = React.useState(Date.now());
//   const [audioURL, setAudioURL] = React.useState<string | null>(null);
//   const audioRef = React.useRef<HTMLAudioElement | null>(null);
//   const router = useRouter();

//   React.useEffect(() => {
//     if (playAudio && audioRef.current) {
//       audioRef.current.play();
//       setPlayAudio(false); // Reset the trigger
//     }
//   }, [playAudio]);

//   React.useEffect(() => {
//     if (!phrase) return; // don't try to fetch audio if there's no phrase

//     // Fetch audio whenever the phrase changes
//     triggerTextToSpeech(phrase.phrase);
//   }, [phrase]);

//   React.useEffect(() => {
//     const todaysPhrase = getTodaysPhrase();
//     setPhrase(todaysPhrase);
//   }, []);

//   //get phrase
//   function getTodaysPhrase(): Phrase {
//     // Get the index and date from local storage
//     const storedIndex = localStorage.getItem("phraseIndex");
//     const storedDate = localStorage.getItem("lastVisitedDate");
//     const currentDate = new Date().toISOString().split("T")[0]; // gets YYYY-MM-DD format

//     let index = 0; // default

//     if (storedDate !== currentDate || !storedIndex) {
//       // If the user hasn't visited today or is a first-time visitor
//       if (storedIndex) {
//         index = (parseInt(storedIndex, 10) + 1) % PHRASES.length; // Increment and loop if necessary
//       }
//       localStorage.setItem("phraseIndex", index.toString());
//       localStorage.setItem("lastVisitedDate", currentDate);
//     } else {
//       index = parseInt(storedIndex, 10);
//     }

//     return PHRASES[index];
//   }

//   //construct date
//   const getFormattedDateWithDay = (): string => {
//     const today: Date = new Date();
//     const options: Intl.DateTimeFormatOptions = {
//       weekday: "long",
//       month: "long",
//       day: "numeric",
//       year: "numeric",
//     };
//     return today.toLocaleDateString("en-US", options);
//   };

//   if (!phrase) return null;

//   async function triggerTextToSpeech(text: string) {
//     try {
//       const response = await fetch("/api/text-to-speech", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ text: text }),
//       });

//       const data = await response.json();

//       if (data.status === "success") {
//         // Update the state with the Supabase URL
//         setAudioURL(data.audioURL);
//       } else {
//         console.error(data.error);
//       }

//       return data;
//     } catch (error) {
//       console.error("Error triggering text-to-speech:", error);
//     }
//   }

//   // Usage example (e.g., in an event handler)
//   triggerTextToSpeech(phrase.phrase);

//   const handleTextToSpeech = async () => {
//     console.log("handle text to speech:", phrase?.phrase);

//     // const response = await triggerTextToSpeech(phrase?.phrase as string);

//     // console.log("response", JSON.stringify(response));
//     // setCacheBuster(Date.now());
//     // router.refresh();
//     setPlayAudio(true);
//   };

//   return (
//     <div className="flex flex-col gap-12 p-2">
//       <div className="flex flex-col gap-0 p-2">
//         <div className="">{getFormattedDateWithDay()}</div>
//         <div className="text-xl ">Repeat this phrase 50 times.</div>
//         <div>Visit every day for a new phrase.</div>
//       </div>
//       <Card className="w-full">
//         <CardHeader></CardHeader>
//         <CardContent>
//           <div className="sm:p-6">
//             <p className="sm:text-3xl text-2xl">{phrase.phrase}</p>
//           </div>
//           <div className="sm:p-6 p-4">
//             <p className="text-muted-foreground">{phrase.translation}</p>
//           </div>
//         </CardContent>
//         <CardFooter className="flex justify-between">
//           <Button onClick={handleTextToSpeech} variant="outline">
//             Speak Phrase
//           </Button>
//           {/* <Button>Next</Button> */}
//         </CardFooter>
//       </Card>
//       <audio className="hidden" ref={audioRef} controls>
//         <source
//           src={`https://pvtdkxgnseqfwxsistpq.supabase.co/storage/v1/object/public/audio-bucket/output.mp3`}
//           type="audio/mpeg"
//         />
//         Your browser does not support the audio element.
//       </audio>
//     </div>
//   );
// }
