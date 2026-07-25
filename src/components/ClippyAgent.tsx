"use client";

import { useEffect, useRef, useState } from "react";
import { getClippyResponse, CLIPPY_SUGGESTIONS } from "@/data/clippyKnowledge";

interface ChatMessage {
  id: number;
  role: "user" | "clippy";
  text: string;
}

const GREETING =
  "Hi, I'm Cliply! I can tell you about Delian's projects, experience, or how to get in touch. Ask me anything, or tap a suggestion below.";

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
        <div className="clippy-panel" role="dialog" aria-label="Cliply assistant" aria-modal="false">
          <div className="clippy-panel-header">
            <span className="clippy-panel-title">
              <ClippyGlyph size={18} />
              Cliply
            </span>
            <button
              type="button"
              className="clippy-panel-close"
              onClick={() => setOpen(false)}
              aria-label="Close Cliply"
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
              aria-label="Message Cliply"
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
        aria-label={open ? "Close Cliply assistant" : "Open Cliply assistant"}
        aria-expanded={open}
      >
        <ClippyGlyph size={34} animated />
      </button>
    </div>
  );
}

let glyphUid = 0;

function ClippyGlyph({ size = 32, animated = false }: { size?: number; animated?: boolean }) {
  const [gradId] = useState(() => `clippyWire${glyphUid++}`);

  // Outer loop: sweeps up from the bottom, over the top, and curls into a
  // small hook on the upper right — like real bent wire, not a closed ring.
  const outerStrand =
    "M9 58 C9 40 9 24 9 22 C9 12 14 6 20 6 C26 6 30 11 30 18 C30 24 27 29 22 30";
  // Inner strand: the pair of legs + rounded U-turn beneath the eyes.
  const innerStrand =
    "M15 50 L15 20 C15 15 18 12 21.5 13 C24.5 13.8 26 16.5 25.5 20 L25.5 44 C25.5 51.5 19.5 56.5 13 55.5 C7 54.6 4 49.5 4 44";

  return (
    <svg
      viewBox="0 0 40 64"
      width={size}
      height={(size * 64) / 40}
      className={`clippy-glyph ${animated ? "clippy-glyph-animated" : ""}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#efe9ff" />
          <stop offset="45%" stopColor="#a99ee0" />
          <stop offset="100%" stopColor="#6d5fa8" />
        </linearGradient>
      </defs>
      <g className="clippy-body">
        <path d={outerStrand} fill="none" stroke={`url(#${gradId})`} strokeWidth="3.6" strokeLinecap="round" />
        <path d={innerStrand} fill="none" stroke={`url(#${gradId})`} strokeWidth="3.6" strokeLinecap="round" />
        {/* thin glossy highlight streak for a plastic/metal sheen */}
        <path d="M11 50 L11 24" stroke="#f5f2ff" strokeWidth="0.9" strokeLinecap="round" opacity="0.75" />
      </g>
      <g className="clippy-face">
        <ellipse cx="14" cy="16.5" rx="3.4" ry="4.3" fill="#ffffff" />
        <ellipse cx="23.5" cy="19" rx="4" ry="5" fill="#ffffff" />
        <circle className="clippy-pupil" cx="15.2" cy="17.5" r="1.6" fill="#1a1a1a" />
        <circle className="clippy-pupil" cx="22.6" cy="20.2" r="1.9" fill="#1a1a1a" />
        <path d="M8 12.5 C10.5 9 14.5 8.3 18 10.2 C14.6 9.6 11 10.3 8.6 13.4 Z" fill="#231f38" />
        <path d="M20.5 10.8 C23 8 27.5 8.4 30 11.5 C27 9.6 23.6 9.7 21.2 12.3 Z" fill="#231f38" />
      </g>
    </svg>
  );
}
