
import { PrismaClient, Prisma } from "@prisma/client";

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

const metaKeywords = [
  "airline baggage policy",
  "baggage allowance",
  "checked baggage allowance",
  "carry-on baggage rules",
  "cabin baggage policy",
  "baggage weight limits",
  "baggage size restrictions",
  "extra baggage fees",
  "excess baggage charges",
  "special baggage rules",
  "restricted items on flights",
  "lost or delayed baggage",
];

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function createBaggageContent(airline: string): string {
  const name = escapeHtml(airline);

  return `
<h1>${name} Baggage Policy</h1>

<p>The ${name} baggage policy explains the general baggage requirements passengers should review before travelling, including cabin baggage, checked baggage, size and weight restrictions, additional baggage, and the handling of delayed or damaged luggage. The allowance available to each passenger depends on the ticket, route, cabin class, frequent-flyer benefits, and other applicable booking conditions.</p>

<p>Before travelling with ${name}, check the baggage allowance shown on your booking confirmation and verify the current rules through the airline's official website or your booking provider. Do not assume that the same allowance applies to every ticket or route.</p>

<h2>Understanding the ${name} Baggage Policy</h2>

<p>The ${name} baggage policy sets out the conditions for carrying luggage on a flight. These conditions may distinguish between items carried into the cabin and bags checked into the aircraft hold.</p>

<p>Permitted baggage dimensions, weight limits, item restrictions, and fees may vary according to the route, fare type, cabin class, and operating airline. Passengers travelling on connecting flights or codeshare itineraries may need to check the rules that apply to each flight segment.</p>

<h2>${name} Carry-On Baggage Allowance</h2>

<p>Carry-on baggage refers to luggage that passengers bring into the aircraft cabin. The permitted allowance under the ${name} baggage policy depends on the ticket conditions and the applicable cabin baggage rules.</p>

<p>Before arriving at the airport, check the following:</p>

<ul>
  <li>The permitted number of cabin bags.</li>
  <li>The maximum dimensions and weight for each item.</li>
  <li>Whether a personal item, such as a small bag or laptop bag, is permitted separately.</li>
  <li>Whether your fare type includes the expected cabin baggage allowance.</li>
  <li>Any restrictions on liquids, batteries, electronics, or other items.</li>
</ul>

<p>Cabin baggage that exceeds the permitted limits may need to be checked in or may be subject to additional charges or other restrictions. Confirm the current requirements for your specific ${name} flight before packing.</p>

<h2>${name} Checked Baggage Allowance</h2>

<p>Checked baggage is luggage handed over to the airline for transport in the aircraft hold. The checked baggage allowance available on a ${name} flight may depend on the fare purchased, travel class, route, ticket conditions, and any applicable loyalty benefits.</p>

<p>Some bookings may include checked baggage, while others may require passengers to purchase an allowance separately. The permitted number of bags, individual bag weight, and maximum dimensions can also vary.</p>

<p>To confirm your allowance:</p>

<ol>
  <li>Open your ${name} booking confirmation.</li>
  <li>Review the baggage allowance listed for your ticket.</li>
  <li>Check the permitted number of bags and the weight or size limits.</li>
  <li>Confirm whether separate allowances apply to connecting flights.</li>
  <li>Purchase additional baggage in advance if needed and available.</li>
</ol>

<p>Use the allowance shown for your actual reservation rather than relying on a general baggage allowance advertised for another fare or route.</p>

<h2>${name} Baggage Weight and Size Limits</h2>

<p>The weight and dimensions permitted under the ${name} baggage policy depend on the applicable ticket and baggage rules. Different limits may apply to cabin bags, checked bags, and special items.</p>

<p>Measure your luggage according to the airline's stated requirements, including any handles, wheels, or external pockets where applicable. Weigh each checked bag before leaving for the airport to reduce the risk of unexpected charges or repacking.</p>

<p>If a bag exceeds the permitted weight or dimensions, it may be subject to excess baggage charges, special handling requirements, or restrictions on acceptance. Confirm the permitted limits directly with ${name} before departure.</p>

<h2>${name} Extra Baggage and Excess Baggage Fees</h2>

<p>Passengers who need to carry more luggage than their included allowance should check whether additional baggage can be purchased for their ${name} reservation.</p>

<p>The availability and cost of extra baggage may depend on the route, fare, purchase timing, bag weight, dimensions, and applicable airline conditions.</p>

<p>Before purchasing additional baggage, check:</p>

<ul>
  <li>Whether extra baggage can be added to your booking.</li>
  <li>The price for each additional bag or weight allowance.</li>
  <li>Any maximum weight or dimension limits.</li>
  <li>Whether purchasing baggage in advance differs in price from paying at the airport.</li>
  <li>Whether special baggage requires separate approval or handling.</li>
</ul>

<p>Check the current charges through the official ${name} website or your booking provider. Fees and purchase options can change, so confirm the amount for your particular itinerary.</p>

<h2>Items Restricted Under the ${name} Baggage Policy</h2>

<p>Airlines and aviation authorities restrict certain items in cabin baggage, checked baggage, or both. The applicable rules may depend on the type of item, its contents, and the route being travelled.</p>

<p>Before packing, check the rules for items such as:</p>

<ul>
  <li>Liquids, aerosols, and gels carried in cabin baggage.</li>
  <li>Spare batteries and power banks.</li>
  <li>Sharp objects and tools.</li>
  <li>Flammable substances and other hazardous materials.</li>
  <li>Sports equipment and bulky items.</li>
  <li>Medicines and medically necessary equipment.</li>
  <li>Valuable, fragile, or high-value personal belongings.</li>
</ul>

<p>Restrictions differ by item and jurisdiction. Some items may be permitted only under specific conditions, while others may be prohibited entirely. Check the current ${name} requirements and relevant airport security rules before packing.</p>

<h2>Special Baggage on ${name} Flights</h2>

<p>Special baggage may include sports equipment, musical instruments, mobility equipment, oversized luggage, and other items that require particular handling.</p>

<p>Acceptance conditions, fees, packaging requirements, and advance-notice requirements can vary depending on the item and the flight. Some items may need to be arranged with ${name} before the travel date.</p>

<p>If you intend to travel with special baggage, contact the airline in advance to confirm acceptance, size and weight limits, handling arrangements, and any additional charges.</p>

<h2>Travelling with Infants or Children on ${name}</h2>

<p>Baggage allowances for infants and children may differ from those for adult passengers. Depending on the ticket and applicable rules, allowances or handling arrangements may be available for items such as strollers, child seats, or essential travel equipment.</p>

<p>Check the conditions attached to your ${name} booking to determine which items can be carried, whether they must be checked in, and whether any additional charges apply.</p>

<h2>Lost, Delayed, or Damaged Baggage on ${name}</h2>

<p>If your baggage does not arrive, arrives damaged, or is missing after a ${name} flight, report the issue to the airline's baggage service team or the relevant airport baggage desk as soon as possible.</p>

<p>Depending on the situation, you may need to:</p>

<ol>
  <li>Report the issue through the appropriate baggage service channel.</li>
  <li>Provide your baggage tag, booking details, and flight information.</li>
  <li>Obtain a baggage report or reference number.</li>
  <li>Keep receipts and records for any expenses related to the incident.</li>
  <li>Submit a written claim within the applicable deadline, if required.</li>
  <li>Follow the airline's instructions for tracking or resolving the claim.</li>
</ol>

<p>Reporting deadlines, liability limits, compensation eligibility, and required documentation depend on the circumstances and applicable law. Contact ${name} promptly and retain all relevant records.</p>

<h2>Baggage Rules for Connecting and Codeshare Flights</h2>

<p>If your itinerary includes connecting flights or flights operated by different airlines, baggage rules may differ between flight segments. The baggage allowance and handling arrangements may depend on the ticket, operating carrier, route, and applicable agreements.</p>

<p>Review the baggage information for your complete itinerary and confirm whether your luggage will be checked through to the final destination. If different airlines operate your journey, ask the relevant airline or booking provider which rules apply to each segment.</p>

<h2>How to Check Your ${name} Baggage Allowance</h2>

<p>To confirm the baggage allowance for your ${name} reservation:</p>

<ol>
  <li>Find your booking reference and ticket details.</li>
  <li>Visit the official ${name} website or open your booking management page.</li>
  <li>Review the baggage information attached to your fare.</li>
  <li>Check cabin baggage, checked baggage, and additional baggage conditions.</li>
  <li>Review any restrictions that apply to your route or special items.</li>
  <li>Contact the airline if your allowance is unclear or your itinerary includes multiple operating carriers.</li>
</ol>

<p>Confirm your allowance before travelling, especially if you have purchased a restricted fare or added baggage after booking.</p>

<h2>Important Things to Check Before Travelling with ${name}</h2>

<ul>
  <li>Your included cabin and checked baggage allowances.</li>
  <li>The maximum permitted bag dimensions and weight.</li>
  <li>Whether additional baggage must be purchased separately.</li>
  <li>The current excess baggage charges, if applicable.</li>
  <li>Restrictions on dangerous goods and other regulated items.</li>
  <li>Requirements for special baggage, sports equipment, or musical instruments.</li>
  <li>Rules for infants, children, and mobility equipment.</li>
  <li>Reporting procedures and deadlines for baggage problems.</li>
  <li>Any different requirements for connecting or codeshare flights.</li>
</ul>
 
<h2>Conclusion</h2>

<p>The ${name} baggage policy depends on the ticket purchased, route, cabin class, and applicable baggage conditions. Before departure, confirm your cabin and checked baggage allowances, review size and weight restrictions, and check any extra baggage charges or item restrictions. For the most accurate information, consult the official airline rules for your specific reservation.</p>
`;
}

