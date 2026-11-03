
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const policyType = "BAGGAGE";
const PHONE_NUMBER = "1-855-509-3791";

const loyaltyPrograms: Record<string, string> = {
    "Aeromexico": "Aeromexico Rewards",
    "Alaska Airlines": "Atmos Rewards",
    "American Airlines": "AAdvantage",
    "China Eastern Airlines": "Eastern Miles",
    "Copa Airlines": "ConnectMiles",
    "Emirates": "Skywards",
    "emirates airlines": "Skywards",
    "Etihad Airways": "Etihad Guest",
    "EVA Air": "Infinity MileageLands",
    "Frontier Airlines": "Frontier Miles",
    "Hawaiian Airlines": "Atmos Rewards",
    "LATAM Airlines": "LATAM Pass",
    "Lufthansa": "Miles & More",
    "Norwegian Air": "Norwegian Reward",
    "United Airlines": "MileagePlus",
    "Volaris Airlines": "v.club",
    "Caribbean Airlines": "Caribbean Miles",
    "Allegiant Air": "Allways Rewards",
    "Avelo Airlines": "No traditional frequent-flyer programme",
    "Breeze Airways": "BreezePoints",
    "Delta Air Lines": "SkyMiles",
    "JetBlue Airways": "TrueBlue",
    "JetBlue": "TrueBlue",
    "Southwest Airlines": "Rapid Rewards",
    "Sun Country Airlines": "Sun Country Rewards",
    "Jetstar": "No traditional frequent-flyer programme",
    "EasyJet": "easyJet Plus",
    "easyJet": "easyJet Plus",
    "Jet2.com": "No traditional frequent-flyer programme",
    "Norse Atlantic UK": "No traditional frequent-flyer programme",
    "Ryanair UK": "myRyanair",
    "Wizz Air UK": "Wizz Discount Club",
    "iberia airlines": "Iberia Club / Avios",
    "Iberia": "Iberia Club / Avios",
    "FlyOne Airline": "No traditional frequent-flyer programme",
    "Norse Atlantic Airways": "No traditional frequent-flyer programme",
    "ryanair airlines": "myRyanair",
    "Pacific Airlines": "No traditional frequent-flyer programme",
    "flydubai": "Skywards",
    "thai airways": "Royal Orchid Plus",
    "SkyJet Airlines": "No traditional frequent-flyer programme",
    "philippines airlines": "Mabuhay Miles",
    "Philippines Airlines": "Mabuhay Miles",
    "Cebu Pacific": "Go Rewards",
    "AirAsia": "AirAsia rewards",
    "SpiceJet": "SpiceClub",
    "air china airlines": "PhoenixMiles",
    "Air China": "PhoenixMiles",
    "viva airlines": "Doters",
    "Viva Airlines": "Doters",
    "sky airlines": "SKY Plus",
    "Sky Airlines": "SKY Plus",
    "JetSmart": "Club de Descuentos",
    "Flair Airlines": "No traditional frequent-flyer programme",
    "air canada": "Aeroplan",
    "Air Canada": "Aeroplan",
    "air arabia maroc airlines": "AirRewards",
    "Air Arabia Maroc": "AirRewards",
    "avenica airline": "LifeMiles",
    "Singapore Airlines": "KrisFlyer",
    "Qatar Airways": "Privilege Club",
    "Cathay Pacific Airways": "Asia Miles",
    "ANA All Nippon Airways": "ANA Mileage Club",
    "Turkish Airlines": "Miles&Smiles",
    "Air France": "Flying Blue",
    "Hainan Airlines": "Fortune Wings Club",
    "Japan Airlines": "JAL Mileage Bank",
    "Korean Air": "SKYPASS",
    "Qantas Airways": "Qantas Frequent Flyer",
    "Qantas": "Qantas Frequent Flyer",
    "STARLUX Airlines": "COSMILE",
    "Saudia": "AlFursan",
    "Virgin Atlantic": "Flying Club",
    "Swiss International Air Lines": "Miles & More",
    "Malaysia Airlines": "Enrich",
    "British Airways": "Executive Club / Avios",
    "KLM Royal Dutch Airlines": "Flying Blue",
    "KLM": "Flying Blue",
    "Austrian Airlines": "Miles & More",
    "Scoot": "KrisFlyer",
    "Bangkok Airways": "FlyerBonus",
    "China Airlines": "Dynasty Flyer",
    "China Southern Airlines": "Sky Pearl Club",
    "Air New Zealand": "Airpoints",
    "Finnair": "Finnair Plus / Avios",
    "Porter Airlines": "VIPorter",
    "Air Astana": "Nomad Club",
    "Ethiopian Airlines": "ShebaMiles",
    "Virgin Australia": "Velocity Frequent Flyer",
    "Fiji Airways": "Tabua Club",
    "Vueling Airlines": "Vueling Club / Avios",
    "Aegean Airlines": "Miles+Bonus",
    "Azerbaijan Airlines": "AZAL Miles",
    "Eurowings": "Miles & More",
    "LOT Polish Airlines": "Miles & More",
    "Egyptair": "Egyptair Plus",
    "Iberia Express": "Iberia Club / Avios",
    "Volotea": "Megavolotea",
    "ITA Airways": "Volare",
    "Transavia France": "Flying Blue",
};

