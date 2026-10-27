import {
  Gift,
  Tag,
  Heart,
} from "lucide-react";

export const destinations = [
  {
    name: "Paris",
    country: "France",
    tagline: "Romantic streets, iconic landmarks and timeless charm.",
    overlayTitle: "City of Love",
    image: "/images/destinations/paris.webp",
  },
  {
    name: "London",
    country: "UK",
    tagline: "Royal landmarks, historic streets and vibrant city life.",
    overlayTitle: "Where History Meets Modern Life",
       image: "/images/destinations/london2.webp",

  },
  {
    name: "Singapore",
    country: "Singapore",
    tagline: "Futuristic skylines, lush gardens and unforgettable experiences.",
    overlayTitle: "The City in a Garden",
    image: "/images/destinations/singapore.webp",
  },
  {
    name: "New York",
    country: "USA",
    tagline: "Iconic skyscrapers, world-class entertainment and diverse culture.",
    overlayTitle: "The City That Never Sleeps",
    image: "/images/destinations/image001.webp",
  },
  {
    name: "Tokyo",
    country: "Japan",
    tagline: "A perfect blend of ancient traditions and cutting-edge technology.",
    overlayTitle: "Tradition Meets Tomorrow",
    image: "/images/destinations/image002.webp",
  },
  {
    name: "Dubai",
    country: "UAE",
    tagline: "Luxury shopping, desert adventures and breathtaking skyscrapers.",
    overlayTitle: "Where Dreams Touch the Sky",
    image: "/images/destinations/image_13_60.webp",
  },
];

export const deals = [
  {
    slug: "christmas-day-offer",
    title: "Christmas Day Offer",
    destination: "Christmas",
    description:
      "Celebrate Christmas with festive getaways and seasonal flight deals.",
    category: "Christmas Special",
    overlayTitle: "Christmas Special Offers",
    discount: "Limited Time Offer",
    image: "/images/christmasDeal.webp",
    Icon: Gift,
  },
  {
    slug: "black-friday-offer",
    title: "Black Friday Offer",
    destination: "Black Friday",
    description:
      "Explore Black Friday flight deals and plan your next trip for less.",
    category: "Black Friday Sale",
    overlayTitle: "Cheap Black Friday Flight Deals",
    discount: "Black Friday Sale",
    image: "/images/BlackFridatDeal.webp",
    Icon: Tag,
  },
  {
    slug: "valentines-day-offer",
    title: "Valentine’s Day Offer",
    destination: "Valentines Day",
    description:
      "Plan a romantic getaway with flight deals for your special someone.",
    category: "Valentine’s Sale",
    overlayTitle: "Cheap Valentine’s Day Flights",
    discount: "Valentine’s Sale",
    image: "/images/valentineDeal.webp",
    Icon: Heart,
  },
];


export type FlightFAQItem = {
  question: string;
  answer: string;
};

const createFAQs = (
  destination: string,
  country: string,
  flightTime: string,
  airlines: string,
): FlightFAQItem[] => [
  {
    question: `What is the average flight time to ${destination}?`,
    answer: `Flight time to ${destination} depends on your departure city, airline and route. Flights with connecting stops may take longer than direct flights. Check your itinerary for the estimated travel time.`,
  },
  {
    question: `What documents do I need to travel to ${destination}?`,
    answer: `Travel requirements for ${destination}, ${country}, depend on your nationality and travel purpose. You may need a valid passport, visa or other entry documents. Check the official entry requirements before departure.`,
  },
  {
    question: `Which airlines fly to ${destination}?`,
    answer: `Airlines serving ${destination} vary depending on your departure airport and travel dates. ${airlines} may be among the options to investigate. Compare available routes, baggage allowances and ticket conditions before booking.`,
  },
  {
    question: `Are there direct flights to ${destination}?`,
    answer: `Direct flight availability to ${destination} depends on your departure city, airline and travel dates. Search your route to check whether nonstop flights or connecting itineraries are available.`,
  },
  {
    question: `What is the best time to book flights to ${destination}?`,
    answer: `Booking in advance and comparing prices across different dates can help you find suitable fares to ${destination}. Prices vary with demand, seasonality, airline availability and departure dates.`,
  },
  {
    question: `How can I find cheap flights to ${destination}?`,
    answer: `Compare multiple airlines, check nearby travel dates and review alternative departure times. Consider baggage charges and stopovers when comparing the total cost of flights to ${destination}.`,
  },
  {
    question: `What is the best time to visit ${destination}?`,
    answer: `The best time to visit ${destination} depends on your preferred weather, activities and budget. Research the local climate and seasonal events before choosing your travel dates.`,
  },
  {
    question: `Can I change or cancel my flight to ${destination}?`,
    answer: `Changes and cancellations depend on your airline, fare conditions and booking provider. Review the ticket rules before booking and contact the relevant provider if you need to modify your itinerary.`,
  },
];

