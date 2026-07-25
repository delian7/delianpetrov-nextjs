"use client";

import { useEffect, useRef, useState } from "react";
import { getClippyResponse, CLIPPY_SUGGESTIONS } from "@/data/clippyKnowledge";

interface ChatMessage {
  id: number;
  role: "user" | "clippy";
  text: string;
}

const GREETING =
  "Hi, I'm Clippy! I can tell you about Delian's projects, experience, or how to get in touch. Ask me anything, or tap a suggestion below.";

const INTRO_TIP_KEY = "clippy-intro-shown";

export default function ClippyAgent() {
  const [open, setOpen] = useState(false);
  const [showTip, setShowTip] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 0, role: "clippy", text: GREETING },
  ]);
  const [input, setInput] = useState("");
  const nextId = useRef(1);
  const messagesRef = useRef<HTMLDivElement>(null);

  // One-time, dismissible intro bubble — never reappears mid-session, never blocks anything.
  useEffect(() => {
    if (sessionStorage.getItem(INTRO_TIP_KEY)) return;
    const showTimer = setTimeout(() => {
      setShowTip(true);
      sessionStorage.setItem(INTRO_TIP_KEY, "1");
    }, 2500);
    return () => clearTimeout(showTimer);
  }, []);

  useEffect(() => {
    if (!showTip) return;
    const hideTimer = setTimeout(() => setShowTip(false), 8000);
    return () => clearTimeout(hideTimer);
  }, [showTip]);

  useEffect(() => {
    const el = messagesRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, open]);

  const send = (raw: string) => {
    const text = raw.trim();
    if (!text) return;
    const reply = getClippyResponse(text);
    setMessages((prev) => [
      ...prev,
      { id: nextId.current++, role: "user", text },
      { id: nextId.current++, role: "clippy", text: reply },
    ]);
    setInput("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    send(input);
  };

  const toggleOpen = () => {
    setShowTip(false);
    setOpen((prev) => !prev);
  };

  return (
    <div className="clippy-root">
      {showTip && !open && (
        <div className="clippy-tip" role="status">
          <button
            type="button"
            className="clippy-tip-close"
            onClick={() => setShowTip(false)}
            aria-label="Dismiss tip"
          >
            &times;
          </button>
          <p>{GREETING}</p>
        </div>
      )}

      {open && (
        <div className="clippy-panel" role="dialog" aria-label="Clippy assistant" aria-modal="false">
          <div className="clippy-panel-header">
            <span className="clippy-panel-title">
              <ClippyGlyph size={18} />
              Clippy
            </span>
            <button
              type="button"
              className="clippy-panel-close"
              onClick={() => setOpen(false)}
              aria-label="Close Clippy"
            >
              &times;
            </button>
          </div>

          <div className="clippy-panel-messages" ref={messagesRef} aria-live="polite">
            {messages.map((m) => (
              <div key={m.id} className={`clippy-msg clippy-msg-${m.role}`}>
                {m.text}
              </div>
            ))}
          </div>

          <div className="clippy-suggestions">
            {CLIPPY_SUGGESTIONS.map((s) => (
              <button key={s} type="button" className="clippy-chip" onClick={() => send(s)}>
                {s}
              </button>
            ))}
          </div>

          <form className="clippy-input-row" onSubmit={handleSubmit}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about projects, experience, contact..."
              maxLength={200}
              aria-label="Message Clippy"
              autoComplete="off"
            />
            <button type="submit" aria-label="Send" disabled={!input.trim()}>
              Send
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        className={`clippy-avatar-btn ${open ? "active" : ""}`}
        onClick={toggleOpen}
        aria-label={open ? "Close Clippy assistant" : "Open Clippy assistant"}
        aria-expanded={open}
      >
        <ClippyGlyph size={34} animated />
      </button>
    </div>
  );
}

function ClippyGlyph({ size = 32, animated = false }: { size?: number; animated?: boolean }) {
  return (
    <svg
      viewBox="0 0 40 64"
      width={size}
      height={(size * 64) / 40}
      className={`clippy-glyph ${animated ? "clippy-glyph-animated" : ""}`}
      aria-hidden="true"
    >
      <path
        d="M13 44 L13 18 C13 13.5 16.5 10 21 10 C25.5 10 29 13.5 29 18 L29 46 C29 53 23.5 58 16.5 58 C9.5 58 4 53 4 46 L4 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="clippy-body"
      />
      <g className="clippy-face">
        <circle cx="15" cy="20" r="3.4" fill="var(--bg-elevated, #fff)" />
        <circle cx="25" cy="20" r="3.4" fill="var(--bg-elevated, #fff)" />
        <circle className="clippy-pupil" cx="16" cy="19.5" r="1.4" fill="currentColor" />
        <circle className="clippy-pupil" cx="26" cy="19.5" r="1.4" fill="currentColor" />
        <path d="M13.5 14.5 Q15 12.5 17 13.5" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" />
        <path d="M23 13.5 Q25 12.5 26.5 14.5" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" />
        <path d="M16.5 27 Q20.5 30 24.5 27" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      </g>
    </svg>
  );
}
