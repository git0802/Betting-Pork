import { useDevice } from "@contexts/device-context";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useRouter } from "next/router";
import IconRecentlyPlay from "public/icons/header/recentlyplay.svg";
import { useRef, useState } from "react";
import SwiperCore from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Item from "./Item";
import IconButtonNext from "/public/icons/arrowNext.svg";
import IconButtonPrev from "/public/icons/arrowPrev.svg";
import HistoryTabs from "/public/icons/header/history.svg";

interface Props {
  title: string;
  data: object[];
  sliderSettings?: [];
  showTotal?: boolean;
  spaceBetween?: number;
  onSelect?: (item: object) => void;
  onSeeAll?: (id: string) => void;
}

const typeIcon = (name: string, device: string) => {
  switch (name) {
    case "ongoing":
      return (
        <IconRecentlyPlay
          className={`${device === "mobile" ? "w-[28px] h-[28px]" : "w-5 h-5"}`}
        />
      );
    case "drawing":
      return (
        <IconRecentlyPlay
          className={`${device === "mobile" ? "w-[28px] h-[28px]" : "w-5 h-5"}`}
        />
      );
    case "completed":
      return (
        <HistoryTabs
          className={`${device === "mobile" ? "w-[28px] h-[28px]" : "w-5 h-5"}`}
        />
      );
    default:
      break;
  }
};

export function Carousel({
  title,
  data,
  showTotal,
  onSelect,
  onSeeAll,
}: Props) {
  const { t } = useTranslation("common");
  const router = useRouter();
  const swiperRef = useRef<SwiperCore>();
  const formatCurrency = new Intl.NumberFormat();

  const device = useDevice();

  const [btnPrevNext, setBtnPrevNext] = useState({
    prev: false,
    next: true,
  });

  const sliderSettings = {
    576: {
      slidesPerView: 3,
    },
    768: {
      slidesPerView: 3,
    },
    1024: {
      slidesPerView: 3,
    },
    1440: {
      slidesPerView: 3,
    },
  };

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

  const totalGames = data?.length;

  return (
    <section className="flex flex-col mt-0 mb-6">
      <div className="flex flex-row items-center justify-between w-full">
        <div className="flex flex-row items-center space-x-3">
          <span className="carousel-title">
            {typeIcon(title, "desktop")}
            {title}
          </span>
          <div
            className={`${showTotal ? "block" : "hidden"} carousel-subTitle`}
          >
              <span className="slider_label_total cursor-default">
                {formatCurrency.format(totalGames)}
              </span>
          </div>
        </div>
        <div className="flex flex-row items-center gap-prevnext-detail">
          <div className="flex flex-row gap-prev-next">
            <button
              type="button"
              onClick={previous}
              className={`${
                !btnPrevNext.prev
                  ? "btn-prev-carousel-disable bg_btn_prev_carousel_disable"
                  : "btn-prevNext-carousel bg_btn_prev_carousel"
              } btn_slider_prev`}
            >
              <IconButtonPrev className={`w-5 h-5`} />
            </button>
            <button
              type="button"
              onClick={next}
              className={`${
                !btnPrevNext.next || totalGames <= 3
                  ? "btn-prev-carousel-disable bg_btn_prev_carousel_disable"
                  : "btn-prevNext-carousel bg_btn_prev_carousel"
              } btn_slider_next`}
            >
              <IconButtonNext className={`w-5 h-5 `} />
            </button>
          </div>
          <button
            className={`bg_btn_see_all btn-see-all uppercase`}
            onClick={() => (onSeeAll ? onSeeAll(title.toLowerCase()) : {})}
          >
            {" "}
            {t("text-see-all")}
          </button>
        </div>
      </div>
      <div className="mt-4">
        <Swiper
          slidesPerView={"auto"}
          spaceBetween={20}
          lazy={true}
          className="mySwiper"
          breakpoints={sliderSettings}
          // modules={[Lazy]}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
        >
          {data?.slice(0, 5)?.map((item: any, index: number) => (
            <SwiperSlide
              key={index}
              className={device.isMobileDevice ? "w-[300px]" : ""}
            >
              <Item
                name={item?.name}
                banner={item?.banner}
                onSelect={() => (onSelect ? onSelect(item) : {})}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default Carousel;
