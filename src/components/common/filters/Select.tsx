import { ChangeEventHandler, useState } from "react";
import { FaCaretDown, FaCaretRight, FaCaretUp } from "react-icons/fa";

export interface PropsSelect {
  value?: string | number | readonly string[];
  onChange?: ChangeEventHandler<HTMLSelectElement>;
  options?: { value: string; label: string }[];
  label?: string;
  disabled?: boolean;
}

const Select = ({
  value,
  onChange,
  options,
  label = "FILTER",
  disabled,
}: PropsSelect) => {
  const [Open, setOpen] = useState(false);
  const [Header, setHeader] = useState(options ? options[0].value : "");

  const renderOpen = () => {
    if (Open == true) {
      return options?.map((option, index) => (
        <button
          className="min-w-[9rem] px-[1rem] text-left py-[0.5rem] font-semibold hover:text-[#fff]  hover:bg-[#1AA9E7]"
          key={index}
          value={option.value}
          onClick={(e) => {
            setOpen(false);
            setHeader(option.label);
            onChange(e);
          }}
        >
          {option.label}
        </button>
      ));
    }
  };

  return (
    <div className="flex styled-select items-center relative font-normal  -mx-[10px]  ">
      <button
        className={`${
          Open ? "text-[#fff]" : "text-[#D3F2FF]/40 "
        } text-sm  hover:text-[#fff] form-select flex justify-between justify-center items-center ring-transparent font-normal border-transparent min-w-[9rem]    bg-[#001625] rounded-sm px-4 h-10 max-w-[250px] disabled:bg-transparent`}
        name="Page"
        id="PageFilter"
        value={value}
        onClick={() => {
          setOpen(!Open);
        }}
      >
        <span className=" font-semibold"> {Header}</span>
        {Open ? <FaCaretUp size={12} /> : <FaCaretDown size={12} />}
      </button>
      {Open ? (
        <div className="absolute top-12  py-2 rounded-md space-y-3 border-[1px] text-[#D3F2FF]/40  border-[#2C516A] bg-[#0B2C44] ">
          {renderOpen()}
        </div>
      ) : null}
    </div>
  );
};

export default Select;
