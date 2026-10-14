 import { Headset, ShieldCheck, Tag } from "lucide-react";

const benefits = [
  {
    title: "Exclusive Deals",
    description:
      "Unlock hidden fares and limited-access discounts thanks to our direct partnerships with major airlines. Travel smarter and save more.",
    Icon: ShieldCheck,
  },
  {
    title: "24/7 Helpline Support",
    description:
      "We are always here for you. Enjoy round-the-clock customer support dedicated purely to your comfort and peace of mind.",
    Icon: Headset,
  },
  {
    title: "Expert Travel Advice",
    description:
      "Beyond booking, access expert-crafted guides on compensation, upgrades, and practical travel tips to smooth your journey.",
    Icon: Tag,
  },
];

export default function Benefits() {
  return (
    <section className="w-full px-3 py-6 sm:px-5 sm:py-8 md:px-6 lg:px-8 lg:py-10">
      <div className="mx-auto w-full max-w-[1440px]">
        <div
          className="grid grid-cols-1 overflow-hidden rounded-xl border border-[#c8dbc0] bg-[#fbfafc] shadow-sm
                     sm:grid-cols-2 sm:rounded-2xl
                     lg:grid-cols-3"
        >
          {benefits.map(({ title, description, Icon }, index) => (
            <article
              key={title}
              className={`
                flex min-w-0 flex-col items-center px-4 py-6 text-center
                sm:px-5 sm:py-7
                md:px-6 md:py-8
                lg:px-5 lg:py-7
                xl:px-8
                ${
                  index !== 2
                    ? "border-b border-[#dce6d7] sm:border-b-0"
                    : ""
                }
                ${
                  index === 0
                    ? "sm:border-r sm:border-[#dce6d7]"
                    : ""
                }
                ${
                  index === 1
                    ? "sm:border-b sm:border-[#dce6d7] lg:border-b-0 lg:border-r"
                    : ""
                }
                ${
                  index === 2
                    ? "sm:col-span-2 lg:col-span-1"
                    : ""
                }
              `}
            >
              <div
                className="mb-3 flex size-11 shrink-0 items-center justify-center rounded-full bg-[#548746] text-white
                           sm:mb-4 sm:size-12"
              >
                <Icon
                  className="size-5 sm:size-[23px]"
                  strokeWidth={2.2}
                  aria-hidden="true"
                />
              </div>

              <h2
                className="text-lg font-bold leading-snug text-[#548746]
                           sm:text-xl
                           lg:text-xl
                           xl:text-2xl"
              >
                {title}
              </h2>

              <p
                className="mt-2 max-w-[360px] text-sm leading-6 text-gray-600
                           sm:mt-3 sm:text-[15px] sm:leading-6
                           lg:text-sm
                           xl:text-base xl:leading-7"
              >
                {description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
 