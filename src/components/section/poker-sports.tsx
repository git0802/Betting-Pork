import React from "react";
import SliderPoker from "@components/games/poker/Slider";
import SliderSport from "@components/games/sports";

const SectionPokerSports = () => {
  return (
    <div className="container mx-auto">
      <div className="flex flex-col 2xl:flex-row gap-x-5 items-center justify-between w-full">
        <div className="w-full 2xl:w-[946px]">
          <SliderSport />
        </div>
        <div className="w-full 2xl:w-[450px]">
          <SliderPoker />
        </div>
      </div>
    </div>
  );
};

export default SectionPokerSports;
