"use client";
import React, { useState, useRef, useEffect, use } from "react";
import phrases from "@/data/phrases.json";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Counter from "@/components/counter";

const getFormattedDateWithDay = (): string => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  };
  return new Date().toLocaleDateString("en-US", options);
};

const getCurrentDate = () => new Date().toISOString().split("T")[0];

const PhraseDisplay: React.FC<{}> = () => {
  const [audioFiles, setAudioFiles] = useState({ message: "", data: [] });
  const [phrase, setPhrase] = useState({ id: "", phrase: "", translation: "" });
  const [currentAudioFile, setCurrentAudioFile] = useState({ file: "" });

  const initialRender = useRef(true); // Add this ref

  const getLastVisitDate = () => localStorage.getItem("lastVisitDate") || "";
  const getLastPhraseIndex = () =>
    Number(localStorage.getItem("phraseIndex")) || 0;

  useEffect(() => {
    const fetchAudioFiles = async () => {
      const response = await fetch("/api/get-audio-files");
      const data = await response.json();
      setAudioFiles(data);
    };

    fetchAudioFiles();

    // Handle localStorage logic for phrases
    const today = getCurrentDate();
    const lastVisitDate = getLastVisitDate();
    let phraseIndex = getLastPhraseIndex();

    // if (initialRender.current) {
    //   initialRender.current = false;
    //   return;
    // }

    if (!lastVisitDate) {
      // Check if it's the user's first visit
      localStorage.setItem("lastVisitDate", today);
      localStorage.setItem("phraseIndex", "0");
    } else if (lastVisitDate !== today) {
      phraseIndex += 1;
      if (phraseIndex >= phrases.length) {
        phraseIndex = 0;
      }
      console.log("phraseIndex", phraseIndex);
      localStorage.setItem("lastVisitDate", today);
      localStorage.setItem("phraseIndex", String(phraseIndex));
    }

    setPhrase(phrases[phraseIndex]);
  }, []);

  useEffect(() => {
    console.log("time to get the current audio file");
    const matchedAudioFile = audioFiles.data.find(
      (audioFile: any) => audioFile.file.split(".")[0] === phrase.id
    );

    console.log("matchedAudioFile:", matchedAudioFile);
    if (matchedAudioFile) {
      setCurrentAudioFile(matchedAudioFile);
    }
  }, [audioFiles, phrase]);

  useEffect(() => {
    console.log("currentAudioFile:", currentAudioFile);
  }, [currentAudioFile]);

  const handleNextPhrase = () => {
    const today = getCurrentDate();
    const lastVisitDate = getLastVisitDate();
    let phraseIndex = getLastPhraseIndex();

    phraseIndex += 1;
    if (phraseIndex >= phrases.length) {
      phraseIndex = 0;
    }
    console.log("phraseIndex", phraseIndex);
    localStorage.setItem("lastVisitDate", today);
    localStorage.setItem("phraseIndex", String(phraseIndex));

    setPhrase(phrases[phraseIndex]);
  };

  return (
    <div className="flex flex-col gap-6 p-2">
      <div className="flex flex-col gap-0 p-2">
        <div>{getFormattedDateWithDay()}</div>
        <div className="text-xl">Repeat this 50 times.</div>
        {/* <div>Visit every day for a new phrase.</div> */}
      </div>

      <Card className="w-full">
        <CardContent>
          <div className="pt-12 pb-6 px-4">
            <p className="sm:text-3xl text-2xl">{phrase.phrase}</p>
          </div>
          <div className="sm:p-6 p-4">
            <p className="text-muted-foreground">{phrase.translation}</p>
          </div>
        </CardContent>
        <CardFooter className="flex sm:flex-row flex-col gap-6 sm:justify-between sm:items-center items-start">
          {currentAudioFile.file && (
            <audio controls key={currentAudioFile.file}>
              <source
                src={`/audio/${currentAudioFile.file}`}
                type="audio/mpeg"
              />
              Your browser does not support the audio element.
            </audio>
          )}
          {/* <div>{currentAudioFile.file}</div> */}
          <Button onClick={handleNextPhrase} variant="outline">
            Next
          </Button>
        </CardFooter>
      </Card>
      <Counter />
    </div>
  );
};

export default PhraseDisplay;
