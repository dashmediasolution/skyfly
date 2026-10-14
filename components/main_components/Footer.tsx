 "use client";

import Link from "next/link";
import {
  ArrowRight,
  Globe2,
  MapPin,
} from "lucide-react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";

const PRIMARY = "#538440";
const PRIMARY_DARK = "#3F6632";

const categories = [
  { name: "Cancellation & Refund", slug: "cancellation-and-refund" },
  { name: "Change Flight", slug: "change-flight" },
  { name: "Compensation", slug: "compensation" },
  { name: "Seat Upgrade", slug: "seat-upgrade" },
  { name: "Voucher", slug: "voucher" },
  { name: "Lost & Found", slug: "lost-and-found" },
  { name: "Check In", slug: "check-in" },
  { name: "Airport", slug: "airport" },
];

const companyLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Contact Us", href: "/contact" },
];

const legalLinks = [
  { name: "Terms & Conditions", href: "/terms" },
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Sitemap", href: "/public-sitemap" },
];

 
export function Footer() {
  return (
    <footer
      className="w-full overflow-hidden font-sans text-white"
      style={{ backgroundColor: PRIMARY }}
    >


      {/* Main Footer */}
      <div className="mx-auto max-w-[1440px] px-5 pb-9 pt-10 sm:px-8 sm:pt-12 lg:px-12 lg:pb-12 lg:pt-14">
        <div className="grid grid-cols-1 gap-9 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-10 lg:grid-cols-[1.3fr_0.8fr_1.4fr_0.8fr] lg:gap-10 xl:gap-14">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              href="/"
              aria-label="SkyFlyWithUs home"
              className="inline-flex items-center gap-2.5"
            >
              <span className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                SkyFly
                <span className="text-white/75">WithUs</span>
              </span>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-white/90 sm:text-base">
              From local escapes to global adventures, find helpful travel
              information and inspiration to make every journey smoother.
            </p>

            <div className="mt-5 flex items-start gap-3 text-sm leading-6 text-white/90">
              <Globe2 className="mt-1 size-5 shrink-0 text-white" />
              <span>
                Explore more. Travel smarter.
                <br />
                Make every journey count.
              </span>
            </div>

         
          </div>

          {/* Company and Legal */}
          <div>
            <h3 className="mb-5 text-base font-extrabold text-white sm:text-lg">
              Company
            </h3>

            <ul className="space-y-3.5">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/85 transition-colors hover:text-white hover:underline sm:text-base"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="mb-4 mt-8 text-base font-extrabold text-white sm:text-lg">
              Legal
            </h3>

            <ul className="space-y-3.5">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/85 transition-colors hover:text-white hover:underline sm:text-base"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Travel Guides */}
          <div>
            <h3 className="mb-5 text-base font-extrabold text-white sm:text-lg">
              Explore Travel Guides
            </h3>

            <p className="mb-5 max-w-sm text-sm leading-6 text-white/85">
              Find practical information to help you plan and manage your
              flight journey.
            </p>

            <ul className="grid grid-cols-1 gap-x-5 gap-y-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {categories.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/blog/category/${category.slug}`}
                    className="group inline-flex items-start gap-2 text-sm text-white/85 transition-colors hover:text-white sm:text-[15px]"
                  >
                    <ArrowRight className="mt-0.5 size-4 shrink-0 text-white/75 transition-transform group-hover:translate-x-0.5 group-hover:text-white" />
                    <span>{category.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Travel Support */}
          <div>
            <h3 className="mb-5 text-base font-extrabold text-white sm:text-lg">
              Travel Support
            </h3>

            <p className="text-sm leading-7 text-white/90 sm:text-base">
              Looking for flight-related information? Explore our guides
              covering cancellations, changes, airport procedures, and more.
            </p>

            <Link
              href="/contact"
              className="mt-5 inline-flex items-center gap-2 rounded-xl border border-white/35 bg-white px-4 py-3 text-sm font-bold text-[#3F6632] transition-all hover:bg-white/90"
            >
              Contact Us
              <ArrowRight className="size-4" />
            </Link>

            <div className="mt-6 rounded-2xl border border-white/20 bg-white/10 p-4">
              <div className="flex items-center gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/15 text-white">
                  <MapPin className="size-5" />
                </span>

                <div>
                  <p className="text-sm font-bold text-white">
                    Travel with confidence
                  </p>
                  <p className="mt-1 text-xs leading-5 text-white/80">
                    Helpful information for your journey.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

            {/* Disclaimer - TOP */}
  <div className="border-b border-white/20 bg-green-900 bg px-4 py-5 sm:px-8 lg:px-12">
    <div className="mx-auto max-w-[1440px]">
      <h3 className="mb-2 text-lg text-center font-bold text-white sm:text-lg">
        Disclaimer
      </h3>
      <p className="text-sm leading-6 text-white/85 text-center">
        The information provided on this website is for general informational
        purposes only. Flight policies, cancellation fees, change fees, and
        other airline rules may vary by airline and ticket type. Please confirm
        the applicable terms directly with your airline before making travel
        decisions.
      </p>
    </div>
  </div>
      {/* Copyright */}
      <div
        className="text-white"
        style={{ backgroundColor: PRIMARY_DARK }}
      >
        <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-3 px-5 py-5 text-center sm:px-8 md:flex-row md:text-left lg:px-12">
          <p className="text-xs leading-5 text-white/85 sm:text-sm">
            © {new Date().getFullYear()} SkyFlyWithUs. All rights reserved.
          </p>

          <p className="text-xs font-medium text-white/85 sm:text-sm">
            Made for travelers, by travelers.
          </p>
        </div>
      </div>
    </footer>
  );
}
 