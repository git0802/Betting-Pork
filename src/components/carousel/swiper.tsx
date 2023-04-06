/* eslint-disable @next/next/no-img-element */
import { useMemo, useRef, useState } from "react";
// import required modules
import { shimmer, toBase64 } from "@components/common/image";
import Link from "@components/ui/link";
import Skeleton from "@components/ui/skeleton";
import { useDevice } from "@contexts/device-context";
import { useGetGameRTP } from "@framework/game/get-game-rtp";
import { Game } from "@framework/types";
import { CookieKeys } from "@lib/constant";
import { CookieStorage } from "@lib/cookie";
import { theme_config } from "@themes/config";
import { saveSelectedGame } from "@utils/functionutil";
import cn from "classnames";
import { useTranslation } from "next-i18next";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/router";
import IconArcade from "public/icons/header/arcades.svg";
import IconCasino from "public/icons/header/casino.svg";
import IconPoker from "public/icons/header/poker.svg";
import IconRecentlyPlay from "public/icons/header/recentlyplay.svg";
import IconSlot from "public/icons/header/slot.svg";
import IconSports from "public/icons/header/sports.svg";
import IconTogel from "public/icons/header/togel.svg";
import SwiperCore, {
  Autoplay,
  Grid,
  Lazy,
  Navigation,
  Pagination,
  Virtual,
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useUI } from "../../contexts/ui-context";
import IconButtonNext from "/public/icons/arrowNext.svg";
import IconButtonPrev from "/public/icons/arrowPrev.svg";
// import { CardTogelV2 } from "@components/card/CardTogel";

const CardProvider = dynamic(
  () => import("@components/games/casino/CardProvider"),
  {
    loading: () => <></>,
  }
);

const CardTogelV2 = dynamic(
  () => import("@components/card/CardTogel").then((mod) => mod.CardTogelV2),
  {
    loading: () => <></>,
  }
);

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
  category?: string;
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
type gameType = {
  active: boolean;
  details: {};
  game_name: string;
  image: string;
  provider: string;
  provider_name: string;
  provider_game_id: string;
  type: string;
  type_name: string;
  updated_at: string;
  _id: string;
};

interface LiveCasinoProps {
  title: string;
  data: any;
  showTotal?: boolean;
  showRTP?: boolean;
  isLoading?: boolean;
  onSelect?: (item: object) => void;
  onSeeAll?: (id: string) => void;
}

const hasWindow = typeof window !== "undefined";

const maxCharacter = (text: string) => {
  if (text.length > 10) return `${text.slice(0, 10)}..`;
  else return text;
};

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

