/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from "react";
// import required modules
import CardItemGames from "@components/ui/card-item-games-rtp";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import SwiperCore, { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

SwiperCore.use([Navigation]);

interface Props {
  title: string;
  data: object[];
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
}

const Index = ({
  title,
  data,
  showTotal,
  showRTP,
  style,
  spaceBetween,
  px = true,
  titleStyle,
}: Props) => {
  const router = useRouter();
  const swiperRef = useRef<SwiperCore>();
  const formatCurrency = new Intl.NumberFormat();
  const [btnPrev, setBtnPrev] = useState(false);
  const [btnNext, setBtnNext] = useState(true);
  const { t } = useTranslation();
  const sliderSettings = {
    320: {
      slidesPerView: 2,
    },
    360: {
      slidesPerView: 2,
    },
    375: {
      slidesPerView: 2,
    },
    390: {
      slidesPerView: 2,
    },
    576: {
      slidesPerView: 3,
    },
    768: {
      slidesPerView: 4,
    },
    1024: {
      slidesPerView: 6,
    },
    1180: {
      slidesPerView: 4,
    },
    1440: {
      slidesPerView: 6,
    },
  };

  const previous = () => {
    swiperRef?.current?.slidePrev();
  };
  const next = () => {
    swiperRef?.current?.slideNext();
  };

  let totalGames = 0;
  if (data) {
    totalGames = data?.length;
  }

  useEffect(() => {
    if (swiperRef?.current?.isBeginning) {
      setBtnPrev(true);
    } else {
      setBtnPrev(false);
    }
    if (swiperRef?.current?.isEnd) {
      setBtnNext(true);
    } else {
      setBtnNext(false);
    }
  }, [swiperRef]);

  return (
    <section className="flex flex-col px-mobile md:px-desktop">
      <div className="flex flex-row justify-between w-full">
        <div className="flex flex-row space-x-3">
          <span className="carousel-title">{title}</span>
          <div
            className={`${showTotal ? "block" : "hidden"} carousel-subTitle`}
          >
            <span className="bg-[rgba(255,255,255,0.1)] text-white text-base font-extrabold px-[10px] py-[6px] rounded">
              {formatCurrency.format(totalGames)}
            </span>
          </div>
        </div>
        <div className="flex flex-row items-center space-x-4">
          <div className="flex flex-row space-x-2">
            <button
              type="button"
              onClick={previous}
              className={`btn-prevNext-carousel ${btnPrev ? "" : "hidden"}`}
            >
              <FaAngleLeft />
            </button>
            <button
              type="button"
              onClick={next}
              className={`btn-prevNext-carousel ${
                swiperRef?.current?.allowSlideNext ? "disable" : ""
              }`}
            >
              <FaAngleRight />
            </button>
          </div>
          <button className="btn-see-all uppercase">{t("text-see-all")}</button>
        </div>
      </div>
      <div className="mt-6">
        <Swiper
          slidesPerView={"auto"}
          spaceBetween={spaceBetween ? spaceBetween : 20}
          lazy={true}
          className="mySwiper"
          breakpoints={sliderSettings}
          // modules={[Lazy]}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
        >
          {data?.map((item: any, index: number) => (
            <SwiperSlide key={index}>
              <CardItemGames
                name={item?.game_name}
                image={item?.image}
                provider={item?.provider}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Index;
