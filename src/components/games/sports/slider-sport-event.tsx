import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  Grid,
  Lazy,
  Navigation,
  Scrollbar,
  Autoplay,
} from "swiper";
import CardSportEvent from "./card-sport-event";
import IconSportEvent from "public/icons/header/sportevent.svg";
import IconButtonPrev from "/public/icons/arrowPrev.svg";
import IconButtonNext from "/public/icons/arrowNext.svg";

SwiperCore.use([Navigation]);

interface Props {
  title?: string;
  type?: string;
  data: object[] | string[];
  sliderSettings?: [];
  contStyle?: string;
  showTotal?: boolean;
  showRTP?: boolean;
  overlapBanner?: boolean;
  bannerImage?: string;
  style?: string;
  spaceBetween?: number;
  px?: boolean;
  titleStyle?: string;
  showAllButton?: boolean;
  isLoading?: boolean;
  onSelect?: (item: object) => void;
  onSeeAll?: (id: string) => void;
  gameChangedCallback?: () => void;
}

const SliderSportEvent = ({ title, data, isLoading }: Props) => {
  const router = useRouter();
  const swiperRef = useRef<SwiperCore>();
  const [btnPrevNext, setBtnPrevNext] = useState({
    prev: false,
    next: true,
  });
  const previous = () => {
    swiperRef?.current?.slidePrev();
    setBtnPrevNext({
      prev: swiperRef?.current?.isBeginning ? false : true,
      next: swiperRef?.current?.isEnd ? false : true,
    });
  };
  const next = () => {
    swiperRef?.current?.slideNext();
    setBtnPrevNext({
      prev: swiperRef?.current?.isBeginning ? false : true,
      next: swiperRef?.current?.isEnd ? false : true,
    });
  };

  const sliderSettings = {
    320: {
      slidesPerView: 1,
    },
    360: {
      slidesPerView: 1,
    },
    375: {
      slidesPerView: 1,
    },
    390: {
      slidesPerView: 1,
    },
    576: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 3,
    },
    1024: {
      slidesPerView: 4,
    },
    1180: {
      slidesPerView: 5,
    },
    1440: {
      slidesPerView: 5,
    },
  };

  return (
    <section className="">
      <div className="flex flex-row space-x-4 justify-between">
        <h5 className="mb-4 carousel-title">
          <IconSportEvent className="w-[20px] h-[20px] text-white/80" />
          {title}
        </h5>
        <div className="flex flex-row gap-prev-next">
          <button
            type="button"
            onClick={previous}
            className={`${!btnPrevNext.prev
                ? "btn-prev-carousel-disable bg_btn_prev_carousel_disable"
                : "btn-prevNext-carousel bg_btn_prev_carousel"
              } btn_slider_prev`}
          >
            <IconButtonPrev className={`w-5 h-5`} />
          </button>
          <button
            type="button"
            onClick={next}
            className={`${!btnPrevNext.next
                ? "btn-prev-carousel-disable bg_btn_prev_carousel_disable"
                : "btn-prevNext-carousel bg_btn_prev_carousel"
              } btn_slider_next`}
          >
            <IconButtonNext className={`w-5 h-5 `} />
          </button>
        </div>
      </div>
      {isLoading && (
        <div className="text-whiteDefault-50 text-center w-full flex items-center">
          Loading...
        </div>
      )}
      <Swiper
        spaceBetween={18}
        lazy={true}
        modules={[Lazy]}
        breakpoints={sliderSettings}
        className="mySwiper relative"
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        {data &&
          data.map((item, index) => {
            return (
              <SwiperSlide key={index} className="relative">
                <CardSportEvent data={item} />
              </SwiperSlide>
            );
          })}
      </Swiper>
    </section>
  );
};

export default SliderSportEvent;
