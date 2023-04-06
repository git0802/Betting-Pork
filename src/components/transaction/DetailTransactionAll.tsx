import classnames from "classnames";
import moment from "moment";
import { useEffect, useState } from "react";

import { currencyFormat } from "@utils/functionutil";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { FaAngleLeft, FaCaretLeft } from "react-icons/fa";

const DetailTransactionAll = (props: any) => {
  const { t } = useTranslation("common");
  const [DataTransaction, setDataTransaction] = useState(
    props ? props.Data : []
  );

  useEffect(() => {
    document
      ?.getElementById("detailFocusID")
      .scrollIntoView({ behavior: "smooth", block: "start" });
  }, [props]);

  const router = useRouter();
  const {
    query: { tab },
  } = router;

  return (
    <div
      // id="detailFocusID"
      className="w-full mx-auto  overflow-hidden bg-[#07243A]/60 md:bg-backgroundDefault-100 md:rounded-md text-[#D3F2FF]"
    >
      <span className="flex md:hidden" id={"detailFocusID"}></span>
      <div className="flex-row justify-between md:border-b-[2px] border-[#DCECFF]/20 border-dashed flex min-h-[13rem] px-mobile px-desktop md:px-0">
        <div className="flex flex-col w-full md:w-6/12 md:border-r-[2px] md:border-[#DCECFF]/20 border-dashed md:px-10 md:py-[30px] ">
          <div className="text-[22px] items-center space-x-4 font-bold hidden md:flex mb-4">
            <span> Detail Transaksi </span>
            { DataTransaction?.market !== null ? (
              <div className="bg-[#001625] rounded-[5px] px-4 py-1 text-sm md:text-base font-normal md:font-bold">
                {DataTransaction?.length >= 1
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
              </div>
            ) : null}
          </div>
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
              <FaAngleLeft strokeWidth={3.2} size={14} className="" />
            </div>
            <span>{t("text-go-back")}</span>
          </button>

          <div className="flex md:hidden text-[#E1EDFF]/60 font-light mb-3">
            {moment(DataTransaction?.created_at).format("DD/MM/YYYY - HH:mm a")}
          </div>
          <h1 className="text-base font-normal md:text-[22px] md:font-bold text-left md:mb-[1rem]">
            {DataTransaction?.game_name}{" "}
          </h1>
          <div className="text-left mt-1 flex  md:hidden text-[#E1EDFF]/60 font-light ">
          {DataTransaction?.provider == "lx"
                  ? <span className="uppercase">LX</span>
                  : <span className="capitalize">{DataTransaction?.provider ?  DataTransaction?.provider : DataTransaction?.type.replaceAll("_", " ")}</span>}
          </div>
          <div className="text-base font-normal break-all">
            <div className="flex mt-1 md:text-base text-sm text-[#E1EDFF]/60 font-light">
              <div className="min-w-[8rem] flex justify-between mr-1">
                <span>Transaction ID</span> <span>:</span>
              </div>
              <div>{DataTransaction?._id}</div>
            </div>
            <div className="flex hidden md:flex text-[#E1EDFF]/60 font-light">
              <div className="min-w-[8rem] flex justify-between mr-1">
                <span>Provider</span> <span>:</span>
              </div>
              <div>
                {DataTransaction?.provider == "lx"
                  ? <span className="uppercase">LX</span>
                  : <span className="capitalize">{DataTransaction?.provider}</span>}
              </div>
            </div>
            <div className="flex hidden md:flex text-[#E1EDFF]/60 font-light">
              <div className="min-w-[8rem] flex justify-between mr-1">
                <span>Date</span> <span>:</span>
              </div>
              <div>
                {moment(DataTransaction?.created_at).format(
                  "DD/MM/YYYY - HH:mm a"
                )}
              </div>
            </div>
            <div className="flex hidden md:flex text-[#E1EDFF]/60 font-light">
              <div className="min-w-[8rem] flex justify-between mr-1">
                <span>Jumlah</span> <span>:</span>
              </div>
              <div>
                Rp.{" "}
                {currencyFormat(
                  DataTransaction?.debit == 0
                    ? DataTransaction?.credit
                    : DataTransaction?.debit
                )}
              </div>
            </div>
          </div>
          <div className="md:hidden flex flex-col mt-[1rem]">
            <hr className="w-full border-[#D3F2FF]/20 " />
            <div
              className={"w-full flex-row justify-between mt-2 flex mb-[2rem]"}
            >
              <h1 className="text-[14px] font-light text-[#E1EDFF]/60 ">
                {""}
              </h1>
              <div className="flex flex-col justify-between items-end text-sm font-normal ">
                <h1 className="text-[#E1EDFF]/60 ">Win/Lose</h1>
                <h1
                  className={` ${
                    DataTransaction?.debit !== 0
                      ? "text-failed"
                      : "text-success"
                  } `}
                >
                  {" "}
                  Rp.{" "}
                  {currencyFormat(
                    DataTransaction?.debit == 0
                      ? DataTransaction?.credit
                      : DataTransaction?.debit
                  )}
                </h1>
                <h1 className={"md:mt-[0.6rem] font-light"}>
                  Saldo Rp. {currencyFormat(DataTransaction?.balance)}
                </h1>
              </div>
            </div>
          </div>
        </div>

        <div
          className={
            "w-8/12 md:px-10 md:py-[30px] hidden md:flex flex-col items-start justify-end"
          }
        >
          <div className="flex justify-between gap-2 items-center text-lg font-bold ">
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
              } text-sm font-bold uppercase px-2 py-1 rounded-md`}
            >
              {DataTransaction?.debit !== 0 ? "Lose" : "Win"}
            </span>
          </div>
          <h1 className={"mt-[0.6rem] text-base font-normal"}>
            Saldo Rp. {currencyFormat(DataTransaction?.balance)}
          </h1>
        </div>
      </div>
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

export default DetailTransactionAll;
