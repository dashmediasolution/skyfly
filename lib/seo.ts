import type { Metadata } from "next";

export const siteMetadata = {
  home: {
    title: "Online Flight Booking, Hotel and Car Rentals | SkyFlyWithUs",
    description:
      "Explore flight booking, hotel stays, and car rental options with SkyFlyWithUs. Compare available travel offers and plan your next trip with ease.",
    keywords: [
      "Flight Booking",
      "Car Rentals",
      "Hotel Booking",
      "Travel Deals and Offers",
      "Group Travel",
      "SkyFlyWithUs",
    ],
  },

  flights: {
    title: "Book Flights Online & Find Cheap Flight Deals | SkyFlyWithUs",
    description:
      "Book flights online with SkyFlyWithUs. Explore domestic and international flight options, compare available fares and find deals for your next trip.",
    keywords: [
      "flight booking",
      "book flights online",
      "cheap flights",
      "flight deals",
      "airline tickets",
      "cheap flight tickets",
      "online flight reservations",
      "affordable airfare",
      "domestic flights USA",
      "international flights",
      "round trip flights",
      "one way flights",
      "airfare deals",
      "flight booking USA",
    ],
  },

  hotels: {
    title: "Hotel Booking Online & Best Hotel Deals | SkyFlyWithUs",
    description:
      "Explore hotel booking options with SkyFlyWithUs. Compare available accommodations, discover hotel deals and find a stay that suits your travel plans.",
    keywords: [
      "hotel booking",
      "book hotels online",
      "hotel deals",
      "hotel reservations",
      "online hotel booking",
      "affordable hotels",
      "best hotel deals",
      "accommodation booking",
      "hotel rooms booking",
      "USA hotel booking",
      "vacation hotels",
      "budget hotels",
      "hotel discounts",
      "travel accommodation",
    ],
  },

  carRental: {
    title: "Car Rental Deals & Online Booking | SkyFlyWithUs",
    description:
      "Explore car rental options with SkyFlyWithUs. Compare available vehicles, review rental terms and find an option that fits your travel needs.",
    keywords: [
      "car rental",
      "car rentals online",
      "cheap car rental",
      "car rental deals",
      "affordable car rentals",
      "rental cars USA",
      "online car rental booking",
      "airport car rental",
      "vehicle rental",
      "car hire services",
      "rental car discounts",
      "travel car rental",
      "book rental cars online",
      "car rental reservations",
    ],
  },

  deals: {
    title: "Travel Deals on Flights, Hotels & Cars | SkyFlyWithUs",
    description:
      "Discover travel deals with SkyFlyWithUs. Explore available offers on flights, hotels and car rentals to help plan your next journey.",
    keywords: [
      "travel deals",
      "flight deals",
      "cheap flight deals",
      "hotel deals",
      "car rental deals",
      "travel discounts",
      "airline ticket offers",
      "vacation deals",
      "airfare discounts",
      "cheap travel offers",
      "hotel booking offers",
      "rental car discounts",
      "holiday travel deals",
      "online travel deals",
      "USA travel deals",
    ],
  },

  groupTravel: {
    title: "Group Travel Packages & Deals | SkyFlyWithUs",
    description:
      "Planning travel for a group? Explore group travel options with SkyFlyWithUs and find booking solutions for your group's travel needs.",
    keywords: [
      "group travel",
      "group travel packages",
      "group flight booking",
      "group airline tickets",
      "group airfare",
      "group travel deals",
      "group flight discounts",
      "group reservations",
      "group vacation packages",
      "group travel services",
      "book group flights",
      "corporate group travel",
      "family group travel",
      "group travel USA",
      "group booking services",
    ],
  },

  about: {
    title: "About SkyFlyWithUs | Our Travel Booking Services",
    description:
      "Learn about SkyFlyWithUs and our travel booking services, including flights, hotels, car rentals and group travel options.",
    keywords: [
      "about SkyFlyWithUs",
      "SkyFlyWithUs travel services",
      "online travel booking",
      "flight booking services",
      "hotel booking services",
      "car rental services",
      "group travel services",
      "travel deals",
      "travel booking website",
      "travel company USA",
      "online travel services",
      "travel planning services",
    ],
  },

  privacy: {
    title: "Privacy Policy | SkyFlyWithUs Travel Services",
    description:
      "Read the SkyFlyWithUs Privacy Policy to understand how personal information is collected, used and protected when you use our website and services.",
    keywords: [
      "SkyFlyWithUs privacy policy",
      "privacy policy",
      "data protection policy",
      "personal information privacy",
      "data collection policy",
      "information security",
      "personal data protection",
      "website privacy terms",
      "online privacy policy",
      "user data privacy",
      "travel booking privacy",
      "customer information protection",
    ],
  },

  terms: {
    title: "Terms & Conditions | SkyFlyWithUs Travel",
    description:
      "Review the SkyFlyWithUs Terms & Conditions for information about website use, booking policies and the terms governing our travel services.",
    keywords: [
      "SkyFlyWithUs terms and conditions",
      "terms of service",
      "travel booking terms",
      "website terms and conditions",
      "flight booking policies",
      "hotel booking terms",
      "car rental terms",
      "travel service policies",
      "booking rules",
    ],
  },

  contact: {
    title: "Contact SkyFlyWithUs | Travel Booking Support",
    description:
      "Contact SkyFlyWithUs for assistance with flight bookings, hotels, car rentals and other travel-related questions. Find the right support for your needs.",
    keywords: [
      "contact SkyFlyWithUs",
      "SkyFlyWithUs contact",
      "travel booking support",
      "flight booking assistance",
      "hotel reservation support",
      "car rental assistance",
      "travel customer service",
      "travel help",
    ],
  },

  publicSitemap: {
    title: "Public Sitemap | SkyFlyWithUs Travel Services",
    description:
      "Browse the public sitemap of SkyFlyWithUs to find links to our website pages, including flights, hotels, car rentals, group travel and deals.",
    keywords: [
      "SkyFlyWithUs sitemap",
      "public sitemap",
      "website sitemap",
      "flight booking pages",
      "hotel booking pages",
      "car rental pages",
      "group travel pages",
      "travel deals",
    ],
  },

  disclaimer: {
    title: "Disclaimer | SkyFlyWithUs Travel Services",
    description:
      "Read the SkyFlyWithUs disclaimer to understand the limitations, responsibilities and terms associated with using our website and travel booking services.",
    keywords: [
      "SkyFlyWithUs disclaimer",
      "travel website disclaimer",
      "flight booking disclaimer",
      "hotel booking disclaimer",
      "car rental disclaimer",
      "travel service disclaimer",
      "website liability",
    ],
  },
} satisfies Record<
  string,
  Pick<Metadata, "title" | "description" | "keywords">
>;

export function createPageMetadata(
  page: keyof typeof siteMetadata,
): Metadata {
  const seo = siteMetadata[page];

  return {
    ...seo,
    metadataBase: new URL("https://skyflywithus.com"),
  };
}