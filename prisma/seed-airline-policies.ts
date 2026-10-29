
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const policyType = "BAGGAGE";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function replaceAirlineName(
  content: string,
  airlineName: string
): string {
  return content.replace(
    /\{\{AIRLINE_NAME\}\}/g,
    escapeHtml(airlineName)
  );
}

function createBaggageContent(airlineName: string): string {
  const content = `
  <h1>{{AIRLINE_NAME}} Baggage Policy</h1>

<p>This will outline any baggage policies that apply to you, including carry on baggage, checked baggage, size, weight, excess baggage and what compensation you will receive for lost/damaged baggage. This will depend on the type of ticket, journey, class of ticket and any frequent flyer benefits.</p>

<p>Please ensure you check with your booking confirmation, website or who you booked with for the latest information. Depending on the type of ticket you have.</p>

<h2>Baggage Policy</h2>

<p>Will outline any baggage you are allowed to take.</p>

<p>Depending on your journey, price of ticket, class and airline you may have different size baggage, weight and what you can bring. If you are taking a connecting flight please check the baggage policy for all of your flights.</p>

<h2>Hand Luggage Policy</h2>

<p>Hand luggage refers to any baggage you are taking onboard. This will depend on your ticket and baggage policy.</p>

<p>Before travelling, please check:</p>

<ul>
<li>How many bags you can take.</li>
<li>Size and weight.</li>
<li>Personal items (small bag/laptop bag).</li>
<li>Price of ticket.</li>
<li>Liquids, batteries, electrical items etc.</li>
</ul>

<p>If you have excess baggage you may need to check-in please check with {{AIRLINE_NAME}} for the latest baggage policy.</p>

<h2>Checked Baggage Policy</h2>

<p>Checked baggage refers to any baggage you give to the airline to put into the hold. This depends on the type of ticket, class of travel, journey, terms of ticket and any loyalty benefits.</p>

<p>Depending on your booking you may get free checked baggage or may have to pay extra for excess. You may have certain types of baggage you can take, how many, weight and size.</p>

<p>You can check this by:</p>

<ul>
<li>Booking confirmation.</li>
<li>Terms of baggage on your ticket.</li>
<li>How many bags.</li>
<li>Weights/size.</li>
<li>If you can split your baggage for connecting flights.</li>
<li>If you have to pay for excess baggage.</li>
</ul>

<p>Always check your baggage policy for what your terms are. This may depend on the type of ticket.</p>

<h2>Baggage Size and Weight</h2>

<p>Depending on your ticket and baggage policy you may have different sizes and weights. This may depend on your hand luggage, checked baggage and specific items.</p>

<p>Ensure your luggage is measured properly, taking into account handles, wheels and external pockets. Also make sure you check the weight of checked baggage.</p>

<p>If you have an oversized or overweight bag you may be charged for excess baggage. Please check with {{AIRLINE_NAME}}.</p>

<h2>Excess Baggage Charges</h2>

<p>If you need to take excess baggage please check if you can buy excess.</p>

<p>This may depend on your journey, price of ticket, how early you book, weight/size of the bags and airline.</p>

<p>Before buying any excess baggage please check:</p>

<ul>
<li>Can you buy excess?</li>
<li>Price per bag/weight.</li>
<li>Maximum weight/size.</li>
<li>Is it cheaper to pre-book.</li>
<li>Any specific items you need approval for.</li>
</ul>

<p>Please check with {{AIRLINE_NAME}} for the latest charges. This may vary depending on your journey. Please check with the website or who you booked with. Charges may vary depending on your journey.</p>

<h2>Items Not Allowed</h2>

<p>There will be certain items you cannot take in your hand baggage or checked baggage due to airline and aviation rules. This will depend on the items and what is inside. It will also depend on your journey.</p>

<p>Before packing please check:</p>

<ul>
<li>Liquids, aerosols, gels.</li>
<li>Extra batteries/powerbanks.</li>
<li>Sharp items/tools.</li>
<li>Flammable and dangerous items.</li>
<li>Sports equipment/large items.</li>
<li>Drugs/Medical Equipment.</li>
<li>Valuables.</li>
</ul>

<p>Depending on the items, terms, price, packing and how much notice you need to give this can vary. Some items will need organising with Ryanair.</p>

<p>If you wish to take any special items please contact {{AIRLINE_NAME}} in advance to check the terms, size/weight, how it will be handled and if there will be additional charges.</p>

<h2>Infant/Child Baggage</h2>

<p>Depending on your ticket you may have baggage allowance for infants/children. This can include pushchairs, child seat and essential travel items.</p>

<p>Please check with {{AIRLINE_NAME}} for the conditions of your booking for what you can take, if you need to check-in and any additional charges.</p>

<h2>Lost/Delayed/Damaged Baggage</h2>

<p>If your baggage is lost/damaged/delayed please contact baggage team or baggage desk.</p>

<p>Depending on the issue you may need to:</p>

<ul>
<li>Report any issues.</li>
<li>Give them your baggage tag reference, booking and flight details.</li>
<li>Get a report number.</li>
<li>Keep your receipt.</li>
<li>Write a claim in time.</li>
<li>Follow their advice.</li>
</ul>

<p>This can depend on how long it takes, how much they will pay, if you are entitled to any compensation and what documents you will need. Please contact {{AIRLINE_NAME}} asap and keep all relevant documents.</p>

<h2>Connecting Flights/Codeshares Baggage Policy</h2>

<p>Depending on if you are taking connecting flights or different airlines you may have different baggage policies. The baggage allowance and policy will depend on your type of ticket, airline, journey and any agreements.</p>

<p>Please check your baggage policy for your whole journey. Check if your baggage will be checked through to your final destination. If you are using different airlines please check with the airline/who you booked with.</p>

<h2>How to Check Baggage Allowances</h2>

<ul>
<li>Find your booking reference and ticket details.</li>
<li>Go onto their website/bookings.</li>
<li>Check baggage policy for your ticket.</li>
<li>Check hand baggage, checked baggage and excess baggage policy.</li>
<li>Check for any restrictions.</li>
</ul>

<p>If you are unsure or using multiple airlines please contact {{AIRLINE_NAME}}. Please make sure you check your baggage allowance before travelling, especially if you have a restricted ticket or have bought any excess baggage.</p>

<h2>Key Things to Check</h2>

<ul>
<li>Baggage Allowance.</li>
<li>Maximum size/weight.</li>
<li>Excess baggage charge.</li>
<li>Excess baggage.</li>
<li>Dangerous items.</li>
<li>Special items, sports equipment and musical instruments.</li>
<li>Infant/Child and mobility aid baggage.</li>
<li>Baggage issues.</li>
<li>Connecting Flights/Codeshares.</li>
</ul>

<h2>Conclusion</h2>

<p>Your baggage policy with {{AIRLINE_NAME}} will depend on your ticket, journey, class and baggage policy. Make sure you check what baggage allowance you have for hand and checked baggage, size/weight and any excess baggage charges/policies. Make sure to check their official baggage policy for the most accurate information.</p>
  `;

  return replaceAirlineName(content, airlineName);
}

