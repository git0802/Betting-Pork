/* eslint-disable @next/next/no-img-element */
import { shimmer, toBase64 } from "@components/common/image";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import IconPlay from "public/icons/button-play.svg";
import React, { useEffect, useState } from "react";
interface Props {
  name: string;
  image: string;
  provider: string;
  showRTP?: boolean;
  valueRTP?: number;
  height?: string;
}

const CardItemGamesBlur = ({
  name,
  image,
  provider,
  showRTP = false,
  valueRTP,
  height,
}: Props) => {
  const [imgSrc, setImgSrc] = useState(image);
  const { t } = useTranslation();
  useEffect(() => {
    setImgSrc(image);
  }, [image]);


  return (
    <div
      className={`bg_card_game relative group card_games ${height ? height : "h-[124px] md:h-[168px]"
        }`}
    >
      <div className="relative block w-full h-full drop-shadow-none">
        <div className="relative w-full max-h-full h-[110px] md:h-[150px] rounded overflow-hidden">
          <Image
            alt={name}
            src={image}
            layout='fill'
            className='z-[0] w-full h-full bg-center bg-no-repeat backdrop-blur-md blur-md !rounded'
            style={{
              width: '200%',
              height: ' 200%',
            }}
            quality={10}
            loading='lazy'
          />
          <Image
            alt={name}
            src={image}
            layout='fill'
            className='z-[1] w-full h-full bg-center bg-no-repeat backdrop-blur-md blur-md !rounded'
            style={{
              borderRadius: '4px'
            }}
            quality={10}
            loading='lazy'
          />
          <Image
            alt=""
            layout="fill"
            className="z-[22] w-full h-[full] rounded-[3px]"
            src={imgSrc ? imgSrc : "/images/broken-image.png"}
            placeholder='blur'
            blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
            onError={() => {
              setImgSrc("/images/broken-image.png");
            }}
            style={{ height: '150px' }}
            quality={100}
            loading="lazy"
            objectFit="cover"
          />
        </div>
        <div className={`${showRTP ? "bg_card_detail_with_rtp" : "bg_card_detail"} absolute z-[23] w-full bottom-0 flex flex-col  justify-start p-2 pt-8`}>
          <span className="carousel-items-title hover:text-clip">{name}</span>
          <span className="carousel-items-subtitle truncate uppercase">
            {provider}
          </span>
          <div className={`${showRTP ? "flex flex-col mt-[14px]" : "hidden"}`}>
            <div className="flex flex-row justify-between items-center">
              <span className="text-[#D3F2FFB2] text-xs font-medium">RTP</span>
              <span className="text-[#04E91B] text-xs font-bold">
                {valueRTP} %
              </span>
            </div>
          </div>
          <div
            className={`${showRTP ? "flex flex-col" : "hidden"
              } w-full bg-[#00131F] h-1 rounded-full`}
          >
            <div
              className={`bg-rtp h-1 rounded-full transition-all`}
              style={{ width: `${valueRTP}%` }}
            ></div>
          </div>
        </div>
        <div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
      </div>
      <div className={`bg_card_game_hover opacity-0 overflow-hidden group-hover:lg:opacity-100 transition flex flex-col items-center justify-center gap-[7px] absolute z-[24] top-0 left-0 rounded-md w-full h-full text-base text-white font-medium uppercase`}>
        <div className="inline-flex flex-col items-center justify-center">
          <IconPlay className="w-[82px] h-[82px] overflow-hidden text-white" />
          <span className="w-[95px] mx-auto text-white font-medium leading-[20px] uppercase text-center">
            {t("common:text-play-now")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CardItemGamesBlur;
