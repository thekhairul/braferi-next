import { useEffect, useState } from "react";
import ReactImageMagnify from "react-image-magnify";
import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation, Thumbs } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

function ProductGallery({ images, goToImgId }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [swiperRef, setSwiperRef] = useState(null);

  useEffect(() => {
    if (!goToImgId) return;
    const slideIndex = images.findIndex(image => image.id === goToImgId);
    swiperRef.slideTo(slideIndex);
  }, [goToImgId]);

  return (
    <div>
      <Swiper onSwiper={setSwiperRef} spaceBetween={10} thumbs={{ swiper: thumbsSwiper }} modules={[Thumbs]} className="product-gallery mb-2">
        {images.map((image) => (
          <SwiperSlide key={image.id}>
            <ReactImageMagnify
              {...{
                smallImage: {
                  alt: "Wristwatch by Ted Baker London",
                  isFluidWidth: true,
                  src: image.url
                },
                largeImage: {
                  src: image.url,
                  width: 1200,
                  height: 1200
                },
                enlargedImagePosition: 'over',
                enlargedImageClassName: 'max-w-none object-cover',
                className: 'rounded-3xl overflow-hidden'
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        navigation
        spaceBetween={10}
        slidesPerView={4}
        modules={[Navigation, Thumbs]}
        className="product-gallery-nav"
      >
        {images.map((image) => (
          <SwiperSlide key={image.id}>
            <img src={image.url} alt="" className="rounded-xl" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default ProductGallery;
