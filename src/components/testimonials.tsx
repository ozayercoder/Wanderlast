"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { playfair } from "@/lib/fonts";

const testimonials = [
  {
    quote:
      '"The Bali Trip Was Absolutely Magical! Every Detail Was Perfectly Planned. The Resorts Were Luxurious And The Cultural Experiences Were Unforgettable."',
    name: "Michael Chen",
    location: "Singapore",
    photo: "/images/person2.png",
  },
  {
    quote:
      '"Swiss Alps Adventure Exceeded All Expectations. The Mountain Views Were Breathtaking And Our Guide Was Incredibly Knowledgeable. Highly Recommend!"',
    name: "Sarah Johnson",
    location: "New York, USA",
    photo: "/images/person1.png",
  },
  {
    quote:
      '"Rome Was Everything We Hoped For And More. The Skip-The-Line Access To The Colosseum And The Evening Food Tour Were Highlights We Will Never Forget."',
    name: "David Okafor",
    location: "London, UK",
    photo: "/images/person2.png",
  },
  {
    quote:
      '"Santorini At Sunset Was Pure Magic! Our Private Catamaran Cruise And The Cave House Stay Made This The Most Relaxing Vacation We Have Ever Had."',
    name: "Amelia Torres",
    location: "Sydney, Australia",
    photo: "/images/person1.png",
  },
];

export function Testimonials() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-[1256px] px-6">
        <Carousel opts={{ align: "start", loop: true }} className="w-full">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className={`${playfair.className} text-4xl font-medium md:text-5xl`}>
                What Travelers Say
              </h2>
              <p className="mt-2 text-sm text-muted-foreground md:text-base">
                Real experiences from our happy travelers
              </p>
            </div>
            <div className="flex items-center gap-3">
              <CarouselPrevious
                className="static size-10 text-muted-foreground"
                size="icon"
              />
              <CarouselNext
                className="static size-10 text-muted-foreground"
                size="icon"
              />
            </div>
          </div>

          <CarouselContent className="mt-8">
            {testimonials.map((testimonial) => (
              <CarouselItem key={testimonial.name} className="lg:basis-1/2">
                <div className="flex flex-col gap-5 bg-white p-5 shadow-xs sm:h-[248px] sm:flex-row">
                  <div className="flex flex-1 flex-col">
                    <blockquote
                      className={`${playfair.className} text-[17px] leading-[1.55] text-foreground`}
                    >
                      {testimonial.quote}
                    </blockquote>
                    <div className="mt-auto">
                      <p className="text-sm font-medium text-brand">
                        — {testimonial.name}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {testimonial.location}
                      </p>
                    </div>
                  </div>
                  <Image
                    src={testimonial.photo}
                    alt={testimonial.name}
                    width={218}
                    height={264}
                    className="aspect-[218/264] w-full shrink-0 rounded-sm object-cover sm:h-[208px] sm:w-[168px]"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
