// PostHog product analytics. Lazy-loaded so the bundle stays lean;
// no-ops entirely when NEXT_PUBLIC_POSTHOG_KEY is unset (e.g. local dev).
// Same module shape as the OptionsDash marketing site's analytics helper.
const KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const HOST =
  process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";

type PostHogClient = {
  capture: (event: string, props?: Record<string, unknown>) => void;
};

let client: PostHogClient | null = null;
let initPromise: Promise<PostHogClient | null> | null = null;

function ensure(): Promise<PostHogClient | null> {
  if (!KEY || typeof window === "undefined") return Promise.resolve(null);
  if (client) return Promise.resolve(client);
  if (!initPromise) {
    initPromise = import("posthog-js")
      .then((m) => {
        const ph = m.default;
        ph.init(KEY, {
          api_host: HOST,
          // Defaults on: autocapture (clicks etc.) + automatic pageviews.
        });
        client = ph as PostHogClient;
        return client;
      })
      .catch(() => null);
  }
  return initPromise;
}

export function initAnalytics() {
  ensure();
}

export function track(event: string, props?: Record<string, unknown>) {
  ensure().then((ph) => {
    if (!ph) return;
    try {
      ph.capture(event, props || {});
    } catch {
      // analytics must never break the page
    }
  });
}
