/* eslint-disable @next/next/no-img-element */
import { useRef, useState } from "react";
// import required modules
import { shimmer, toBase64 } from "@components/common/image";
import Skeleton from "@components/ui/skeleton";
import { useDevice } from "@contexts/device-context";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { useRouter } from "next/router";
import SwiperCore, { Autoplay, Navigation, Pagination, Virtual } from "swiper";
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
  onSelect?: (item: object) => void;
  onSeeAll?: (id: string) => void;
  gameChangedCallback?: () => void;
}

export function SwiperBannerKS({ page, data, spaceBetween, isLoading }: Props) {
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

  const device = useDevice();

  return (
    <section className="flex flex-col mt-0 pt-[27px] pb-[35px] lg:py-[50px]">
      <div className="relative group md:mb-[10px] lg:mb-0 ">
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
          loop
          lazy={false}
          centeredSlides={true}
          modules={[Autoplay, Pagination]}
          className="mySwiper relative w-full xl:w-[1092px]"
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          pagination={device.isTabDevice ? true : false}
        >
          {isLoading &&
            [0, 1, 2].map((item) => (
              <SwiperSlide
                key={item}
                className={`w-[277px] h-[325px] lg:w-[352px] lg:h-[395px]`}
              >
                <Skeleton width="100%" height="100%" />
              </SwiperSlide>
            ))}
          {data?.length > 0 &&
            data?.map((item: any, index) => (
              <SwiperSlide
                key={index}
                virtualIndex={index}
                className={`${
                  device.isMobileDevice
                    ? "w-[277px] h-[325px]"
                    : "w-[352px] h-[395px]"
                } hover:relative lg:hover:z-10 hover:lg:-translate-y-[10px] transition duration-[200] pt-[12px] pb-[21px] lg:pb-0`}
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
                        },
                      });
                    }
                  }}
                  className="lg:pb-[6px] drop-shadow-image cursor-pointer relative"
                >
                  <Image
                    alt={item?.url}
                    src={item?.url}
                    width={device.isTabDevice ? 277 : 352}
                    height={device.isTabDevice ? 292 : 362}
                    sizes="(max-width:768px) 277w 292h , (min-width:769px) 352w 362h"
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
      </div>
    </section>
  );
}

export function SwiperBannerKSMobile({
  page,
  data,
  spaceBetween,
  isLoading,
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

  const device = useDevice();

  return (
    <section className="flex flex-col mt-0 pt-[27px] pb-[35px] lg:py-[50px]">
      <div className="relative group md:mb-[10px] lg:mb-0 ">
        <div
          onClick={previous}
          className={`hidden group-hover:md:flex btn_slider_custome w-[30px] md:w-[50px] h-[30px] md:h-[50px] rounded-full items-center justify-center absolute my-auto top-0 bottom-0 left-0 z-10 cursor-pointer`}
        >
          <IconButtonPrev className="w-7 h-7" />
        </div>
        <Swiper
          slidesPerView={1}
          spaceBetween={spaceBetween ? spaceBetween : 18}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop
          lazy={false}
          centeredSlides={true}
          centeredSlidesBounds={true}
          // modules={[Virtual, Autoplay, Pagination]}
          modules={[Virtual]}
          virtual
          className="mySwiper relative"
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          pagination={device.isTabDevice ? true : false}
          breakpoints={{
            320: {
              slidesPerView: 1,
            },
            360: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
          }}
        >
          {data?.map((item, index) => (
            <SwiperSlide
              key={index}
              virtualIndex={index}
              // className={`${device.isMobileDevice ? "w-[277px] h-[325px]" : "w-[352px] h-[395px]"} hover:relative lg:hover:z-10 hover:lg:-translate-y-[10px] transition duration-[200] pt-[12px] pb-[21px] lg:pb-0`}
              className={`${
                device.isMobileDevice ? "h-[325px]" : "h-[395px]"
              } hover:relative lg:hover:z-10 hover:lg:-translate-y-[10px] transition duration-[200] pt-[12px] pb-[21px] lg:pb-0`}
            >
              <div
                onClick={() => {
                  router.push(
                    page === "home" ? "/promo" : `/promo?category=${page}`
                  );
                }}
                className="lg:pb-[6px] drop-shadow-image cursor-pointer relative"
              >
                {isLoading && <Skeleton width="100%" height="100%" />}
                {!isLoading && (
                  <Image
                    alt={item?.url}
                    src={item?.url}
                    width={device.isTabDevice ? 277 : 352}
                    height={device.isTabDevice ? 292 : 362}
                    sizes="(max-width:768px) 277w 292h , (min-width:769px) 352w 362h"
                    quality={100}
                    className="rounded-[10px] block mx-auto"
                    layout="intrinsic"
                    objectFit="contain"
                    placeholder="blur"
                    blurDataURL={`data:image/svg+xml;base64,${toBase64(
                      shimmer(700, 475)
                    )}`}
                  />
                )}
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
      </div>
    </section>
  );
}
