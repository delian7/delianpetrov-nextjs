import { redirect } from "next/navigation";

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
        return { __unauthorized: true, prompt: body.prompt } as NotionData;
      }
    } catch {
      // fall through
    }
    return { __unauthorized: true } as NotionData;
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
    return { title: "Redirecting..." };
  }

  return {
    title: notionData.title,
    openGraph: {
      title: notionData.title,
      description: notionData.description,
      images: notionData.image ? [notionData.image] : [],
    },
  };
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
    redirect(`/unauthorized?name=${encodeURIComponent(name)}${promptParam}`);
  }

  if (!notionData) {
    redirect("/");
  }

  redirect(notionData.url);
}
