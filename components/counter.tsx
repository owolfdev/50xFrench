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
    <div className="flex flex-col gap-4">
      <div className="text-lg">Count to 50</div>
      <div className="flex gap-4">
        <Button variant={`outline`} onClick={incrementCounter}>
          Click Me
        </Button>
        <Button variant={`outline`} onClick={resetCounter}>
          Reset
        </Button>
      </div>
      <p className="pl-2">Counter: {count}</p>
    </div>
  );
};

export default Counter;