function escapeHtml(value: string) {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function getLoyaltyProgram(airlineName: string) {
    const key = Object.keys(loyaltyPrograms).find(
        (item) => item.toLowerCase() === airlineName.toLowerCase()
    );

    return key ? loyaltyPrograms[key] : "frequent flyer programme";
}

function replaceAirlineName(content: string, airlineName: string) {
    const safeAirlineName = escapeHtml(airlineName);
    const safeLoyaltyProgram = escapeHtml(getLoyaltyProgram(airlineName));

    return content
        .replace(/\{\{AIRLINE_NAME\}\}/g, safeAirlineName)
        .replace(/\{\{LOYALTY_PROGRAM\}\}/g, safeLoyaltyProgram)
        .replace(
            /\{\{PHONE_NUMBER\}\}/g,
            `<strong style="color: #1f2937;">${PHONE_NUMBER}</strong>`
        );
}

function createBaggageContent(airlineName: string) {
    const content = `
<h2>{{AIRLINE_NAME}} Baggage Policy</h2>

<p>When travelling with {{AIRLINE_NAME}}, it's important to know what the baggage policy is. This will allow you to avoid any unexpected charges and travel with ease.</p>

<p>{{AIRLINE_NAME}} will have different baggage allowances depending on your destination, ticket, class of travel and frequent flyer status. You will be able to take one personal item and piece of carry on luggage, but charges may apply for checked luggage.</p>

<p>We'll explain everything you need to know about {{AIRLINE_NAME}} baggage policy including carry on size, checked baggage charges, special items and what to do in case of delayed or damaged luggage.</p>

<p>Need help with anything related to booking your flight?</p>

<p>Contact SkyFlyWithUs on {{PHONE_NUMBER}}.</p>

<h2>{{AIRLINE_NAME}} Carry On Size</h2>

<p>You will be able to take 1 personal item and 1 carry on bag with you as long as they fit within the size limits.</p>

<p>Standard carry on size limits:</p>

<p><strong>Personal Item –</strong> No larger than 18" x 14" x 8". Must fit underneath the seat.</p>

<p><strong>Carry On Bag –</strong> No larger than 22" x 14" x 9" (including handles and wheels).</p>

<p><strong>Soft sided garment bag –</strong> No larger than 51".</p>

<p>Your carry on luggage should fit within the baggage sizer available at the airport. If your luggage is larger than the maximum size then you may have to check your luggage which can incur charges.</p>

<p>Items such as nappy bags, breast pumps, small coolers with breast milk, medical equipment and mobility aids are not counted towards your standard carry on allowance.</p>

<h2>{{AIRLINE_NAME}} Special Item Baggage Allowance</h2>

<p>{{AIRLINE_NAME}} has additional baggage allowances for those travelling with children, pets and special items. However, there may be specific size limits and charges depending on the item.</p>

<h3>Children &amp; Infants</h3>

<p>Those travelling with children will be able to take extra items with them.</p>

<p>You will be able to take an extra nappy bag per child. Those with a child can also check one stroller and car seat free of charge.</p>

<p>Infants who are travelling in the lap of an adult on international flights may be able to check one bag free of charge. It cannot be larger than 25lbs and 22" x14" x9".</p>

<p>Breast pumps, small soft sided coolers with breast milk are also allowed.</p>

<p>Before you travel with your children, ensure you understand what the airline requires.</p>

<h3>Pets</h3>

<p>Before travelling with your pet, ensure you understand what the pet policy is.</p>

<p>Small dogs and cats can travel in your cabin with you in an approved pet carrier. This will depend on availability, destination and charges.</p>

<p>The pet carrier must fit underneath the seat and the animal must stay in the carrier.</p>

<p>Those with a carry on pet can only take 1 extra personal item or carry on bag. Ensure you book your pet in advance as there is limited space.</p>

<h3>Musical Instruments</h3>

<p>{{AIRLINE_NAME}} allows you to travel with musical instruments. This will depend on the size of the instrument and available space.</p>

<p>Small instruments such as violins can be taken in your cabin if they can fit into the overhead compartment or underneath the seat.</p>

<p>Larger instruments may need an extra seat to be purchased or to be checked.</p>

<p>Checked musical instruments can be no larger than 150" overall and 165lbs. Standard baggage charges may apply along with overweight charges.</p>

<p>Ensure you use hard sided cases to protect your instrument.</p>

<h2>{{AIRLINE_NAME}} Checked Baggage Luggage Policy</h2>

<p>Your checked baggage allowance will depend on your destination, ticket class and frequent flyer benefits.</p>

<p>Standard checked baggage allowances:</p>

<p><strong>Weight –</strong> Up to 50lbs (23kg).</p>

<p><strong>Size –</strong> Up to 62" (158cm).</p>

<p><strong>Premium cabin –</strong> Eligible First and Business Class passengers can have a higher weight allowance of 70lbs (32kg) for qualifying free bags.</p>

<p>Those travelling to and from Australia &amp; New Zealand may have different weight allowances.</p>

<p>The amount of checked baggage you can take will depend on your destination. Most {{AIRLINE_NAME}} operated flights will allow up to 10 pieces of checked baggage for domestic, transatlantic and transpacfic flights. International destinations may have less.</p>

<p>Ensure you understand what your baggage allowance is before travelling to avoid any extra charges.</p>

<h2>{{AIRLINE_NAME}} Checked Baggage Allowance for Active Duty Military</h2>

<p>{{AIRLINE_NAME}} offer special checked baggage allowances for eligible active duty military members from the USA.</p>

<p>Depending on your destination and situation, eligible military passengers can take up to:</p>

<p><strong>5 pieces of checked baggage</strong> up to 100lbs if travelling on official orders.</p>

<p><strong>3 pieces of checked baggage</strong> up to 50lbs if travelling on personal or leisure.</p>

<p>Eligible military members will need to show valid military ID. Official travel orders may also be required.</p>

<p>Military dependents travelling on qualifying orders may also receive baggage allowances if they provide the correct documentation.</p>

<p>This will generally apply to qualifying {{AIRLINE_NAME}} marketed and operated itineraries. Ensure you understand what your allowance is.</p>

<h2>How to Pay Checked Baggage Charges with {{AIRLINE_NAME}}?</h2>

<p>You can pay your checked baggage charges via the online portal.</p>

<p>To pay:</p>

<ol>
    <li>Go to the official {{AIRLINE_NAME}} website.</li>
    <li>Click on Manage Trips.</li>
    <li>Enter your booking reference and passenger details.</li>
    <li>Select your upcoming flight.</li>
    <li>Select the checked baggage option during check in.</li>
    <li>Look at the baggage charges.</li>
    <li>Pay using a payment method.</li>
    <li>Save your confirmation.</li>
</ol>

<p>You can generally pay for up to 3 pieces of checked baggage per person online. This can be done up to 2 hours before departure on qualifying itineraries.</p>

<p>You can save $5 on your first and second checked baggage by paying online on qualifying routes.</p>

<h2>{{AIRLINE_NAME}} Checked Baggage Charges for Special Items</h2>

<p>{{AIRLINE_NAME}} will charge extra baggage charges for certain items.</p>

<p>Charges will vary depending on the item, route, weight, size and baggage allowance.</p>

<h3>Sporting Equipment</h3>

<p>If you're travelling with sport equipment such as golf clubs, bicycles, skis and snowboards, ensure you understand the special baggage requirements.</p>

<p>Some items can be taken as standard checked baggage whilst others will need to be handled specially or charged.</p>

<p>Important things to note:</p>

<p><strong>Golf bags</strong> should be well packed in suitable cases.</p>

<p><strong>Bicycles</strong> may need to be packed in a certain way.</p>

<p><strong>Skiing and snowboarding equipment</strong> must fit within the size and weight limits.</p>

<p><strong>Oversized and overweight items</strong> may incur extra charges.</p>

<p>Some oversized sports items have restrictions. Ensure you understand what the current requirements are.</p>

<h2>How to Avoid {{AIRLINE_NAME}} Baggage Charges?</h2>

<p>Carefully plan your luggage to avoid any unnecessary charges.</p>

<p>Top tips include:</p>

<ul>
    <li>Take advantage of your carry on allowance and pack essential clothing and personal items.</li>
    <li>Check your ticket as some premium cabins and eligible {{LOYALTY_PROGRAM}} benefits will include free checked baggage.</li>
    <li>Take advantage of military benefits as eligible active duty military members may receive extra free checked bags.</li>
    <li>Pay online to save money on your checked baggage charges.</li>
    <li>Avoid overweight bags by weighing your luggage at home.</li>
    <li>Check the special items requirements.</li>
    <li>Plan your luggage in advance to avoid any unnecessary charges at the airport.</li>
</ul>

<h2>{{AIRLINE_NAME}} Extra Baggage Charges</h2>

<p>If you have more luggage than your ticket allows you may have to pay extra baggage charges.</p>

<p>{{AIRLINE_NAME}} will calculate extra baggage charges based on how many bags you have, destination, ticket and if your luggage is overweight/oversized.</p>

<p>For travel within the USA, Puerto Rico, U.S. Virgin Islands, Canada, Mexico and select destinations, standard Main Cabin baggage charges for tickets issued on or after May 18th 2026:</p>

<p><strong>First Bag –</strong> $50 at the airport or $45 online.</p>

<p><strong>Second Bag –</strong> $60 at the airport or $55 online.</p>

<p>Basic Economy tickets may incur an extra $5 charge for the first and second bag.</p>

<p>There may be extra charges for overweight and oversized items. International destinations may have much higher charges.</p>

<p>Ensure you check what the charge is for your itinerary.</p>

<h2>{{AIRLINE_NAME}} Delayed or Damaged Baggage</h2>

<p>Whilst airlines will take every precaution to ensure your luggage arrives safely, sometimes your luggage can arrive late or damaged.</p>

<p>{{AIRLINE_NAME}} have processes in place to report your issues.</p>

<h3>Delayed Baggage</h3>

<p>If your checked baggage has not arrived at your destination, visit the baggage service office at the airport.</p>

<p>Report your lost baggage. Provide your baggage claim receipt, flight details and contact information.</p>

<p>You can also check the status of your baggage using the {{AIRLINE_NAME}} website/app.</p>

<h3>Damaged Baggage</h3>

<p>If your baggage has arrived damaged, report this to an baggage representative before leaving the airport or within 6 hours of receiving it.</p>

<p>Provide photos, baggage details and any supporting documents.</p>

<p>Ensure you keep your damaged baggage and contents until further instructions are given. There may be further reporting requirements and time limits if claiming compensation.</p>

<h2>{{AIRLINE_NAME}} Lost and Found</h2>

<p>If you've lost any personal items during your travels, contact the correct lost and found department at the airport or {{AIRLINE_NAME}}.</p>

<p>If you have lost something on the plane, complete a lost item report.</p>

<p>If your checked baggage has been lost, complete a delayed baggage report.</p>

<p>Provide accurate flight details, baggage tags and description of the lost item.</p>

<p>Keep your confirmation and follow the airline's instructions.</p>

<h2>{{AIRLINE_NAME}} Packing Tips</h2>

<p>Packing your luggage correctly can help make your trip more comfortable and avoid any extra baggage charges.</p>

<p>Top tips:</p>

<ul>
    <li>Weigh your checked baggage.</li>
    <li>Measure your carry on baggage (wheels and handles).</li>
    <li>Pack your travel documents, medication and valuables in your personal item.</li>
    <li>Use baggage tags with up to date contact details.</li>
    <li>Pack fragile items in protective packaging.</li>
    <li>Keep electronics and spare lithium batteries in your carry on.</li>
    <li>Check TSA regulations for liquids and prohibited items.</li>
    <li>Leave some extra space for any purchases.</li>
</ul>

<h2>Baggage Policy for Other Airlines</h2>

<p>Not all airlines will have the same baggage requirements. If you're travelling with any connections or multiple airlines, ensure you check the baggage policy for each airline.</p>

<p>Other airlines to consider:</p>

<ul>
    <li>Delta Air Lines Baggage Policy</li>
    <li>United Airlines Baggage Policy</li>
    <li>Southwest Airlines Baggage Policy</li>
    <li>Alaska Airlines Baggage Policy</li>
    <li>JetBlue Airways Baggage Policy</li>
</ul>

<p>Ensure you check what your baggage allowances, weight and extra charges are.</p>

<h2>Conclusion</h2>

<p>Knowing what the {{AIRLINE_NAME}} baggage policy is can help you avoid any unexpected charges. Knowing what your luggage should be can help you plan your trip.</p>

<p>Knowing what the carry on size, checked baggage allowances, special items, military benefits and delayed luggage requirements are can help you plan your trip.</p>

<p>Baggage charges and allowances can vary depending on your route, fare and date of travel. Always check the latest information on the official {{AIRLINE_NAME}} website.</p>

<p>Need help with anything related to booking your flight?</p>

<p>Contact SkyFlyWithUs on {{PHONE_NUMBER}}.</p>
`;

    return replaceAirlineName(content, airlineName);
}

function createBaggageFaqs(airlineName: string) {
    const loyaltyProgram = getLoyaltyProgram(airlineName);

    const faqs = [
        {
            question: "What is the carry on size for {{AIRLINE_NAME}}?",
            answer:
                '{{AIRLINE_NAME}} allows you to take 1 carry on bag no larger than 22" x 14" x 9" (including handles and wheels). Personal items cannot be larger than 18" x14" x8%.',
        },
        {
            question: "How many free checked bags does {{AIRLINE_NAME}} allow?",
            answer:
                "This will depend on your destination, ticket, {{LOYALTY_PROGRAM}} status and any eligible credit card benefits. Some passengers may incur charges for their first checked bag.",
        },
        {
            question: "What is the standard checked baggage weight?",
            answer:
                "The standard checked baggage weight is generally 50lbs (23kg). Eligible First and Business Class passengers may have a higher allowance of 70lbs for qualifying free bags.",
        },
        {
            question: "Can I pay baggage charges online with {{AIRLINE_NAME}}?",
            answer:
                "Yes. Eligible passengers can pay for up to 3 checked bags per person via the online portal or app.",
        },
        {
            question: "Do {{AIRLINE_NAME}} offer free baggage for military?",
            answer:
                "Yes. Eligible active duty military members from the USA may have up to 5 free bags if travelling on official orders. Up to 3 bags if travelling on personal travel.",
        },
        {
            question: "Can I take a musical instrument?",
            answer:
                "Yes. Small instruments can be taken in your cabin if they fit in overhead compartment or underneath the seat. Larger instruments may need an extra seat or to be checked.",
        },
        {
            question: "What should I do if my luggage is lost?",
            answer:
                "Report lost luggage to the baggage service office. Keep your baggage claim receipt and report reference.",
        },
        {
            question: "Are there extra charges for overweight baggage?",
            answer:
                "Yes. If your checked baggage exceeds the standard weight and size limits you may incur extra charges. This will depend on your route and baggage.",
        },
    ];

    return faqs.map((faq) => ({
        question: replaceAirlineName(faq.question, airlineName),
        answer: replaceAirlineName(faq.answer, airlineName),
    }));
}

async function main() {
    const categories = await prisma.airlinePolicyCategory.findMany();

    let createdCount = 0;
    let updatedCount = 0;

    for (const category of categories) {
        const airlineName = category.name;

        const existingPolicy = await prisma.airlinePolicy.findFirst({
            where: {
                categoryId: category.id,
                policyType,
            },
        });

        const policyData = {
            excerpt: `Understand the ${airlineName} baggage policy, including carry-on size, checked baggage allowances, extra charges and special items.`,
            content: createBaggageContent(airlineName),
            metaTitle: `${airlineName} Baggage Policy | Allowance & Fees`,
            metaDescription: `${airlineName} baggage policy, carry-on size, checked baggage allowance, baggage fees, special items and delayed luggage.`,
            metaKeywords: [
                `${airlineName} baggage policy`,
                `${airlineName} carry on size`,
                `${airlineName} checked baggage allowance`,
                `${airlineName} baggage fees`,
                `${airlineName} extra baggage charges`,
                `${airlineName} delayed baggage`,
            ],
            faqs: createBaggageFaqs(airlineName),
            status: "PUBLISHED" as const,
        };

        if (existingPolicy) {
            await prisma.airlinePolicy.update({
                where: {
                    id: existingPolicy.id,
                },
                data: {
                    ...policyData,
                    publishedAt: existingPolicy.publishedAt ?? new Date(),
                },
            });

            updatedCount++;
            console.log(`Updated baggage policy: ${airlineName}`);
        } else {
            await prisma.airlinePolicy.create({
                data: {
                    ...policyData,
                    categoryId: category.id,
                    policyType,
                    publishedAt: new Date(),
                },
            });

            createdCount++;
            console.log(`Created baggage policy: ${airlineName}`);
        }
    }

    console.log("\nBaggage policy seeding completed.");
    console.log(`Created: ${createdCount}`);
    console.log(`Updated: ${updatedCount}`);
    console.log(`Total categories: ${categories.length}`);
}

main()
    .catch((error) => {
        console.error("Error seeding baggage policies:", error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
