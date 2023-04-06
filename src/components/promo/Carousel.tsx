import { useTranslation } from "next-i18next";
import { useRef, useState } from "react";
import SwiperCore from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Item from "./Item";
import IconButtonPrev from "/public/icons/arrowPrev.svg";
import IconButtonNext from "/public/icons/arrowNext.svg";
import Link from "next/link";
import { useRouter } from "next/router";
import IconSemua from "public/icons/header/all.svg";
import IconSlot from "public/icons/header/slot.svg";
import IconSports from "public/icons/header/sports.svg";
import IconCasino from "public/icons/header/casino.svg";
import IconArcade from "public/icons/header/arcades.svg";
import IconPoker from "public/icons/header/poker.svg";
import IconTogel from "public/icons/header/togel.svg";
import IconMember from "public/icons/header/member.svg";
import IconEvent from "public/icons/header/event.svg";
import IconDeposit from "public/icons/header/deposit.svg";
import { useDevice } from "@contexts/device-context";

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
  onSelect?: (item: object) => void;
  onSeeAll?: (id: string) => void;
}

const typeIcon = (name: string, device: string) => {
  switch (name) {
    case "slot":
      return (
        <IconSlot
          className={`${device === "mobile" ? "w-[28px] h-[28px]" : "w-5 h-5"}`}
        />
      );
    case "casino":
      return (
        <IconCasino
          className={`${device === "mobile" ? "w-[28px] h-[28px]" : "w-5 h-5"}`}
        />
      );
    case "sports":
      return (
        <IconSports
          className={`${device === "mobile" ? "w-[28px] h-[28px]" : "w-5 h-5"}`}
        />
      );
    case "arcade":
      return (
        <IconArcade
          className={`${device === "mobile" ? "w-[28px] h-[28px]" : "w-5 h-5"}`}
        />
      );
    case "poker":
      return (
        <IconPoker
          className={`${device === "mobile" ? "w-[28px] h-[28px]" : "w-5 h-5"}`}
        />
      );
    case "togel":
      return (
        <IconTogel
          className={`${device === "mobile" ? "w-[28px] h-[28px]" : "w-5 h-5"}`}
        />
      );
    case "member":
      return (
        <IconMember
          className={`${device === "mobile" ? "w-[28px] h-[28px]" : "w-5 h-5"}`}
        />
      );
    case "event":
      return (
        <IconEvent
          className={`${device === "mobile" ? "w-[28px] h-[28px]" : "w-5 h-5"}`}
        />
      );
    case "deposit":
      return (
        <IconDeposit
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

  const totalGames = data.length;

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
            <Link href={router.asPath + "?category=" + title.toLowerCase()}>
              <span className="slider_label_total cursor-pointer">
                {formatCurrency.format(totalGames)}
              </span>
            </Link>
          </div>
        </div>
        <div className="flex flex-row items-center gap-prevnext-detail">
          <div className="flex flex-row gap-prev-next">
            <button
              type="button"
              onClick={previous}
              className={`${!btnPrevNext.prev
                ? "btn-prev-carousel-disable bg_btn_prev_carousel_disable"
                : "btn-prevNext-carousel bg_btn_prev_carousel"
                } btn_slider_prev`}
            >
              <IconButtonPrev
                className={`w-5 h-5`}
              />
            </button>
            <button
              type="button"
              onClick={next}
              className={`${!btnPrevNext.next
                ? "btn-prev-carousel-disable bg_btn_prev_carousel_disable"
                : "btn-prevNext-carousel bg_btn_prev_carousel"
                } btn_slider_next`}
            >
              <IconButtonNext
                className={`w-5 h-5 `}
              />
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
