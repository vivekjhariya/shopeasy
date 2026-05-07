"use client";

import AutoPlay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import Image from "next/image";
import { cn } from "@/lib/utils";
import SearchBar from "../SearchBar";
import { useState } from "react";
import Link from "next/link";

type HeroSliderProps = {
  autoPlay?: boolean;
  loop?: boolean;
  heroImages: { bgImg: string }[];
  content?: {
    contentClass?: string;
    title: string;
    searchBar?: boolean;
    titleClass?: string;
  };
};

const BASE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

const ClientImage = ({ src, alt, className }: { src: string; alt: string; className?: string }) => {
  const [error, setError] = useState(false);
  if (error) return <div className={cn("bg-gradient-to-br from-orange-100 to-amber-50 dark:from-gray-800 dark:to-gray-900", className)} />;
  return (
    <Image height={600} width={1000} src={src} alt={alt} className={className} onError={() => setError(true)} />
  );
};

const HeroSlider = ({ heroImages, loop = true, autoPlay = true, content }: HeroSliderProps) => {
  return heroImages.length === 1 ? (
    <div className="bg-center bg-cover aspect-[1015/402] max-h-[650px] p-0 w-full relative overflow-hidden">
      <ClientImage
        src={heroImages[0].bgImg.startsWith('http') ? heroImages[0].bgImg : `${BASE_URL}${heroImages[0].bgImg}`}
        alt="hero"
        className="w-full h-full object-cover scale-105 hover:scale-100 transition-transform duration-700"
      />
      {/* gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
      {content && (
        <div className={cn("absolute top-0 left-0 w-full h-full flex justify-center items-center flex-col gap-4 px-default", content.contentClass)}>
          <h1 className={cn("text-3xl font-bold md:text-4xl lg:text-5xl text-center text-white drop-shadow-lg animate-fadeInUp", content.titleClass)}>
            {content.title}
          </h1>
          {content.searchBar && <SearchBar />}
        </div>
      )}
    </div>
  ) : (
    <div className="w-full relative">
      <Carousel
        plugins={autoPlay ? [AutoPlay({ delay: 4500 })] : undefined}
        opts={{ loop }}
      >
        <CarouselContent>
          {heroImages.map((hero, index) => (
            <CarouselItem key={index} className="bg-center bg-cover aspect-[1015/402] max-h-[650px] p-0 w-full relative overflow-hidden">
              <ClientImage
                src={hero.bgImg.startsWith('http') ? hero.bgImg : `${BASE_URL}${hero.bgImg}`}
                alt={`hero-${index + 1}`}
                className="w-full h-full object-cover"
              />
              {/* gradient overlay on each slide */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-3 bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/40 hover:text-white" />
        <CarouselNext className="right-3 bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/40 hover:text-white" />
      </Carousel>

      {/* Hero overlay CTA */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-4 z-10 px-4">
        <Link href="/shops" className="btn-primary-gradient text-sm md:text-base shadow-xl">
          Shop Now →
        </Link>
        <Link href="/deals" className="bg-white/20 backdrop-blur-sm text-white border border-white/40 font-semibold px-5 py-2.5 rounded-lg hover:bg-white/30 transition-all duration-300 text-sm md:text-base">
          View Deals
        </Link>
      </div>
    </div>
  );
};

export default HeroSlider;
