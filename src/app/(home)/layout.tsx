import React from "react";
import Image from "next/image";
import { Carousel } from "antd";
const HomeLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Carousel autoplay>
        <div>
          <Image src="/img/carousel/1.jpg" alt="carousel-1" width={1920} height={320} />
        </div>
        <div>
          <Image src="/img/carousel/1.jpg" alt="carousel-1" width={1920} height={320} />
        </div>
        <div>
          <Image src="/img/carousel/1.jpg" alt="carousel-1" width={1920} height={320} />
        </div>
        <div>
          <Image src="/img/carousel/1.jpg" alt="carousel-1" width={1920} height={320} />
        </div>
      </Carousel>
      {children}
    </>
  );
};

export default HomeLayout;
