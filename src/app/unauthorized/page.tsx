"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function UnauthorizedContent() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const promptFromQuery = searchParams.get("prompt");
  const promptText =
    typeof promptFromQuery === "string" && promptFromQuery.length > 0
      ? promptFromQuery
      : "Enter passphrase to continue";

  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim() || !name) return;
    setLoading(true);
    setError(false);
    window.location.href = `/${encodeURIComponent(name)}?code=${encodeURIComponent(code.trim())}`;
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: "var(--bg, #0a0a0a)",
        color: "var(--text-primary, #f0f0f2)",
        fontFamily: "var(--font-body, system-ui)",
        padding: 24,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 420,
          background: "var(--bg-elevated, #141416)",
          border: "1px solid var(--border-glass, rgba(255,255,255,0.1))",
          borderRadius: 24,
          padding: 48,
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: "50%",
            background: "rgba(105,68,255,0.1)",
            border: "1px solid rgba(105,68,255,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 24px",
            fontSize: 28,
          }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#6944ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </div>

        <h1
          style={{
            fontFamily: "var(--font-display, system-ui)",
            fontSize: 24,
            fontWeight: 700,
            letterSpacing: -0.5,
            marginBottom: 8,
          }}
        >
          Protected Link
        </h1>
        <p
          style={{
            color: "var(--text-secondary, #8a8a9a)",
            fontSize: 15,
            lineHeight: 1.5,
            marginBottom: 32,
          }}
        >
          {promptText}
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
              setError(false);
            }}
            placeholder="Passphrase"
            autoFocus
            style={{
              width: "100%",
              padding: "14px 18px",
              borderRadius: 12,
              border: `1px solid ${error ? "rgba(239,68,68,0.5)" : "var(--border-glass, rgba(255,255,255,0.1))"}`,
              background: "rgba(255,255,255,0.03)",
              color: "var(--text-primary, #f0f0f2)",
              fontSize: 15,
              fontFamily: "var(--font-body, system-ui)",
              outline: "none",
              textAlign: "center",
              letterSpacing: 2,
              marginBottom: error ? 8 : 16,
              transition: "border-color 0.3s, box-shadow 0.3s",
              boxShadow: error ? "0 0 20px rgba(239,68,68,0.15)" : "none",
            }}
            onFocus={(e) => {
              if (!error) e.currentTarget.style.borderColor = "#6944ff";
              e.currentTarget.style.boxShadow = error
                ? "0 0 20px rgba(239,68,68,0.15)"
                : "0 0 20px rgba(105,68,255,0.35)";
            }}
            onBlur={(e) => {
              if (!error) e.currentTarget.style.borderColor = "var(--border-glass, rgba(255,255,255,0.1))";
              e.currentTarget.style.boxShadow = "none";
            }}
          />

          {error && (
            <p style={{ color: "#ef4444", fontSize: 13, marginBottom: 16 }}>
              Incorrect passphrase. Try again.
            </p>
          )}

          <button
            type="submit"
            disabled={loading || !code.trim()}
            style={{
              width: "100%",
              padding: "14px 32px",
              borderRadius: 100,
              background: loading || !code.trim() ? "rgba(105,68,255,0.4)" : "#6944ff",
              color: "white",
              fontSize: 15,
              fontWeight: 600,
              border: "none",
              cursor: loading || !code.trim() ? "not-allowed" : "pointer",
              transition: "all 0.3s",
              boxShadow: code.trim() ? "0 4px 24px rgba(105,68,255,0.35)" : "none",
              fontFamily: "var(--font-body, system-ui)",
            }}
          >
            {loading ? "Verifying..." : "Continue"}
          </button>
        </form>

        <a
          href="/"
          style={{
            display: "inline-block",
            marginTop: 24,
            color: "var(--text-muted, #55556a)",
            fontSize: 13,
            textDecoration: "none",
            transition: "color 0.3s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-secondary, #8a8a9a)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted, #55556a)")}
        >
          ← Back to portfolio
        </a>
      </div>
    </div>
  );
}

export default function UnauthorizedPage() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            background: "var(--bg, #0a0a0a)",
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              border: "4px solid rgba(255,255,255,0.1)",
              borderTop: "4px solid #6944ff",
              borderRadius: "50%",
              animation: "spin 0.8s linear infinite",
            }}
          />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      }
    >
      <UnauthorizedContent />
    </Suspense>
  );
}
