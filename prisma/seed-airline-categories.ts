
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const airlineCategories = [
  "Aeromexico",
  "Alaska Airlines",
  "American Airlines",
  "China Eastern Airlines",
  "Copa Airlines",
  "Emirates",
  "Etihad Airways",
  "EVA Air",
  "Frontier Airlines",
  "Hawaiian Airlines",
  "LATAM Airlines",
  "Lufthansa",
  "Norwegian Air",
  "United Airlines",
  "Volaris Airlines",
  "Caribbean Airlines",
  "Allegiant Air",
  "Avelo Airlines",
  "Breeze Airways",
  "Delta Air Lines",
  "JetBlue Airways",
  "Southwest Airlines",
  "Sun Country Airlines",
  "Jetstar",
  "EasyJet",
  "Jet2.com",
  "Norse Atlantic UK",
  "Ryanair UK",
  "Wizz Air UK",
  "iberia airlines",
  "FlyOne Airline",
  "Norse Atlantic Airways",
  "ryanair airlines",
  "Pacific Airlines",
  "flydubai",
  "emirates airlines",
  "thai airways",
  "SkyJet Airlines",
  "philippines airlines",
  "Cebu Pacific",
  "AirAsia",
  "SpiceJet",
  "air china airlines",
  "viva airlines",
  "sky airlines",
  "JetSmart",
  "Flair Airlines",
  "air canada",
  "air arabia maroc airlines",
  "avenica airline",
  "Singapore Airlines",
  "Qatar Airways",
  "Cathay Pacific Airways",
  "ANA All Nippon Airways",
  "Turkish Airlines",
  "Air France",
  "Hainan Airlines",
  "Japan Airlines",
  "Korean Air",
  "Qantas Airways",
  "STARLUX Airlines",
  "Saudia",
  "Iberia",
  "Virgin Atlantic",
  "Swiss International Air Lines",
  "Malaysia Airlines",
  "British Airways",
  "KLM Royal Dutch Airlines",
  "Austrian Airlines",
  "Scoot",
  "Bangkok Airways",
  "China Airlines",
  "China Southern Airlines",
  "Air New Zealand",
  "Finnair",
  "Porter Airlines",
  "Air Astana",
  "Ethiopian Airlines",
  "Virgin Australia",
  "Fiji Airways",
  "Vueling Airlines",
  "Aegean Airlines",
  "Azerbaijan Airlines",
  "Eurowings",
  "LOT Polish Airlines",
  "Egyptair",
  "Iberia Express",
  "Volotea",
  "ITA Airways",
  "Transavia France",
];

async function main() {
  let created = 0;
  let existing = 0;

  for (const name of airlineCategories) {
    const result = await prisma.airlinePolicyCategory.upsert({
      where: { name },
      update: {},
      create: { name },
    });

    // Count existing categories separately before running this script
    // if you need exact created-versus-existing totals.
    console.log(`Processed: ${result.name}`);
  }

  console.log(
    `Successfully processed ${airlineCategories.length} airline categories.`
  );
}

main()
  .catch((error) => {
    console.error("Failed to seed airline categories:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
