import style from "./slider.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Link } from "react-router-dom";

const Slider = ({ images }) => {
  return (
    <div className={style.slider}>
      <Swiper
        pagination={{
          type: "fraction",
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {images?.map((image, index) => (
          <SwiperSlide className={style.swiper_slide} key={index}>
            <Link to={image?.url} target="_blank">
              <img
                src={image?.url}
                alt=""
                className={style.swipper_slide_img}
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
