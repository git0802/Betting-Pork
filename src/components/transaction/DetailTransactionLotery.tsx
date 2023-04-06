import classnames from "classnames";
import moment from "moment";
import React, { useEffect, useState } from "react";

import Datatable from "@components/common/datatable";
import DatatableTypeLotery from "@components/common/datatableTypeLotery";
import Indicator from "@components/common/indicator";
import { fetchInvoiceGame } from "@framework/transaction/get-Invoice-game";
import useQueryInvoiceBet from "@framework/transaction/use-invoice-bet";
import { currencyFormat } from "@utils/functionutil";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { FaAngleLeft, FaCaretLeft } from "react-icons/fa";
import { Column } from "react-table";

interface dataGameType {
  length: number;
  game: string;
  amount: number;
  paid: number;
  win: number;
  period: number;
  market: string;
}

const DetailTransactionLotery = (props: any) => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const [Filter, setFilter] = useState("");
  const {
    query: { limit, page, q, memberid, start_date, tab, end_date },
  } = router;
  const [DataGame, setDataGame] = useState<any>({} as dataGameType);
  const [DataSelected, setDataSelected] = useState<any>(
    ([] as any) || ({} as dataGameType)
  );
  const [search, setSearch] = useState<string>((q as string) || "");
  const [pageSize, setPageSize] = useState<number>(Number(limit) || 3000);
  const [currentPage, setCurrentPage] = useState<number>(Number(page) || 1);
  const [OpenDetail, setOpenDetail] = useState(false);
  const [DataFilteredCampuran, setDataFilteredCampuran] = useState("4D");

  const [startDate, setStartDate] = useState<Date | null>(
    start_date
      ? new Date(moment(start_date).format("YYYY-MM-DD"))
      : new Date(moment().subtract(1, "months").format("YYYY-MM-DD"))
  );
  const [endDate, setEndDate] = useState<Date | null>(
    end_date ? new Date(moment(end_date).format("YYYY-MM-DD")) : new Date()
  );
  const [DataTransaction, setDataTransaction] = useState(
    props ? props.Data : []
  );

  const { members: DataInvoice, isLoading } = useQueryInvoiceBet(
    {
      game: DataFilteredCampuran,
      limit: pageSize,
      page: currentPage,
    },
    DataTransaction
      ? DataTransaction.type == "win"
        ? DataTransaction.relation_id
        : DataTransaction._id
      : null
  );

  useEffect(() => {
    props.Data == undefined ? props.setType("") : null;
    document
      ?.getElementById("detailFocusID")
      .scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  useEffect(() => {
    getDataGame();
  }, [DataFilteredCampuran]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    router.push(
      {
        pathname: `/transaction`,
        query: {
          tab: tab,
          type: "detaillotery",

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
          tab: tab,
          type: "detaillotery",
          page: 1,
          q: search,
          limit: Number(event.target.value),
        },
      },
      "",
      { shallow: true }
    );
  };

  const randerFilter = () => {
    if (DataGame?.length >= 2) {
      return (
        <div className="flex mx-4 my-4">
          <button
            onClick={() => {
              setDataFilteredCampuran("4D");
              setCurrentPage(1);
            }}
            className={` ${
              DataFilteredCampuran == "4D"
                ? "bg-[#1AA9E7] text-[#fff] hover:bg-[#1AA9E7]/80 transition duration-200 ease-in-out"
                : "bg-[#d3f2ff33]"
            } border-r-[1px] border-[#ffffff3f] px-4 py-2 rounded-l-md`}
          >
            4D
          </button>
          <button
            onClick={() => {
              setDataFilteredCampuran("3D");
              setCurrentPage(1);
            }}
            className={` ${
              DataFilteredCampuran == "3D" ? "bg-[#1AA9E7] " : "bg-[#d3f2ff33]"
            }  px-4 py-2`}
          >
            3D
          </button>
          <button
            onClick={() => {
              setDataFilteredCampuran("2D");
              setCurrentPage(1);
            }}
            className={` ${
              DataFilteredCampuran == "2D" ? "bg-[#1AA9E7] " : "bg-[#d3f2ff33]"
            }  border-l-[1px] border-[#ffffff3f]  px-4 py-2 rounded-r-md`}
          >
            2D
          </button>
        </div>
      );
    }
  };

  const columns: Array<Column<object>> = [
    {
      Header: <p className="text-[14px]">{t(`text-game-name`)}</p>,
      accessor: "game",
    },
    {
      Header: <p className="text-[14px] flex">{t(`text-date`)}</p>,
      accessor: "created_at",
      Cell: ({ value }: any) => {
        return (
          <div className=" py-1  rounded text-left  font-bold  text-xs">
            {moment(value).format("DD-MM-YYYY HH:mm:ss")}
          </div>
        );
      },
    },
    {
      Header: (value: object | any) => (
        <div className="w-full justify-left  text-[14px] flex">
          {value?.rows[0]?.original.number == null
            ? t(`text-number-group`)
            : t(`text-number`)}
        </div>
      ),
      accessor: "number",
      Cell: (value: object | any) => {
        if (value.row.original.number == null) {
          const render = () => {
            return value.row.original.number_groups.map(
              (data: any, i: number) => {
                return (
                  <div key={i}>
                    {data.number} {data.position ? "-" : ""} {data.position}
                  </div>
                );
              }
            );
          };
          return (
            <div className=" py-1 text-whiteDefault-100 cursor-pointer rounded text-center  font-bold uppercase text-xs">
              {render()}
            </div>
          );
        } else {
          return (
            <div className=" py-1 text-whiteDefault-100 cursor-pointer rounded text-left    font-bold uppercase text-xs">
              {value.row.original.number == null
                ? "-"
                : value.row.original.number}
            </div>
          );
        }
      },
    },
    {
      Header: <p className="text-[14px]">{t(`text-status`)}</p>,
      accessor: "status",
      Cell: ({ value }: any) => {
        return (
          <div className=" py-1 text-whiteDefault-100 rounded text-left  font-bold  text-xs uppercase">
            {value}
          </div>
        );
      },
    },
    {
      id: "Position",
      Header: <p className="text-[14px]"> {t(`text-position`)}</p>,
      accessor: "position",
      Cell: (value: object | any) => {
        return (
          <div className=" py-1 text-whiteDefault-100 cursor-pointer rounded text-left  font-bold uppercase text-xs">
            {value.row.original.position == null
              ? "-"
              : value.row.original.position}
          </div>
        );
      },
    },
    {
      id: "Amount",
      Header: () => (
        <div className="w-full justify-end flex text-[14px]">
          {t(`text-amount`)}
        </div>
      ),
      accessor: "amount",
      Cell: (value: number | any) => {
        return (
          <div className=" py-1 rounded text-right min-w-[4rem] text-whiteDefault-100 font-bold uppercase text-xs">
            Rp. {currencyFormat(value?.cell.row.original.amount)}
          </div>
        );
      },
    },

    {
      Header: () => (
        <div className="w-full justify-end flex mr-[1rem] capitalize text-[14px]">
          {t(`text-paid`)}
        </div>
      ),

      accessor: "paid",

      Cell: ({ value }: number | any) => {
        return (
          <div className=" py-1 text-whiteDefault-100 min-w-[4rem] rounded text-right font-bold uppercase text-xs">
            Rp. {currencyFormat(value)}
          </div>
        );
      },
    },
    {
      Header: () => (
        <div className="w-full justify-end flex mr-[2rem] text-[14px]">
          {t(`text-win`)}
        </div>
      ),

      accessor: "win",

      Cell: ({ value }: number | any) => {
        return (
          <div className=" py-1 text-whiteDefault-100 min-w-[6rem] rounded text-right mr-[2rem] font-bold uppercase text-xs">
            Rp. {currencyFormat(value)}
          </div>
        );
      },
    },
  ];

  const getDataGame = async () => {
    if (DataTransaction) {
      if (DataTransaction.type == "win") {
        await fetchInvoiceGame(DataTransaction?.relation_id)
          .then((res) => {
            if (res.length >= 2) {
              setDataGame(res);
              setDataFilteredCampuran(res.game);
            } else {
              setDataGame(res[0]);
              setDataFilteredCampuran(res[0].game);
            }
          })
          .catch((err) => {
            // toast.error("get Data game Error");
            props.setType("");
          });
      } else {
        await fetchInvoiceGame(DataTransaction?._id)
          .then((res) => {
            if (res.length >= 2) {
              setDataGame(res);
              setDataFilteredCampuran(res.game);
            } else {
              setDataGame(res[0]);
              setDataFilteredCampuran(res[0].game);
            }
          })
          .catch((err) => {
            // toast.error("get Data game Error");
            props.setType("");
          });
      }
    }
  };

  const RenderSelected = () => {
    const RenderNumber = (data: string) => {
      const DataHandle = data.split("");
      return DataHandle.map((values, i) => {
        return (
          <div
            className="w-[58px] md:w-[41px] h-[58px] md:h-[38px] flex items-center justify-center rounded-[5px] bg-inputColor-100 text-whiteDefault-100 text-[28px] md:text-[22px] font-bold"
            key={i}
          >
            {values}
          </div>
        );
      });
    };

    if (DataSelected.length == undefined) {
      if (DataSelected.number == null) {
        const render = () => {
          return DataSelected.number_groups.map((data: any, i: number) => {
            return (
              <div key={i}>
                {data.number} {data.position ? "-" : ""} {data.position}
              </div>
            );
          });
        };
        return (
          <div className="flex py-1 text-whiteDefault-100 cursor-pointer rounded w-full text-left  flex-col font-bold uppercase text-xs">
            <div className="flex justify-between text-base font-normal text-whiteDefault-100">
              <div className="flex flex-col space-y-4 md:space-y-0">
                <span className="text-lg flex space-x-2"> {render()}</span>
                <span>
                  {moment(DataSelected?.created_at).format(
                    "DD/MM/YYYY - HH:mm a"
                  )}
                </span>
                <span>
                  {DataSelected?.game}
                  {DataSelected?.position
                    ? " - " + DataSelected?.position
                    : null}
                  {DataSelected?.status ? " - " + DataSelected?.status : null}
                </span>
                <span className="md:text-lg flex md:hidden">
                  Paid : Rp.{currencyFormat(DataSelected?.paid)}
                </span>
              </div>
              <div>
                {" "}
                <span className="md:text-lg hidden md:flex">
                  Paid : Rp.{currencyFormat(DataSelected?.paid)}
                </span>
              </div>
            </div>
            <hr className="my-[1rem] border-[#d3f2ff57]" />
          </div>
        );
      } else {
        return (
          <div className="text-whiteDefault-100 cursor-pointer rounded w-full text-left flex flex-col font-bold uppercase text-xs">
            <div className="flex flex-col md:flex-row justify-between">
              <div className="flex flex-col">
                <div className="bg-white/5 md:bg-transparent p-[25px] md:p-0 rounded-[10px] mx-auto md:mx-0 mb-[30px] md:mb-0 md:w-fit">
                  <div className="text-center text-whiteDefault-80 text-base font-normal mb-[10px]">
                    4D
                  </div>
                  <span className="text-lg flex space-x-[5px] mb-5">
                    {" "}
                    {DataSelected.number == null
                      ? "-"
                      : RenderNumber(DataSelected.number)}
                  </span>
                </div>
                <div className="flex mt-1 text-whiteDefault-60 text-sm font-normal">
                  <div className="min-w-[8rem] flex justify-between mr-1">
                    <span>ID</span> <span>:</span>
                  </div>
                  <div>{DataTransaction?._id}</div>
                </div>
                <div className="flex mt-1 text-whiteDefault-60 text-sm font-normal">
                  <div className="min-w-[8rem] flex justify-between mr-1">
                    <span>market : </span> <span>:</span>
                  </div>
                  <div>
                    {DataTransaction?.market} - {DataTransaction?.period}{" "}
                  </div>
                </div>
              </div>
              <div>
                <span className="text-sm text-whiteDefault-100 font-normal md:text-base flex md:hidden">
                  Paid : Rp.{currencyFormat(DataSelected?.paid)}
                </span>
              </div>
            </div>
            <div>
              <span className="text-sm text-whiteDefault-100 font-normal md:text-base hidden md:flex">
                Paid : Rp.{currencyFormat(DataSelected?.paid)}
              </span>
            </div>
            <hr className="my-[1rem] border-[#d3f2ff57]" />
          </div>
        );
      }
    } else {
      if (DataInvoice !== undefined) {
        if (DataInvoice[0]?.number == null) {
          const render = () => {
            return DataInvoice[0]?.number_groups.map((data: any, i: number) => {
              return (
                <div key={i}>
                  {data.number} {data.position ? "-" : ""} {data.position}
                </div>
              );
            });
          };
          return (
            <div className=" py-1 text-whiteDefault-100  cursor-pointer rounded w-full text-left flex flex-col font-bold uppercase text-xs">
              <div className="flex flex-col justify-between">
                <div className="flex flex-col  space-y-4 md:space-y-0">
                  <span className="text-lg flex space-x-2"> {render()}</span>
                  <span>
                    {moment(DataInvoice[0]?.created_at).format(
                      "DD/MM/YYYY - HH:mm a"
                    )}
                  </span>
                  <span>
                    {DataInvoice[0]?.game}
                    {DataInvoice[0]?.position
                      ? " - " + DataInvoice[0]?.position
                      : null}
                    {DataInvoice[0]?.status
                      ? " - " + DataInvoice[0]?.status
                      : null}
                  </span>
                  <span className="text-sm text-whiteDefault-100 font-normal flex md:hidden">
                    Paid : Rp.{" "}
                    {DataInvoice.length == 0
                      ? currencyFormat(
                          DataTransaction?.debit !== 0
                            ? DataTransaction?.debit
                            : DataTransaction?.credit
                        )
                      : currencyFormat(DataInvoice[0]?.paid)}
                  </span>
                </div>
                <div>
                  <span className="text-sm text-whiteDefault-100 font-normal hidden md:flex">
                    Paid : Rp{" "}
                    {DataInvoice.length == 0
                      ? currencyFormat(
                          DataInvoice?.debit !== undefined
                            ? DataInvoice.debit
                            : "0"
                        )
                      : currencyFormat(
                          DataInvoice[0]?.paid !== undefined
                            ? DataInvoice[0]?.paid
                            : "0"
                        )}
                  </span>
                </div>
              </div>
              <hr className="my-[1rem] border-[#d3f2ff57]" />
            </div>
          );
        } else {
          return (
            <div className=" py-1 text-whiteDefault-100  cursor-pointer rounded w-full text-left flex flex-col font-bold uppercase text-xs">
              {/* Detail 1 */}
              <div className="flex flex-col justify-between">
                <div className="flex flex-col text-whiteDefault-60 text-base font-normal w-full md:w-fit">
                  <div className="bg-white/5 md:bg-transparent p-[25px] md:p-0 rounded-[10px] mx-auto md:mx-0 mb-[30px] md:mb-0">
                    <div className=" text-center md:text-left text-base font-normal text-whiteDefault-60 mb-[10px]">
                      {DataInvoice[0]?.game}
                    </div>
                    <span className="text-lg flex space-x-2 mb-5">
                      {DataInvoice[0].number == null
                        ? "-"
                        : RenderNumber(DataInvoice[0].number)}
                    </span>
                  </div>

                  <div className="flex text-whiteDefault-60 font-light capitalize">
                    <div className="min-w-[8rem] flex justify-between mr-1">
                      <span>Posisi</span> <span>:</span>
                    </div>
                    <div>
                      {DataInvoice[0]?.position
                        ? DataInvoice[0]?.position
                        : "-"}
                    </div>
                  </div>
                  <div className="flex text-whiteDefault-60 font-light capitalize">
                    <div className="min-w-[8rem] flex justify-between mr-1">
                      <span>Status</span> <span>:</span>
                    </div>
                    <div>
                      {DataInvoice[0]?.status ? DataInvoice[0]?.status : null}
                    </div>
                  </div>
                  <span className="text-sm text-whiteDefault-100 font-normal flex md:hidden">
                    Paid : Rp.{" "}
                    {DataInvoice.length == 0
                      ? currencyFormat(
                          DataTransaction?.debit !== 0
                            ? DataTransaction?.debit
                            : DataTransaction?.credit
                        )
                      : currencyFormat(DataInvoice[0]?.paid)}
                  </span>
                </div>
                <div>
                  <span className="text-sm text-whiteDefault-100 font-normal hidden md:flex">
                    Paid : Rp{currencyFormat(DataInvoice[0]?.paid)}
                  </span>
                </div>
              </div>
              <hr className="my-[1rem] border-[#d3f2ff57]" />
            </div>
          );
        }
      }
    }
  };

  return (
    <div className="w-full mx-auto overflow-hidden bg-[#07243A]/60 md:bg-backgroundDefault-100 md:rounded-md text-whiteDefault-100">
      {isLoading && <Indicator />}
      <span className="flex md:hidden" id={"detailFocusID"}></span>
      <div className="px-mobile md:px-0 flex-col md:flex-row justify-between md:border-b-[2px] border-[#DCECFF]/20 border-dashed flex min-h-[13rem]">
        <div className="flex flex-col w-full md:w-6/12 md:border-r-[2px] md:border-[#DCECFF]/20 border-dashed md:px-10 md:py-[30px]">
          <h1 className="text-[22px] font-bold hidden md:flex mb-4">
            Detail Transaksi
          </h1>
          <button
            className="flex md:hidden space-x-2 my-[1rem] ml-[-1.4rem] items-center px-4"
            onClick={() => {
              props.setType("");
            }}
          >
            <div
              className={classnames(
                "btn p-1 btn-default flex space-x-3 btn-default-color btn-circle btn-default-color  bg-[#153853]/60 rounded-full h-5 w-5"
              )}
            >
              <FaCaretLeft size={12} className="" />
            </div>
            <span>{t("text-go-back")}</span>
          </button>

          <div className="text-left md:mb-[1rem] items-center space-x-2 flex">
            <span className="text-lg font-semibold md:text-[22px] md:font-bold">
              TOGEL{" "}
            </span>
            <div className="bg-[#001625] rounded-[5px] px-4 py-1 text-sm md:text-base font-normal md:font-bold">
              {DataGame
                ? DataGame?.length >= 1
                  ? DataGame[0]?.market !== undefined
                    ? DataGame[0]?.market
                    : "No Data" + "-" + DataGame[0]?.period !== undefined
                    ? DataGame[0]?.period
                    : "No Data"
                  : DataGame?.market !== undefined
                  ? DataGame?.market
                  : "No Data" + "-" + DataGame?.period !== undefined
                  ? DataGame?.period
                  : "No Data"
                : DataTransaction?.length >= 1
                ? DataTransaction[0]?.market !== undefined
                  ? DataTransaction[0]?.market
                  : "No Data" + "-" + DataTransaction[0]?.period !== undefined
                  ? DataTransaction[0]?.period
                  : "No Data"
                : DataTransaction?.market !== undefined
                ? DataTransaction?.market
                : "No Data" + "-" + DataTransaction?.period !== undefined
                ? DataTransaction?.period
                : "No Data"}
            </div>{" "}
          </div>
          {/* <div className="text-left mt-1 flex md:hidden text-[#E1EDFF]/60 font-light uppercase">
            {DataGame?.market !== undefined ? DataGame?.market : '-'}
          </div> */}
          <div className="text-sm md:text-base font-normal break-all mt-3 md:mt-0">
            <div className="flex mt-1 text-[#E1EDFF]/60 font-light">
              <div className="min-w-[8rem] flex justify-between mr-1">
                <span>Transaction ID</span> <span>:</span>
              </div>
              <div>{DataTransaction?._id}</div>
            </div>
            <div className="flex text-[#E1EDFF]/60 font-light">
              <div className="min-w-[8rem] flex justify-between mr-1">
                <span>Provider</span> <span>:</span>
              </div>
              <div>
                {DataTransaction?.provider == "lx" ? (
                  <span className="uppercase">LX</span>
                ) : (
                  <span className="capitalize">
                    {DataTransaction?.provider}
                  </span>
                )}
              </div>
            </div>
            <div className="flex text-[#E1EDFF]/60 font-light">
              <div className="min-w-[8rem] flex justify-between mr-1">
                <span>Date</span> <span>:</span>
              </div>
              <div>{moment().format("DD/MM/YYYY - HH:mm a")}</div>
            </div>
            <div className="flex text-[#E1EDFF]/60 font-light">
              <div className="min-w-[8rem] flex justify-between mr-1">
                <span>Jumlah</span> <span>:</span>
              </div>

              <div>
                Rp.
                {currencyFormat(
                  DataTransaction?.debit == 0
                    ? DataTransaction?.credit
                    : DataTransaction?.debit
                )}
              </div>
            </div>
          </div>
          {/* mobile detail 1 */}
          <div className="md:hidden flex flex-col mt-[1rem]">
            <div
              className={
                "w-full  hidden md:flex flex-row justify-between mt-2 justify-end flex mb-[2rem]"
              }
            >
              <h1 className="text-[14px] font-light text-[#E1EDFF]/60 ">
                Win/Lose
              </h1>
              <div className="flex flex-col justify-between gap-2 items-end  ">
                <h1
                  className={` ${
                    DataTransaction?.debit !== 0
                      ? "text-failed"
                      : "text-success"
                  }`}
                >
                  {" "}
                  Rp. {currencyFormat(DataGame?.paid)}
                </h1>
                <h1 className={"md:mt-[0.6rem] font-light"}>
                  Saldo Rp. {currencyFormat(DataTransaction?.balance)}
                </h1>
              </div>
            </div>
          </div>
        </div>

        {/* Detail 1 */}
        <div
          className={
            "w-full md:w-8/12 md:px-10 md:py-[30px] md:flex flex-col items-start flex"
          }
        >
          <div className="w-full">{RenderSelected()}</div>
          <div className="flex items-center space-x-[10px]">
            <div className="flex justify-between space-x-[10px] items-center text-[18px]">
              <h1
                className={` ${
                  DataTransaction?.debit !== 0 ? "text-failed" : "text-success"
                }`}
              >
                {" "}
                Rp.{" "}
                {currencyFormat(
                  DataTransaction?.debit == 0
                    ? DataTransaction?.credit
                    : DataTransaction?.debit
                )}
              </h1>
              <span
                className={` ${
                  DataTransaction?.debit !== 0
                    ? "bg-[#FF5C5F]/20 text-failed"
                    : "bg-[#73FF89]/20 text-success"
                } text-xs px-2 py-1 rounded-md uppercase`}
              >
                {DataTransaction?.debit !== 0 ? t(`text-lose`) : t(`text-win`)}
              </span>
            </div>
            <h1 className={"font-normal text-whiteDefault-100 text-base"}>
              Saldo Rp{currencyFormat(DataTransaction?.balance)}
            </h1>
          </div>
        </div>
      </div>

      {randerFilter()}
      {DataInvoice ? (
        <>
          <div className="hidden md:flex mt-[1rem]">
            <Datatable
              data={DataInvoice ? DataInvoice : []}
              columns={columns}
              totalItems={DataInvoice.total_items}
              pageSize={3000}
              totalPage={DataInvoice.total_page}
              isLoading={isLoading}
              currentPage={currentPage}
              onClickRow={(e: any) => {
                const data = e;
                setCurrentPage(1);
                setDataSelected(data.original);
              }}
              pagination={false}
              onPageSizeChange={handlePageSizeChange}
              onPageChange={handlePageChange}
              tableClassName="w-full "
            />
          </div>

          <div className="px-mobile  md:px-0 mb-5 flex w-full md:hidden mt-[3rem] opacity-80 ">
            <DatatableTypeLotery
              data={DataInvoice ? DataInvoice : []}
              columns={columns}
              totalItems={DataInvoice.total_items}
              pageSize={3000}
              totalPage={DataInvoice.total_page}
              isLoading={isLoading}
              pagination={false}
              currentPage={currentPage}
              onClickRow={(e: any) => {
                const data = e;
                setCurrentPage(1);
                setDataSelected(data.original);
              }}
              onPageSizeChange={handlePageSizeChange}
              onPageChange={handlePageChange}
              tableClassName="w-full "
            />
          </div>
        </>
      ) : null}
      <button
        className="hidden md:flex space-x-2 mx-10 my-[30px] items-center text-base"
        onClick={() => {
          props.setType("");
        }}
      >
        <div
          className={classnames(
            "btn p-1 btn-default space-x-3 btn-default-color btn-circle btn-default-color bg-[#153853]/60 rounded-full h-7 w-7 flex items-center justify-center"
          )}
        >
          <FaAngleLeft size={14} strokeWidth={3.2} className="" />
        </div>
        <span>{t("text-go-back")}</span>
      </button>
    </div>
  );
};

export default DetailTransactionLotery;
