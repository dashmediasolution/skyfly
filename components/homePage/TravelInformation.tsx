export default function TravelInformation() {
  return (
    <section className="w-full bg-white px-5 py-6 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl space-y-5">

        {/* Introduction */}

        <div>
          <h1 className="mb-2 text-lg font-bold leading-tight text-gray-950 sm:text-xl">
            Make Every Journey Better with SkyFlyWithUs
          </h1>

          <p className="text-sm leading-[1.4] text-gray-500 md:text-base">
            Planning a trip involves more than choosing a destination and finding a
            suitable flight. Understanding airline rules can help you prepare for
            unexpected changes, pack according to baggage limits, and avoid unnecessary
            travel expenses. SkyFlyWithUs helps simplify essential airline information
            so you can explore your options with greater clarity. Whether you are
            travelling within India or flying to another country, knowing what to
            expect before departure can make your journey more comfortable and
            stress-free.
          </p>

          <p className="mt-3 text-sm leading-[1.4] text-gray-500 md:text-base">
            At SkyFlyWithUs, our goal is to make travel planning easier through
            informative flight guides, airline policy insights, destination inspiration,
            and practical tips for travellers. We turn complicated travel information
            into straightforward guidance that helps you understand your options before
            making decisions. From preparing for your next getaway to learning about
            baggage requirements and airline procedures, discover useful information
            that helps you travel with confidence and make more informed choices.
          </p>
        </div>


        {/* Services */}

        <div>
          <h2 className="mb-2 text-lg font-bold leading-tight text-gray-950 sm:text-xl">
            Explore Travel Services with SkyFlyWithUs
          </h2>

          <p className="text-sm leading-[1.4] text-gray-500 md:text-base">
            Every memorable trip starts with the right information and a little
            planning. SkyFlyWithUs brings together helpful travel resources to make
            exploring destinations, researching flights, and preparing for your next
            getaway simpler. Discover useful guidance to help you evaluate your
            options and plan your journey according to your preferences and budget.
          </p>

          <ul className="mt-2 list-disc pl-5 text-sm leading-[1.4] text-gray-500 marker:text-gray-950">
            <li>
              <span className="text-sm font-medium text-gray-950 md:text-base">
                Flight Information:
              </span>{" "}
              Explore flight options, learn about airline policies, and find practical
              tips for planning domestic and international journeys.
            </li>
            <li>
              <span className="font-medium text-gray-950">
                Hotel Guidance:
              </span>{" "}
              Discover accommodation options and helpful suggestions for choosing a
              comfortable stay that suits your travel plans.
            </li>
            <li>
              <span className="font-medium text-gray-950">
                Travel Planning:
              </span>{" "}
              Get destination ideas, travel preparation tips, and useful insights to
              organise your itinerary and enjoy a smoother trip.
            </li>
          </ul>
        </div>


        {/* Why Book With Us */}
        <div>
          <h2 className="mb-2 text-lg font-bold leading-tight text-gray-950 sm:text-xl">
            Why Book With Us?
          </h2>

          <ul className="list-disc pl-5 text-sm leading-[1.4] text-gray-500 marker:text-gray-950">
            <li>
              <span className="font-medium text-gray-950">
                All in one Convenience:
              </span>{" "}
              Plan your entire trip, from departure to destination, in a single
              and user friendly platform.
            </li>
            <li>
              <span className="font-medium text-gray-950">
                Competitive Pricing:
              </span>{" "}
              Get access to exclusive deals and transparent rates with no hidden
              fees.
            </li>
            <li>
              <span className="font-medium text-gray-950">
                Local Experts:
              </span>{" "}
              Gain access to insider knowledge, curated recommendations, and a
              truly authentic experience.
            </li>
          </ul>
        </div>

      </div>
    </section>
  );
}