import { useEffect, useState } from "react";
import ReactImageMagnify from "react-image-magnify";
import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation, Thumbs } from "swiper";
import StyledGallery from "./styles/galleryStyle";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

function ProductGallery({ images, goToImgId }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [swiperRef, setSwiperRef] = useState(null);

  useEffect(() => {
    if (!goToImgId) return;
    const slideIndex = images.findIndex((image) => image.id === goToImgId);
    swiperRef.slideTo(slideIndex);
  }, [goToImgId]);

  return (
    <StyledGallery>
      <Swiper onSwiper={setSwiperRef} spaceBetween={10} thumbs={{ swiper: thumbsSwiper }} modules={[Thumbs]}>
        {images.map((image) => (
          <SwiperSlide key={image.id}>
            <ReactImageMagnify
              {...{
                smallImage: {
                  alt: image.alt,
                  isFluidWidth: true,
                  src: image.url,
                },
                largeImage: {
                  src: image.url,
                  width: 600,
                  height: 600,
                },
                enlargedImagePosition: "over",
                enlargedImageClassName: "max-w-none object-cover",
                className: "overflow-hidden",
                imageClassName: "product-img",
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        navigation
        spaceBetween={0}
        slidesPerView={4}
        modules={[Navigation, Thumbs]}
        className="product-gallery-nav"
      >
        {images.map((image) => (
          <SwiperSlide key={image.id}>
            <img src={image.url} alt="" />
          </SwiperSlide>
        ))}
      </Swiper>
    </StyledGallery>
  );
}

export default ProductGallery;
