import classnames from "classnames";
import moment from "moment";
import { useEffect, useState } from "react";

import { currencyFormat } from "@utils/functionutil";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { FaAngleLeft, FaCaretLeft } from "react-icons/fa";

const DetailTransaction = (props: any) => {
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
      className={`bg_content_container w-full mx-auto overflow-hidden rounded-md  text-[#D3F2FF]`}
    >
      <span className="flex md:hidden" id={"detailFocusID"}></span>

      <div className=" flex-row  justify-between  md:border-b-[2px]  border-[#DCECFF]/20 border-dashed flex min-h-[13rem] px-4  ">
        <div className="flex flex-col w-full md:w-6/12 md:border-r-[2px] md:border-[#DCECFF]/20 border-dashed px-4 py-4">
          <h1 className="text-[22px] hidden  md:flex mb-4 mt-[1rem]">
            Detail Transaksi{" "}
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
            <span>Back</span>
          </button>

          <h1 className=" md:text-[22px] text-left md:mb-[1rem]">
            {DataTransaction?.game_name}{" "}
          </h1>
          <div className="text-left mt-1 flex capitalize md:hidden text-[#E1EDFF]/60 font-light">
          {DataTransaction?.provider == "lx"
                  ? <span className="uppercase">LX</span>
                  : <span className="capitalize">{DataTransaction?.provider}</span>}
          </div>
          <div className="flex mt-1 text-[#E1EDFF]/60 font-light">
            <div className="min-w-[8rem] flex justify-between mr-1">
              <span>Transaction ID</span> <span>:</span>
            </div>
            <div>{DataTransaction?._id}</div>
          </div>
          <div className="flex hidden md:flex text-[#E1EDFF]/60 font-light">
            <div className="min-w-[8rem] flex justify-between mr-1">
              <span>Provider</span> <span>:</span>
            </div>
            <div> {DataTransaction?.provider == "lx"
                  ? <span className="uppercase">LX</span>
                  : <span className="capitalize">{DataTransaction?.provider}</span>}</div>
          </div>
          <div className="flex hidden md:flex text-[#E1EDFF]/60 font-light">
            <div className="min-w-[8rem] flex justify-between mr-1">
              <span>Date</span> <span>:</span>
            </div>
            <div>{moment().format("DD/MM/YYYY - HH:mm a")}</div>
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
          <div className="md:hidden flex flex-col mt-[1rem]">
            <hr className="w-full border-[#D3F2FF]/20 " />
            <div
              className={
                "w-full   flex-row justify-between mt-2 justify-end flex mb-[2rem]"
              }
            >
              <h1 className="text-[14px] font-light text-[#E1EDFF]/60 ">
                Win/Lose
              </h1>
              <div className="flex flex-col justify-between gap-2 items-end  ">
                <h1
                  className={` ${
                    DataTransaction?.debit !== 0
                      ? "text-[#FF5C5F]"
                      : "text-[#21D980] "
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
                <h1 className={"md:mt-[0.6rem] font-light"}>
                  Saldo Rp. {currencyFormat(DataTransaction?.balance)}
                </h1>
              </div>
            </div>
          </div>
        </div>

        <div
          className={
            "w-8/12 px-4 hidden md:flex flex-col ml-[2rem] items-start justify-end flex mb-[2rem]"
          }
        >
          <div className="flex justify-between gap-2 items-center text-[18px] ">
            <h1
              className={` ${
                DataTransaction?.debit !== 0
                  ? "text-[#FF5C5F]"
                  : "text-[#21D980] "
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
                  ? "bg-[#FF5C5F]/20 text-[#FF5C5F]"
                  : "bg-[#73FF89]/20 text-[#21D980] "
              } text-xs px-2 py-1 rounded-md`}
            >
              {DataTransaction.debit !== 0 ? "Lose" : "Win"}
            </span>
          </div>
          <h1 className={"mt-[0.6rem] font-light"}>
            Saldo Rp. {currencyFormat(DataTransaction?.balance)}
          </h1>
        </div>
      </div>
      <button
        className=" hidden md:flex space-x-2 my-[2rem] items-center px-4"
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
        <span>{t('text-go-back')}</span>
      </button>
    </div>
  );
};

export default DetailTransaction;
