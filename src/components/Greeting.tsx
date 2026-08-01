"use client";

import { useEffect, useState } from "react";

export default function Greeting() {
  const [greeting, setGreeting] = useState<string>("");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      setGreeting("早安，新的一天。\nGood morning.");
    } else if (hour >= 12 && hour < 18) {
      setGreeting("下午好，保持专注。\nGood afternoon.");
    } else {
      setGreeting("晚上好，放松片刻。\nGood evening.");
    }
  }, []);

  if (!greeting) return null;

  return (
    <h1 className="whitespace-pre-line text-xl font-light leading-relaxed tracking-tight text-fg/90 sm:text-2xl md:text-3xl">
      {greeting}
    </h1>
  );
}
