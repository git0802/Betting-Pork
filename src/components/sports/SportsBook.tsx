import React, { useRef } from "react";
import moment from "moment";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Autoplay } from "swiper";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import Image from "next/image";
import { GetRandomBanner } from "@utils/functionutil";

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

export default function SportsBook(sportEvents: SportEvents[]) {
  const swiperRef = useRef<SwiperCore>();
  const previous = () => swiperRef?.current?.slidePrev();
  const next = () => swiperRef?.current?.slideNext();

  return (
    <div className="pb-6">
      <h5 className="mb-4 text-2xl">SPORTS BOOK</h5>
      <div className="space-x-8 flex">
        <Swiper
          spaceBetween={10}
          autoplay={{
            delay: 8000,
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
          {sportEvents.map((item, index) => {
            const banner = GetRandomBanner("sport");
            return (
              <SwiperSlide key={index} className="relative">
                <div className="relative">
                  <div className="absolute top-[20%] left-[6%] z-20">
                    <Image
                      alt=""
                      src="/images/sports/saba-sports.png"
                      width={150}
                      height={48}
                      className=""
                    />
                  </div>
                  <Image
                    src={banner?.src as string}
                    width={banner?.width}
                    height={banner?.height}
                    alt={banner?.alt}
                  />
                </div>
              </SwiperSlide>
            );
          })}

          {/* {sportEvents?.data &&
                sportEvents.data.map((item, index) => {
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
                })} */}
        </Swiper>
      </div>
    </div>
  );
}
