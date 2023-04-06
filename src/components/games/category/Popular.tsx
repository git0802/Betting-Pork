/* eslint-disable @next/next/no-img-element */
import { CarouselSwiperCustomMobile } from "@components/carousel/1";
import { CarouselSwiperCustom } from "@components/carousel/swiper";
import Button from "@components/ui/button";
import { useDevice } from "@contexts/device-context";
import { useUI } from "@contexts/ui-context";
import { useGamesPopularSlider } from "@framework/game/get-gamelist-featured";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { useRouter } from "next/router";
interface Props {
  type: number;
}

const Popular = ({ type }: Props) => {
  const { t } = useTranslation();
  const router = useRouter();
  const {
    query: { tabRecommend },
  } = router;

  const { isLoading, data } = useGamesPopularSlider({
    limit: 10,
  });

  const device = useDevice();
  const { template } = useUI();

  return (
    <div className="flex flex-col lg:flex-row w-full">
      <div
        className={`relative bg-no-repeat flex flex-col items-start justify-start mt-[27px] md:mt-[29px] md:w-[520px] text-white`}
      >
        <div className="hidden lg:block absolute z-[1] -top-[50px] lg:-top-[228px] right-0 lg:-right-[240px]">
          <Image
            alt=""
            width={device.isMobileDevice ? 317 : 500}
            height={device.isMobileDevice ? 317 : 500}
            quality={100}
            src={`/images/theme/${template}/bg-popular-game-1.png`}
            objectFit="contain"
            objectPosition="left"
          />
        </div>
        <div
          className={`absolute lg:hidden z-[1] w-2/3 aspect-square -top-[50px] md:-top-[100px] right-0 md:-right-[100px] bg-contain bg-no-repeat bg-bottom bg-[url('/images/theme/${template}/bg-featured-game-1.png')]`}
        >
          {""}
        </div>
        <div className="relative z-[2]">
          <h1 className="text-[32px] md:text-[44px] leading-[32px] md:leading-[44px] font-light uppercase max-w-[189px] md:max-w-[350px]">
            {t("common:text-popular-games-header")}
          </h1>
          <h5 className="text-sm font-normal md:text-base mt-[7px] md:mt-3 max-w-[260px] md:max-w-[300px] normal-case">
            {t("common:text-popular-sub-header")}
          </h5>
          <Button
            type="submit"
            className="flex flex-row w-fit h-11 font-extrabold text-sm px-5 rounded-md text-[#07243A] bg-white hover:bg-[#e3e3e3] active:translate-y-[2px] animate-transationNormal mt-7 md:mt-[34px] uppercase"
            onClick={() => {
              router.push({
                pathname: "/gamelist",
                query: {
                  tab: type,
                },
              });
            }}
          >
            {t("common:text-see-all")}
          </Button>
        </div>
      </div>
      <div className="mt-[34px] md:mt-[29px] flex-1">
        {!device.isMobileDevice ? (
          <CarouselSwiperCustom title="popular" data={data?.data} />
        ) : (
          <CarouselSwiperCustomMobile
            title="popular"
            data={data?.data}
            type="blur"
            cardHeight="h-[124px]"
          />
        )}
      </div>
    </div>
  );
};

export default Popular;