// Feature - Popular - Newest
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

  // const { data: dataRTP } = useGetGameRTP();
  // const handleRTP = useMemo(() => dataRTP, [dataRTP]);

  // const getRTPbyID = (id: string) => {
  //   const RTP = handleRTP?.filter((i: any) => i.game_id === id);
  //   return RTP?.[0]?.rtp;
  // };

  const device = useDevice();

  return (
    <section
      className={`w-full lg:w-[504px] xl:w-[913px] flex-1 pb-5 px-mobile md:px-0 mt-0`}
    >
      <div className="flex flex-col w-full md:flex-row md:space-x-2 md:items-center md:justify-between relative">
        {/* <IconChevronLeft
          className={`${!btnPrevNext.prev ? "hidden" : "hover:lg:block cursor-pointer"
            } absolute my-auto top-0 bottom-0 left-0 z-10 opacity-60 hover:opacity-100`}
          onClick={previous}
        /> */}
        {data?.length > 0 && (
          <div
            onClick={previous}
            className={`${
              !btnPrevNext.prev ? "hidden" : "btn_slider_custome"
            } w-[30px] md:w-[50px] h-[30px] md:h-[50px] rounded-full flex items-center justify-center absolute my-auto top-0 bottom-0 left-0 z-10 cursor-pointer`}
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
          // modules={[Virtual]}
          // virtual
          // scrollbar={{
          //   hide: true,
          // }}
          // modules={[Scrollbar]}
        >
          {data?.map((item: any, index: number) => (
            <SwiperSlide
              key={index}
              // virtualIndex={index}
              className={`${
                device.isMobileDevice ? "w-[165px]" : "w-[225px] "
              } relative hover:z-10 hover:-translate-y-[10px] transition duration-[200] mt-[10px]`}
            >
              <Link
                onClick={() => saveSelectedGame(item)}
                href={`/game/${item._id}?type=${item.type}&provider=${item.provider}`}
              >
                {/* {setCardGame(item, device, device.isMobileDevice)} */}
                <CardItemGames
                  name={item?.game_name ? item?.game_name : "unknown"}
                  image={item?.image}
                  provider={
                    item?.provider_name ? item?.provider_name : "unknown"
                  }
                  // height={`${
                  //   device.isMobileDevice ? "h-[124px]" : "h-[168px]"
                  // }`}
                  data={item}
                  showRTP={item?.type === "slot" ? true : false}
                  valueRTP={item?.type === "slot" ? item?.rtp : 0}
                  type="blur"
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
        {data?.length > 0 && (
          <>
            <div
              className={`${
                !btnPrevNext.next ? "hidden" : "hidden lg:block "
              } bg_blur_swiper_custome w-[161px] h-[220px] absolute top-0 bottom-0 right-0 z-[9] mt-[10px]`}
            ></div>
            <div
              onClick={next}
              className={`${
                !btnPrevNext.next ? "hidden" : "btn_slider_custome"
              } w-[30px] md:w-[50px] h-[30px] md:h-[50px] rounded-full flex items-center justify-center absolute my-auto top-0 bottom-0 right-0 z-10 cursor-pointer`}
            >
              <IconButtonNext className="w-7 h-7" />
            </div>
          </>
        )}
      </div>
    </section>
  );
}
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

  // const { data: dataRTP } = useGetGameRTP();
  // const handleRTP = useMemo(() => dataRTP, [dataRTP]);

  // const getRTPbyID = (id: string) => {
  //   const RTP = handleRTP?.filter((i: any) => i.game_id === id);
  //   return RTP?.[0]?.rtp;
  // };

  const device = useDevice();

  return (
    <section className={`w-full flex-1 h-full mt-0`}>
      {/* <div className="container mx-auto"> */}
      <div className="flex flex-col w-full py-5 md:flex-row md:space-x-2 md:items-center md:justify-between relative">
        {data?.length > 0 && (
          <div
            onClick={previous}
            className={`${
              !btnPrevNext.prev ? "hidden" : "btn_slider_custome"
            } rounded-full flex items-center justify-center absolute my-auto top-0 bottom-0 left-0 z-10 cursor-pointer`}
          >
            <IconButtonPrev className="w-7 h-7" />
          </div>
        )}
        <Swiper
          slidesPerView={1}
          spaceBetween={spaceBetween ? spaceBetween : 18}
          lazy={true}
          centeredSlides={false}
          className="mySwiper w-full relative"
          breakpoints={{
            320: {
              slidesPerView: 1,
            },
            678: {
              slidesPerView: 2,
            },
            1000: {
              slidesPerView: 3,
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
                onClick={() => saveSelectedGame(item)}
                href={`/game/${item._id}?type=${item.type}&provider=${item.provider}`}
              >
                {/* {setCardGame(item, device, device.isMobileDevice)} */}
                <CardItemGames
                  name={item?.game_name ? item?.game_name : "unknown"}
                  image={item?.image}
                  provider={
                    item?.provider_name ? item?.provider_name : "unknown"
                  }
                  // height={`${device.isMobileDevice ? "h-[124px]" : "h-[168px]"
                  //   }`}
                  data={item}
                  showRTP={item?.type === "slot" ? true : false}
                  valueRTP={item?.type === "slot" ? item?.rtp : 0}
                  type={type}
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
        {data?.length > 0 && (
          <>
            <div
              className={`${
                !btnPrevNext.next ? "hidden" : "hidden lg:block "
              } bg_blur_swiper_custome w-[161px] h-[168px] absolute top-0 bottom-0 right-0 z-[9] mt-[10px]`}
            ></div>
            <div
              onClick={next}
              className={`${
                !btnPrevNext.next ? "hidden" : "btn_slider_custome"
              } rounded-full flex items-center justify-center absolute my-auto top-0 bottom-0 right-0 z-10 cursor-pointer`}
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

export function CarouselSwiperBanner({
  page,
  data,
  category,
  spaceBetween,
}: Props) {
  const swiperRef = useRef<SwiperCore>();
  const { t } = useTranslation();
  const router = useRouter();
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

  const sliderSettings = {
    320: {
      slidesPerView: 1,
    },
    469: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
    1440: {
      slidesPerView: 3,
    },
  };

  const totalGames = data?.length;
  const device = useDevice();

  return (
    <section className="flex flex-col mt-5 lg:mt-10">
      <div className="relative group md:mb-[10px] lg:mb-0 ">
        {/* <IconChevronLeft
          className="hidden group-hover:md:block group-hover:transition group-hover:duration-300 group-hover:ease-in-out absolute my-auto top-0 bottom-0 left-0 xl:-left-[25px] z-10 cursor-pointer opacity-60 hover:opacity-100"
          onClick={previous}
        /> */}
        <div
          onClick={previous}
          className={`hidden group-hover:md:flex btn_slider_custome w-[30px] md:w-[50px] h-[30px] md:h-[50px] rounded-full items-center justify-center absolute my-auto top-0 bottom-0 left-0 z-10 cursor-pointer`}
        >
          <IconButtonPrev className="w-7 h-7" />
        </div>
        <Swiper
          slidesPerView={"auto"}
          spaceBetween={spaceBetween ? spaceBetween : 18}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          // lazy={false}
          loop
          modules={[Autoplay, Pagination]}
          breakpoints={sliderSettings}
          className="mySwiper relative"
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          pagination={device.isTabDevice ? true : false}
        >
          {data &&
            data?.map((item: any, index) => (
              <SwiperSlide
                key={index}
                className="hover:relative lg:hover:z-10 hover:lg:-translate-y-[10px] transition duration-[200] pt-[12px] pb-[21px] lg:pb-0"
              >
                <div
                  onClick={() => {
                    if (
                      item?.path !== null &&
                      item?.path !== "" &&
                      item?.path !== undefined
                    ) {
                      router.push(item?.path);
                    } else {
                      router.push({
                        pathname: "/info",
                        query: {
                          id: item._id,
                          category: category ? category : router.query.type,
                        },
                      });
                    }
                  }}
                  className="lg:pb-[6px] drop-shadow-image cursor-pointer"
                >
                  <Image
                    key={index}
                    alt={item?.url}
                    src={item?.url}
                    width={468}
                    height={267}
                    loading="lazy"
                    quality={100}
                    className="rounded-[10px] block"
                    layout="intrinsic"
                    objectFit="contain"
                    placeholder="blur"
                    blurDataURL={`data:image/svg+xml;base64,${toBase64(
                      shimmer(700, 475)
                    )}`}
                  />
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
        <div
          onClick={next}
          className={`hidden group-hover:md:flex btn_slider_custome w-[30px] md:w-[50px] h-[30px] md:h-[50px] rounded-full items-center justify-center absolute my-auto top-0 bottom-0 right-0 z-10 cursor-pointer`}
        >
          <IconButtonNext className="w-7 h-7" />
        </div>
        {/* <IconChevronRight
          onClick={next}
          className="hidden group-hover:md:block absolute my-auto top-0 bottom-0 right-0 xl:-right-[25px] z-10 cursor-pointer opacity-60 hover:opacity-100"
        /> */}
      </div>
    </section>
  );
}

export function CarouselSwiper({
  title,
  type,
  data,
  showTotal,
  showRTP,
  style,
  spaceBetween,
  px = false,
  titleStyle,
  showAllButton = true,
  isLoading,
  onSelect,
  onSeeAll,
  gameChangedCallback,
}: Props) {
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

  const handleSelectGame = (game: Game) => {
    if (gameChangedCallback) {
      gameChangedCallback();
    }
    const { _id, type, provider, image, game_name, provider_name } = game;
    const gameData = {
      _id,
      type,
      provider,
      image,
      game_name,
      provider_name,
    };
    CookieStorage.set(CookieKeys.SelectedGame, gameData);
    router.push(
      {
        pathname: "/game/" + _id,
        query: {
          type: type as string,
          provider: provider as string,
        },
      },
      undefined,
      { shallow: false }
    );
  };

  const device = useDevice();
  const { template } = useUI();
  const handleConfig = theme_config(template);

  return (
    <section className={cn("flex flex-col", { "px-mobile md:px-desktop": px })}>
      <div className="flex flex-row items-start justify-between w-full">
        <div className="flex flex-row gap-3 items-center justify-start">
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
            data?.length > 0 ? "flex" : "hidden"
          } flex-row items-center gap-prevnext-detail`}
        >
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
        {data?.length < 1 && !isLoading && (
          <label className="capitalize text-white/60">
            {t("common:text-no-data")}
          </label>
        )}
        <Swiper
          slidesPerView={"auto"}
          spaceBetween={spaceBetween ? spaceBetween : 18}
          lazy={true}
          className="mySwiper"
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
        >
          {isLoading &&
            [0, 1, 2, 3, 4, 5].map((item) => (
              <SwiperSlide key={item} className="w-[225px] h-[168px]">
                <Skeleton width="100%" height="100%" />
              </SwiperSlide>
            ))}
          {data?.length > 0 &&
            data?.map((item: any, index: number) => (
              <SwiperSlide
                key={index}
                className={`${
                  device.isMobileDevice ? "w-[165px]" : "w-[225px]"
                } hover:lg:-translate-y-[10px] transition will-change-transform duration-[200] mt-[10px]`}
              >
                <div
                  className="cursor-pointer"
                  onClick={() => handleSelectGame(item)}
                >
                  <CardItemGames
                    name={item?.game_name ? item?.game_name : "unknown"}
                    image={item?.image}
                    provider={
                      item?.provider_name ? item?.provider_name : "unknown"
                    }
                    showRTP={item?.type === "slot" ? true : false}
                    valueRTP={item?.type === "slot" ? item?.rtp : 0}
                    type={handleConfig?.card_item_game_type}
                  />
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </section>
  );
}

export function CarouselSwiperMobile({
  title,
  type,
  data,
  showTotal,
  showRTP,
  style,
  spaceBetween,
  px = false,
  titleStyle,
  showAllButton = true,
  isLoading,
  cardHeight,
  onSelect,
  onSeeAll,
  gameChangedCallback,
}: Props) {
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

  const handleSelectGame = (game: Game) => {
    if (gameChangedCallback) {
      gameChangedCallback();
    }
    const { _id, type, provider, image, game_name, provider_name } = game;
    const gameData = {
      _id,
      type,
      provider,
      image,
      game_name,
      provider_name,
    };
    CookieStorage.set(CookieKeys.SelectedGame, gameData);
    router.push(
      {
        pathname: "/game/" + _id,
        query: {
          type: type as string,
          provider: provider as string,
        },
      },
      undefined,
      { shallow: false }
    );
  };

  const device = useDevice();
  const { template } = useUI();
  const handleConfig = theme_config(template);

  return (
    <section className={cn("flex flex-col", { "px-mobile md:px-desktop": px })}>
      <div className="container mx-auto">
        <div className="flex flex-row items-start justify-between w-full">
          <div className="flex flex-row gap-3 items-center justify-start">
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
              data?.length > 0 ? "flex" : "hidden"
            } flex-row items-center gap-prevnext-detail`}
          >
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
          {data?.length < 1 && !isLoading && (
            <label className="capitalize text-white/60">
              {t("common:text-no-data")}
            </label>
          )}
          <Swiper
            slidesPerView={1}
            spaceBetween={spaceBetween ? spaceBetween : 18}
            lazy={true}
            className="mySwiper"
            breakpoints={{
              320: {
                slidesPerView: 2,
              },
              678: {
                slidesPerView: 3,
              },
              720: {
                slidesPerView: 4,
              },
            }}
            modules={[Virtual, Lazy]}
            virtual
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
          >
            {isLoading &&
              [0, 1, 2, 3, 4, 5].map((item) => (
                <SwiperSlide key={item} className="w-[225px] h-[168px]">
                  <Skeleton width="100%" height="100%" />
                </SwiperSlide>
              ))}
            {data?.length > 0 &&
              data?.map((item: any, index: number) => (
                <SwiperSlide
                  key={index}
                  virtualIndex={index}
                  className="mt-[10px]"
                >
                  <div
                    className="cursor-pointer"
                    onClick={() => handleSelectGame(item)}
                  >
                    <CardItemGames
                      name={item?.game_name ? item?.game_name : "unknown"}
                      image={item?.image}
                      provider={
                        item?.provider_name ? item?.provider_name : "unknown"
                      }
                      height={cardHeight}
                      showRTP={item?.type === "slot" ? true : false}
                      valueRTP={item?.type === "slot" ? item?.rtp : 0}
                      type={handleConfig?.card_item_game_type}
                    />
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}

export function CarouselSwiperWithBanner({
  title,
  type,
  data,
  isLoading,
  showTotal,
  showRTP,
  style,
  cardHeight,
  overlapBanner = false,
  bannerImage,
  onSelect,
  onSeeAll,
}: Props) {
  const swiperRef = useRef<SwiperCore>();
  const formatCurrency = new Intl.NumberFormat();
  const { t } = useTranslation();
  const [btnPrevNext, setBtnPrevNext] = useState({
    prev: false,
    next: true,
  });

  const { template } = useUI();

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

  const device = useDevice();

  return (
    <section className="flex flex-col px-mobile md:px-0">
      <div className="flex flex-row items-start justify-between w-full">
        <div className="flex flex-row gap-3 items-center justify-start">
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
            data?.length > 0 ? "flex" : "hidden"
          } flex-row items-center gap-prevnext-detail`}
        >
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
          <Link href={`/product/${type}`}>
            <button className={`bg_btn_see_all btn-see-all uppercase`}>
              {" "}
              {t("text-see-all")}
            </button>
          </Link>
        </div>
      </div>
      <div className="mt-[10px] flex flex-col space-x-0 md:flex-row space-y-4 md:space-y-0 md:space-x-[18px] justify-between">
        <Link
          href="/product/slot/rtp-live"
          className="relative mt-[10px] aspect-[468/206] min-w-[468px] flex items-end"
        >
          <>
            <Image
              alt=""
              src={`/images/theme/${template}/slot/banner_slider.png`}
              quality={100}
              sizes="100vw"
              loading="lazy"
              layout="fill"
              objectFit="contain"
              objectPosition="left top"
            />
            {overlapBanner ? (
              <div className="absolute bottom-0 h-[34px] flex items-center justify-center ml-4 mb-4 md:ml-6 md:mb-6">
                <button className="flex items-center w-full h-full text-sm font-bold text-inputColor-100 justify-center bg-white rounded px-8 py-3">
                  See All Games
                </button>
              </div>
            ) : (
              ""
            )}
          </>
        </Link>
        <Swiper
          slidesPerView={"auto"}
          spaceBetween={18}
          lazy={true}
          className="mySwiper"
          // breakpoints={sliderSettings}
          modules={[Lazy]}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
        >
          {!data &&
            [0, 1, 2, 3, 4, 5].map((item) => (
              <SwiperSlide key={item} className="w-[225px] h-[168px]">
                <Skeleton width="100%" height="100%" />
              </SwiperSlide>
            ))}
          {data?.map((item: any, index: number) => (
            <SwiperSlide key={index} className={`${cardHeight} animate-slider`}>
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
                  showRTP={item?.type === "slot" ? true : false}
                  valueRTP={item?.type === "slot" ? item?.rtp : 0}
                  height={cardHeight}
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export function CarouselSwiperWithBannerMobile({
  title,
  type,
  data,
  isLoading,
  showTotal,
  showRTP,
  style,
  cardHeight,
  overlapBanner = false,
  bannerImage,
  onSelect,
  onSeeAll,
}: Props) {
  const swiperRef = useRef<SwiperCore>();
  const formatCurrency = new Intl.NumberFormat();
  const { t } = useTranslation();
  const [btnPrevNext, setBtnPrevNext] = useState({
    prev: false,
    next: true,
  });
  const { template } = useUI();

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

  return (
    <section className="flex flex-col px-mobile">
      <div className="container mx-auto md:px-0">
        <div className="flex flex-row items-start justify-between w-full">
          <div className="flex flex-row gap-3 items-center justify-start">
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
              data?.length > 0 ? "flex" : "hidden"
            } flex-row items-center gap-prevnext-detail`}
          >
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
            <Link href={`/product/${type}`}>
              <button className={`bg_btn_see_all btn-see-all uppercase`}>
                {" "}
                {t("text-see-all")}
              </button>
            </Link>
          </div>
        </div>
        <div className="mt-[10px] flex flex-col space-x-0 space-y-4 justify-between">
          <Link
            href="/product/slot/rtp-live"
            className="relative mt-[10px] aspect-[468/206] w-full inline-flex items-end"
          >
            <>
              <Image
                alt=""
                src={`/images/theme/${template}/slot/banner_slider.png`}
                quality={100}
                loading="lazy"
                layout="fill"
                objectFit="contain"
                objectPosition="left"
              />
              {overlapBanner ? (
                <div className="absolute bottom-0 h-[34px] flex items-center justify-center ml-4 mb-4 md:ml-6 md:mb-6">
                  <button className="flex items-center w-full h-full text-sm font-bold text-inputColor-100 justify-center bg-white rounded px-8 py-3">
                    See All Games
                  </button>
                </div>
              ) : (
                ""
              )}
            </>
          </Link>
          <Swiper
            slidesPerView={1}
            spaceBetween={10}
            lazy={true}
            className="mySwiper"
            breakpoints={{
              320: {
                slidesPerView: 2,
              },
              678: {
                slidesPerView: 3,
              },
              720: {
                slidesPerView: 4,
              },
            }}
            modules={[Lazy, Virtual]}
            virtual
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
          >
            {data?.map((item: any, index: number) => (
              <SwiperSlide
                key={index}
                virtualIndex={index}
                className="animate-slider"
              >
                {!data || isLoading ? (
                  <Skeleton width="100%" height="100%" />
                ) : (
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
                      showRTP={item?.type === "slot" ? true : false}
                      valueRTP={item?.type === "slot" ? item?.rtp : 0}
                    />
                  </Link>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}

export function CarouselSwiperMultipleRowsWithBanner({
  title,
  type,
  data,
  isLoading,
  showTotal,
  showRTP,
  style,
  cardHeight,
  overlapBanner,
  spaceBetween,
  bannerImage,
  onSelect,
  onSeeAll,
}: Props) {
  const swiperRef = useRef<SwiperCore>();
  const formatCurrency = new Intl.NumberFormat();
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

  let totalGames = 0;
  if (data) {
    totalGames = data?.length;
  }

  const device = useDevice();

  return (
    <section className="flex flex-col px-mobile md:px-desktop">
      <div className="flex flex-row items-start justify-between w-full">
        <div className="flex flex-row gap-3 items-center justify-start">
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
            data?.length > 0 ? "flex" : "hidden"
          } flex-row items-center gap-prevnext-detail`}
        >
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
          <Link href={`/product/${type}`}>
            <button className={`bg_btn_see_all btn-see-all uppercase`}>
              {" "}
              {t("text-see-all")}
            </button>
          </Link>
        </div>
      </div>
      <div className="mt-6 flex flex-col space-x-0 lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 justify-between">
        <Link
          href="#"
          className="relative aspect-[468/206] w-full flex items-end"
        >
          <>
            <Image
              alt=""
              src={`${bannerImage ? bannerImage : "/images/banner1.png"} `}
              width={100}
              height={180}
              quality={100}
              loading="lazy"
              layout="fill"
              objectFit="contain"
              objectPosition="left"
            />
            {overlapBanner ? (
              <div className="absolute bottom-0 h-[34px] flex items-center justify-center ml-4 mb-4 md:ml-6 md:mb-6">
                <button className="flex items-center w-full h-full text-sm font-bold text-inputColor-100 justify-center bg-white rounded px-8 py-3">
                  See All Games
                </button>
              </div>
            ) : (
              ""
            )}
          </>
        </Link>
        <div className="slider-mobile-gap-title-card">
          <Swiper
            slidesPerView={"auto"}
            spaceBetween={spaceBetween ? spaceBetween : 18}
            grid={{
              rows: 2,
            }}
            lazy={true}
            className={`${overlapBanner ? "md:pt-5" : ""} mySwiper h-[310px]`}
            // breakpoints={sliderSettings}
            modules={[Lazy, Grid]}
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
          >
            {!data &&
              [0, 1, 2, 3].map((item) => (
                <SwiperSlide key={item} className="w-[165px] h-[124px]">
                  <Skeleton width="100%" height="100%" />
                </SwiperSlide>
              ))}
            {data?.map((item: any, index: number) => (
              <SwiperSlide key={index} className={`w-[165px] ${cardHeight}`}>
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
                    showRTP={item?.type === "slot" ? true : false}
                    valueRTP={item?.type === "slot" ? 70 : 0}
                    height={cardHeight}
                  />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}

export function CarouselSwiperMultipleRows({
  title,
  type,
  data,
  isLoading,
  showTotal,
  showRTP,
  style,
  spaceBetween,
  px = true,
  showAllButton = true,
  onSelect,
  onSeeAll,
}: Props) {
  const { t } = useTranslation();
  const swiperRef = useRef<SwiperCore>();
  const swiperRefMobile = useRef<SwiperCore>();
  const formatCurrency = new Intl.NumberFormat();
  const [btnPrevNext, setBtnPrevNext] = useState({
    prev: false,
    next: true,
  });

  const previous = () => {
    swiperRef?.current?.slidePrev();
    swiperRefMobile?.current?.slidePrev();
    setBtnPrevNext({
      prev: swiperRefMobile?.current?.isBeginning ? false : true,
      next: swiperRefMobile?.current?.isEnd ? false : true,
    });
  };
  const next = () => {
    swiperRef?.current?.slideNext();
    swiperRefMobile?.current?.slideNext();
    setBtnPrevNext({
      prev: swiperRefMobile?.current?.isBeginning ? false : true,
      next: swiperRefMobile?.current?.isEnd ? false : true,
    });
  };

  let totalGames = 0;
  if (data) {
    totalGames = data?.length;
  }

  const device = useDevice();

  return (
    <section className={cn("flex flex-col", { "px-mobile md:px-desktop": px })}>
      <div className="flex flex-row items-start justify-between w-full">
        <div className="flex flex-row gap-3 items-center justify-start">
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
            data.length > 0 ? "flex" : "hidden"
          } flex-row items-center gap-prevnext-detail`}
        >
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
        {data?.length < 1 && !isLoading && (
          <label className="capitalize text-white/60">
            {t("common:text-no-data")}
          </label>
        )}
        <Swiper
          slidesPerView={"auto"}
          spaceBetween={10}
          grid={{
            rows: 2,
          }}
          lazy={true}
          className={`mySwiper ${data?.length > 0 ? "h-[260px]" : ""}`}
          modules={[Lazy, Grid]}
          onBeforeInit={(swiper) => {
            swiperRefMobile.current = swiper;
          }}
        >
          {isLoading &&
            [0, 1, 2, 3].map((item) => (
              <SwiperSlide key={item} className="w-[165px] h-[124px]">
                <Skeleton width="100%" height="100%" />
              </SwiperSlide>
            ))}
          {data?.map((item: any, index: number) => (
            <SwiperSlide
              key={index}
              className={`${
                device.isMobileDevice
                  ? "w-[165px] h-[124px]"
                  : "w-[225px] h-[168px]"
              }`}
            >
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
                  height={`${
                    device.isMobileDevice ? "h-[124px]" : "h-[168px]"
                  }`}
                  showRTP={item?.type === "slot" ? true : false}
                  valueRTP={item?.type === "slot" ? 70 : 0}
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export function CarouselSwiperTogelV2({
  title,
  data,
  isLoading,
  showTotal,
  spaceBetween,
  slidesPerView,
}: Props) {
  const { t } = useTranslation();
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

  const device = useDevice();

  return (
    <section className={`flex flex-col px-[18px] lg:px-0`}>
      <div className="container mx-auto">
        <div className="flex flex-row items-start justify-between w-full">
          <div className="flex flex-row gap-3 items-center justify-start">
            {title && IconTypeGame(title?.toLowerCase())}
            <span className="carousel-title">{title}</span>
            <div
              className={`${showTotal ? "block" : "hidden"} carousel-subTitle`}
            >
              <Link href={`/result-togel`}>
                <span className="slider_label_total">
                  {formatCurrency.format(totalGames)}
                </span>
              </Link>
            </div>
          </div>
          <div
            className={`${
              data?.length > 0 ? "flex" : "hidden"
            } flex-row items-center gap-prevnext-detail`}
          >
            <div className="flex flex-row gap-prev-next">
              <button
                type="button"
                onClick={previous}
                className={`bg_btn_prev_carousel btn-prevNext-carousel btn_slider_prev`}
              >
                <IconButtonPrev className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={next}
                className={`bg_btn_prev_carousel btn-prevNext-carousel btn_slider_next`}
              >
                <IconButtonNext className="w-5 h-5" />
              </button>
            </div>
            <Link href={`/result-togel`}>
              <button className={`bg_btn_see_all btn-see-all uppercase`}>
                {" "}
                {t("text-see-all")}
              </button>
            </Link>
          </div>
        </div>
        <div className="slider-mobile-gap-title-card">
          {data?.length < 1 && !isLoading && (
            <label className="capitalize text-white/60">
              {t("common:text-no-data")}
            </label>
          )}
          <Swiper
            slidesPerView={"auto"}
            spaceBetween={spaceBetween ? spaceBetween : 18}
            lazy={true}
            className="mySwiper w-full"
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop
            modules={[Autoplay, Lazy, Pagination]}
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
          >
            {isLoading &&
              data &&
              [0, 1, 2, 3, 4, 5].map((item) => (
                <SwiperSlide key={item} className="w-[225px] h-[168px]">
                  <Skeleton width="100%" height="100%" />
                </SwiperSlide>
              ))}
            {data?.length > 0 &&
              data?.map((item: any, index: number) => (
                <SwiperSlide
                  key={index}
                  virtualIndex={index}
                  className={`${
                    device.isMobileDevice
                      ? "w-[263px] h-[350px]"
                      : "w-[346px] h-[401px]"
                  } pt-5`}
                >
                  <CardTogelV2 key={index} data={item} />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
export function CarouselSwiperTogelV2Mobile({
  title,
  data,
  isLoading,
  showTotal,
  spaceBetween,
  slidesPerView,
}: Props) {
  const { t } = useTranslation();
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

  const device = useDevice();

  return (
    <section className={`flex flex-col px-[18px] lg:px-0`}>
      <div className="container mx-auto">
        <div className="flex flex-row items-start justify-between w-full">
          <div className="flex flex-row gap-3 items-center justify-start">
            {title && IconTypeGame(title?.toLowerCase())}
            <span className="carousel-title">{title}</span>
            <div
              className={`${showTotal ? "block" : "hidden"} carousel-subTitle`}
            >
              <Link href={`/result-togel`}>
                <span className="slider_label_total">
                  {formatCurrency.format(totalGames)}
                </span>
              </Link>
            </div>
          </div>
          <div
            className={`${
              data?.length > 0 ? "flex" : "hidden"
            } flex-row items-center gap-prevnext-detail`}
          >
            <div className="flex flex-row gap-prev-next">
              <button
                type="button"
                onClick={previous}
                className={`bg_btn_prev_carousel btn-prevNext-carousel btn_slider_prev`}
              >
                <IconButtonPrev className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={next}
                className={`bg_btn_prev_carousel btn-prevNext-carousel btn_slider_next`}
              >
                <IconButtonNext className="w-5 h-5" />
              </button>
            </div>
            <Link href={`/result-togel`}>
              <button className={`bg_btn_see_all btn-see-all uppercase`}>
                {" "}
                {t("text-see-all")}
              </button>
            </Link>
          </div>
        </div>
        <div className="slider-mobile-gap-title-card">
          {data?.length < 1 && !isLoading && (
            <label className="capitalize text-white/60">
              {t("common:text-no-data")}
            </label>
          )}
          <Swiper
            slidesPerView={1}
            spaceBetween={spaceBetween ? spaceBetween : 18}
            breakpoints={{
              360: {
                slidesPerView: 1,
              },
              544: {
                slidesPerView: 2,
              },
            }}
            lazy={true}
            className="mySwiper w-full h-fit"
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            modules={[Lazy, Virtual, Autoplay]}
            virtual
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
          >
            {isLoading &&
              data &&
              [0, 1, 2, 3, 4, 5].map((item) => (
                <SwiperSlide key={item} className="w-[225px] h-[168px]">
                  <Skeleton width="100%" height="100%" />
                </SwiperSlide>
              ))}
            {data?.length > 0 &&
              data?.map((item: any, index: number) => (
                <SwiperSlide
                  key={index}
                  virtualIndex={index}
                  className="h-[350px] pt-5"
                >
                  <CardTogelV2 key={index} data={item} />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}

export function CarouselSwiperLiveCasino({
  title,
  data,
  showTotal,
  isLoading,
  onSelect,
  onSeeAll,
}: LiveCasinoProps) {
  const { t } = useTranslation();
  const swiperRef = useRef<SwiperCore>();
  const formatCurrency = new Intl.NumberFormat();
  const [btnPrevNext, setBtnPrevNext] = useState({
    prev: false,
    next: true,
  });

  const sliderSettings = {
    1280: {
      slidesPerView: 6,
    },
    1440: {
      slidesPerView: 6,
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

  let totalGames: number = 0;
  if (data) {
    totalGames = data?.length;
  }

  return (
    <section className="flex flex-col">
      <div className="flex flex-row items-start justify-between w-full">
        <div className="flex flex-row gap-3 items-center justify-start">
          {title && IconTypeGame("casino")}
          <span className="carousel-title">{title}</span>
          <div
            className={`${showTotal ? "block" : "hidden"} carousel-subTitle`}
          >
            <Link href={`/product/casino`}>
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
          <Link href={`/product/casino`}>
            <button className={`bg_btn_see_all btn-see-all uppercase`}>
              {" "}
              {t("text-see-all")}
            </button>
          </Link>
        </div>
      </div>
      <div className="slider-mobile-gap-title-card">
        {!data && !isLoading && (
          <label className="capitalize text-white/60">
            {t("common:text-no-data")}
          </label>
        )}
        <Swiper
          slidesPerView={"auto"}
          spaceBetween={18}
          lazy={true}
          className="mySwiper relative"
          // breakpoints={sliderSettings}
          // modules={[Lazy]}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
        >
          {isLoading &&
            data &&
            [0, 1, 2, 3, 4, 5].map((item) => (
              <SwiperSlide key={item} className="w-[225px] h-[260px]">
                <Skeleton width="100%" height="100%" />
              </SwiperSlide>
            ))}
          {data?.map((item: any, index: number) => (
            <SwiperSlide key={index} className="w-[225px] h-[266px] mt-[10px]">
              <CardProvider name={item.provider} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
export function CarouselSwiperLiveCasinoMobile({
  title,
  data,
  showTotal,
  isLoading,
  onSelect,
  onSeeAll,
}: LiveCasinoProps) {
  const { t } = useTranslation();
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

  let totalGames: number = 0;
  if (data) {
    totalGames = data?.length;
  }

  return (
    <section className="flex flex-col px-[18px] lg:px-0">
      <div className="container mx-auto">
        <div className="flex flex-row items-start justify-between w-full">
          <div className="flex flex-row gap-3 items-center justify-start">
            {title && IconTypeGame("casino")}
            <span className="carousel-title">{title}</span>
            <div
              className={`${showTotal ? "block" : "hidden"} carousel-subTitle`}
            >
              <Link href={`/product/casino`}>
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
            <Link href={`/product/casino`}>
              <button className={`bg_btn_see_all btn-see-all uppercase`}>
                {" "}
                {t("text-see-all")}
              </button>
            </Link>
          </div>
        </div>
        <div className="slider-mobile-gap-title-card">
          {!data && !isLoading && (
            <label className="capitalize text-white/60">
              {t("common:text-no-data")}
            </label>
          )}
          <Swiper
            slidesPerView={1}
            spaceBetween={10}
            lazy={true}
            className="mySwiper relative"
            modules={[Virtual, Lazy]}
            virtual
            breakpoints={{
              320: {
                slidesPerView: 2,
              },
              678: {
                slidesPerView: 3,
              },
              720: {
                slidesPerView: 4,
              },
            }}
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
          >
            {isLoading &&
              data &&
              [0, 1, 2, 3, 4, 5].map((item) => (
                <SwiperSlide key={item} className="w-[225px] h-[260px]">
                  <Skeleton width="100%" height="100%" />
                </SwiperSlide>
              ))}
            {data?.map((item: any, index: number) => (
              <SwiperSlide
                key={index}
                virtualIndex={index}
                className="mt-[10px]"
              >
                <CardProvider name={item.provider} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}

export function CarouselLiveCasinoMultipleRows({
  title,
  type,
  data,
  isLoading,
  showTotal,
  showRTP,
  style,
  spaceBetween,
  onSelect,
  onSeeAll,
}: Props) {
  const { t } = useTranslation();
  const swiperRef = useRef<SwiperCore>();
  const swiperRefMobile = useRef<SwiperCore>();
  const formatCurrency = new Intl.NumberFormat();
  const [btnPrevNext, setBtnPrevNext] = useState({
    prev: false,
    next: true,
  });

  const previous = () => {
    swiperRef?.current?.slidePrev();
    swiperRefMobile?.current?.slidePrev();
    setBtnPrevNext({
      prev: swiperRefMobile?.current?.isBeginning ? false : true,
      next: swiperRefMobile?.current?.isEnd ? false : true,
    });
  };
  const next = () => {
    swiperRef?.current?.slideNext();
    swiperRefMobile?.current?.slideNext();
    setBtnPrevNext({
      prev: swiperRefMobile?.current?.isBeginning ? false : true,
      next: swiperRefMobile?.current?.isEnd ? false : true,
    });
  };

  let totalGames = 0;
  if (data) {
    totalGames = data?.length;
  }

  return (
    <section className="flex flex-col px-mobile md:px-desktop">
      <div className="flex flex-row items-start justify-between w-full">
        <div className="flex flex-row flex-wrap gap-3 items-center justify-start">
          {title && IconTypeGame("casino")}
          <span className="carousel-title">{title}</span>
          <div
            className={`${showTotal ? "block" : "hidden"} carousel-subTitle`}
          >
            <Link href={`/product/casino`}>
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
          <Link href={`/product/casino`}>
            <button className={`bg_btn_see_all btn-see-all uppercase`}>
              {" "}
              {t("text-see-all")}
            </button>
          </Link>
        </div>
      </div>
      <div className="slider-mobile-gap-title-card">
        {!data && !isLoading && (
          <label className="capitalize text-white/60">
            {t("common:text-no-data")}
          </label>
        )}
        <Swiper
          slidesPerView={"auto"}
          spaceBetween={10}
          grid={{
            rows: 2,
          }}
          lazy={true}
          className={`mySwiper ${data ? "h-[405px]" : ""} `}
          modules={[Lazy, Grid]}
          onBeforeInit={(swiper) => {
            swiperRefMobile.current = swiper;
          }}
        >
          {isLoading &&
            data &&
            [0, 1, 2, 3].map((item) => (
              <SwiperSlide key={item} className="w-[165px] h-[196px]">
                <Skeleton width="100%" height="100%" />
              </SwiperSlide>
            ))}
          {data?.map((item: any, index: number) => (
            <SwiperSlide key={index} className={`w-[165px] h-[196px]`}>
              <CardProvider name={item.provider} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
