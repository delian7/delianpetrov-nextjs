export const dynamic = "force-dynamic";

interface NotionData {
  title: string;
  description: string;
  image: string;
  url: string;
  __unauthorized?: boolean;
  prompt?: string;
}

async function fetchNotionData(name: string, auth?: string): Promise<NotionData | null> {
  const params = new URLSearchParams({ name });
  if (auth) params.append("auth", auth);

  const response = await fetch(
    `https://api.delianpetrov.com/short_links/?${params.toString()}`,
    { cache: "no-store" }
  );

  if (response.status === 401) {
    try {
      const body = await response.json();
      if (body && typeof body.prompt === "string") {
        return { __unauthorized: true, prompt: body.prompt, title: body.title || "", description: body.description || "", image: body.image || "", url: "" };
      }
    } catch {
      // fall through
    }
    return { __unauthorized: true, title: "", description: "", image: "", url: "" } as NotionData;
  }

  if (!response.ok) {
    return null;
  }

  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return null;
  }

  const data = await response.json();

  if (!data["url"]) {
    return null;
  }

  return data;
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ name: string }>;
  searchParams: Promise<{ code?: string }>;
}) {
  const { name } = await params;
  const { code } = await searchParams;
  const notionData = await fetchNotionData(name, code);

  if (!notionData || notionData.__unauthorized) {
    const title = notionData?.title || "Protected Link - Delian Petrov";
    const description = notionData?.description || "This link is protected. Enter the passphrase to continue.";
    const image = notionData?.image || "/avatar.jpg";
    return {
      title,
      description,
      openGraph: {
        title,
        description,
        images: [image],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [image],
      },
    };
  }

  return {
    title: notionData.title,
    description: notionData.description,
    openGraph: {
      title: notionData.title,
      description: notionData.description,
      images: notionData.image ? [notionData.image] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: notionData.title,
      description: notionData.description,
      images: notionData.image ? [notionData.image] : [],
    },
  };
}

function ClientRedirect({ url, delay = 0 }: { url: string; delay?: number }) {
  return (
    <>
      <meta httpEquiv="refresh" content={`${delay};url=${url}`} />
      <script
        dangerouslySetInnerHTML={{
          __html: `setTimeout(function(){window.location.replace(${JSON.stringify(url)});},${delay * 1000});`,
        }}
      />
    </>
  );
}

export default async function DynamicPage({
  params,
  searchParams,
}: {
  params: Promise<{ name: string }>;
  searchParams: Promise<{ code?: string }>;
}) {
  const { name } = await params;
  const { code } = await searchParams;
  const notionData = await fetchNotionData(name, code);

  if (notionData && notionData.__unauthorized) {
    const promptParam = notionData.prompt
      ? `&prompt=${encodeURIComponent(notionData.prompt)}`
      : "";
    const unauthorizedUrl = `/unauthorized?name=${encodeURIComponent(name)}${promptParam}`;
    return (
      <html lang="en">
        <head>
          <ClientRedirect url={unauthorizedUrl} />
        </head>
        <body>
          <LoadingSpinner />
        </body>
      </html>
    );
  }

  if (!notionData) {
    return (
      <html lang="en">
        <head>
          <ClientRedirect url="/" />
        </head>
        <body>
          <LoadingSpinner />
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <head>
        <ClientRedirect url={notionData.url} />
      </head>
      <body>
        <LoadingSpinner />
      </body>
    </html>
  );
}

function LoadingSpinner() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        fontFamily: "system-ui",
        gap: "1rem",
        color: "var(--text-secondary, #8a8a9a)",
      }}
    >
      <div
        style={{
          width: "40px",
          height: "40px",
          border: "3px solid var(--border, rgba(255,255,255,0.06))",
          borderTopColor: "var(--accent, #6944ff)",
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite",
        }}
      />
      <p style={{ margin: 0, fontSize: "0.9rem" }}>Redirecting…</p>
    </div>
  );
}
