import type { Metadata } from 'next';
import { Figtree } from 'next/font/google'; // Or Quicksand, just keep it consistent
import "../globals.css";
import { SessionProvider } from "@/components/auth/session-provider";
import { getServerSession } from "next-auth";
import { Toaster } from "sonner";
import Script from 'next/script';
import { GoogleAnalytics } from "@next/third-parties/google";


const figtree = Figtree({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});


export const metadata: Metadata = {
  metadataBase: new URL("https://skyflywithus.com"),

  title: {
    default: "SkyFlyWithUs - Cheap Flights and Travel Blogs",
    template: "%s",
  },

  description: "Book cheap flights and read travel blogs on SkyFlyWithUs.",

  verification: {
    google: "ag0nLen_8F-Yes_X1qwJRCHvc_hNnblzOSXncz2RAW0",
  },
 

  authors: [{ name: "skyflywithus.com" }],
  publisher: "skyflywithus.com",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },

 

  other: {
    pragma: "no-cache",
    Language: "English",
    Copyright: "skyflywithus.com",
    distribution: "Global",
    country: "USA",
    rating: "general",
    "googlebot-image": "index,follow",
    "MSNBot-Media": "index,follow",
    Author: "Public",
    "Resource-Type": "document",
    YahooSeeker: "index,follow",
    "geo.region": "US-FL",
    "geo.placename": "Panama City",
    "geo.position": "30.181372;-85.697392",
    ICBM: "30.181372, -85.697392",
  },

  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png" },
    ],
    shortcut: ["/favicon.ico"],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },

  openGraph: {
    title: "SkyFlyWithUs - Fly For Less",
    description:
      "Compare hundreds of airlines and explore affordable flight options with SkyFlyWithUs.",
    url: "https://skyflywithus.com/",
    siteName: "SkyFlyWithUs",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SkyFlyWithUs - Flight Booking Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "SkyFlyWithUs - Best Flight Deals",
    description:
      "Explore affordable flights, compare options, and plan your next trip with SkyFlyWithUs.",
    images: ["/og-image.jpg"],
    creator: "@SkyFlyWithUs",
  },
};


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <head>
        <Script 
          src="https://emrldtp.cc/NTExMDMz.js?t=511033" 
          strategy="afterInteractive" 
        />
      </head>
      {/* Use the font here */}
      <body className={`${figtree.className}`}>
        {/* SessionProvider and Toaster wrap EVERYTHING */}
        <SessionProvider session={session}>
          {children} {/* <-- This will be your (main) or (dashboard) layout */}
          <Toaster />
        </SessionProvider>
        <GoogleAnalytics gaId="G-XJF89G4WG3" />
      </body>
    </html>
  );
}
