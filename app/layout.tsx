import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import GlobalNav from "@/components/layout/GlobalNav";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { GoogleAnalytics } from "@next/third-parties/google";
import GlobalAuthModal from "@/components/providers/GlobalAuthModal";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://somnia-delta-five.vercel.app"),

  title: {
    default: "SOMNIA | Lucid Dreaming Training Platform",
    template: "%s | SOMNIA",
  },

  description:
    "Master lucid dreaming with SOMNIA. Record dreams, improve dream recall, practice reality checks, track sleep, and build awareness through structured training.",

  verification: {
    google: "S3Z8xHHYhW0mepsG_oSOZVM5SUHgEvIwul21uUCy3GE",
  },

  keywords: [
    "lucid dreaming",
    "dream journal",
    "dream tracker",
    "dream recall",
    "reality checks",
    "sleep tracking",
    "lucid dream app",
    "dream awareness",
    "SOMNIA",
  ],

  authors: [{ name: "SOMNIA" }],

  creator: "SOMNIA",

  publisher: "SOMNIA",

  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },

  openGraph: {
    title: "SOMNIA | Lucid Dreaming Training Platform",

    description:
      "Master lucid dreaming. Record dreams, improve dream recall, practice reality checks, and unlock your subconscious.",

    url: "https://somnia-delta-five.vercel.app",

    siteName: "SOMNIA",

    images: [
      {
        url: "/branding/og-image.png",
        width: 1200,
        height: 630,
        alt: "SOMNIA — Lucid Dreaming Training",
      },
    ],

    locale: "en_US",

    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title: "SOMNIA | Lucid Dreaming Training Platform",

    description:
      "Master lucid dreaming with structured training and dream journaling.",

    images: ["/branding/og-image.png"],
  },
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050816",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          <GlobalNav />
          <GlobalAuthModal />
          {children}
        </AuthProvider>
      
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!} />
      </body>
    </html>
  );
}