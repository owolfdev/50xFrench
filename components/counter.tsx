"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

const Counter = () => {
  const [count, setCount] = useState(0);

  const incrementCounter = () => {
    if (count < 50) {
      setCount((prevCount) => prevCount + 1);
      const clickSound = new Audio("/sounds/Pop.mp3");
      clickSound.play();
    }

    if (count === 49) {
      const bellSound = new Audio("/sounds/Sosumi.mp3");
      bellSound.play();
    }
  };

  const resetCounter = () => {
    setCount(0);
  };

  return (
    <div className="flex flex-col gap-4 p-2">
      <div className="text-lg">
        <span className="pl-2">Counter: {count} / 50</span>
      </div>
      <div className="flex gap-4">
        <Button variant={`outline`} onClick={incrementCounter}>
          Click Me
        </Button>
        <Button variant={`outline`} onClick={resetCounter}>
          Reset
        </Button>
      </div>
    </div>
  );
};

export default Counter;
