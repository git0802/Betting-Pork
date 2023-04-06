/* eslint-disable @next/next/no-img-element */
import { shimmer, toBase64 } from "@components/common/image";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import IconPlay from "public/icons/button-play.svg";
import React, { useEffect, useState } from "react";
import CardItemGamesBlur from "./card-item-games-blur";
import CardItemGamesTransform from "./card-item-games-transform";
interface Props {
  name: string;
  image: string;
  provider: string;
  showRTP?: boolean;
  valueRTP?: number;
  height?: string;
  type?: "blur" | "transform" | string;
}

const CardItemGames = ({
  name,
  image,
  provider,
  showRTP = false,
  valueRTP,
  height,
  type
}: Props) => {

  if (type === "blur")
    return <CardItemGamesBlur
      name={name}
      image={image}
      provider={provider}
      showRTP={showRTP}
      valueRTP={valueRTP}
      height={height}
    />
  else if (type === "transform")
    return <CardItemGamesTransform
      name={name}
      image={image}
      provider={provider}
      showRTP={showRTP}
      valueRTP={valueRTP}
      height={height}
    />

  return (
    <CardItemGamesBlur
      name={name}
      image={image}
      provider={provider}
      showRTP={showRTP}
      valueRTP={valueRTP}
      height={height}
    />
  )

};

export default CardItemGames;