function createBaggageFaqs(airlineName: string) {
  const name = escapeHtml(airlineName);

const faqs = [
  {
    question: "How much baggage can I take on a {{AIRLINE_NAME}} flight?",
    answer:
      "This will depend on what you have booked and what baggage options you have selected for your {{AIRLINE_NAME}} Flight. You can always view your baggage allowances, size restrictions and weight restrictions here by viewing your booking confirmation or looking on the official {{AIRLINE_NAME}} website.",
  },
  {
    question: "Is checked baggage included in my {{AIRLINE_NAME}} ticket?",
    answer:
      "Checked baggage will not be included in your {{AIRLINE_NAME}} booking. This will depend on what fare you have booked and what additional baggage options you have selected. You can view how many checked bags are included and the weight restrictions for your booking here.",
  },
  {
    question: "What happens if I have too much baggage?",
    answer:
      "If your baggage is too heavy or too large they may charge extra. It is best to check what the baggage restrictions are before going to the airport. This way you can make sure your baggage is within the correct weight/size restrictions.",
  },
  {
    question: "Can I buy extra baggage for my {{AIRLINE_NAME}} flight?",
    answer:
      "You may be able to buy extra baggage. You can view what options are available to you by looking at your reservation or visiting the official {{AIRLINE_NAME}} website.",
  },
  {
    question: "What should I do if my baggage is lost or damaged?",
    answer:
      "If you have lost, delayed or damaged baggage you should go to the correct baggage desk at the airport. You should also keep your baggage tag, booking confirmation, reference number and supporting documents to help with your claim.",
  },
];
  return JSON.parse(
    replaceAirlineName(
      JSON.stringify(faqs),
      name
    )
  ) as Prisma.InputJsonValue;
}

async function main() {
  const categories = await prisma.airlinePolicyCategory.findMany({
    orderBy: {
      name: "asc",
    },
  });

  if (categories.length === 0) {
    console.log("No airline categories found. Nothing to seed.");
    return;
  }

  let createdCount = 0;
  let updatedCount = 0;
  let failedCount = 0;

  for (const category of categories) {
    const airlineName = category.name;

    try {
      const existingPolicy = await prisma.airlinePolicy.findFirst({
        where: {
          categoryId: category.id,
          policyType,
        },
        select: {
          id: true,
          publishedAt: true,
        },
      });

const policyData = {
  excerpt: `Learn about the ${airlineName} baggage policy, including baggage allowance, hand luggage, checked baggage, size and weight limits, excess baggage charges, and lost or damaged baggage conditions.`,
  content: createBaggageContent(airlineName),
  policyType,
  metaTitle: `${airlineName} Baggage Policy`,
  metaDescription: `Learn about the ${airlineName} baggage policy, including carry-on baggage, checked baggage allowance, baggage size and weight limits, excess baggage fees, and lost or damaged baggage.`,
  metaKeywords: [
    `${airlineName} baggage policy`,
    `${airlineName} baggage allowance`,
    `${airlineName} carry on baggage`,
    `${airlineName} hand luggage policy`,
    `${airlineName} checked baggage policy`,
    `${airlineName} baggage size and weight`,
    `${airlineName} excess baggage charges`,
    `${airlineName} lost and damaged baggage`,
  ],
  status: "PUBLISHED",
  publishedAt: existingPolicy?.publishedAt ?? new Date(),
  categoryId: category.id,
  faqs: createBaggageFaqs(airlineName),
};

      if (existingPolicy) {
        await prisma.airlinePolicy.update({
          where: {
            id: existingPolicy.id,
          },
          data: policyData,
        });

        updatedCount++;
        console.log(`Updated NAME policy: ${airlineName}`);
      } else {
        await prisma.airlinePolicy.create({
          data: policyData,
        });

        createdCount++;
        console.log(`Created NAME policy: ${airlineName}`);
      }
    } catch (error) {
      failedCount++;
      console.error(
        `Failed to seed NAME policy for ${airlineName}:`,
        error
      );
    }
  }

  console.log("\nNAME policy seeding completed.");
  console.log(`Created: ${createdCount}`);
  console.log(`Updated: ${updatedCount}`);
  console.log(`Failed: ${failedCount}`);
  console.log(`Total categories: ${categories.length}`);
}

main()
  .catch((error) => {
    console.error("NAME policy seeding failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
