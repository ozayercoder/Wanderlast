import Image from "next/image";
import { playfair } from "@/lib/fonts";

const features = [
  {
    icon: "/images/ShieldCheck.png",
    title: "Safe & Secure",
    description:
      "Your safety is our priority with comprehensive travel insurance and 24/7 support.",
  },
  {
    icon: "/images/MapTrifold.png",
    title: "Expert Guides",
    description:
      "Local experts who bring destinations to life with authentic cultural insights.",
  },
  {
    icon: "/images/Headset.png",
    title: "24/7 Support",
    description:
      "Round-the-clock customer service to assist you wherever your journey takes you.",
  },
];

export function WhyChooseUs() {
  return (
    <section id="why-choose" className="bg-brand/15 px-6 py-16">
      <div className="mx-auto max-w-314">
        <div className="text-center">
          <h2 className={`${playfair.className} text-4xl font-medium md:text-5xl`}>
            Why Choose Wanderlast
          </h2>
          <p className="mt-2 text-sm text-muted-foreground md:text-base">
            Your trusted partner for exceptional travel experiences
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title} className="bg-white p-6">
              <Image
                src={feature.icon}
                alt=""
                width={48}
                height={48}
                className="h-8 w-8"
              />
              <h3 className={`${playfair.className} mt-5 text-2xl font-medium`}>
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
