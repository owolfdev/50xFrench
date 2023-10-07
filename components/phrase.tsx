"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { PHRASES } from "@/data/french_phrases";

interface Phrase {
  phrase: string;
  translation: string;
}

export function PhraseCard() {
  //get phrase
  function getTodaysPhrase(): Phrase {
    // Get the index and date from local storage
    const storedIndex = localStorage.getItem("phraseIndex");
    const storedDate = localStorage.getItem("lastVisitedDate");
    const currentDate = new Date().toISOString().split("T")[0]; // gets YYYY-MM-DD format

    let index = 0; // default

    if (storedDate !== currentDate || !storedIndex) {
      // If the user hasn't visited today or is a first-time visitor
      if (storedIndex) {
        index = (parseInt(storedIndex, 10) + 1) % PHRASES.length; // Increment and loop if necessary
      }
      localStorage.setItem("phraseIndex", index.toString());
      localStorage.setItem("lastVisitedDate", currentDate);
    } else {
      index = parseInt(storedIndex, 10);
    }

    return PHRASES[index];
  }

  //construct date
  const getFormattedDateWithDay = (): string => {
    const today: Date = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    };
    return today.toLocaleDateString("en-US", options);
  };

  return (
    <div className="flex flex-col gap-12 p-2">
      <div className="flex flex-col gap-0 p-2">
        <div className="">{getFormattedDateWithDay()}</div>
        <div className="text-xl ">Repeat this phrase 50 times.</div>
        <div>Visit every day for a new phrase.</div>
      </div>
      <Card className="w-full">
        <CardHeader>
          {/* <div className="pb-4">{getFormattedDateWithDay()}</div>
        <CardTitle>Repeat this phrase 50 times today.</CardTitle>
        <CardDescription>
          If you don't feel fluent after this, repeat.
        </CardDescription> */}
        </CardHeader>
        <CardContent>
          <div className="sm:p-6">
            <p className="sm:text-3xl text-2xl">{getTodaysPhrase().phrase}</p>
          </div>
          <div className="sm:p-6 p-4">
            <p className="text-muted-foreground">
              {getTodaysPhrase().translation}
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Previous</Button>
          <Button>Next</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
