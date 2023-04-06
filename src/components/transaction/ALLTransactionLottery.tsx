import Datatable from "@components/common/datatable";
import Search from "@components/common/datatable/searchTable";
import Datatable3 from "@components/common/datatableType3";
import DaterangePicker from "@components/common/daterangepicker";
import FilterTransaction from "@components/ui/FilterTransaction";
import Indicator from "@components/ui/loading-indicator";
import { useUI } from "@contexts/ui-context";
import useQueryMemberTransaksi from "@framework/transaction/use-transaction";
import { useUserQuery } from "@framework/user/get-user-profile";
import { CookieKeys } from "@lib/constant";
import { CookieStorage } from "@lib/cookie";
import { currencyFormat, handleTruncate } from "@utils/functionutil";
import moment from "moment";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { FaAngleRight, FaCaretRight, FaTimesCircle } from "react-icons/fa";
import { Column } from "react-table";
import { AiFillCloseCircle } from "react-icons/ai";
import Image from "next/image";

const ALLTransactionLottery = (props: any) => {
  const { t } = useTranslation("common");
  const { data: userData } = useUserQuery();
  const router = useRouter();
  const {
    query: {
      limit,
      page,
      tab,
      q,
      memberid,
      start_date,
      end_date,
      market,
      period,
    },
  } = router;

  const DataID = userData?.username ? userData?.username : "mokilo";
  const [search, setSearch] = useState<string>((q as string) || "");
  const [pageSize, setPageSize] = useState<number>(Number(limit) || 10);
  const [currentPage, setCurrentPage] = useState<number>(Number(page) || 1);
  const [OpenDetail, setOpenDetail] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(
    start_date
      ? new Date(moment(start_date).format("YYYY-MM-DD"))
      : new Date(moment().subtract(1, "months").format("YYYY-MM-DD"))
  );
  const [endDate, setEndDate] = useState<Date | null>(
    end_date ? new Date(moment(end_date).format("YYYY-MM-DD")) : new Date()
  );
  const [DataFromFilterType, setDataFromFilterType] = useState([]);
  const [DataFromFilterProvider, setDataFromFilterProvider] = useState<any>([]);
  const Filter = useRef("");
  const dataFilter = Filter.current;
  let DataFilterCount: number = 0;
  let DataFilterCount2: number = 0;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    router.push(
      {
        pathname: `/transaction`,
        query: {
          tab: 1,
          page: page,
          q: search,
          limit: pageSize,
        },
      },
      "",
      { shallow: true }
    );
  };

  const handlePageSizeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCurrentPage(1);
    setPageSize(Number(event.target.value));
    router.push(
      {
        pathname: `/transaction`,
        query: {
          tab: 1,
          page: 1,
          q: search,
          limit: Number(event.target.value),
        },
      },
      "",
      { shallow: true }
    );
  };

  const filter = () => {
    return members.filter((value: any) => {
      return value._id == search;
    });
  };
  const setClearButtonData = () => {
    let data: string[] = [];
    let data2: string[] | any = DataFromFilterType;

    DataFromFilterType?.map((value, index) => {
      data2[index].active = false;
    });

    const dataHandle = DataFromFilterProvider;
    dataHandle?.map((value: object, index: number) => {
      let dataSementara: object | any = value;
      dataSementara.active = false;
      data.push(dataSementara);
    });
    setDataFromFilterType([]);
    setDataFromFilterProvider(data);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.value = event.target.value.substring(0, 20);
    setSearch(event.target.value);
    setCurrentPage(1);
    router.push(
      {
        pathname: `/transaction`,
        query: {
          tab: 1,
          page: 1,
          limit: pageSize,
          q: event.target.value,
        },
      },
      "",
      { shallow: true }
    );
  };

  const handleRanderFilter = () => {
    let datahandle: string[] = [];
    DataFromFilterType.map((value: { active: boolean; value: string }) => {
      if (value.active == true) {
        datahandle.push(value.value);
      }
    });
    DataFilterCount = datahandle.length;
    return datahandle;
  };

  const handleRanderFilterProvider = () => {
    let datahandle: string[] = [];
    DataFromFilterProvider.map((value: { active: boolean; name: string }) => {
      if (value.active == true) {
        datahandle.push(value.name);
      }
    });
    DataFilterCount2 = datahandle.length;

    return datahandle;
  };

  // get Data from api
  const {
    isFetching: isLoading,
    members,
    total,
    totalPage,
    dataMore,
  } = useQueryMemberTransaksi(
    {
      limit: pageSize,
      page: currentPage,
      start_date: startDate,
      end_date: endDate,
      game_type: "lottery",
      sort: "created_at",
      type: handleRanderFilter(),
      provider: handleRanderFilterProvider(),
    },

    DataID
  );

  const RenderFilter = () => {
    return DataFromFilterType?.map(
      (value: { active: boolean; name: string }, i) => {
        if (value.active == true) {
          return (
            <div
              className="bg-[#D3F2FF33] px-4 mr-[10px] mb-[10px] py-2 text-[#d3f2ff80] flex items-center rounded-[4px]"
              key={i}
            >
              <span className="mr-[1rem] uppercase"> {value.name}</span>
              <button
                onClick={() => {
                  let data: string[] | any = [];
                  const dataHandle = DataFromFilterType;
                  dataHandle?.map((value, index) => {
                    if (index !== i) {
                      data.push(value);
                    } else {
                      let dataSementara: { active: boolean } = value;
                      dataSementara.active = false;
                      data.push(dataSementara);
                    }
                  });
                  setDataFromFilterType(data);
                }}
              >
                <FaTimesCircle />
              </button>
            </div>
          );
        }
      }
    );
  };
  const RenderFilterProfider = () => {
    return DataFromFilterProvider?.map(
      (value: { active: boolean; name: string }, i: number) => {
        if (value.active == true) {
          return (
            <div
              className="bg-[#D3F2FF33] h-[38px] px-4 mr-[10px] mb-[10px] text-[#d3f2ff80] flex items-center space-x-2 rounded-[4px]"
              key={i}
            >
              <Image
                src={`/images/provider/icon/${value.name}.png`}
                className="h-4 object-contain"
                alt={value.name}
                width={16}
                height={16}
              />
              <span className="uppercase"> {value.name}</span>
              <button
                onClick={() => {
                  let data: any = [];
                  const dataHandle = DataFromFilterProvider;
                  dataHandle?.map((value: any, index: number) => {
                    if (index !== i) {
                      data.push(value);
                    } else {
                      let dataSementara: any = value;
                      dataSementara.active = false;
                      data.push(dataSementara);
                    }
                  });
                  setDataFromFilterProvider(data);
                }}
              >
                <FaTimesCircle />
              </button>
            </div>
          );
        }
      }
    );
  };

  const columns: Array<Column<object>> = [
    {
      Header: () => (
        <div className="styleHeader justify-left ml-[2rem]">
          {t(`text-date`)}
        </div>
      ),
      accessor: "created_at",
      Cell: ({ value }: any) => {
        return (
          <div className="styleRow whitespace-nowrap text-left text-whiteDefault-50 text-[14px] ml-[2rem]">
            {moment(value).format("DD/MM/YYYY HH:mm:ss")}
          </div>
        );
      },
    },
    {
      Header: () => (
        <div className="styleHeader justify-left ">
          {" "}
          {t(`text-provider-default`)}
        </div>
      ),
      accessor: "provider",
      Cell: ({ value }: any) => {
        const handleLx = (data: string) => {
          return data?.toLowerCase() == "lx" ? "LX" : data;
        };
        return (
          <div className="styleRow text-left text-whiteDefault-50  text-[14px]">
            {value == null ? "-" : handleLx(value)}
          </div>
        );
      },
    },

    {
      Header: () => (
        <div className="styleHeader justify-left">{t(`text-game-name`)}</div>
      ),
      accessor: "game_name",
      Cell: (value: any) => {
        return (
          <div className="styleRow whitespace-nowrap text-left text-whiteDefault-100 text-[14px]">
            {value?.cell.row.original.game_name == null &&
            value?.cell.row.original.real_market != null
              ? value?.cell.row.original.type == "win" ||
                value?.cell.row.original.type == "bet"
                ? "Togel"
                : value?.cell.row.original.type.replaceAll("_", " ")
              : value?.cell.row.original.game_name == null
              ? value?.cell.row.original.type.replaceAll("_", " ")
              : value?.cell.row.original.game_name}
          </div>
        );
      },
    },

    {
      id: "Amount",
      Header: () => (
        <div className="styleHeader justify-end">{t(`text-amount`)}</div>
      ),
      accessor: "amount",
      Cell: (value: any) => {
        if (
          value?.cell.row.original.credit == 0 ||
          value?.cell.row.original.credit == undefined
        ) {
          return (
            <div className="styleRow whitespace-nowrap text-right text-failed text-[14px]">
              Rp {currencyFormat(value?.cell.row.original.debit)}
            </div>
          );
        } else {
          return (
            <div className="styleRow whitespace-nowrap text-right text-success text-[14px]">
              Rp {currencyFormat(value?.cell.row.original.credit)}
            </div>
          );
        }
      },
    },
    {
      Header: () => (
        <div className="styleHeader  justify-left text-left">
          {" "}
          {t(`text-type`)}
        </div>
      ),
      accessor: "type",
      Cell: ({ value }) => {
        return (
          <div className="styleRow text-whiteDefault-100 text-left max-w-[5rem]  text-[14px] truncate">
            {value.replaceAll("_", " ")}
          </div>
        );
      },
    },
    {
      Header: () => (
        <div className="styleHeader justify-end">{t(`text-my-balance`)}</div>
      ),
      accessor: "balance",
      Cell: ({ value }) => {
        return (
          <div className="styleRow whitespace-nowrap text-whiteDefault-100 text-right text-[14px]">
            Rp {currencyFormat(value)}
          </div>
        );
      },
    },
    {
      Header: " ",
      accessor: "",
      Cell: (value: any) => {
        if (
          value?.cell.row.original.type !== "win" &&
          value?.cell.row.original.type !== "bet"
        ) {
          return (
            <div className="flex justify-end">
              <button
                onClick={() => {
                  props.setData(value?.cell.row.original);
                  props.setType("detaildata");
                  router.push(
                    {
                      pathname: `/transaction`,
                      query: { tab: 1 },
                    },
                    undefined,
                    { shallow: true }
                  );
                }}
                className=" py-1 text-[#D3F2FF] bg-white/5 hover:bg-whiteDefault-15 transition duration-200 ease-in-out rounded-full text-center items-center w-7 h-7 flex justify-center font-bold text-xs mr-[0.6rem]"
              >
                <span className=" rounded-full  min-h-[1.5rem] flex justify-center items-center min-w-[1.5rem] ">
                  <FaAngleRight strokeWidth={3.2} size={14} />
                </span>
              </button>
            </div>
          );
        } else {
          return (
            <div className="flex justify-end">
              <button
                onClick={() => {
                  props.setData(value?.cell.row.original);
                  if (
                    value?.cell.row.original.game_name == null &&
                    value?.cell.row.original.real_market != null
                  ) {
                    props.setType("detaillotery");
                    router.push(
                      {
                        pathname: `/transaction`,
                        query: { tab: 1 },
                      },
                      undefined,
                      { shallow: true }
                    );
                  } else {
                    props.setType("detaildata");
                    router.push(
                      {
                        pathname: `/transaction`,
                        query: { tab: 1 },
                      },
                      undefined,
                      { shallow: true }
                    );
                  }
                }}
                className="py-1 text-[#D3F2FF] bg-white/5 hover:bg-whiteDefault-15 transition duration-200 ease-in-out rounded-full text-center items-center w-7 h-7 flex justify-center font-bold text-xss mr-[0.6rem]"
              >
                <span className=" rounded-full  min-h-[1.5rem] flex justify-center items-center min-w-[1.5rem] ">
                  <FaAngleRight strokeWidth={3.2} size={14} />
                </span>
              </button>
            </div>
          );
        }
      },
    },
  ];

  return (
    <div className={`bg_content_container lg:w-full  w-full md:rounded-10 text-white py-6 md:px-0 md:py-0 mb-4`}>
      {isLoading && <Indicator />}
      <div className="md:px-10 md:py-[30px]">
        <h1 className="text-left px-mobile md:px-0 mb-[20px] text-[18px] font-semibold md:text-[20px]">
          Ringkasan Transaksi Permainan
        </h1>
        <div className="px-mobile px-desktop md:px-0 items-center flex justify-between space-x-3 mb-[30px] md:mb-0 ">
          <div className="w-full flex-col sm:flex-row justify-between flex sm:space-x-3 space-x-0 items-center">
            <div className="flex flex-col md:flex-row md:space-x-3 w-full">
              {" "}
              <div>
                <p className="hidden md:flex mb-[5px] text-left text-[#D3F2FF]/60 text-xs font-light">
                  Pilih Periode
                </p>
                <DaterangePicker
                  display={1}
                  position={"left"}
                  startDate={startDate as Date}
                  endDate={endDate as Date}
                  onEndDateChange={setEndDate}
                  onStartDateChange={setStartDate}
                />
              </div>
              <div className="flex mt-[10px] md:mt-0 space-x-3 justify-between">
                <div className="w-full">
                  <p className="hidden md:flex mb-[5px]  text-left text-[#D3F2FF]/60 text-xs font-light">
                    Search
                  </p>
                  <Search
                    placeholder={"Search"}
                    value={search}
                    onSearchChange={(e) => {
                      handleSearchChange(e);
                    }}
                    className={"w-full"}
                    key="select"
                    name="tes"
                  />
                </div>
                <div>
                  <p className="hidden md:flex mb-[5px]  text-left  text-[#D3F2FF]/60 text-xs font-light">
                    Filter
                  </p>
                  <FilterTransaction
                    ref={Filter}
                    DataFilter={false}
                    setData={setDataFromFilterType}
                    setDataProvider={setDataFromFilterProvider}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {DataFilterCount > 0 || DataFilterCount2 > 0 ? (
          <div className="w-full px-mobile md:px-0 flex-row sm:flex-row flex flex-wrap mt-[1rem]  overflow-hidden overflow-x-auto items-center">
            <>
              <div className="w-full flex items-center justify-between md:hidden mb-[15px]">
                <span className="text-lg font-light uppercase">
                  Hasil Filter
                </span>
                <button
                  onClick={() => setClearButtonData()}
                  className="space-x-2 items-center rounded bg-transparent flex"
                >
                  <span className="text-white text-sm font-normal">
                    Hapus Filter
                  </span>
                  <AiFillCloseCircle className="text-[#D3F2FF]/50" />
                </button>
              </div>
            </>

            {RenderFilter()}
            {RenderFilterProfider()}

            <>
              <div
                onClick={() => {
                  setClearButtonData();
                }}
                className="hidden bg-transparent h-[38px] px-4 mr-[10px] mb-[10px] text-[#d3f2ff80] md:flex items-center space-x-2 rounded-[4px] cursor-pointer"
              >
                <span className="text-white text-sm">Hapus Filter</span>
                <AiFillCloseCircle className="text-[#D3F2FF]/50" />
              </div>
            </>
          </div>
        ) : null}
      </div>

      <hr className="hidden md:block border-[#4a71a06e] mb-0" />

      <>
        <div className="hidden md:flex ">
          <Datatable
            data={members ? (search !== "" ? filter() : members) : []}
            columns={columns}
            totalItems={total}
            pageSize={pageSize}
            totalPage={totalPage}
            isLoading={isLoading}
            currentPage={currentPage}
            hasMore={dataMore}
            classEven="hover:bg-[#203C50] bg-[#07263D]"
            classOdd="hover:bg-[#203C50]  "
            onPageSizeChange={handlePageSizeChange}
            onPageChange={handlePageChange}
            tableClassName="w-full "
          />
        </div>

        <div className="flex px-mobile px-desktop mt-5 md:px-0 w-full md:hidden">
          <Datatable3
            data={members ? (search !== "" ? filter() : members) : []}
            tab={1}
            columns={columns}
            totalItems={total}
            onClickData={props.setData}
            pageSize={pageSize}
            totalPage={totalPage}
            isLoading={isLoading}
            hasMore={dataMore}
            currentPage={currentPage}
            setType={props.setType}
            setData={props.setData}
            classEven="hover:bg-[#203C50] bg-[#07263D]"
            classOdd="hover:bg-[#203C50]"
            onPageSizeChange={handlePageSizeChange}
            onPageChange={handlePageChange}
            tableClassName="w-full "
          />
        </div>
      </>
    </div>
  );
};

export default ALLTransactionLottery;
