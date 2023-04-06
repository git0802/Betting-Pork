/* eslint-disable @next/next/no-img-element */
import { shimmer, toBase64 } from "@components/common/image";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDevice } from "../../contexts/device-context";
interface Props {
  name: string;
  image: string;
  provider: string;
  showRTP?: boolean;
  valueRTP?: number;
  height?: string;
}

const CardItemGamesTransform = ({
  name,
  image,
  provider,
  showRTP = false,
  valueRTP,
  height,
}: Props) => {
  const [imgSrc, setImgSrc] = useState(image);
  useEffect(() => {
    setImgSrc(image);
  }, [image]);

  const device = useDevice();

  return (
    <div
      className={`bg_card_game_transform relative group"
        }`}
    >
      <div className="relative block w-full h-full rounded-3xl bg-no-repeat bg-center bg-cover overflow-hidden">
        <Image
          alt=""
          className="z-[1] w-full h-full backdrop-blur-md blur-md "
          src={imgSrc}
          quality={1}
          layout="fill"
          objectFit="fill"
          objectPosition="left top"
          style={{
            zIndex: `1`,
          }}
        />
        <Image
          alt=""
          className="z-[2] w-full h-full skew-x-[12deg]"
          src={imgSrc ? imgSrc : "/images/broken-image.png"}
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64,${toBase64(
            shimmer(700, 475)
          )}`}
          onError={() => {
            setImgSrc("/images/broken-image.png");
          }}
          quality={100}
          priority={!device.isMobileDevice}
          loading={device.isMobileDevice ? "lazy" : "eager"}
          layout="fill"
          objectFit="cover"
          style={{
            zIndex: `2`,
            backgroundColor: `transparent`,
          }}
        />
        <div className={`bg_card_game_transform_detail`}>
          <div className="cont_detail flex flex-col items-start justify-start">
            <span className="game_name break-words">
              {name.substring(0, 20)}
            </span>
            <span className="provider_name">{provider}</span>
            <div
              className={`rtp w-full ${
                showRTP
                  ? "flex flex-row items-center justify-between"
                  : "hidden"
              }`}
            >
              <span className="text">RTP</span>
              <span
                className="percen"
                style={{
                  backgroundColor:
                    valueRTP && valueRTP < 30
                      ? "rgba(255, 92, 95, 0.15)"
                      : valueRTP && valueRTP > 70
                      ? "rgba(33, 217, 128, 0.15)"
                      : "rgba(255, 184, 0, 0.15)",
                  padding: "2px 6px",
                  borderRadius: "54px",
                  color:
                    valueRTP && valueRTP < 30
                      ? "#FF5C5F"
                      : valueRTP && valueRTP > 70
                      ? "#21D980"
                      : "#FFB800",
                }}
              >
                {valueRTP} %
              </span>
            </div>
            <div
              className={`${
                showRTP ? "flex flex-col" : "hidden"
              } bg_loading_bar_rtp w-full h-2`}
              style={{
                background:
                  valueRTP && valueRTP < 30
                    ? "rgba(255, 92, 95, 0.30)"
                    : valueRTP && valueRTP > 70
                    ? "rgba(33, 217, 128, 0.30)"
                    : "rgba(255, 184, 0, 0.30)",
              }}
            >
              <div
                className={`bg-rtp-live h-2 transition-all`}
                style={{
                  width: `${valueRTP}%`,
                  backgroundColor:
                    valueRTP && valueRTP < 30
                      ? "#FF5C5F"
                      : valueRTP && valueRTP > 70
                      ? "#21D980"
                      : "#FFB800",
                }}
              ></div>
            </div>
          </div>
          <div className="btn_play_featured">
            <span>PLAY</span>
          </div>
        </div>
        <div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
      </div>
    </div>
  );
};

export default CardItemGamesTransform;
