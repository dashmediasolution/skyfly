import type { Metadata } from 'next';
import { Figtree } from 'next/font/google'; // Or Quicksand, just keep it consistent
import "../globals.css";
import { SessionProvider } from "@/components/auth/session-provider";
import { getServerSession } from "next-auth";
import { Toaster } from "sonner";
import Script from 'next/script';
import { GoogleAnalytics } from "@next/third-parties/google";




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
    "msvalidate.01": "789130E8146AA1AD6535221713A5C4F5",
    "Resource-Type": "document",
    YahooSeeker: "index,follow",
    "geo.region": "US-FL",
    "geo.placename": "Panama City",
    "geo.position": "30.181372;-85.697392",
    ICBM: "30.181372, -85.697392",
    "og:type": "business.business",
    "business:contact_data:street_address": "1803 Hickory Avenue",
    "business:contact_data:locality": "Panama City",
    "business:contact_data:region": "Florida",
    "business:contact_data:postal_code": "32405",
    "business:contact_data:country_name": "United States of America",

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
  title: "Online Flight Booking, Hotel and Car Rentals | SkyFlyWithUs",
  description:
    "Explore flight booking, hotel stays, and car rental options with SkyFlyWithUs. Compare available travel offers and plan your next trip with ease.",
  url: "https://skyflywithus.com/",
  siteName: "SkyFlyWithUs",
  images: [
    {
      url: "https://skyflywithus.com/images/SF-logo.svg",
      alt: "SkyFlyWithUs",
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
        <meta property="og:type" content="business.business" />
        <script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Skyflywithus",
              alternateName: "Skyflywithus",
              url: "https://skyflywithus.com/",
              logo: "https://skyflywithus.com/images/SF-logo.svg",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "1-855-509-3791",
                contactType: "customer service",
                contactOption: "TollFree",
                areaServed: "US",
                availableLanguage: "en",
              },
            }),
          }}
        />

        <Script
          src="https://emrldtp.cc/NTExMDMz.js?t=511033"
          strategy="afterInteractive"
        />
      </head>
      {/* Use the font here */}
      <body>
        {/* SessionProvider and Toaster wrap EVERYTHING */}
        <SessionProvider session={session}>
          {children} {/* <-- This will be your (main) or (dashboard) layout */}
          <Toaster />
        </SessionProvider>
        <GoogleAnalytics gaId="G-XJF89G4WG3" />
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
        (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){
            (c[a].q=c[a].q||[]).push(arguments)
          };
          t=l.createElement(r);
          t.async=1;  
          t.src="https://www.clarity.ms/tag/"+i+"?ref=bwt";
          y=l.getElementsByTagName(r)[0];
          y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "z1m4q775sx");
      `}
        </Script>
      </body>
    </html>
  );
}
