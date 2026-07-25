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
  const bodyPath =
    "M13 44 L13 18 C13 13.5 16.5 10 21 10 C25.5 10 29 13.5 29 18 L29 46 C29 53 23.5 58 16.5 58 C9.5 58 4 53 4 46 L4 20";

  return (
    <svg
      viewBox="0 0 40 64"
      width={size}
      height={(size * 64) / 40}
      className={`clippy-glyph ${animated ? "clippy-glyph-animated" : ""}`}
      aria-hidden="true"
    >
      {/* dark cartoon outline, drawn behind the gold wire */}
      <path
        d={bodyPath}
        fill="none"
        stroke="#6b4a10"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* classic gold paperclip wire */}
      <path
        d={bodyPath}
        fill="none"
        stroke="#FFCE3B"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="clippy-body"
      />
      <g className="clippy-face">
        <ellipse cx="15" cy="19.5" rx="3.6" ry="4.6" fill="#ffffff" stroke="#6b4a10" strokeWidth="1.2" />
        <ellipse cx="25" cy="19.5" rx="3.6" ry="4.6" fill="#ffffff" stroke="#6b4a10" strokeWidth="1.2" />
        <circle className="clippy-pupil" cx="16" cy="20" r="1.7" fill="#1a1208" />
        <circle className="clippy-pupil" cx="26" cy="20" r="1.7" fill="#1a1208" />
        <path d="M12 13 Q15 10 18.5 12" stroke="#6b4a10" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        <path d="M21.5 12 Q25 10 28 13" stroke="#6b4a10" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      </g>
    </svg>
  );
}
