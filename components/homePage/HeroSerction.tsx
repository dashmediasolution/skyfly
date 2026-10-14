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
  desktopHeight = "500px",
}: HeroSectionProps) {
  return (
    <section className="relative w-full overflow-hidden bg-[#eaf5f7]">
      {/* Mobile and Tablet: Natural Image Height */}
      <div className="relative w-full lg:hidden">
        <Image
          src={image}
          alt={alt}
          width={1920}
          height={800}
          priority
          sizes="100vw"
          className="block h-auto w-full object-contain"
        />
      </div>

      {/* Desktop: Fixed Hero Height */}
      <div
        className="relative hidden w-full lg:block"
        style={{ height: desktopHeight }}
      >
        <Image
          src={image}
          alt={alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>
    </section>
  );
}
 