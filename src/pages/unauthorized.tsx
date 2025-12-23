import Head from "next/head";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function UnauthorizedPage() {
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;

    const name = Array.isArray(router.query.name) ? router.query.name[0] : router.query.name;
    const promptFromQuery = Array.isArray(router.query.prompt) ? router.query.prompt[0] : router.query.prompt;
    const promptText = typeof promptFromQuery === "string" && promptFromQuery.length > 0 ? promptFromQuery : "Enter passphrase:";
    const answer = window.prompt(promptText, "");

    if (answer !== null && name) {
      const dest = `/${encodeURIComponent(name)}?code=${encodeURIComponent(answer)}`;
      window.location.href = dest;
    }
  }, [router.isReady, router.query]);

  return (
    <>
      <Head>
        <title>Protected link</title>
        <meta property="og:title" content="Protected link" />
        <meta property="og:description" content="This link is protected. Enter passphrase to continue." />
      </Head>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", flexDirection: "column" }}>
        <h1>Protected link</h1>
        <p>This link is protected. Enter a passphrase to continue.</p>
      </div>
    </>
  );
}
