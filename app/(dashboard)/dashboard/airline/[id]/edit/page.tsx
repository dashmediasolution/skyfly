
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
  "cancellation and refund policy",
  "airline cancellation policy",
  "flight cancellation fees",
  "flight ticket refund policy",
  "cancel flight booking",
  "flight refund eligibility",
  "non-refundable flight tickets",
  "flight cancellation charges",
  "airline refund process",
  "flight cancellation rules",
  "refund for cancelled flights",
  "flight booking cancellation",
];

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function createCancellationContent(airline: string): string {
  const name = escapeHtml(airline);

  return `
<h1>${name} Cancellation &amp; Refund Policy</h1>

<p>The ${name} cancellation and refund policy explains the general conditions passengers should review before cancelling a flight or requesting money back for an unused ticket. Refund eligibility, cancellation charges, deadlines, and available alternatives depend on the fare purchased, ticket conditions, route, and reason for cancellation.</p>

<p>Before cancelling your ${name} reservation, review the terms attached to your ticket and confirm the applicable rules with the airline or the travel provider that issued your booking.</p>

<h2>Understanding the ${name} Cancellation Policy</h2>

<p>The ${name} cancellation policy sets out the conditions that apply when a passenger requests to cancel an existing flight reservation. The outcome can differ depending on whether the ticket is refundable, restricted, partially refundable, or subject to other fare conditions.</p>

<p>Some tickets may qualify for a refund under specified conditions, while others may have cancellation charges or restrictions. Additional rules may apply when a booking includes multiple flights, connecting journeys, or separate ticket segments.</p>

<p>The exact conditions for your reservation should be confirmed through the official ${name} website, the airline's customer service team, or the original booking provider.</p>

<h2>How to Cancel a ${name} Flight</h2>

<p>If you need to cancel a ${name} flight, follow these general steps:</p>

<ol>
  <li>Locate your booking confirmation and reservation reference.</li>
  <li>Visit the official ${name} website or contact the provider that issued your ticket.</li>
  <li>Open your reservation using the requested booking and passenger details.</li>
  <li>Review the cancellation conditions and determine whether your ticket qualifies for a refund.</li>
  <li>Check any cancellation charges, refund deductions, or alternative options offered.</li>
  <li>Review the cancellation details carefully before confirming your request.</li>
  <li>Save the cancellation confirmation and any reference number provided.</li>
  <li>Keep records of any refund estimate or subsequent refund communication.</li>
</ol>

<p>The available cancellation process may vary depending on how the ticket was purchased and the conditions of the reservation.</p>

<h2>${name} Cancellation Fees</h2>

<p>Cancellation charges for a ${name} ticket depend on the fare conditions and the circumstances of the cancellation. Some tickets may permit cancellation under specific conditions, while others may be subject to deductions or may not qualify for a refund of the original fare.</p>

<p>If a ticket was purchased through a travel agency or third-party booking website, that provider may also have service charges or separate processing conditions.</p>

<p>Before confirming your cancellation, ask for a breakdown of any applicable deductions and the expected refund amount, if a refund is available.</p>

<h2>${name} Refund Policy</h2>

<p>Whether a cancelled ${name} ticket qualifies for a refund depends on the ticket conditions, applicable airline rules, and the reason for cancellation. Refundable and non-refundable fares may be treated differently.</p>

<p>Depending on the applicable rules, the available outcome may include:</p>

<ul>
  <li>A refund of the eligible ticket amount.</li>
  <li>A refund after applicable cancellation charges or deductions.</li>
  <li>A refund of certain unused taxes or charges, where permitted.</li>
  <li>A travel credit or voucher, if offered and accepted under the applicable terms.</li>
  <li>No refund of some or all of the fare when the ticket conditions do not permit it.</li>
</ul>

<p>These are general possibilities, not a guarantee of eligibility. Confirm the terms that apply to your specific ${name} booking before cancelling.</p>

<h2>Refunds for Non-Refundable ${name} Tickets</h2>

<p>A non-refundable ${name} ticket generally has restrictions on returning the base fare after a voluntary cancellation. However, the outcome depends on the fare conditions and any applicable legal or regulatory requirements.</p>

<p>Some unused taxes or other eligible amounts may be handled separately, depending on the ticket and applicable rules. Do not assume that every non-refundable ticket qualifies for a cash refund or that every tax is refundable.</p>

<p>Contact ${name} or the original booking provider to confirm what, if anything, can be recovered from your reservation.</p>

<h2>When ${name} Cancels Your Flight</h2>

<p>If ${name} cancels your flight, the available options may differ from those that apply when you voluntarily cancel a reservation. Depending on the circumstances and applicable rules, passengers may be offered a refund, an alternative flight, or other assistance.</p>

<p>Eligibility for a refund, rebooking, compensation, or other assistance depends on the reason for the disruption, the itinerary, the applicable law, and the conditions of the booking.</p>

<p>Check the notification from ${name} and contact the airline or booking provider to understand the options available for your particular flight.</p>

<h2>Refunds for Flights Booked Through a Travel Agency</h2>

<p>If you booked your ${name} flight through a travel agency or third-party booking website, contact the provider that issued your ticket to find out how to submit a cancellation or refund request.</p>

<p>The original provider may need to process the cancellation and refund. Processing times, service charges, and communication procedures can differ between providers.</p>

<p>Keep your booking confirmation, ticket number, cancellation reference, and relevant payment records available when following up on your request.</p>

<h2>How Long Does a ${name} Refund Take?</h2>

<p>The time required to process a ${name} refund depends on the type of ticket, the reason for cancellation, the booking channel, and the payment method. The airline or issuing provider may need to review the request before authorizing the refund.</p>

<p>After a refund is approved, the time for the money to appear in your account may also depend on the payment provider or financial institution.</p>

<p>Ask ${name} or your booking provider for the expected processing timeframe and retain your refund reference so you can follow up if necessary.</p>

<h2>Can You Change Your ${name} Booking Instead of Cancelling?</h2>

<p>If your travel dates have changed but you still intend to travel, changing your ${name} reservation may be an alternative to cancelling it. The availability and cost of a change depend on your ticket conditions and the replacement flight.</p>

<p>Compare the cost of changing the reservation with the cancellation deductions and any new booking costs before deciding which option is more suitable.</p>

<h2>Important Things to Check Before Cancelling a ${name} Flight</h2>

<ul>
  <li>Whether your ticket is refundable or subject to restrictions.</li>
  <li>The cancellation deadline and applicable fare conditions.</li>
  <li>Any cancellation charges or service fees.</li>
  <li>The estimated refundable amount, if applicable.</li>
  <li>Whether eligible unused taxes or charges can be refunded.</li>
  <li>Whether the booking provider or airline must process the request.</li>
  <li>Alternative flights, credits, or vouchers, if available.</li>
  <li>The expected refund processing timeframe.</li>
  <li>Any applicable rights under relevant passenger protection rules.</li>
</ul>

<h2>Frequently Asked Questions</h2>

<h3>Can I cancel my ${name} flight and get a refund?</h3>

<p>A refund may be available depending on your fare conditions, the reason for cancellation, and applicable rules. Review your ticket terms and confirm the refund eligibility with ${name} or the original booking provider.</p>

<h3>Does ${name} charge a cancellation fee?</h3>

<p>Cancellation charges depend on the ticket conditions and the circumstances of the cancellation. Additional service charges may apply when a reservation was purchased through a third-party provider.</p>

<h3>Can I get a refund on a non-refundable ${name} ticket?</h3>

<p>The base fare on a non-refundable ticket is generally subject to restrictions, but the outcome depends on the applicable conditions and legal requirements. Certain unused taxes or other eligible amounts may be treated differently.</p>

<h3>What happens if ${name} cancels my flight?</h3>

<p>If the airline cancels your flight, you may have options such as a refund or alternative travel arrangements, depending on the circumstances and applicable rules. Check the airline's notification and contact the relevant booking provider.</p>

<h3>How can I check my ${name} refund status?</h3>

<p>Use the refund tracking facility if available, or contact ${name} or the provider that issued your ticket. Keep your booking reference, cancellation confirmation, and refund reference available when requesting an update.</p>

<h2>Conclusion</h2>

<p>The ${name} cancellation and refund policy depends on your ticket conditions, the circumstances of cancellation, and the rules applicable to your journey. Review the cancellation terms, confirm any deductions, and check your refund eligibility with the airline or original booking provider before finalizing your request.</p>
`;
}

