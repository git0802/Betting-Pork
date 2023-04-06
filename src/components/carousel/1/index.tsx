import Skeleton from "@components/ui/skeleton";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useRef, useState } from "react";
import SwiperCore, { Navigation, Virtual } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import IconArcade from "public/icons/header/arcades.svg";
import IconCasino from "public/icons/header/casino.svg";
import IconPoker from "public/icons/header/poker.svg";
import IconRecentlyPlay from "public/icons/header/recentlyplay.svg";
import IconSlot from "public/icons/header/slot.svg";
import IconSports from "public/icons/header/sports.svg";
import IconTogel from "public/icons/header/togel.svg";
import IconButtonNext from "/public/icons/arrowNext.svg";
import IconButtonPrev from "/public/icons/arrowPrev.svg";
import { saveSelectedGame } from "@utils/functionutil";
import dynamic from "next/dynamic";

const CardItemGames = dynamic(
  () => import("@components/ui/card-item-games-rtp"),
  {
    loading: () => <></>,
  }
);

SwiperCore.use([Navigation]);
interface Props {
  page?: string | string[] | undefined;
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
  cardHeight?: string;
  spaceBetween?: number;
  px?: boolean;
  titleStyle?: string;
  showAllButton?: boolean;
  isLoading?: boolean;
  card_type?: "v1" | "v2" | "transform";
  slidesPerView?: number | "auto" | undefined;
  onSelect?: (item: object) => void;
  onSeeAll?: (id: string) => void;
  gameChangedCallback?: () => void;
}

const IconTypeGame = (name: string) => {
  switch (name) {
    case "recently played":
      return <IconRecentlyPlay className="w-[20px] h-[20px] text-white/80" />;
    case "baru dimainkan":
      return <IconRecentlyPlay className="w-[20px] h-[20px] text-white/80" />;
    case "slot":
      return <IconSlot className="w-[20px] h-[20px] text-white/80" />;
    case "casino":
      return <IconCasino className="w-[20px] h-[20px] text-white/80" />;
    case "sports":
      return <IconSports className="w-[20px] h-[20px] text-white/80" />;
    case "arcade":
      return <IconArcade className="w-[20px] h-[20px] text-white/80" />;
    case "arcades":
      return <IconArcade className="w-[20px] h-[20px] text-white/80" />;
    case "poker":
      return <IconPoker className="w-[20px] h-[20px] text-white/80" />;
    case "togel":
      return <IconTogel className="w-[20px] h-[20px] text-white/80" />;

    default:
      break;
  }
};

export function CarouselSwiperCustomMobile({
  title,
  type,
  data,
  contStyle,
  showTotal,
  showRTP,
  style,
  spaceBetween,
  isLoading,
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
    <section className={`w-full lg:w-[504px] xl:w-[913px] flex-1 h-full mt-0`}>
      {/* <div className="container mx-auto"> */}
      <div className="flex flex-col w-full md:flex-row md:space-x-2 md:items-center md:justify-between relative">
        {data?.length > 0 && (
          <div
            onClick={previous}
            className={`${
              !btnPrevNext.prev ? "hidden" : "btn_slider_custome"
            } h-[30px] w-[30px] rounded-full flex items-center justify-center absolute my-auto top-0 bottom-0 left-0 z-10 cursor-pointer`}
          >
            <IconButtonPrev className="w-7 h-7" />
          </div>
        )}
        <Swiper
          slidesPerView={2}
          spaceBetween={10}
          lazy={true}
          className="mySwiper w-full relative"
          breakpoints={{
            320: {
              slidesPerView: 2,
            },
            480: {
              slidesPerView: 3,
            },
            720: {
              slidesPerView: 4,
            },
          }}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          modules={[Virtual]}
          virtual
        >
          {isLoading &&
            [0, 1, 2].map((item) => (
              <SwiperSlide key={item} virtualIndex={item}>
                <Skeleton width="100%" height="100%" />
              </SwiperSlide>
            ))}
          {data?.map((item: any, index: number) => (
            <SwiperSlide key={index} virtualIndex={index}>
              <Link
                href={`/game/${item._id}?type=${item.type}&provider=${item.provider}`}
              >
                {/* {setCardGame(item, device, device.isMobileDevice)} */}
                <div onClick={() => saveSelectedGame(item)}>
                  <CardItemGames
                    name={item?.game_name ? item?.game_name : "unknown"}
                    image={item?.image}
                    provider={
                      item?.provider_name ? item?.provider_name : "unknown"
                    }
                    showRTP={item?.type === "slot" ? true : false}
                    valueRTP={item?.type === "slot" ? item?.rtp : 0}
                    // height="h-[124px]"
                    data={item}
                    type={type}
                  />
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
        {data?.length > 0 && (
          <>
            <div
              onClick={next}
              className={`${
                !btnPrevNext.next ? "hidden" : "btn_slider_custome"
              } h-[30px] w-[30px] rounded-full flex items-center justify-center absolute my-auto top-0 bottom-0 right-0 z-10 cursor-pointer`}
            >
              <IconButtonNext className="w-7 h-7" />
            </div>
          </>
        )}
      </div>
      {/* </div> */}
    </section>
  );
}
