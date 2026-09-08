"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { initAnalytics, track } from "../lib/analytics";

/**
 * Boots PostHog (lazy-loaded; no-op without NEXT_PUBLIC_POSTHOG_KEY) and
 * captures a $pageview on client-side navigations. The initial pageview is
 * captured automatically by posthog-js when it initializes.
 */
export default function AnalyticsInit() {
  const pathname = usePathname();
  const firstRun = useRef(true);

  useEffect(() => {
    initAnalytics();
  }, []);

  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    track("$pageview");
  }, [pathname]);

  return null;
}