function createCancellationFaqs(
  airline: string
): Prisma.InputJsonValue {
  return [
    {
      question: `Can I cancel my ${airline} flight and get a refund?`,
      answer: `A refund may be available depending on your fare conditions, the reason for cancellation, and applicable rules. Confirm your eligibility with ${airline} or the original booking provider.`,
    },
    {
      question: `Does ${airline} charge a cancellation fee?`,
      answer: `Cancellation charges depend on the ticket conditions and the circumstances of the cancellation. Additional booking-provider service charges may also apply.`,
    },
    {
      question: `Can I get a refund on a non-refundable ${airline} ticket?`,
      answer: `The base fare on a non-refundable ticket is generally subject to restrictions. Certain unused taxes or other amounts may be handled differently, depending on the applicable conditions and rules.`,
    },
    {
      question: `What happens if ${airline} cancels my flight?`,
      answer: `If the airline cancels your flight, you may have options such as a refund or alternative travel arrangements, depending on the circumstances and applicable rules.`,
    },
    {
      question: `How can I check my ${airline} refund status?`,
      answer: `Use the refund tracking facility if available, or contact ${airline} or the provider that issued your ticket. Keep your booking and refund references ready.`,
    },
  ];
}

async function main() {
  console.log("Starting airline cancellation and refund policy seed...");

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
      `${airlineName} Cancellation & Refund Policy: Rules, Fees, and Refund Eligibility`;

    const metaTitle =
      `${airlineName} Cancellation & Refund Policy`;

    const metaDescription =
      `Learn about the ${airlineName} cancellation and refund policy, including cancellation fees, refund eligibility, non-refundable tickets, and refund requests.`;

    const policyData = {
      excerpt,
      content: createCancellationContent(airlineName),
      policyType: "CANCELLATION",
      metaTitle,
      metaDescription,
      metaKeywords: [
        ...metaKeywords,
        `${airlineName} cancellation policy`,
        `${airlineName} refund policy`,
        `${airlineName} cancellation fees`,
        `${airlineName} flight refund`,
      ],
      status: "PUBLISHED",
      categoryId: category.id,
      faqs: createCancellationFaqs(airlineName),
    };

    const existingPolicy = await prisma.airlinePolicy.findFirst({
      where: {
        categoryId: category.id,
        policyType: "CANCELLATION",
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
      console.log(`Updated CANCELLATION policy: ${airlineName}`);
    } else {
      await prisma.airlinePolicy.create({
        data: {
          ...policyData,
          publishedAt: new Date(),
        },
      });

      createdPolicies++;
      console.log(`Created CANCELLATION policy: ${airlineName}`);
    }
  }

  console.log("\nCancellation and refund policy seed completed.");
  console.log(`Existing categories preserved: ${existingCategories}`);
  console.log(`New categories created: ${createdCategories}`);
  console.log(`CANCELLATION policies created: ${createdPolicies}`);
  console.log(`CANCELLATION policies updated: ${updatedPolicies}`);
  console.log("No categories or other policy types were deleted.");
}

main()
  .catch((error) => {
    console.error("Failed to seed cancellation policies:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
