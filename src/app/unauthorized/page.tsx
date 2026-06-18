import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Protected Link - Delian Petrov",
  description: "This link is protected. Enter the passphrase to continue.",
  openGraph: {
    title: "Protected Link - Delian Petrov",
    description: "This link is protected. Enter the passphrase to continue.",
    images: ["/avatar.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Protected Link - Delian Petrov",
    description: "This link is protected. Enter the passphrase to continue.",
    images: ["/avatar.jpg"],
  },
};

export { default } from "./page.client";
