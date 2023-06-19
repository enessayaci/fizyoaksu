
import SwiperCore, { Navigation, Pagination, EffectCoverflow } from "swiper";

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';


export default function Slider () {
  SwiperCore.use([Navigation, Pagination, EffectCoverflow]);
  return (
    <Swiper
    navigation
    className="fza-slider-container"
    effect="coverflow"
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: false
        }}
        initialSlide = {2}
        slidesPerView={2}
        centeredSlides
        style={{ height: "500px", maxWidth:"1000px" }}
    >
      <SwiperSlide>
        <div className='d-flex flex-column position-relative rounded overflow-hidden' style={{height:"500px"}}>
          <img className="w-100 h-100" style={{objectFit: "cover", objectPosition: "center"}} src="/images/evde-fizik-tedavi.webp"></img>
          <div className="position-absolute d-flex w-100 h-100 justify-content-center align-items-center">
            <h2 className="position-absolute">Evde Fizik Tedavi</h2>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className='d-flex flex-column' style={{height:"500px"}}>
          <img className="w-100" style={{objectFit: "contain", objectPosition: "top"}} src="/images/evde-fizik-tedavi.webp"></img>
          <h2>Evde Fizik Tedavi</h2>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className='d-flex flex-column' style={{height:"500px"}}>
          <img className="w-100" style={{objectFit: "contain", objectPosition: "top"}} src="/images/evde-fizik-tedavi.webp"></img>
          <h2>Evde Fizik Tedavi</h2>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className='d-flex flex-column' style={{height:"500px"}}>
          <img className="w-100" style={{objectFit: "contain", objectPosition: "top"}} src="/images/evde-fizik-tedavi.webp"></img>
          <h2>Evde Fizik Tedavi</h2>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};