function createBaggageFaqs(
  airline: string
): Prisma.InputJsonValue {
  return [
    {
      question: `What is the baggage allowance on ${airline} flights?`,
      answer: `The baggage allowance depends on your ticket, route, travel class, and booking conditions. Check your ${airline} booking confirmation or the airline's official website for your specific allowance.`,
    },
    {
      question: `Does ${airline} include checked baggage?`,
      answer: `Whether checked baggage is included depends on your fare and itinerary. Review your ticket details to confirm the number of bags and permitted weight, or whether baggage must be purchased separately.`,
    },
    {
      question: `What happens if my baggage exceeds the ${airline} weight limit?`,
      answer: `Bags that exceed the permitted limits may incur additional charges or other handling restrictions. Check the applicable baggage limits and current excess baggage charges before travelling.`,
    },
    {
      question: `Can I purchase extra baggage on ${airline}?`,
      answer: `Additional baggage may be available for eligible bookings, subject to the airline's conditions and route restrictions. Confirm availability and pricing through the official ${airline} website or your booking provider.`,
    },
    {
      question: `What should I do if my baggage is lost or damaged on a ${airline} flight?`,
      answer: `Report the problem to the airline's baggage service team or the relevant airport desk as soon as possible. Keep your baggage tag, booking details, report reference, and supporting documents for follow-up.`,
    },
  ];
}

