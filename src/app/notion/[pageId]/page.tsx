import Link from "next/link";

async function fetchNotionTitle(pageId: string): Promise<string | null> {
  try {
    const res = await fetch(
      `https://delianpetrov.notion.site/ebd/${pageId}`,
      { next: { revalidate: 3600 } }
    );
    const html = await res.text();
    const match = html.match(/<title>([^<]+)<\/title>/i);
    if (match && match[1]) {
      const title = match[1].replace(/\s*[|–—]\s*.*$/, "").trim();
      return title || null;
    }
  } catch {
    // fall through
  }
  return null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ pageId: string }>;
}) {
  const { pageId } = await params;
  const title = await fetchNotionTitle(pageId);

  return {
    title: title ? `${title} | Delian Petrov` : "Delian Petrov | Page",
    openGraph: {
      title: title ? `${title} | Delian Petrov` : "Delian Petrov",
      description: "Shared by Delian Petrov — Senior Software Engineer at Meta",
      url: `https://delianpetrov.com/notion/${pageId}`,
    },
  };
}

export default async function NotionEmbedPage({
  params,
}: {
  params: Promise<{ pageId: string }>;
}) {
  const { pageId } = await params;
  const notionUrl = `https://delianpetrov.notion.site/ebd/${pageId}`;

  return (
    <>
      <style>{`
        .notion-page {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }
        .notion-nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100; padding: 20px 48px;
          display: flex; justify-content: space-between; align-items: center;
          backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
          background: var(--nav-bg, rgba(10,10,10,0.7));
          border-bottom: 1px solid var(--border, rgba(255,255,255,0.06));
        }
        .notion-nav .logo {
          font-family: var(--font-display, system-ui); font-weight: 700;
          font-size: 18px; letter-spacing: -0.5px;
          color: var(--text-primary, #f0f0f2); text-decoration: none;
        }
        .notion-nav .logo span { color: var(--accent, #6944ff); }
        .notion-nav ul {
          list-style: none; display: flex; gap: 36px; margin: 0; padding: 0;
        }
        .notion-nav ul li a {
          color: var(--text-secondary, #8a8a9a); text-decoration: none;
          font-size: 14px; font-weight: 500; letter-spacing: 0.5px;
          text-transform: uppercase; transition: color 0.3s;
        }
        .notion-nav ul li a:hover { color: var(--text-primary, #f0f0f2); }
        .notion-embed-area {
          flex: 1; padding-top: 65px; display: flex; flex-direction: column;
        }
        .notion-embed-bar {
          padding: 12px 48px; display: flex; align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid var(--border, rgba(255,255,255,0.06));
          background: var(--bg, #0a0a0a);
        }
        .notion-back {
          color: var(--text-secondary, #8a8a9a); text-decoration: none;
          font-size: 13px; display: inline-flex; align-items: center; gap: 6px;
          transition: color 0.3s; font-family: var(--font-body, system-ui);
        }
        .notion-back:hover { color: var(--text-primary, #f0f0f2); }
        .notion-badge {
          font-family: var(--font-mono, monospace); font-size: 11px;
          text-transform: uppercase; letter-spacing: 2px;
          color: var(--text-muted, #55556a);
        }
        .notion-frame {
          flex: 1; width: 100%; border: none;
          min-height: calc(100vh - 110px);
          background: white;
          border-radius: 0 0 16px 16px;
          margin-top: -48px;
          clip-path: inset(48px 0 0 0);
        }
        .notion-notepad {
          flex: 1; display: flex; flex-direction: column;
          margin: 1em 10em 0 10em;
          background: var(--bg-elevated, #141416);
          border: 1px solid var(--border-glass, rgba(255,255,255,0.1));
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 8px 40px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.03);
        }
        .notion-notepad-header {
          padding: 14px 24px; display: flex; align-items: center;
          gap: 8px; border-bottom: 1px solid var(--border, rgba(255,255,255,0.06));
        }
        .notion-notepad-dot {
          width: 10px; height: 10px; border-radius: 50%;
        }
        html.light .notion-notepad {
          background: #ffffff;
          border-color: rgba(0,0,0,0.08);
          box-shadow: 0 4px 24px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.06);
        }
        @media (max-width: 768px) {
          .notion-nav { padding: 16px 24px; }
          .notion-nav ul { gap: 20px; }
          .notion-nav ul li a { font-size: 12px; }
          .notion-embed-bar { padding: 10px 24px; }
          .notion-notepad { margin: 16px; border-radius: 14px; }
        }
        @media (max-width: 480px) {
          .notion-nav ul { display: none; }
        }
      `}</style>

      <div className="notion-page">
        <nav className="notion-nav">
          <Link href="/" className="logo">D<span>.</span>Petrov</Link>
          <ul>
            <li><Link href="/#projects">Work</Link></li>
            <li><Link href="/#timeline">Career</Link></li>
            <li><Link href="/#contact">Contact</Link></li>
          </ul>
        </nav>

        <div className="notion-embed-area">
          <div className="notion-notepad">
            <div className="notion-notepad-header">
              <div className="notion-notepad-dot" style={{ background: "#ff5f57" }} />
              <div className="notion-notepad-dot" style={{ background: "#febc2e" }} />
              <div className="notion-notepad-dot" style={{ background: "#28c840" }} />
            </div>
            <iframe
              className="notion-frame"
              src={notionUrl}
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </>
  );
}
