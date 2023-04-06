import SearchGame from "@components/layout/SearchGame";
import SearchGameMobile from "@components/layout/SearchGameMobile";
import upperFirst from "lodash/upperFirst";
import { useState } from "react";

import IconSlot from "public/icons/header/slot.svg";
import IconSports from "public/icons/header/sports.svg";
import IconCasino from "public/icons/header/casino.svg";
import IconArcade from "public/icons/header/arcades.svg";
import IconPoker from "public/icons/header/poker.svg";
import IconTogel from "public/icons/header/togel.svg";
import IconLiveRTP from "public/icons/header/live-rtp.svg"
import { useTranslation } from "next-i18next";
import { useDevice } from "@contexts/device-context";

const IconTypeGameProduct = (name: string) => {
  switch (name) {
    case "slot":
      return <IconSlot className="w-[28px] h-[28px] text-[#FFC700]" />;
    case "casino":
      return <IconCasino className="w-[28px] h-[28px] text-[#FFC700]" />;
    case "sport":
      return <IconSports className="w-[28px] h-[28px] text-[#FFC700]" />;
    case "sports":
      return <IconSports className="w-[28px] h-[28px] text-[#FFC700]" />;
    case "arcade":
      return <IconArcade className="w-[28px] h-[28px] text-[#FFC700]" />;
    case "arcades":
      return <IconArcade className="w-[28px] h-[28px] text-[#FFC700]" />;
    case "poker":
      return <IconPoker className="w-[28px] h-[28px] text-[#FFC700]" />;
    case "togel":
      return <IconTogel className="w-[28px] h-[28px] text-[#FFC700]" />;
    case "live rtp":
      return <IconLiveRTP className="w-[28px] h-[28px] text-[#FFC700]" />;
    default:
      break;
  }
};

export default function ProductTitle({
  pageType,
  plural = true,
  localSearch = false,
  showProviderFilter = true,
}: {
  pageType: string;
  plural?: boolean;
  localSearch?: boolean;
  showProviderFilter?: boolean;
}) {
  const { t } = useTranslation();
  const [OnOpenSearch, setOnOpenSearch] = useState(true);

  const device = useDevice();

  return (
    <div className="game-category flex justify-between items-center relative">
      <h2
        className={`${
          !OnOpenSearch ? "opacity-0" : ""
        } text-[28px] font-semibold md:font-bold text-transparent bg-clip-text whitespace-nowrap gold-gradient flex items-center gap-3 uppercase`}
      >
        {IconTypeGameProduct(pageType?.toLowerCase())}
        {pageType?.toUpperCase()}
        {plural && pageType ? "s" : ""}
      </h2>
      <div className="block">
        {!device.isMobileDevice ? (
          <SearchGame
            localSearch={localSearch}
            placeholder={`${t("common:text-search-game")} ${upperFirst(
              pageType
            )}`}
            showProviderFilter={showProviderFilter}
            inputWidth="w-[205px]"
            searchPosition="right-0"
            position="pages"
            game_type={pageType}
          />
        ) : (
          <div className="absolute z-10 right-0 bottom-0">
            <SearchGameMobile
              localSearch={localSearch}
              showProviderFilter={showProviderFilter}
              searchPosition="right-0"
              game_type={pageType}
              openSearch={setOnOpenSearch}
            />
          </div>
        )}
      </div>
    </div>
  );
}
