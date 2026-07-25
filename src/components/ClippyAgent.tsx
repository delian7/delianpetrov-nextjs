"use client";

import { useEffect, useId, useRef, useState } from "react";
import { getClippyResponse, CLIPPY_SUGGESTIONS } from "@/data/clippyKnowledge";
import {
  SEATTLE_LOCATION,
  fetchLocationForZip,
  fetchWeatherForCoords,
  type WeatherLocation,
  type WeatherNow,
} from "@/lib/weather";

interface ChatMessage {
  id: number;
  role: "user" | "clippy";
  text: string;
}

const GREETING =
  "Hi, I'm Cliply! I can tell you about Delian's projects, experience, or how to get in touch. Ask me anything, or tap a suggestion below.";

const INTRO_TIP_KEY = "clippy-intro-shown";
const ZIP_STORAGE_KEY = "cliply-zip";

function weatherSentence(weather: WeatherNow, location: WeatherLocation) {
  return `${weather.emoji} It's currently ${weather.tempF}°F and ${weather.text} in ${location.label}.`;
}

export default function ClippyAgent() {
  const [open, setOpen] = useState(false);
  const [showTip, setShowTip] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 0, role: "clippy", text: GREETING },
  ]);
  const [input, setInput] = useState("");
  const nextId = useRef(1);
  const messagesRef = useRef<HTMLDivElement>(null);

  const [location, setLocation] = useState<WeatherLocation>(SEATTLE_LOCATION);
  const [weather, setWeather] = useState<WeatherNow | null>(null);
  const [weatherStatus, setWeatherStatus] = useState<"loading" | "ready" | "error">("loading");
  const [zipFormOpen, setZipFormOpen] = useState(false);
  const [zipDraft, setZipDraft] = useState("");
  const [zipError, setZipError] = useState<string | null>(null);

  // One-time, dismissible intro bubble — never reappears mid-session, never blocks anything.
  // Shows 2s after the visitor scrolls past the hero and stops scrolling, or after
  // 10s if they're still sitting on the hero (haven't scrolled past it yet).
  useEffect(() => {
    if (sessionStorage.getItem(INTRO_TIP_KEY)) return;

    let heroPassed = false;
    let shown = false;
    let scrollIdleTimer: ReturnType<typeof setTimeout> | null = null;

    const maybeShow = () => {
      if (shown) return;
      shown = true;
      setShowTip(true);
      sessionStorage.setItem(INTRO_TIP_KEY, "1");
    };

    const handleScroll = () => {
      const heroEl = document.querySelector(".hero");
      if (heroEl) heroPassed = heroEl.getBoundingClientRect().bottom <= 0;

      if (scrollIdleTimer) clearTimeout(scrollIdleTimer);
      scrollIdleTimer = setTimeout(() => {
        if (heroPassed) maybeShow();
      }, 2000);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    const stillOnHeroTimer = setTimeout(() => {
      if (!heroPassed) maybeShow();
    }, 10000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollIdleTimer) clearTimeout(scrollIdleTimer);
      clearTimeout(stillOnHeroTimer);
    };
  }, []);

  useEffect(() => {
    if (!showTip) return;
    const hideTimer = setTimeout(() => setShowTip(false), 9000);
    return () => clearTimeout(hideTimer);
  }, [showTip]);

  // Dismiss the tip the moment the visitor scrolls again once it's up.
  useEffect(() => {
    if (!showTip) return;
    const dismissOnScroll = () => setShowTip(false);
    window.addEventListener("scroll", dismissOnScroll, { passive: true });
    return () => window.removeEventListener("scroll", dismissOnScroll);
  }, [showTip]);

  useEffect(() => {
    const el = messagesRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, open]);

  // Load the last ZIP the visitor set (if any), otherwise default to Seattle.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      setWeatherStatus("loading");
      try {
        const storedZip = localStorage.getItem(ZIP_STORAGE_KEY);
        const loc = storedZip && /^\d{5}$/.test(storedZip) ? await fetchLocationForZip(storedZip) : SEATTLE_LOCATION;
        const w = await fetchWeatherForCoords(loc.lat, loc.lon);
        if (cancelled) return;
        setLocation(loc);
        setWeather(w);
        setWeatherStatus("ready");
      } catch {
        if (!cancelled) setWeatherStatus("error");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const changeZip = async (rawZip: string): Promise<{ ok: boolean; message: string }> => {
    const zip = rawZip.trim();
    if (!/^\d{5}$/.test(zip)) {
      return { ok: false, message: "ZIP codes are 5 digits, like 98101." };
    }
    try {
      const loc = await fetchLocationForZip(zip);
      const w = await fetchWeatherForCoords(loc.lat, loc.lon);
      setLocation(loc);
      setWeather(w);
      setWeatherStatus("ready");
      localStorage.setItem(ZIP_STORAGE_KEY, zip);
      return { ok: true, message: `Got it — ${weatherSentence(w, loc)}` };
    } catch {
      return { ok: false, message: `I couldn't find a US ZIP code "${zip}". Mind trying another one?` };
    }
  };

  const useSeattle = async () => {
    localStorage.removeItem(ZIP_STORAGE_KEY);
    setZipFormOpen(false);
    setZipError(null);
    setWeatherStatus("loading");
    try {
      const w = await fetchWeatherForCoords(SEATTLE_LOCATION.lat, SEATTLE_LOCATION.lon);
      setLocation(SEATTLE_LOCATION);
      setWeather(w);
      setWeatherStatus("ready");
    } catch {
      setWeatherStatus("error");
    }
  };

  const handleZipFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await changeZip(zipDraft);
    if (result.ok) {
      setZipFormOpen(false);
      setZipDraft("");
      setZipError(null);
    } else {
      setZipError(result.message);
    }
  };

  const send = async (raw: string) => {
    const text = raw.trim();
    if (!text) return;
    setMessages((prev) => [...prev, { id: nextId.current++, role: "user", text }]);
    setInput("");

    // A bare 5-digit message is treated as "check the weather for this ZIP".
    if (/^\d{5}$/.test(text)) {
      const thinkingId = nextId.current++;
      setMessages((prev) => [...prev, { id: thinkingId, role: "clippy", text: "Checking that ZIP code…" }]);
      const result = await changeZip(text);
      setMessages((prev) => prev.map((m) => (m.id === thinkingId ? { ...m, text: result.message } : m)));
      return;
    }

    if (/weather|forecast|temperature|degrees out|how (hot|cold)/i.test(text)) {
      const reply =
        weatherStatus === "ready" && weather
          ? `${weatherSentence(weather, location)} Type a 5-digit ZIP code any time to check somewhere else.`
          : "I'm still checking the weather — ask again in a moment, or type a 5-digit ZIP code to set your location.";
      setMessages((prev) => [...prev, { id: nextId.current++, role: "clippy", text: reply }]);
      return;
    }

    const reply = getClippyResponse(text);
    setMessages((prev) => [...prev, { id: nextId.current++, role: "clippy", text: reply }]);
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
          {weatherStatus === "ready" && weather && (
            <p className="clippy-tip-weather">By the way — {weatherSentence(weather, location)}</p>
          )}
        </div>
      )}

      {open && (
        <div className="clippy-panel" role="dialog" aria-label="Cliply assistant" aria-modal="false">
          <div className="clippy-panel-header">
            <span className="clippy-panel-title">
              <ClippyGlyph size={18} />
              Cliply
              <span className="clippy-made-by">Made by Delian</span>
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

          <div className="clippy-weather-strip">
            <span className="clippy-weather-line">
              {weatherStatus === "loading" && "Checking the weather…"}
              {weatherStatus === "error" && "Weather unavailable right now."}
              {weatherStatus === "ready" && weather && `${weather.emoji} ${location.label} — ${weather.tempF}°F, ${weather.text}`}
            </span>
            <button
              type="button"
              className="clippy-zip-toggle"
              onClick={() => {
                setZipFormOpen((v) => !v);
                setZipError(null);
              }}
            >
              Change ZIP
            </button>
          </div>

          {zipFormOpen && (
            <form className="clippy-zip-form" onSubmit={handleZipFormSubmit}>
              <input
                type="text"
                inputMode="numeric"
                value={zipDraft}
                onChange={(e) => setZipDraft(e.target.value.replace(/\D/g, "").slice(0, 5))}
                placeholder="ZIP code"
                aria-label="Enter a 5-digit US ZIP code"
                maxLength={5}
              />
              <button type="submit" disabled={zipDraft.length !== 5}>
                Go
              </button>
              <button type="button" className="clippy-zip-reset" onClick={useSeattle}>
                Use Seattle
              </button>
            </form>
          )}
          {zipFormOpen && zipError && <div className="clippy-zip-error">{zipError}</div>}

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

function ClippyGlyph({ size = 32, animated = false }: { size?: number; animated?: boolean }) {
  const gradId = `clippyWire${useId()}`;

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
