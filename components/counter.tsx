"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import confetti from "canvas-confetti";

const Counter = () => {
  const [count, setCount] = useState(0);

  const incrementCounter = () => {
    if (count < 50) {
      setCount((prevCount) => prevCount + 1);
      const clickSound = new Audio("/sounds/Pop.mp3");
      clickSound.play();
    }

    if (count === 49) {
      const applause = new Audio("/sounds/applause.mp3");
      const glass = new Audio("/sounds/Glass.mp3");
      glass.play();
      // applause.play();
      handleConfetti();
    }
  };

  const resetCounter = () => {
    setCount(0);
  };

  const handleConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 150,
      origin: { y: 0.2 },
    });
  };

  return (
    <div className="flex flex-col gap-4 p-2">
      <div className="text-lg">
        <span className="pl-2">Counter: {count} / 50</span>
      </div>
      <div className="flex gap-4">
        <Button variant={`outline`} onClick={incrementCounter}>
          Count
        </Button>
        <Button variant={`outline`} onClick={resetCounter}>
          Reset
        </Button>
      </div>
    </div>
  );
};

export default Counter;
