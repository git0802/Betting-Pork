import React, { useRef } from "react";
import moment from "moment";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Autoplay } from "swiper";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import Image from "next/image";

const sliderSettings = {
  320: {
    slidesPerView: 1,
  },
  360: {
    slidesPerView: 1,
  },
  375: {
    slidesPerView: 1,
  },
  390: {
    slidesPerView: 1,
  },
  576: {
    slidesPerView: 1,
  },
  768: {
    slidesPerView: 3,
  },
  1024: {
    slidesPerView: 4,
  },
  1180: {
    slidesPerView: 5,
  },
  1440: {
    slidesPerView: 5,
  },
};

type SportEvents = {
  _id: string;
  match_id: string;
  country_id: string;
  country_logo: string;
  country_name: string;
  date: string;
  league_id: string;
  league_logo: string;
  league_name: string;
  league_year: string;
  match_awayteam_id: string;
  match_awayteam_name: string;
  match_awayteam_score: string;
  match_hometeam_id: string;
  match_hometeam_name: string;
  match_hometeam_score: string;
  match_status: string;
  team_away_badge: string;
  team_home_badge: string;
  updated_at: string;
};

export default function SportsEvent(sportEvents: SportEvents[] | []) {
  const swiperRef = useRef<SwiperCore>();
  const previous = () => swiperRef?.current?.slidePrev();
  const next = () => swiperRef?.current?.slideNext();

  if (sportEvents.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4 pb-6 mt-6">
      <div className="flex flex-row space-x-4 justify-between">
        <h5 className="text-2xl">SPORTS EVENT</h5>
        <div className="flex flex-row space-x-2">
          <button onClick={previous} className="btn-prevNext-carousel">
            <FaAngleLeft />
          </button>
          <button onClick={next} className="btn-prevNext-carousel">
            <FaAngleRight />
          </button>
        </div>
      </div>
      <Swiper
        spaceBetween={10}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        lazy={true}
        loop
        modules={[Autoplay]}
        breakpoints={sliderSettings}
        className="mySwiper relative"
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        {sportEvents.length &&
          sportEvents.map((item, index) => {
            return (
              <SwiperSlide key={index} className="relative">
                <div className="bg-[#001625] p-4 rounded-xl">
                  <p className="text-white/40 text-sm">
                    {item.league_name?.toUpperCase()}
                  </p>
                  <p className="text-white mt-2 text-xl">
                    {item.match_hometeam_name}
                  </p>
                  <p className="text-white text-xl">
                    {item.match_awayteam_name}
                  </p>
                  <div className="flex text-sm space-x-2 mt-6">
                    <div className="text-white/40 bg-[#DCECFF]/20 py-0.5 px-2 flex items-center justify-start rounded">
                      {moment(new Date(item.date))
                        .format("DD MMM")
                        ?.toUpperCase()}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
      </Swiper>
    </div>
  );
}
