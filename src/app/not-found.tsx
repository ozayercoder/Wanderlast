import Link from "next/link";
import { Home } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { playfair } from "@/lib/fonts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-20 text-center">
      <p
        className={`${playfair.className} text-7xl font-medium text-muted-foreground/40 sm:text-8xl`}
      >
        404
      </p>
      <h1 className="mt-4 text-2xl font-semibold sm:text-3xl">
        Page not found
      </h1>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground sm:text-base">
        Sorry, the page you are looking for doesn&apos;t exist or has been
        moved.
      </p>
      <Link href="/" className={`${buttonVariants()} mt-8 h-10 px-5`}>
        <Home />
        Back to Home
      </Link>
    </div>
  );
}
