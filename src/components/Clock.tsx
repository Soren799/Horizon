"use client";

import { useEffect, useState } from "react";

export default function Clock() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const h = now.getHours().toString().padStart(2, "0");
      const m = now.getMinutes().toString().padStart(2, "0");
      setTime(`${h}:${m}`);
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="font-mono text-7xl font-light leading-none tracking-tightest text-fg sm:text-8xl md:text-9xl">
      {time || "00:00"}
    </div>
  );
}
