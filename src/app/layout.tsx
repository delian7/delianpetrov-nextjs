import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Delian Petrov: Innovating Ideas & Solutions",
  description: "I combine the power of Ruby on Rails and React to build dynamic web applications. Discover my work, learn from my experiences, and explore the world of full-stack development.",
  openGraph: {
    type: "website",
    url: "https://delianpetrov.com",
    title: "Delian Petrov: Innovating Ideas & Solutions",
    description: "I combine the power of Ruby on Rails and React to build dynamic web applications. Discover my work, learn from my experiences, and explore the world of full-stack development.",
    images: [
      {
        url: "/avatar.jpg",
        alt: "Delian Petrov",
      },
    ],
  },
  icons: {
    icon: "/favicon.ico",
    other: [
      { rel: "apple-touch-icon", url: "/favicons/apple-touch-icon.png" },
      { rel: "apple-touch-icon", url: "/favicons/apple-touch-icon-180x180.png" },
    ],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