export const flightFAQs: Record<string, FlightFAQItem[]> = {
  amsterdam: createFAQs(
    "Amsterdam",
    "the Netherlands",
    "varies by route",
    "KLM and other international carriers",
  ),
  bali: createFAQs(
    "Bali",
    "Indonesia",
    "varies by route",
    "international airlines serving Denpasar",
  ),
  barcelona: createFAQs(
    "Barcelona",
    "Spain",
    "varies by route",
    "Vueling and other international carriers",
  ),
  london: createFAQs(
    "London",
    "the United Kingdom",
    "varies by route",
    "British Airways and other international carriers",
  ),
  paris: createFAQs(
    "Paris",
    "France",
    "varies by route",
    "Air France and other international carriers",
  ),
  dubai: createFAQs(
    "Dubai",
    "the United Arab Emirates",
    "varies by route",
    "Emirates, flydubai and other carriers",
  ),
  singapore: createFAQs(
    "Singapore",
    "Singapore",
    "varies by route",
    "Singapore Airlines and other international carriers",
  ),
  "new-york": createFAQs(
    "New York",
    "the United States",
    "varies by route",
    "American Airlines and other international carriers",
  ),
  rome: createFAQs(
    "Rome",
    "Italy",
    "varies by route",
    "ITA Airways and other international carriers",
  ),
  tokyo: createFAQs(
    "Tokyo",
    "Japan",
    "varies by route",
    "Japan Airlines and other international carriers",
  ),
  istanbul: createFAQs(
    "Istanbul",
    "Türkiye",
    "varies by route",
    "Turkish Airlines and other international carriers",
  ),
  bangkok: createFAQs(
    "Bangkok",
    "Thailand",
    "varies by route",
    "Thai Airways and other international carriers",
  ),
   "group-travel": [
    {
      question: "Can I book flights for a large group?",
      answer:
        "Yes, group flight bookings can be arranged for families, friends, corporate teams, school groups, and other travelers. Contact our travel assistance team to discuss your group size, travel dates, and preferred destinations.",
    },
    {
      question: "How many passengers are required for a group flight booking?",
      answer:
        "Group booking requirements vary by airline and itinerary. Some airlines offer dedicated group booking services for parties of around 10 or more passengers. Contact us to understand the options available for your trip.",
    },
    {
      question: "Can group travelers sit together on the flight?",
      answer:
        "Seating arrangements depend on airline policies, seat availability, and the fare purchased. We can help you understand available seating options, but seats together cannot always be guaranteed.",
    },
    {
      question: "Can I get a special fare for group travel?",
      answer:
        "Some airlines offer group fares or customized booking arrangements depending on passenger numbers, route, and travel dates. Availability and pricing vary, so request a quote to explore suitable options.",
    },
    {
      question: "Can I change passenger names or travel dates on a group booking?",
      answer:
        "Changes to passenger names, travel dates, and itineraries depend on the airline's group booking terms and ticket conditions. Additional charges or restrictions may apply. Review the applicable terms before confirming your booking.",
    },
    {
      question: "How can I request assistance with a group booking?",
      answer:
        "Contact our travel assistance team with your departure and arrival cities, preferred travel dates, number of passengers, and any special requirements. We can help you explore available booking options and explain the next steps.",
    },
  ],

  "travel-deals": [
    {
      question: "How can I find the best flight deals?",
      answer:
        "Compare fares across different travel dates, consider alternative departure times, and book when suitable fares are available. Our travel assistance team can help you explore flight options based on your route, budget, and schedule.",
    },
    {
      question: "Are flight deals available for domestic and international travel?",
      answer:
        "Flight offers may be available for both domestic and international routes, depending on airline promotions, travel dates, and seat availability. Eligibility and restrictions vary by offer.",
    },
    {
      question: "Can I get a discounted fare for a round-trip booking?",
      answer:
        "Round-trip fares may sometimes offer better value than booking two separate one-way tickets. Compare the total price, baggage allowances, change conditions, and cancellation terms before choosing an itinerary.",
    },
    {
      question: "Do flight deals have booking deadlines?",
      answer:
        "Many promotional fares have specific booking periods, travel windows, or limited seat availability. Always check the applicable offer terms and confirm that your intended travel dates qualify before booking.",
    },
    {
      question: "Can I change or cancel a ticket booked using a special offer?",
      answer:
        "Change and cancellation options depend on the airline's fare rules and the terms of the promotional offer. Some discounted tickets may have restrictions or additional fees. Review the conditions before purchasing.",
    },
    {
      question: "Are the advertised flight deals guaranteed to remain available?",
      answer:
        "No. Flight prices and promotional fares can change at any time based on availability, demand, and airline pricing. Any quoted fare should be verified at the time of booking and may not remain available until payment is completed.",
    },
    {
      question: "How can I get help finding a flight deal?",
      answer:
        "Share your departure city, destination, preferred travel dates, passenger count, and approximate budget with our travel assistance team. We can help you review available options and understand the applicable fare conditions.",
    },
  ],
};
