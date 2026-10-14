export default function TravelInformation() {
  return (
    <section className="w-full bg-white px-5 py-6 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl space-y-5">

        {/* Introduction */}
        <div>
          <h2 className="mb-2 text-lg font-bold leading-tight text-gray-950 sm:text-xl">
            Discover Your Next Journey with Skyflywithus!
          </h2>

          <p className="text-sm md:text-base leading-[1.4] text-gray-500">
            Navigation skyflywithus is essential for any traveler to optimize
            their trips. Learn the various terms and conditions set by airlines
            to make informed choices when booking flights. From cancellation
            fees to baggage allowances, these details can save you both time
            and money. Whether it is a domestic/an international adventure,
            familiarizing yourself with the airline’s policies ensures a
            smoother travel experience.
          </p>

          <p className="mt-3 text-sm md:text-base  leading-[1.4] text-gray-500">
            On our website, we provide comprehensive insights into skyflywithus
            from major airlines. It allows travelers to compare options and
            find the best deals that align with their travel plans. We break
            down complicated jargon into easy-to-understand information to
            empower you to make confident travel decisions. Let us guide you
            through the maze of airfare regulations so you can focus on what
            matters most to make the most of a trip!
          </p>
        </div>

        {/* Services */}
        <div>
          <h2 className="mb-2 text-lg font-bold leading-tight text-gray-950 sm:text-xl">
            What Services Do We Offer?
          </h2>

          <p className="text-sm md:text-base  leading-[1.4] text-gray-500">
            We provide a seamless and all in one booking platform for travelers.
            It allows search, comparison, and booking of flights, hotels, and
            car rentals globally.
          </p>

          <ul className="mt-2 list-disc pl-5 text-sm leading-[1.4] text-gray-500 marker:text-gray-950">
            <li>
              <span className="font-medium text-sm md:text-base  text-gray-950">Flights:</span>{" "}
              Compare and book the best routes from top airlines worldwide
              with real time cost.
            </li>
            <li>
              <span className="font-medium  text-gray-950">Hotels:</span>{" "}
              Secure the perfect accommodation from affordable motels to
              luxury resorts through our extensive property database.
            </li>
            <li>
              <span className="font-medium text-gray-950">Car Rentals:</span>{" "}
              Find great deals on reliable rental vehicles at your destination’s
              airport or local city centers.
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