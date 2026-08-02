"use client";

import { useState, useRef, useEffect, useCallback } from "react";

/* ── SHA-256 hex of "777999111" ── */
const PASSWORD_HASH =
  "e0e17191482366197d86c3a3cda754bb9de55dd3820e2e5127ab09f318a0c83c";

async function hashInput(text: string): Promise<string> {
  const buf = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(text)
  );
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export default function PasswordGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const [locked, setLocked] = useState(true);
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [checking, setChecking] = useState(false);
  const [exiting, setExiting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  /* ── Check sessionStorage on mount ── */
  useEffect(() => {
    try {
      if (sessionStorage.getItem("horizon_unlocked") === "1") {
        setLocked(false);
      }
    } catch {
      /* noop */
    }
  }, []);

  /* ── Auto-focus input ── */
  useEffect(() => {
    if (locked) {
      const t = setTimeout(() => inputRef.current?.focus(), 600);
      return () => clearTimeout(t);
    }
  }, [locked]);

  /* ── Generate floating particles ── */
  useEffect(() => {
    if (!locked || !particlesRef.current) return;
    const el = particlesRef.current;
    const frag = document.createDocumentFragment();
    for (let i = 0; i < 24; i++) {
      const dot = document.createElement("div");
      dot.className = "gate-particle";
      const size = 2 + Math.random() * 3;
      dot.style.cssText = `
        position:absolute;
        width:${size}px;height:${size}px;
        left:${Math.random() * 100}%;
        top:${Math.random() * 100}%;
        border-radius:50%;
        background:rgba(212,175,55,${0.04 + Math.random() * 0.06});
        animation:particle-float ${8 + Math.random() * 12}s ease-in-out infinite;
        animation-delay:${Math.random() * -12}s;
      `;
      frag.appendChild(dot);
    }
    el.appendChild(frag);
  }, [locked]);

  /* ── Submit handler ── */
  const handleSubmit = useCallback(
    async (e?: React.FormEvent) => {
      e?.preventDefault();
      if (checking || !value) return;
      setChecking(true);
      setError(false);
      const h = await hashInput(value);
      if (h === PASSWORD_HASH) {
        try {
          sessionStorage.setItem("horizon_unlocked", "1");
        } catch {
          /* noop */
        }
        setExiting(true);
        setTimeout(() => setLocked(false), 800);
      } else {
        setError(true);
        setTimeout(() => setError(false), 600);
        setValue("");
        setChecking(false);
        inputRef.current?.focus();
      }
    },
    [value, checking]
  );

  /* ── Listen for Enter key ── */
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") handleSubmit();
    },
    [handleSubmit]
  );

  if (!locked) return <>{children}</>;

  return (
    <div
      className={`gate-overlay ${exiting ? "gate-exit" : ""}`}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Floating particles layer */}
      <div ref={particlesRef} className="gate-particles" />

      {/* Subtle ambient gradient */}
      <div className="gate-ambient" />

      {/* Main card */}
      <div className="gate-card" onClick={(e) => e.stopPropagation()}>
        {/* Brand */}
        <div className="gate-brand">
          <span className="gate-logo">H</span>
          <h1 className="gate-title">HORIZON</h1>
        </div>

        {/* Divider */}
        <div className="gate-divider" />

        {/* Lock icon */}
        <div className="gate-lock-row">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <span className="gate-hint">Enter password</span>
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="gate-form">
          <input
            ref={inputRef}
            type="password"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            autoComplete="off"
            spellCheck={false}
            className={`gate-input ${error ? "gate-shake" : ""}`}
            placeholder="········"
            disabled={checking}
          />
          <button type="submit" className="gate-btn" disabled={checking}>
            {checking ? (
              <span className="gate-spinner" />
            ) : (
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            )}
          </button>
        </form>

        {/* Error */}
        {error && <p className="gate-error">Incorrect password</p>}
      </div>
    </div>
  );
}