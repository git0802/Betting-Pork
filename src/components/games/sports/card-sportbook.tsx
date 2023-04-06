/* eslint-disable @next/next/no-img-element */
import moment from "moment";
import Image from "next/image";
import Link from "@components/ui/link";
import React from "react";

interface Props {
  country_name: string;
  league_name: string;
  team_home_badge: string;
  match_hometeam_name: string;
  match_awayteam_name: string;
  team_away_badge: string;
  date: Date;
}

interface Props {
  data: Props;
}

const CardSportbook = ({ providerName, banner, providerImage }: { providerName: any, banner: any, providerImage: any }) => {

  return (
    <div className="relative cursor-pointer">
      <div className="absolute top-[15%] left-[6%] md:left-[8%] md:scale-125 z-20">
        <Image
          src={providerImage?.src as string}
          width={providerImage?.width}
          height={providerImage?.height}
          alt={providerImage?.alt}
          objectFit="contain"
          loading="lazy"
        />
      </div>

      <div className="absolute bottom-[15%] md:bottom-[15%] left-[6%] z-20">
        <style jsx>
          {`
            .ts-detail {
              text-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
            }
          `}
        </style>
        <Link
          href={`/provider-profile/${providerName}`}
          className="bg-gradient-to-b from-[#FFC700] to-[#C28C00] px-3 py-1.5 lg:px-4 lg:py-2 rounded-[3px] font-[600] md:font-[800]"
        >
          <span className="ts-detail text-sm text-white">LIHAT DETAIL</span>
        </Link>
      </div>
      <Image
        alt=""
        src={banner?.src as string}
        width={banner?.width}
        height={banner?.height}
        quality={100}
        objectFit="contain"
        loading="lazy"
      />
    </div>
  );
};

export default CardSportbook;
