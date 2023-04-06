/* eslint-disable @next/next/no-img-element */
import moment from 'moment'
import Image from 'next/image'
import React from 'react'

interface Props {
  country_name: string,
  league_name: string,
  team_home_badge: string,
  match_hometeam_name: string,
  match_awayteam_name: string,
  team_away_badge: string,
  date: Date
}

interface Props {
  data: Props
}

const CardSportEvent = ({ data }: any) => {
  return (
    <div className="bg_card_sportbook flex flex-col justify-between p-4 space-y-2 rounded-[10px] min-h-[130px]">
      <p className="text-white/40 text-[10px] font-semibold text-center">
        {data?.country_name?.toUpperCase()} - {data?.league_name?.toUpperCase()}
      </p>
      <div className="flex flex-col gap-2 xl:flex-row items-center justify-between">
        <div className="xl:w-[112px] flex space-x-2 items-center">
          <Image
            alt=""
            src={data?.team_home_badge}
            width={24}
            height={24}
            quality={100}
            loading="lazy"
            objectFit="contain"
          />
          <p className="text-white text-sm font-semibold truncate">
            {data?.match_hometeam_name}
          </p>
        </div>
        <div className="xl:w-6 text-whiteDefault-50 text-sm font-normal">VS</div>
        <div className="xl:w-[112px] flex gap-2 items-center justify-center xl:justify-end w-full">
          <p className="order-2 xl:order-1 text-white text-right text-sm font-semibold truncate">
            {data?.match_awayteam_name}
          </p>
          <Image
            alt=""
            src={data?.team_away_badge}
            width={24}
            height={24}
            quality={100}
            loading="lazy"
            objectFit="contain"
          />
        </div>
      </div>
      <div className="flex text-sm space-x-2">
        <div className="text-[10px] font-semibold text-white/40 bg-[#FFFFFF1A] border border-[#DCECFF33] py-0.5 px-2 flex items-center justify-start rounded">
          {moment(new Date(data.date))
            .format("DD MMM")
            ?.toUpperCase()}
        </div>
      </div>
    </div>
  )
}

export default CardSportEvent