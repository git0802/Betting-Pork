/* eslint-disable @next/next/no-img-element */
import { IconFilter, IconFilter2, IconFilter3 } from "@components/icons";
import { useGameTypeOptionQuery } from "@framework/game/get-all-games-type";
import { useTranslation } from "next-i18next";

import Image from "next/image";
import { forwardRef, useEffect, useMemo, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "./button";

interface Dataitem {
  active: boolean;
  name: string;
}
interface DataProps {
  DataFilter: boolean;
  setData: Function;
  setDataProvider: Function;
}

// eslint-disable-next-line react/display-name
const FilterTransaction = forwardRef((props: DataProps, ref) => {
  const DataFilterHide = props.DataFilter ? props.DataFilter : false;
  const { t } = useTranslation();
  const { data: GameType } = useGameTypeOptionQuery();

  const [Triggrer, setTriggrer] = useState("");
  const [DataProvider, setDataProvider] = useState([]);
  const [openFilterMenu, setOpenFilterMenu] = useState(false);

  let DataListProvider: any = [];

  const handlelistProviders = useMemo(() => {
    const hdlp: any = [];
    if (GameType?.gametype?.data) {
      GameType?.gametype?.data.forEach((element: any) => {
        element?.providers.forEach((subElement: any) => {
          hdlp.push(subElement.provider.toLowerCase());
        });
      });
    }

    const uniqueProviders = [...new Set(hdlp)];

    const handleUniqProviders: any = [];
    uniqueProviders.forEach((item) => {
      handleUniqProviders.push(item);
    });

    return handleUniqProviders;
  }, [GameType]);

  useEffect(() => {
    // LoadData();
  }, [Triggrer]);

  const filterMenuDefault = useMemo(
    () => [
      { name: "Win", icon: "", value: "win", active: false },
      { name: "REFUND", icon: "", value: "refund", active: false },
      { name: "TIE", icon: "", value: "tie", active: false },
      { name: "BET", icon: "", value: "bet", active: false },
      { name: "UNSETTLE", icon: "", value: "unsettle", active: false },
      { name: "RESETTLE", icon: "", value: "resettle", active: false },
      { name: "COMMISSION", icon: "", value: "commission", active: false },
      {
        name: "FREESPIN",
        icon: "",
        value: "freespin",
        active: false,
      },
    ],
    []
  );

  const filterMenu = useMemo(
    () => [
      { name: "Win", icon: "", value: "win", active: false },
      { name: "REFUND", icon: "", value: "refund", active: false },
      { name: "TIE", icon: "", value: "tie", active: false },
      { name: "BET", icon: "", value: "bet", active: false },
      { name: "UNSETTLE", icon: "", value: "unsettle", active: false },
      { name: "RESETTLE", icon: "", value: "resettle", active: false },
      { name: "COMMISSION", icon: "", value: "commission", active: false },
      {
        name: "FREESPIN",
        icon: "",
        value: "freespin",
        active: false,
      },
    ],
    []
  );

  useEffect(() => {
    if (DataProvider.length == 0) {
      LoadData();
    }
  }, [openFilterMenu]);

  const LoadData = () => {
    let data: string[] | any = [];

    if ((DataListProvider = [])) {
      if (handlelistProviders !== undefined) {
        handlelistProviders?.map((value: string) => {
          return data.push({ name: value, active: false });
        });

        DataListProvider = data;
        setDataProvider(data);
      }
    }
  };

  const handleFilter = () => {
    let DataTypeHandle;
    let DataProviderHandle;

    DataTypeHandle = filterMenu?.filter((values) => {
      return values;
    });

    DataProviderHandle = DataProvider?.filter((values) => {
      return values;
    });

    props.setData(DataTypeHandle);
    props.setDataProvider(DataProviderHandle);
    setOpenFilterMenu(false);
  };

  const setClearButton = () => {
    let data: string[] | any = [];
    handlelistProviders?.map((value: string) => {
      return data.push({ name: value, active: false });
    });

    DataListProvider = data;
    setDataProvider(data);

    filterMenu?.map((value, index) => {
      filterMenu[index].active = false;
    });

    props.setData([]);
    props.setDataProvider([]);
  };

  return (
    <div ref={ref} className=" sm:relative ">
      <div className="input_primary flex text-[#D3F2FF]/40  items-center justify-center space-x-3">
        <button
          className={`${openFilterMenu
            ? " text-white"
            : "text-[#D3F2FF]/40 hover:text-white/80  transition duration-200 ease-in-out"
            } bg_btn_filter  flex space-x-3 items-center justify-center rounded-md sm:w-[110px] sm:h-11  h-11 px-5`}
          onClick={() => setOpenFilterMenu(!openFilterMenu)}
        >
          <IconFilter3 className={`cursor-pointer`} />
          <span className="text-xs sm:text-sm  font-semibold">Filter</span>
        </button>
      </div>
      {openFilterMenu ? (
        <div className="bg_search_game flex min-w-[20rem] md:min-w-[30rem] flex-wrap flex-col space-y-3 w-full scale-95 sm:scale-100 absolute z-[2] mt-2 left-0 md:left-0 rounded-lg p-3">
          {DataFilterHide == true ? null : (
            <>
              <div className="flex justify-between">
                {" "}
                <h5 className="capitalize text-[#D3F2FF99]">
                  Filter Transaksi
                </h5>
                <button
                  onClick={() => {
                    setOpenFilterMenu(false);
                  }}
                  className="capitalize text-[#D3F2FF99]"
                >
                  <IoMdClose className="text-[#D3F2FF]/80 w-5 h-5" />
                </button>
              </div>
              <div className="flex flex-wrap">
                {filterMenu.map((item: Dataitem, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      filterMenu[index].active = !item.active;
                      setTriggrer(item.name);
                    }}
                    className={`${item.active ? "bg_filter_item_active" : "bg_filter_item"
                      } flex flex-row items-center justify-center py-3 mx-[0.3rem] h-11 my-[0.3rem] uppercase w-fit px-4 rounded-md   text-xs text-center duration-200 ease-in-out transition font-semibold cursor-pointer`}
                  >
                    {item.name}
                  </div>
                ))}
              </div>
            </>
          )}

          <h5 className="capitalize text-[#D3F2FF99] mt-2">Provider</h5>
          <div className="flex flex-wrap md:h-[120px] overflow-y-auto   scrollbar pr-2">
            {DataProvider?.map((item: Dataitem, index) => (
              <div
                key={index}
                onClick={(e) => {
                  let dataHandleProvider: any = DataProvider;
                  dataHandleProvider[index].active = !item.active;

                  setDataProvider(dataHandleProvider);
                  setTriggrer(item.name);
                }}
                className={`${item.active ? "bg_filter_item_active" : "bg_filter_item"
                  } flex flex-row items-center justify-center py-3 uppercase w-fit mx-[0.3rem] transition duration-200 ease-in-out my-[0.3rem] px-4 rounded-md  text-xs font-semibold cursor-pointer`}
              >
                <div className="mr-2 h-4">
                  <Image
                    src={`/images/provider/icon/${item.name}.png`}
                    className="h-4 object-contain"
                    alt={item.name}
                    width={16}
                    height={16}
                  />
                </div>
                {item.name}
              </div>
            ))}
          </div>
          <div className="flex items-center justify-end gap-3">
            <Button
              onClick={() => {
                setClearButton();
              }}
              variant="cancel"
              className="flex flex-row h-11 font-extrabold text-sm px-5"
            >
              {t("common:text-clear")}
            </Button>
            <Button
              onClick={() => {
                handleFilter();
              }}
              variant="primary"
              className="flex flex-row h-11 font-extrabold text-sm px-5"
            >
              {t("common:text-apply-filter")}
            </Button>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
});

export default FilterTransaction;
