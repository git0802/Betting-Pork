import Datatable from "@components/common/datatable";
import DatatableHistory from "@components/common/datatableType2";
import DaterangePicker from "@components/common/daterangepicker";
import moment from "moment";
import Indicator from "@components/ui/loading-indicator";

import { DropdownDefault } from "@components/common/dropdown/DropdownDefault";
import { Veryvy } from "@components/icons";
import { useUserQuery } from "@framework/user/get-user-profile";
import { useQueryGetWithdrawalHistory } from "@framework/user/get-user-withdrawal-history";
import { currencyFormat } from "@utils/functionutil";
import { BankIcon } from "@utils/functionutil/Function";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Column } from "react-table";
import { useUI } from "../../../contexts/ui-context";

interface IHistoryWithdrawProps {
  scrollToTop:()=>void;
  pageSelcted:Dispatch<SetStateAction<string>>;
}

const HistoryWithdraw = (props: IHistoryWithdrawProps) => {
  const { t } = useTranslation("common");
  const { data: datauser }: any = useUserQuery();
  const router = useRouter();
  const {
    query: {
      limit,
      page,
      tab,
      type,
      q,
      memberid,
      start_date,
      end_date,
      market,
      period,
    },
  } = router;

  const [search, setSearch] = useState<string>((q as string) || "");
  const [pageSize, setPageSize] = useState<number>(Number(limit) || 10);
  const [currentPage, setCurrentPage] = useState<number>(Number(page) || 1);
  const [Data, setData] = useState<any>([]);
  const [startDate, setStartDate] = useState<Date | null>(
    start_date
      ? new Date(moment(start_date).format("YYYY-MM-DD"))
      : new Date(moment().subtract(1, "months").format("YYYY-MM-DD"))
  );
  const [DataHistoryTpe, setDataHistoryTpe] = useState("Withdraw");
  const [endDate, setEndDate] = useState<Date | null>(
    end_date ? new Date(moment(end_date).format("YYYY-MM-DD")) : new Date()
  );
  const [DataHistory, setDataHistory] = useState("");
  const [DataHistoryType, setDataHistoryType] = useState("Deposit");
  const [StatusFilter, setStatusFilter]: any = useState([]);
  const {
    DataHistory: dataWithdraw,
    isLoading,
    DataMore,
    CurrentPage,
  } = useQueryGetWithdrawalHistory(
    StatusFilter == ""
      ? {
          start_date: startDate,
          end_date: endDate,
          page: currentPage,
          q: search,
          limit: pageSize,
          id: datauser?._id,
        }
      : {
          start_date: startDate,
          end_date: endDate,
          status: StatusFilter,
          page: currentPage,
          q: search,
          limit: pageSize,
          id: datauser?._id,
        }
  );

  const dataSelectStatus = [
    { name: "Semua Status", value: "" },
    { name: "Memproses", value: "pending" },
    { name: "Berhasil", value: "approved" },
    { name: "Gagal", value: "rejected" },
  ];

  const dataTypeHistory = [
    { name: "Withdraw", value: "Withdraw" },
    { name: "Deposit", value: "Deposit" },
  ];

  const [WithdrawStatus, setWithdrawStatus] = useState(false);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    router.push(
      {
        pathname: `/wallet`,
        query: {
          tab: 2,
          page: page,
          q: search,
          limit: pageSize,

          status: DataHistory,
        },
      },
      "",
      { shallow: false }
    );
  };

  const renderBankPengirim = (data: any) => {

    const dataHandle = data.sender ? data.sender : [];
    return dataHandle?.map((value :any) => {
      return (
        <div className="md:w-1/2 flex w-full flex-col mb-5">
          <p className="text-sm font-normal text-whiteDefault-60 uppercase mb-[15px] ">
            Rekening Pengirim
          </p>
          <div>{BankIcon(value.bank, 1.7)}</div>

          <p className="text-whiteDefault-100 text-sm font-normal mt-[0.5rem]">
            {value.bank_account_number}
          </p>
          <p className="text-whiteDefault-100 text-sm font-normal uppercase">
            {value.bank_account_name}
          </p>
        </div>
      );
    });
  };

  const { isReady } = useUI();

  useEffect(() => {
    if (isReady) {
      props?.scrollToTop();
    }
  }, [WithdrawStatus, isReady]);

  useEffect(() => {
    router.push(
      {
        pathname: `/wallet`,
        query: {
          tab: 2,
          page: page,
          q: search,
          limit: pageSize,

          status: DataHistory,
          id: datauser?._id,
        },
      },
      "",
      { shallow: false }
    );
  }, [startDate, endDate]);

  const handlePageSizeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCurrentPage(1);
    setPageSize(Number(event.value));
    router.push(
      {
        pathname: `/wallet`,
        query: {
          tab: 2,
          page: 1,
          q: search,

          status: DataHistory,
          limit: Number(event.value),
        },
      },
      "",
      { shallow: false }
    );
  };

  // useEffect(() => {
  //   if (WithdrawStatus === false) {
  //     document
  //       ?.getElementById("detailFocusID")
  //       .scrollIntoView({ behavior: "smooth", block: "start" });
  //   } else {
  //     document
  //       ?.getElementById("detailFocusID2")
  //       .scrollIntoView({ behavior: "smooth", block: "start" });
  //   }
  // }, [props, WithdrawStatus]);

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentPage(1);
    let dataArr = [];
    dataArr.push(event.value);
    setStatusFilter(dataArr);
    if (event.value == "") {
      router.push(
        {
          pathname: `/wallet`,
          query: {
            tab: 2,
            page: 1,
            q: search,

            id: datauser?._id,
            limit: pageSize,
          },
        },
        "",
        { shallow: false }
      );
    } else {
      const data = [event.value];
      router.push(
        {
          pathname: `/wallet`,
          query: {
            tab: 2,
            page: 1,
            q: search,

            id: datauser?._id,
            limit: pageSize,
          },
        },
        "",
        { shallow: false }
      );
    }
  };

  const handleDataTypeChange = (event: any) => {
    setCurrentPage(1);
    props.pageSelcted(event.value);
    setDataHistoryType(event.value);
  };

  // get Data from api

  const columns: Array<Column<object>> = [
    {
      Header: <p className="ml-0 md:ml-[2rem] styleHeader">{t(`text-date`)}</p>,
      accessor: "created_at",
      Cell: ({ value }: any) => {
        return (
          <div className="py-1 rounded text-left font-normal text-[14px] ml-0 lg:ml-[2rem]">
            {moment(value).format("DD/MM/YYYY HH:mm:ss")}
          </div>
        );
      },
    },
    {
      Header: (
        <p className="ml-0 styleHeader text-left">
          {t(`text-bankSend`)}
        </p>
      ),
      accessor: "-",
      Cell: (value: any): any => {
        const RenderSender = (valuedata: any) => {
          const dataHandle = valuedata.sender ? valuedata.sender : [];
          return dataHandle.map((value: any, index: number) => {
            return (
              <span className="w-full uppercase" key={index}>
                {value.bank}-{value.bank_account_name}-
                {value.bank_account_number}
              </span>
            );
          });
        };
        return value?.cell.row.original.sender ? (
          <div className="py-1 rounded text-left font-normal flex flex-col text-[14px] uppercase">
            {RenderSender(value?.cell.row.original)}
          </div>
        ) : (
          <div className=" text-center rounded flex w-full font-normal text-[14px] uppercase">
            <span className="text-left w-full"> No Data</span>
          </div>
        );
      },
    },
    {
      Header: (
        <p className="ml-0 md:ml-[2rem] styleHeader">
          {t(`text-bankDestination`)}
        </p>
      ),
      accessor: "--",
      Cell: (value: any): any => {
        return (
          <div className="py-1 rounded text-left font-normal text-[14px] uppercase">
            {value?.cell.row.original.bank
              ? value?.cell.row.original.bank +
                "-" +
                value?.cell.row.original.bank_account_name +
                "-" +
                value?.cell.row.original.bank_account_number
              : "-"}
          </div>
        );
      },
    },
    {
      id: "Jumlah",
      Header: () => (
        <div className="w-full justify-end flex styleHeader">
          {t(`text-amount`)}
        </div>
      ),
      accessor: "amount",
      Cell: (value: any): any => {
        return (
          <div className="py-1 rounded text-right font-normal  text-[14px] text-whiteDefault-100">
            Rp {currencyFormat(value.value)}
          </div>
        );
      },
    },
    {
      Header: () => <div className="styleHeader justify-center">Status</div>,
      accessor: "Status",
      Cell: (value: any): any => {
        if (value?.cell.row.original.status == "approved") {
          return (
            <div className="flex justify-center">
              <button className="py-1 text-[#05FF00] bg-[#73FF89]/10 rounded text-center w-[5.5rem] font-bold text-xs">
                Berhasil
              </button>
            </div>
          );
        }
        if (value?.cell.row.original.status == "pending") {
          return (
            <div className="flex justify-center">
              <button className="py-1 text-[#FFA800] bg-[#FFA800]/10 rounded text-center w-[5.5rem] font-bold text-xs">
                Memproses
              </button>
            </div>
          );
        }
        if (value?.cell.row.original.status == "rejected") {
          return (
            <div className="flex justify-center">
              <button className="py-1 text-[#FF5C5F] bg-[#FF9292]/20 rounded text-center w-[5.5rem] font-bold text-xs">
                Gagal
              </button>
            </div>
          );
        }
      },
    },
    {
      Header: " ",
      accessor: "",
      Cell: (value: any) => {
        return (
          <div className="flex justify-end mr-[0.5rem]">
            <button
              onClick={() => {
                setData(value?.cell.row.original);

                setWithdrawStatus(!WithdrawStatus);
              }}
              className="py-1 text-[#D3F2FF] bg-white/5 text-[14px] hover:bg-whiteDefault-15 transition duration-200 ease-in-out rounded-full  text-center items-center w-7 h-7 flex justify-center  font-bold  text-xs"
            >
              <FiChevronRight size={14} strokeWidth={3.2}  />
            </button>
          </div>
        );
      },
    },
  ];

  const renderHalaman = () => {
    if (WithdrawStatus === false) {
      return (
        <div
          id="detailFocusID"
          className="bg_content_container flex flex-col lg:bg-none w-full md:rounded-10 text-white py-6 md:px-0 md:py-0"
        >
          {isLoading && <Indicator />}

          <div className="px-mobile md:px-10 md:py-[30px]">
            <div className="w-full">
              <h1 className="text-[24px] text-left mb-[1.8rem]">
                Riwayat Transaksi Withdraw
              </h1>
              <div className="flex  flex-col lg:flex-row space-x-1 justify-between  w-full mt-[1rem]">
                <div className="flex   flex-col lg:flex-row  space-y-8 lg:space-x-2">
                  <div className="flex flex-col lg:flex-row items-end  md:mt-0    space-y-6 lg:space-y-0 space-x-2">
                    <div className="w-full relative md:mb-[-1px] mb-[-0.9rem] ">
                      <span className="hidden md:flex text-[#D3F2FF]/60 absolute mt-[-1.2rem] left-[0rem] text-xs font-light">
                        Type
                      </span>
                      <DropdownDefault
                        data={dataTypeHistory}
                        onChange={(e: any) => {
                          handleDataTypeChange(e);
                        }}
                      />
                    </div>

                    <div className="w-full relative ">
                      <span className="hidden md:flex text-[#D3F2FF]/60 absolute mt-[-1.2rem] text-xs font-light left-[0rem]">
                        Pilih Periode
                      </span>
                      <DaterangePicker
                        display={1}
                        position={"right"}
                        startDate={startDate as Date}
                        endDate={endDate as Date}
                        onEndDateChange={setEndDate}
                        onStartDateChange={setStartDate}
                      />
                    </div>
                  </div>
                  <div className="flex space-x-2 lg:space-x-2 lg:mt-0">
                    <div className="flex flex-col w-full lg:w-full relative  mt-[-1.3rem] ">
                      <span className=" hidden md:flex text-[#D3F2FF]/60 absolute mt-[-1.2rem] text-xs font-light">
                        Status
                      </span>
                      <DropdownDefault
                        data={dataSelectStatus}
                        onChange={(e: any) => {
                          handleStatusChange(e);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr className="mx-4 md:mx-0 my-6 md:my-[1px] border-whiteDefault-20" />
          <div className="hidden lg:block">
            <Datatable
              data={dataWithdraw ? dataWithdraw : []}
              columns={columns}
              totalItems={dataWithdraw?.total_items}
              pageSize={pageSize}
              pagination={true}
              totalPage={dataWithdraw?.total_page}
              isLoading={isLoading}
              currentPage={CurrentPage}
              classEven="hover:bg-[#203C50] bg-[#07263D]"
              classOdd="hover:bg-[#203C50] "
              onPageSizeChange={handlePageSizeChange}
              onPageChange={handlePageChange}
              hasMore={DataMore}
              tableClassName="w-full "
            />
          </div>
          <div className="flex px-mobile px-desktop md:px-0 w-full md:hidden">
            <DatatableHistory
              data={dataWithdraw ? dataWithdraw : []}
              type="withdraw"
              columns={columns}
              pagination={true}
              totalItems={dataWithdraw?.total_items}
              pageSize={pageSize}
              totalPage={dataWithdraw?.total_page}
              isLoading={isLoading}
              currentPage={CurrentPage}
              classEven="hover:bg-[#203C50] bg-[#07263D]"
              classOdd="hover:bg-[#203C50] "
              onPageSizeChange={handlePageSizeChange}
              onPageChange={handlePageChange}
              onClickDetail={(e) => {
                setData(e);
                setWithdrawStatus(!WithdrawStatus);
              }}
              tableClassName="w-full "
            />
          </div>
        </div>
      );
    } else {
      return (
        <div
          id="detailFocusID2"
          className="flex flex-col bg-[#07243A]  lg:bg-backgroundDefault-100 lg:bg-none w-full md:rounded-10 text-white py-6 md:px-0 md:py-0"
        >
          {isLoading && <Indicator />}
          <div className="flex flex-col xl:flex-row justify-between space-x-0 space-y-5 xl:space-y-0 xl:space-x-10 md:py-[30px] px-mobile md:px-10">
            <div className="flex justify-between text-left md:text-left flex-col">
              <button
                onClick={() => {
                  setWithdrawStatus(!WithdrawStatus);
                }}
                className="mb-[2rem] flex  md:hidden  items-center opacity-70 space-x-2"
              >
                <div className="flex items-center justify-center bg-whiteDefault-10 rounded-full w-[20px] h-[20px]">
                  <FiChevronLeft strokeWidth={3.2} className="bg-transparent font-bold text-whiteDefault-100" />
                </div>
                <span className="text-sm text-white font-normal"> Kembali</span>
              </button>
              <h1 className="text-lg mb-[15px]">Detil Transaksi</h1>
              <p className="text-whiteDefault-60 text-sm md:text-[14px]  font-normal">
                {moment(Data.created_at).format("DD/MM/YYYY - HH:mm")}
              </p>
              <p className="text-whiteDefault-60 text-sm md:text-[14px]  font-normal">
                Form #{Data._id}
              </p>

              <h1 className="text-lg md:text-[18px] uppercase text-white mt-[0.4rem]">
                {t(`text-withdraw`)}
              </h1>
            </div>
            <div className="flex items-center justify-start md:justify-end h-fit w-full flex-row md:flex-row md:w-5/12 space-x-2">
              <h1 className="text-sm font-normal text-whiteDefault-100 md:text-[32px] md:font-semibold">
                Rp {currencyFormat(Data.amount)}
              </h1>
              {Data.status == "approved" ? (
                <button className="text-success bg-success/10 h-[25px] md:h-10 px-[7px] py-[5px] md:px-[16px] uppercase md:py-[11px] text-xs md:text-sm font-semibold rounded">
                  Berhasil
                </button>
              ) : null}

              {Data.status == "pending" ? (
                <button className="text-onProcess bg-onProcess/10 h-[25px] md:h-10 px-[7px] py-[5px] uppercase md:px-[16px] md:py-[11px] text-xs md:text-sm font-semibold rounded">
                  Memproses
                </button>
              ) : null}
              {Data.status == "rejected" ? (
                <button className="text-failed bg-failed/20 h-[25px] md:h-10 px-[7px] py-[5px] md:px-[16px] uppercase md:py-[11px] text-xs md:text-sm font-semibold rounded">
                  Gagal
                </button>
              ) : null}
            </div>
          </div>
          <hr className="mx-4 md:mx-0 my-6 md:my-0 border-whiteDefault-20" />
          <div className="flex flex-col xl:flex-row justify-between space-x-0 space-y-5 xl:space-y-0 xl:space-x-10 md:py-[30px] px-mobile md:px-10">
            <div className="flex md:justify-between flex-col md:flex-row text-left w-full">
              {renderBankPengirim(Data)}
              <div className="md:w-1/2">
                {" "}
                <p className="text-sm font-normal text-whiteDefault-60 uppercase mb-[15px] ">
                  Rekening Anda
                </p>
                <span className="">{BankIcon(Data?.bank, 1.7)}</span>
                <p className="text-whiteDefault-100 text-sm font-normal mt-[0.5rem]">
                  {Data?.bank_account_number}
                </p>
                <p className="text-whiteDefault-100 text-sm font-normal uppercase">
                  {Data?.bank_account_name}
                </p>
              </div>
            </div>

            {Data.status == "approved" ? (
              <div className="flex items-center w-full md:w-[195px] h-fit justify-start md:justify-end">
                <p className="flex flex-row md:flex-col text-white/30 order-2 md:order-1 text-xs text-right mr-4">
                  <span className="uppercase">Form Approved</span>
                  {/* <span>29/10/2022 - 12:23PM</span> */}
                </p>
                <Veryvy className="order-1 md:order-1 mr-[10px] md:mr-0" />
              </div>
            ) : Data.status == "pending" ? null : (
              <div className="flex items-center text-failed rounded-sm w-6/12 h-[3rem] px-8 bg-failed/20">
                <h1>Transaksi tidak ditemukan</h1>
              </div>
            )}
          </div>
          <div className="px-10 py-[30px]">
            <button
              onClick={() => {
                setWithdrawStatus(!WithdrawStatus);
              }}
              className="hidden md:flex items-center opacity-70 space-x-2 hover:opacity-100 transition duration-200 ease-in-out"
            >
              <div className="flex items-center justify-center bg-whiteDefault-10 rounded-full w-[20px] h-[20px]">
                <FiChevronLeft strokeWidth={3.2} className="bg-transparent font-bold text-whiteDefault-100" />
              </div>
              <span className="text-base text-whiteDefault-50 font-normal">
                Kembali
              </span>
            </button>
          </div>
        </div>
      );
    }
  };
  return <>{renderHalaman()}</>;
};

export default HistoryWithdraw;
