import { BankIcon } from "@utils/functionutil/Function";
import { useEffect, useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
interface DropdownCustomType {
  data?: string[] | string | object;
  onChange?: any;
  useTititle?: boolean;
  title?: string;
  value?: any;
  labelKey?: string;
  tabIndex?: number;
  selected?: string;
  placeholder?: string;
  setOpen?: any;
  open?: any;
  noRekening?: any;
}
export const DropdownTataCaraItem = (props: DropdownCustomType) => {
  const [Open, setOpen] = useState(false);
  const [BankOpen, setBankOpen] = useState(0);
  const [DataValue, setDataValue] = useState(
    props !== undefined && props?.value !== undefined ? props.value : []
  );
  const [DataButton, setDataButton] = useState([]);
  const [Step, setStep] = useState([]);

  useEffect(() => {
    if (props.open == props.value.name) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [props.open]);

  const handleButonFristLoad = () => {
    if (DataValue) {
      let dataHandle: any = [];
      let dataStephandle: any = [];
      DataValue?.data.map((value: any, index: number) => {
        dataStephandle.push({
          key: index,
          data: value.step,
        });
        dataHandle.push({
          name: value.type,
          key: index,
        });
      });
      setDataButton(dataHandle);
      setStep(dataStephandle);
    }
  };

  const renderButton = () => {
    if (DataButton.length !== 0) {
      return DataButton.map((value: any, index: number) => {
        return (
          <div
            key={value.key}
            className={`w-4/12 flex justify-center text-center  ${
              value.key == 0 && DataButton.length == 1 ? "rounded-x-[4px]" : ""
            }  ${value.key == 0 ? "rounded-l-[4px]" : ""} ${
              value.key == 1 && DataButton.length == 2 ? "rounded-r-[4px]" : ""
            } ${
              value.key == 2 ? "rounded-r-[4px]" : ""
            } py-[11px]  text-[14px] font-medium border-[1px] border-[#fff0] transition duration-200 ease-in-out cursor-pointer  ${
              BankOpen == value.key
                ? "btn_primary h-[42px] text-white rounded-[4px]"
                : "bg_input_primary hover:opacity-60 text-[#D3F2FF]/40  "
            }`}
            onClick={() => {
              setBankOpen(value.key);
            }}
          >
            {" "}
            {value.name}
          </div>
        );
      });
    }
  };

  useEffect(() => {
    handleButonFristLoad();
  }, []);

  const renderData = () => {
    if (Step) {
      return Step.map((value: any) => {
        if (value.key == BankOpen) {
          return value?.data.map((value: any, index: number) => {
            const renderRekening = (data: any) => {
              let datahandle = data;
              if (props.open == props.value.name) {
                datahandle = datahandle.replace("$rekening", props.noRekening);
              } else {
                datahandle = datahandle.replace("$rekening", "-");
              }
              return datahandle;
            };

            return (
              <div
                className="flex text-[14px] font-normal text-[#D3F2FF]/80"
                key={index}
              >
                <span className="mr-1">{index + 1}. </span>
                <p> {renderRekening(value)}</p>
              </div>
            );
          });
        }
      });
    }
  };

  return (
    <div className="w-[100%]     md:w-full    md:min-w-[354px]">
      <div
        onClick={() => {
          setOpen(!Open);
        }}
        className={`py-2  w-full border-b-0 min-h-[44px] border-[1px] border-[#B9D6FF]/10  items-center  ${
          !Open ? " rounded-[4px]" : " rounded-x-[4px] rounded-t-[4px]"
        } px-4  bg-[#D3F2FF]/5  flex justify-between`}
      >
        <div className="flex justify-center items-center">
          {" "}
          <span className="min-w-[4.5rem] flex items-center justify-start">
            {BankIcon(DataValue.name)}
          </span>
          <span className="text-[12px] md:text-[14px] font-semibold text-[#FFF]/90">
            {DataValue.name}
          </span>
        </div>
        {Open ? (
          <div className="px-1 py-1 bg-[#D3F2FF]/10 border-[1px] opacity-70 border-[#D3F2FF]/30  rounded-[3px]">
            <FiChevronDown className="h-5 w-5 text-white" aria-hidden="true" />
          </div>
        ) : (
          <div className="px-1 py-1 bg-[#D3F2FF]/10 border-[1px] opacity-70 border-[#D3F2FF]/30 rounded-[3px]">
            <FiChevronUp
              className="h-5 w-5 font-extralight text-white"
              aria-hidden="true"
            />
          </div>
        )}
      </div>
      {Open && (
        <div className="w-full min-h-[20rem] mt-[-0px]  text-left border-x-[1px] border-b-[1px]  rounded-b-[3px] border-[#B9D6FF]/10 mb-[1px] px-2 bg-[#D3F2FF]/5 py-2 text-[12px] md:text-[14px] font-extralight flex flex-col space-y-2">
          <div className="flex flex-col bg-primaryContent px-[10px] py-[12px] rounded-[10px] ">
            <div className="flex justify-start items-center mb-[18px]">
              {" "}
              {renderButton()}
            </div>
            <div className="flex flex-col justify-start  space-y-2">
              {" "}
              {renderData()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
