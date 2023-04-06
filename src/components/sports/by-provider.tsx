import Image from "next/image";
import React from "react";
import { shimmer, toBase64 } from "@components/common/image";
import { useGameQuery } from "@framework/game/get-game";
import Link from "@components/ui/link";
import { saveSelectedGame } from "@utils/functionutil";

const ByProvider = () => {
  const {
    isLoading: isLoadingSaba,
    data: dataSaba,
    error: errorSaba,
  } = useGameQuery({
    limit: 12,
    type: "sport",
    provider: "saba",
  });

  const {
    isLoading: isLoadingSbo,
    data: dataSbo,
    error: errorSbo,
  } = useGameQuery({
    limit: 12,
    type: "sport",
    provider: "sbo",
  });

  const formatCurrency = new Intl.NumberFormat();

  const TotalGames = dataSaba?.total_items + dataSbo?.total_items;

  return (
    <div className="container mx-auto">
      <section className="grid md:grid-cols-2 gap-x-6 px-mobile md:px-desktop">
        <div className="md:col-span-2 flex flex-row justify-between w-full mb-[5px]">
          <div className="flex flex-row space-x-3">
            <span className="carousel-title">{`Sports`}</span>
            <div className="carousel-subTitle">
              <span className="bg-[rgba(255,255,255,0.1)] text-white text-base font-extrabold px-[10px] py-[6px] rounded">
                {!isLoadingSbo && !isLoadingSaba
                  ? formatCurrency.format(TotalGames)
                  : 0}
              </span>
            </div>
          </div>
        </div>
        <div className="relative md:w-[450px]">
          <Link
            onClick={() => saveSelectedGame(dataSaba?.data?.[0])}
            href={`/game/${dataSaba?.data?.[0]._id}?type=${dataSaba?.data?.[0].type}&provider=${dataSaba?.data?.[0].provider}`}
          >
            <Image
              alt=""
              src="/images/sports/sports-saba.png"
              width="450"
              height="250"
              layout="responsive"
              objectFit="contain"
              placeholder="blur"
              blurDataURL={`data:image/svg+xml;base64,${toBase64(
                shimmer(700, 475)
              )}`}
            />
          </Link>
        </div>
        <div className="relative md:w-[450px]">
          <Link
            onClick={() => saveSelectedGame(dataSbo?.data?.[0])}
            href={`/game/${dataSbo?.data?.[0]._id}?type=${dataSbo?.data?.[0].type}&provider=${dataSbo?.data?.[0].provider}`}
          >
            <Image
              alt=""
              src="/images/sports/sports-sbobet.png"
              width="450"
              height="250"
              layout="responsive"
              objectFit="contain"
              placeholder="blur"
              blurDataURL={`data:image/svg+xml;base64,${toBase64(
                shimmer(700, 475)
              )}`}
            />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ByProvider;
