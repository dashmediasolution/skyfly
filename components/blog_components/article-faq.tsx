 

"use client";

import React from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { FaqItem } from "@/components/blog_components/blog-card";

interface ArticleFaqsProps {
    questions: FaqItem[];
}

export function ArticleFaqs({ questions }: ArticleFaqsProps) {
    if (!questions || questions.length === 0) {
        return null;
    }

    return (
        <div className="mx-auto w-full space-y-7">
            <div className="space-y-2">
                <h2 className="text-2xl font-semibold text-black md:text-3xl">
                    Frequently Asked Questions
                </h2>

                <p className="max-w-2xl text-gray-600 dark:text-gray-400">
                    Here are some common questions related to this article.
                </p>
            </div>

            <Accordion
                type="single"
                collapsible
                className="w-full -space-y-px bg-card dark:bg-card/50"
                defaultValue="item-1"
            >
                {questions.map((item) => (
                    <AccordionItem
                        value={item.id}
                        key={item.id}
                        className="relative border-none dark:border-gray-700"
                    >
                        <AccordionTrigger
                            className="px-4 py-4 text-left text-[20px] font-medium leading-6 text-[#538440] hover:no-underline hover:text-[#3F6632] [&>svg]:text-[#538440]"
                        >
                            {item.question}
                        </AccordionTrigger>

                        <AccordionContent className="px-4 pb-4 text-gray-700 dark:text-gray-300">
                            {item.answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
}








//////////////////////////////////////////////////////////////////////////////////////////////////////

ANA All Nippon Airways – Changing Flights
Below is information on the conditions for changing flights with ANA All Nippon Airways. Conditions will differ based on ticket type, fare conditions, route and how you booked your flight.

Before making any changes please check your booking confirmation and what conditions apply to your flight.

ANA All Nippon Airways – Changing Flights
Based on the fare you have chosen there may be various conditions for changing your flight. Some flights can be changed but may incur a fee.

For accurate information please visit the ANA All Nippon Airways website or contact their customer services team.

Can I change my flight?
Depending on the conditions of your ticket you may be able to:
Change date
Change flight
Change travel time (if applicable)
View alternative routes
Depending on your ticket you may not be able to make certain changes. Before selecting a new flight please ensure you are able to make the changes you want.
ANA All Nippon Airways – Changing Flight Fees
Depending on fare conditions you may have to pay some fees to change your flight. These can include:
Changing flight fees
Difference in the fare of the new flight
Booking agent fees.
Do not assume you will not be charged any fees. Please ensure you are aware of what conditions you have on your ticket.
ANA All Nippon Airways – Difference in Fare
If you want to change your flight to one that is more expensive than your original ticket you may be charged a fee.
If your new flight is cheaper you may be able to receive a refund based on the fare conditions. Or you may be able to use the money or lose out.
Always double check the price and new route.
How to change your flight online.
To change your flight with ANA All Nippon Airways please follow the steps below.
Locate your booking confirmation and reference number.
Visit the ANA All Nippon Airways website or contact your booking provider.
Search for your booking using the required booking and passenger details.
Check your ticket can be changed.
Select your new flight.
View any fees you’ll have to pay for changing your flight. This may include a fare difference.
Confirm your new route and total fee.
Take note of your new confirmation and ticket details.
Note these steps may vary depending on how you’ve booked.
Changing a flight booked with a travel agent.
If you booked your ticket with a travel agent or third party booking site please contact them directly. They may be able to assist you.
The original booking provider may need to make the changes. There may be additional fees. Please have your booking reference, passenger details and new dates to hand.
When can I change my flight?
As soon as you know you need to make changes please do so. Depending on your ticket conditions there may be an end date.
If you wait until just before you’re due to travel there may not be many options available. Please ensure you know what the end date is and if you can make the changes.
Important things to check.
Can you change your flight?
End date.
Are there any fees?
Fare difference.
Can the original booking provider make the changes?
Any restrictions?
Have they given the correct new route/passenger details?
Overall changing your flight with ANA All Nippon Airways will depend on your ticket conditions. Please ensure you know the rules, fees and fare differences. Contact the airline or original booking provider to confirm what options you have.