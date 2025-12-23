import { Carousel } from "@material-tailwind/react";
import { Carosalcard } from "./Carosalcard";

export function GalleryWithCarousel() {
  return (
    <Carousel
      loop={true}
      autoplay={true}
      className="rounded-xl overflow-hidden h-[100vh]">
      <div className="relative h-full w-full">
        <img
          src="https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg"
          alt="image 1"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute top-[50%] left-[10%] md:left-[40%] lg:left-[70%] z-10">
          <Carosalcard />
        </div>
      </div>
      <div className="relative h-full w-full">
        <img
          src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg"
          alt="image 2"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute top-[50%] left-[10%] md:left-[40%] lg:left-[70%] z-10">
          <Carosalcard />
        </div>
      </div>
      <div className="relative h-full w-full">
        <img
          src="https://images.pexels.com/photos/842571/pexels-photo-842571.jpeg"
          alt="image 3"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute top-[50%] left-[10%] md:left-[40%] lg:left-[70%] z-10">
          <Carosalcard />
        </div>
      </div>
      <div className="relative h-full w-full">
        <img
          src="https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg"
          alt="image 4"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute top-[50%] left-[10%] md:left-[40%] lg:left-[70%] z-10">
          <Carosalcard />
        </div>
      </div>
      <div className="relative h-full w-full">
        <img
          src="https://images.pexels.com/photos/8143758/pexels-photo-8143758.jpeg"
          alt="image 5"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute top-[50%] left-[10%] md:left-[40%] lg:left-[70%] z-10">
          <Carosalcard />
        </div>
      </div>
      <div className="relative h-full w-full">
        <img
          src="https://images.pexels.com/photos/20109558/pexels-photo-20109558.jpeg"
          alt="image 6"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute top-[50%] left-[10%] md:left-[40%] lg:left-[70%] z-10">
          <Carosalcard />
        </div>
      </div>
    </Carousel>
  );
}
