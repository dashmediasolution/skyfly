import Image from "next/image";

type HeroSectionProps = {
  image: string;
  alt?: string;
  mobileHeight?: string;
  tabletHeight?: string;
  desktopHeight?: string;
};

export default function HeroSection({
  image,
  alt = "Explore destinations around the world",
  mobileHeight = "auto",
  tabletHeight = "380px",
  desktopHeight = "500px",
}: HeroSectionProps) {
  return (
    <section className="w-full overflow-hidden bg-white">
      <div
        className="relative w-full"
        style={{
          aspectRatio: "1912 / 768",
          minHeight: mobileHeight === "auto" ? undefined : mobileHeight,
        }}
      >
        <Image
          src={image}
          alt={alt}
          fill
          priority
          sizes="100vw"
          className="object-contain lg:object-cover"
        />

        {/* Responsive text overlay */}
        <div className="absolute inset-0">
          <div
            className="
              absolute
              left-[45.3%]
              top-[31%]
              w-[39%]
              sm:w-[38%]
              lg:w-[38%]
            "
          >
            <h1 className="font-light leading-[1.02] tracking-[-0.04em] text-[#153b3c]">
              <span className="block text-[clamp(9px,3.8vw,52px)]">
                Your Next
              </span>

              <span className="block whitespace-nowrap bg-gradient-to-r from-[#639c3c] to-[#075b4d] bg-clip-text text-[clamp(11px,4.5vw,64px)] font-extrabold text-transparent">
                Destination
              </span>

              <span className="block text-[clamp(9px,3.8vw,52px)]">
                Awaits
              </span>
            </h1>

            <p className="mt-[1.2%] whitespace-nowrap text-[clamp(6px,1.5vw,20px)] tracking-wide text-[#686d6d]">
              Book Flights. Explore the World.
            </p>

            <div className="mt-[2%] h-[3px] w-[13%] rounded-full bg-[#176b5b] sm:h-1" />
          </div>
        </div>
      </div>
    </section>
  );
}