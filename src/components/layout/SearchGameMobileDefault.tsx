/* eslint-disable @next/next/no-img-element */
import { Combobox } from "@headlessui/react";
import { useRef } from "react";

type SearchGameProps = {
  openSearch?: any;
  search :any
};

const SearchGameMobileDefault = ({
  search,
  openSearch,
}: SearchGameProps) => {
  const searchButtonDropdown = useRef<HTMLButtonElement>(null);


  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    search(event.target.value);
  };

  return (
    <div className="relative w-full z-10">
      <div className="flex items-center justify-start w-full space-x-[10px]">
        <Combobox>
          <div className="">
            <form
              autoComplete="off"
              className={`input_search_game_pages h-11 flex relative items-center rounded-[5px]`}
            >
              <Combobox.Input
                onClick={() => {
                  openSearch(false);
                }}
                onBlur={() => {
                  openSearch(true);
                }}
                className="bg-transparent outline-none w-[46px] h-full transition-all focus:w-[calc(100vw-30px)] focus:pl-10 focus:pr-5 bg-no-repeat bg-[url('/icons/search.svg')]"
                style={{ backgroundPosition: "14px 12px" }}
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
      
      </div>
    </div>
  );
};

export default SearchGameMobileDefault;
