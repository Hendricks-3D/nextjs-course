"use client";
import { useState } from "react";
import { useAuth } from "@clerk/nextjs";
// import {useUser } from "@clerk/nextjs";
export const Counter = () => {
  console.log("Counter Component");
  const [count, setCounter] = useState(0);

  const { isLoaded, userId } = useAuth();

  if (!isLoaded || !userId) {
    //Only render component if user is logged in using clerk methods
    return null;
  }
  return (
    <button onClick={() => setCounter(count + 1)}> Clicked{count} times</button>
  );
};
