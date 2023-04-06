import React from "react";
import { useGameTypeOptionQuery } from "./get-all-games-type";
import humanizeString from "@utils/humanize-string";
import { getProvidersByType } from "@utils/functionutil";

interface Providertype {
  type: "icon" | "image";
  game_type?: string;
}

export const GetProviderByGameType: React.FC<Providertype> = ({
  type,
  game_type,
}) => {
  const { data: dataGameType } = useGameTypeOptionQuery();

  const providerData = dataGameType?.gametype?.data
    ? getProvidersByType(dataGameType?.gametype?.data, true)
    : [];
  const handleListProvider: any = [];

  if (game_type) {
    const getProviderByGameType = dataGameType?.gametype?.data.filter(
      (item) => item?.type == game_type
    );
    getProviderByGameType?.[0]?.providers?.forEach((element) => {
      handleListProvider.push(element.provider);
    });
  } else if (dataGameType?.gametype?.data) {
    dataGameType?.gametype?.data.forEach((element: any) => {
      element?.providers.forEach((subElement: any) => {
        handleListProvider.push(subElement.provider.toLowerCase());
      });
    });
  }
  
  const uniqueProviders = [...new Set(handleListProvider)];

  const handleUniqProviders: any = [];
  uniqueProviders.forEach((item) => {
    const image =
      type === "icon"
        ? `/images/provider/icon/${item}.png`
        : `/images/provider/logo/${item}-4x.png`;
    const image_white =
      type === "icon"
        ? `/images/provider/icon/${item}_w.png`
        : `/images/provider/logo/${item}_w.png`;
    handleUniqProviders.push({
      key: item,
      name: providerData.find((i) => i.provider === item)?.name || item,
      title: humanizeString(item).toLowerCase(),
      // key: item.value,
      // title: item.value,
      image_url: image,
      image_url_white: image_white,
    });
  });

  return handleUniqProviders;
};
