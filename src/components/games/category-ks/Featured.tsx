/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import React from "react";
import { CarouselSwiperCustom } from "./slider";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { useGamesFeaturedSlider } from "@framework/game/get-gamelist-featured";
import Button from "@components/ui/button";
import { useDevice } from "@contexts/device-context";
import { CarouselSwiperCustomMobile } from "@components/carousel/swiper";

interface Props {
  type: number;
}

const Featured = ({ type }: Props) => {
  const { t } = useTranslation();
  const router = useRouter();

  const { data } = useGamesFeaturedSlider({
    limit: 10,
  });

  const device = useDevice();
  const captionFeatured = t("common:text-featured-games-header").split(" ");

  return (
    <div className="featured_panel_container">
      <div
        className={`featured_cont_desc relative`}
      >
        <Image
          alt=""
          src="/images/theme/4/woman_mobile.png"
          layout="fill"
          quality={100}
          priority
          objectFit="cover"
          objectPosition="left top"
          className="md:hidden"
        />

        {/* desktop */}
        <div className="hidden lg:flex flex-col justify-end lg:-skew-x-[12deg] relative z-[2]">
          <h1 className="caption_featured_games font-bold max-w-[189px] lg:max-w-[350px] break-words">
            <span>{captionFeatured[0]}</span>
            <span>{captionFeatured[1]}</span>
          </h1>
          <Button
            type="submit"
            className="btn_featured_detail -skew-x-[12deg] lg:-skew-x-[0deg]"
            onClick={() => {
              router.push({
                pathname: "/gamelist",
                query: {
                  tab: type,
                },
              });
            }}
          >
            <span className="skew-x-[12deg] drop-shadow-sm">{t("common:text-see-all")}</span>
          </Button>
        </div>

        {/* mobile */}
        <div className="container_caption_featured_games">
          <Image
            alt=""
            src="/images/theme/4/woman_mobile.png"
            layout="fill"
            quality={100}
            priority
            objectFit="cover"
            objectPosition="left top"
            className="bg_image_caption_featured_games"
          />
          <h1 className="caption_featured_games text-right font-bold break-words">
            <span>{captionFeatured[0]}</span>
            <span>{captionFeatured[1]}</span>
          </h1>
          <Button
            type="submit"
            className="btn_featured_detail -skew-x-[12deg] lg:-skew-x-[0deg] mr-[8px]"
            onClick={() => {
              router.push({
                pathname: "/gamelist",
                query: {
                  tab: type,
                },
              });
            }}
          >
            <span className="skew-x-[12deg] drop-shadow-sm tracking-[2px]">{t("common:text-see-all")}</span>
          </Button>
        </div>
      </div>
      <div className="featured_cont_slider relative">
        <Image
          alt=""
          src="/images/theme/4/bg_featured_slider_mobile.png"
          quality={100}
          layout="fill"
          objectFit="cover"
          objectPosition="left top"
          className="md:hidden"
        />
        {!device.isTabDevice ? (
          <CarouselSwiperCustom
            title="featured"
            spaceBetween={0}
            data={data?.data}
            type="transform"
          />
        ) : (
          <CarouselSwiperCustomMobile
            title="featured"
            spaceBetween={0}
            data={data?.data}
            type="transform"
          />
        )}
      </div>
    </div>
  );
};

export default Featured;
