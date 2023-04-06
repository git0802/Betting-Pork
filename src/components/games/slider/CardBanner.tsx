/* eslint-disable @next/next/no-img-element */
import { shimmer, toBase64 } from "@components/common/image";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";

interface Props {
  image: string;
  provider: string;
  type?: string;
}

const CardBanner = ({
  image,
  provider,
  type
}: Props) => {
  const [imgSrc, setImgSrc] = useState(image);
  const router = useRouter();
  const { query } = router;

  useEffect(() => {
    setImgSrc(image);
  }, [image]);

  return (
    <div
      className="w-full h-full bg-transparent rounded cursor-pointer"
      onClick={() => {
        router.push(
          {
            pathname: "/product/"+ type,
            query: {
              games: type,
              providers: provider
            }
          }
        )
      }}
    >
      <Image
        alt=""
        width={450}
        height={250}
        objectFit="contain"
        placeholder="blur"
        quality={100}
        loading="lazy"
        src={
          imgSrc
            ? imgSrc
            : "/images/banner-broken-image.png"
        }
        onError={() => {
          setImgSrc("/images/banner-broken-image.png");
        }}
        blurDataURL={`data:image/svg+xml;base64,${toBase64(
          shimmer(700, 475)
        )}`}
      />
      <div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
    </div>
  );
};

export default CardBanner;
