import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { playfair } from "@/lib/fonts";

export function Cta() {
  return (
    <section className="relative flex min-h-[380px] items-center justify-center px-6 sm:min-h-[440px]">
      <Image
        src="/images/CTA.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/25" />
      <div className="absolute inset-0 [background:radial-gradient(ellipse_at_center,transparent_25%,rgba(0,0,0,0.7)_100%)]" />

      <div className="relative flex flex-col items-center py-16 text-center sm:py-24">
        <h2 className={`${playfair.className} text-4xl font-medium text-white md:text-5xl`}>
          Ready To Start Your Journey?
        </h2>
        <p className="mt-4 max-w-xl text-sm text-white sm:text-base">
          Join thousands of travelers who have discovered the world with us
        </p>
        <Link
          href="#"
          className="mt-9 inline-flex h-12 items-center gap-2.5 rounded-sm bg-white px-7 text-sm font-semibold tracking-wide text-neutral-900 uppercase hover:bg-white/90"
        >
          Book Your Trip Today
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </section>
  );
}
