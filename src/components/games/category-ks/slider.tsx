/* eslint-disable @next/next/no-img-element */
import { useRef, useState } from "react";
// import required modules
import CardItemGames from "@components/ui/card-item-games-transform-rtp";
import Link from "@components/ui/link";
import { saveSelectedGame } from "@utils/functionutil";
import { useTranslation } from "next-i18next";
import SwiperCore, { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import IconButtonNext from "/public/icons/arrowNext.svg";
import IconButtonPrev from "/public/icons/arrowPrev.svg";

SwiperCore.use([Navigation]);
interface Props {
  page?: string;
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
  card_type?: "v1" | "v2" | "transform";
  onSelect?: (item: object) => void;
  onSeeAll?: (id: string) => void;
  gameChangedCallback?: () => void;
}

export function CarouselSwiperCustom({
  title,
  type,
  data,
  contStyle,
  showTotal,
  showRTP,
  style,
  spaceBetween,
  onSelect,
  onSeeAll,
  card_type = "v1",
}: Props) {
  const swiperRef = useRef<SwiperCore>();
  const { t } = useTranslation();
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

  return (
    <section
      className={`w-full py-[10px] lg:py-0 lg:pb-5 px-mobile lg:px-0 mt-0`}
    >
      <div className="w-full flex flex-col lg:flex-row lg:space-x-2 lg:items-center lg:justify-between relative">
        {data?.length > 0 && (
          <div
            onClick={previous}
            className={`${
              !btnPrevNext.prev ? "hidden" : "btn_slider_custome"
            } rounded-full flex items-center justify-center absolute my-auto top-0 bottom-0 -left-[3px] lg:left-0 z-10 cursor-pointer`}
          >
            <IconButtonPrev className="w-7 h-7" />
          </div>
        )}
        <Swiper
          slidesPerView={"auto"}
          spaceBetween={spaceBetween ? spaceBetween : 18}
          lazy={true}
          className="mySwiper w-full relative"
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
        >
          {data?.map((item: any, index: number) => (
            <SwiperSlide
              key={index}
              className={`w-[300px] h-[150px] lg:w-[420px] lg:h-[208px] rounded-md relative hover:z-10 hover:-translate-y-[10px] transition duration-[200] my-[10px]`}
            >
              <div>
                <Link
                  onClick={() => saveSelectedGame(item)}
                  href={`/game/${item._id}?type=${item.type}&provider=${item.provider}`}
                >
                  <CardItemGames
                    name={item?.game_name ? item?.game_name : "unknown"}
                    image={item?.image}
                    provider={
                      item?.provider_name ? item?.provider_name : "unknown"
                    }
                    data={item}
                    showRTP={item?.type === "slot" ? true : false}
                    valueRTP={item?.type === "slot" ? item?.rtp : 0}
                  />
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        {data?.length > 0 && (
          <div
            onClick={next}
            className={`${
              !btnPrevNext.next ? "hidden" : "btn_slider_custome"
            } rounded-full flex items-center justify-center absolute my-auto top-0 bottom-0 -right-[3px] lg:-right-[22px] z-10 cursor-pointer`}
          >
            <IconButtonNext className="w-7 h-7" />
          </div>
        )}
      </div>
    </section>
  );
}
