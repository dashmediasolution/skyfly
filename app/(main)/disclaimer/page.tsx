import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function DisclaimerPage() {
  return (
    <main className="min-h-screen bg-white text-gray-700">
      {/* Hero */}
      <section
        className="relative bg-cover bg-center px-5 py-20 sm:py-24"
        style={{
          backgroundImage:
            "linear-gradient(rgba(5, 35, 55, 0.75), rgba(5, 35, 55, 0.85)), url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <div className="mx-auto max-w-5xl">
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-2 text-sm text-white/80 hover:text-white"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>

          <h1 className="text-4xl font-bold text-white sm:text-5xl">
            Disclaimer
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-7 text-white/80">
            Important information about the content and services provided
            on SkyFlyWithUs.com.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-5xl px-5 py-12 sm:py-16">
        <div className="space-y-8 text-sm leading-7 text-gray-600 sm:text-base">
          <p>
            Welcome to SkyFlyWithUs.com. By using our website, you agree
            to the terms outlined in this Disclaimer. Please read the
            following information carefully.
          </p>

          <div>
            <h2 className="mb-2 text-xl font-semibold text-gray-900">
              General Information
            </h2>
            <p>
              All information on this website is provided for general
              informational purposes. We make reasonable efforts to keep
              content accurate and updated but cannot guarantee that all
              information is complete or current.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-xl font-semibold text-gray-900">
              Flight Information and Prices
            </h2>
            <p>
              Flight fares, schedules, baggage rules, cancellation
              policies, and other travel details may change at any time.
              Please confirm the latest information directly with the
              relevant airline or booking provider before making travel
              arrangements.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-xl font-semibold text-gray-900">
              Third-Party Links
            </h2>
            <p>
              Our website may link to third-party websites for additional
              information or booking services. We are not responsible for
              their content, policies, services, or practices.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-xl font-semibold text-gray-900">
              Affiliate Disclosure
            </h2>
            <p>
              We may earn a commission from certain links or advertising
              partnerships. Any such relationship does not guarantee
              specific prices, availability, or service quality.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-xl font-semibold text-gray-900">
              Limitation of Liability
            </h2>
            <p>
              SkyFlyWithUs.com is not responsible for losses arising from
              reliance on website information, changes in airline
              policies, booking issues, or third-party services, to the
              extent permitted by applicable law.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-xl font-semibold text-gray-900">
              Contact Us
            </h2>
            <p>
              If you have any questions about this Disclaimer, please
              visit our{" "}
              <Link
                href="/contact"
                className="font-medium text-teal-700 hover:underline"
              >
                Contact Us
              </Link>{" "}
              page.
            </p>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-200 pt-6 text-sm text-gray-500">
          <p>
            We may update this Disclaimer from time to time. Any changes
            will be posted on this page.
          </p>
        </div>
      </section>
    </main>
  );
}
 