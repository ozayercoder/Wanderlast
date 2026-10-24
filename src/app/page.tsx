import { Hero } from "@/components/hero";
import { WhyChooseUs } from "@/components/why-choose-us";
import { Testimonials } from "@/components/testimonials";
import { Cta } from "@/components/cta";

export default function Home() {
  return (
    <>
      <Hero />
      <WhyChooseUs />
      <Testimonials />
      <Cta />
    </>
  );
}
