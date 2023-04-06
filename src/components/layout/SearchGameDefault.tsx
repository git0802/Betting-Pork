/* eslint-disable @next/next/no-img-element */
import { IconSearch } from "@components/icons";
import { Combobox } from "@headlessui/react";
import cn from "classnames";
import { useRef } from "react";
import { useDebounce } from "use-debounce";

type SearchGameProps = {
  placeholder?: string;
  showSearch?: boolean;
  alignItem?: string;
  inputWidth?: string;
  position?: "header" | "pages" | null;
  px?: boolean;
  search?: any;
};

const SearchGameDefault = ({
  placeholder = "Search Game",
  showSearch = true,
  alignItem = "justify-start",
  position = null,
  search,
  px = false,
}: SearchGameProps) => {
  const searchButtonDropdown = useRef<HTMLButtonElement>(null);
  const [value] = useDebounce(search, 300);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    search(event.target.value);
  };

  return (
    <div
      className={cn("relative w-full", {
        "px-mobile": px,
      })}
    >
      <div className={`flex ${alignItem} items-center w-full space-x-[10px]`}>
        {showSearch ? (
          <Combobox>
            <div className="">
              <form
                autoComplete="off"
                className={cn(
                  "flex flex-1 relative items-center transition duration-200",
                  {
                    input_search_game_header: position == "header",
                    input_search_game_pages: position == "pages",
                  }
                )}
              >
                <div className="flex items-center justify-center h-[18px] mx-3 my-[13px] ">
                  <IconSearch />
                </div>
                <Combobox.Input
                  className="bg-transparent outline-none w-full h-[18px] capitalize focus:placeholder:text-transparent"
                  placeholder={placeholder}
                  onChange={handleSearchChange}
                  autoComplete="off"
                  role="presentation"
                  type="text"
                />
                <div className="absolute top-0">
                  <Combobox.Button
                    ref={searchButtonDropdown}
                    className="w-full h-12"
                  >
                    &nbsp;
                  </Combobox.Button>
                </div>
              </form>
            </div>
          </Combobox>
        ) : null}
      </div>
    </div>
  );
};

export default SearchGameDefault;
