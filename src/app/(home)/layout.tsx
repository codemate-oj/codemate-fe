import React from "react";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

// this is a server action example
// (any async func running on server can be called 'server action')
async function getCarousel() {
  // this is a simple data mock, which will be replaced with real API end points in future
  return [
    { imageSrc: "/img/carousel/1.jpg", title: "carousel-1", width: 1920, height: 320 },
    { imageSrc: "/img/carousel/2.jpg", title: "carousel-2", width: 1920, height: 320 },
  ];
}

const HomeLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const carouselData = await getCarousel();

  return (
    <>
      <Carousel autoPlay className="w-full max-w-full" opts={{ loop: true }}>
        <CarouselContent>
          {carouselData.map((d) => (
            <CarouselItem key={d.title}>
              <Image src={d.imageSrc} alt={d.title} width={d.width} height={d.height} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className="m-auto max-w-screen-lg">{children}</div>
    </>
  );
};

export default HomeLayout;
