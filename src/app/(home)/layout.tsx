import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import React from "react";
import Image from "next/image";

const HomeLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Carousel className="w-full max-w-full" opts={{ loop: true }}>
        <CarouselContent>
          <CarouselItem>
            <Image src="/img/carousel/1.jpg" alt="carousel-1" width={1920} height={320} />
          </CarouselItem>
          <CarouselItem>
            <Image src="/img/carousel/1.jpg" alt="carousel-1" width={1920} height={320} />
          </CarouselItem>
          <CarouselItem>
            <Image src="/img/carousel/1.jpg" alt="carousel-1" width={1920} height={320} />
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      {children}
    </>
  );
};

export default HomeLayout;
