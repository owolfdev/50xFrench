"use client";
import React from "react";

interface PhraseCounterProps {
  currentIndex: number;
  totalPhrases: number;
}

const PhraseCounter: React.FC<PhraseCounterProps> = ({
  currentIndex,
  totalPhrases,
}) => {
  // Convert 0-based index to 1-based display
  const displayNumber = currentIndex + 1;

  return (
    <div className="flex items-center justify-center mb-4 pt-6">
      <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300">
        Phrase {displayNumber} of {totalPhrases}
      </div>
    </div>
  );
};

export default PhraseCounter;