async function main() {
  console.log("Starting airline baggage policy seed...");

  let createdCategories = 0;
  let existingCategories = 0;
  let createdPolicies = 0;
  let updatedPolicies = 0;

  for (const airlineName of airlineCategories) {
    let category = await prisma.airlinePolicyCategory.findUnique({
      where: { name: airlineName },
    });

    if (!category) {
      category = await prisma.airlinePolicyCategory.create({
        data: { name: airlineName },
      });

      createdCategories++;
    } else {
      existingCategories++;
    }

    const excerpt =
      `${airlineName} Baggage Policy: Allowance, Weight Limits, and Fees`;

    const metaTitle = `${airlineName} Baggage Policy`;

    const metaDescription =
      `Learn about the ${airlineName} baggage policy, including cabin and checked baggage allowance, weight limits, extra baggage fees, restricted items, and baggage claims.`;

    const policyData = {
      excerpt,
      content: createBaggageContent(airlineName),
      policyType: "BAGGAGE",
      metaTitle,
      metaDescription,
      metaKeywords: [
        ...metaKeywords,
        `${airlineName} baggage policy`,
        `${airlineName} baggage allowance`,
        `${airlineName} carry-on baggage`,
        `${airlineName} checked baggage`,
        `${airlineName} extra baggage fees`,
      ],
      status: "PUBLISHED",
      categoryId: category.id,
      faqs: createBaggageFaqs(airlineName),
    };

    const existingPolicy = await prisma.airlinePolicy.findFirst({
      where: {
        categoryId: category.id,
        policyType: "BAGGAGE",
      },
      select: {
        id: true,
        publishedAt: true,
      },
    });

    if (existingPolicy) {
      await prisma.airlinePolicy.update({
        where: { id: existingPolicy.id },
        data: {
          ...policyData,
          publishedAt: existingPolicy.publishedAt ?? new Date(),
        },
      });

      updatedPolicies++;
      console.log(`Updated BAGGAGE policy: ${airlineName}`);
    } else {
      await prisma.airlinePolicy.create({
        data: {
          ...policyData,
          publishedAt: new Date(),
        },
      });

      createdPolicies++;
      console.log(`Created BAGGAGE policy: ${airlineName}`);
    }
  }

  console.log("\nBaggage policy seed completed.");
  console.log(`Existing categories preserved: ${existingCategories}`);
  console.log(`New categories created: ${createdCategories}`);
  console.log(`BAGGAGE policies created: ${createdPolicies}`);
  console.log(`BAGGAGE policies updated: ${updatedPolicies}`);
  console.log("No categories or other policy types were deleted.");
}

main()
  .catch((error) => {
    console.error("Failed to seed baggage policies:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
