import { useTranslation } from "next-i18next";
import { IconSearch, IconFilter } from "@components/icons";

export interface PropsSearch {
  value?: string | number | readonly string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  disable?: boolean;
  hideLabel?: boolean;
  placeholder?: string;
}

const Search = ({
  value,
  onChange,
  label = "SEARCH",
  disable = false,
  hideLabel = false,
  placeholder,
}: PropsSearch) => {
  const { t } = useTranslation("common");
  return (
    <div
      className={`flex flex-col text-xs font-bold border-2  border-black2 rounded ${
        hideLabel ? "h-[28px] px-3" : "h-[51px] p-[10px] pt-[9px] pb-1"
      } justify-around ${
        disable ? "bg-gray-400 cursor-not-allowed opacity-25" : "bg-[#07263D]"
      }  `}
    >
      {!hideLabel && (
        <span className="font-bold uppercase text-[10px] leading-3">
          {label}
        </span>
      )}
      <div className="flex items-center font-normal -ml-[10px]">
        <input
          type="text"
          className={`text-xs form-input ring-transparent border-transparent font-normal placeholder-black1-100/50 py-0 px-[9px] sm:w-full w-[85px]  ${
            disable
              ? "bg-gray-400 cursor-not-allowed opacity-25"
              : "bg-[#07263D]"
          } `}
          value={value}
          onChange={onChange}
          placeholder={placeholder || t("enter-to-search")}
          disabled={disable ? disable : false}
        />
        <IconSearch />
      </div>
    </div>
  );
};

export default Search;
