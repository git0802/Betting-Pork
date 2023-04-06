import React from "react";
import cs from "classnames";

type Props = {
  name?: string;
  value: string;
  className: string;
  placeholder?: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Search = ({
  name,
  value,
  className,
  onSearchChange,
  placeholder,
}: Props) => (
  <div className="relative h-10 w-full  sm:w-fit">
    <button type="button" className="absolute left-0 top-0 mt-3 ml-4">
      <svg
        width="16"
        height="16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        class="absolute left-0"
      >
        <path
          d="M7.667 14a6.333 6.333 0 1 0 0-12.667 6.333 6.333 0 0 0 0 12.667ZM14.667 14.667l-1.334-1.334"
          stroke="#E1EDFF"
          stroke-opacity="0.6"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
      </svg>
    </button>
    <input
      type="search"
      name={name}
      value={value}
      onChange={onSearchChange}
      autoComplete={"off"}
      placeholder={placeholder}
      className={cs(
        "pl-10 pr-5 w-full h-10 text-sm rounded  text-[#D3F2FF]/40 bg-[#001625]",
        className
      )}
    />
  </div>
);

export default Search;
