import Head from "next/head";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function UnauthorizedPage() {
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;

    const name = Array.isArray(router.query.name) ? router.query.name[0] : router.query.name;
    const promptText = "Enter passphrase:";
    const answer = window.prompt(promptText, "");

    if (answer !== null && name) {
      const dest = `/${encodeURIComponent(name)}?code=${encodeURIComponent(answer)}`;
      window.location.href = dest;
    }
  }, [router.isReady, router.query.name]);

  return (
    <>
      <Head>
        <title>Unauthorized</title>
      </Head>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", flexDirection: "column" }}>
        <h1>Unauthorized</h1>
        <p>You were redirected due to an authorization error. A passphrase is required to continue.</p>
      </div>
    </>
  );
}
