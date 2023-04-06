/* eslint-disable @next/next/no-img-element */
import Link from "@components/ui/link";
import Skeleton from "@components/ui/skeleton";
import { useUI } from "@contexts/ui-context";
import cn from "classnames";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import IconPoker from "public/icons/header/poker.svg";
import IconSports from "public/icons/header/sports.svg";
import { useRef, useState } from "react";
import SwiperCore from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import CardBanner from "../slider/CardBanner";
import IconButtonNext from "/public/icons/arrowNext.svg";
import IconButtonPrev from "/public/icons/arrowPrev.svg";

const IconTypeGame = (name: string) => {
  switch (name) {
    case "sports":
      return <IconSports className="w-[20px] h-[20px] text-white/80" />;
    case "poker":
      return <IconPoker className="w-[20px] h-[20px] text-white/80" />;
    default:
      break;
  }
};
interface Props {
  title: string;
  type?: string;
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
  showAllButton?: boolean;
  isLoading?: boolean;
  hideButtonPrevNext?: boolean;
  onSelect?: (item: object) => void;
  onSeeAll?: (id: string) => void;
  gameChangedCallback?: () => void;
}

const SliderMobile = ({
  title,
  type,
  data,
  isLoading,
  showTotal,
  spaceBetween,
  px = true,
  showAllButton = true,
  gameChangedCallback,
  hideButtonPrevNext = true,
}: Props) => {
  const { t } = useTranslation();
  const router = useRouter();
  const swiperRef = useRef<SwiperCore>();
  const formatCurrency = new Intl.NumberFormat();
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

  let totalGames = 0;
  if (data) {
    totalGames = data?.length;
  }

  const { template } = useUI();

  return (
    <section className={cn("flex flex-col", { "px-mobile md:px-desktop": px })}>
      <div className="flex flex-row justify-between w-full">
        <div className="flex flex-row space-x-3 items-center">
          {title && IconTypeGame(title?.toLowerCase())}
          <span className="carousel-title">{title}</span>
          <div
            className={`${showTotal ? "block" : "hidden"} carousel-subTitle`}
          >
            <Link href={`/product/${type}`}>
              <span className="slider_label_total">
                {formatCurrency.format(totalGames)}
              </span>
            </Link>
          </div>
        </div>
        <div
          className={`${
            data ? "flex" : "hidden"
          } flex-row items-center gap-prevnext-detail`}
        >
          {hideButtonPrevNext && (
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
                  !btnPrevNext.next
                    ? "btn-prev-carousel-disable bg_btn_prev_carousel_disable"
                    : "btn-prevNext-carousel bg_btn_prev_carousel"
                } btn_slider_next`}
              >
                <IconButtonNext className={`w-5 h-5 `} />
              </button>
            </div>
          )}
          {showAllButton && (
            <Link href={`/product/${type}`}>
              <button className={`bg_btn_see_all btn-see-all uppercase`}>
                {" "}
                {t("text-see-all")}
              </button>
            </Link>
          )}
        </div>
      </div>
      <div className="slider-mobile-gap-title-card">
        {!data && (
          <label className="capitalize text-whiteDefault-100/60">
            {t("common:text-no-data")}
          </label>
        )}
        <Swiper
          slidesPerView={"auto"}
          spaceBetween={10}
          lazy={true}
          className="mySwiper"
          // breakpoints={sliderSettings}
          // modules={[Lazy]}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
        >
          {isLoading &&
            [0, 1, 2, 3, 4, 5].map((item) => (
              <SwiperSlide key={item} className="w-[165px] h-[124px]">
                <Skeleton width="100%" height="100%" />
              </SwiperSlide>
            ))}
          {data?.map((item: any, index: number) => (
            <SwiperSlide key={index} className="w-[340px] h-[189px]">
              <CardBanner
                type="poker"
                provider={item?.provider}
                image={`/images/theme/${template}/${type}/banner-slider-${item?.provider}.png`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default SliderMobile;
