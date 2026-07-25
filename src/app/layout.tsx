import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";
import "./globals.css";

const GA_MEASUREMENT_ID = "G-5B1WCC02QY";

export const metadata: Metadata = {
  metadataBase: new URL("https://delianpetrov.com"),
  title: "Delian Petrov | Senior Software Engineer",
  description:
    "Senior Software Engineer on Meta's Monetization team. Building AI-powered upsell experiences for Facebook and Messenger on iOS and Android, and paygated link-sharing features for creators and Pages — as covered by BBC News.",
  openGraph: {
    title: "Delian Petrov | Senior Software Engineer at Meta",
    description:
      "Senior Software Engineer at Meta building AI upsells for Facebook & Messenger (iOS/Android) and paygated link-sharing in posts. BBC News-covered work on Meta's Monetization team.",
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
      <body>
        {children}
        <Analytics />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
      </body>
    </html>
  );
}
