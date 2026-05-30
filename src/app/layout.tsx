import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://delianpetrov.com"),
  title: "Delian Petrov | Senior Software Engineer",
  description:
    "Senior Software Engineer at Meta. Building with React, TypeScript, and modern web technologies.",
  openGraph: {
    title: "Delian Petrov | Senior Software Engineer at Meta",
    description:
      "Senior Software Engineer building with React, TypeScript, and modern web technologies.",
    url: "https://delianpetrov.com",
    images: ["/avatar.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
