import { useBankListQuery } from "@framework/user/get-bank-list";
import { useUserQuery } from "@framework/user/get-user-profile";
import { useQueryGetWithdrawalHistory } from "@framework/user/get-user-withdrawal-history";
import { useWithdrawalMutation } from "@framework/user/use-create-withdrawal";
import { currencyFormat } from "@utils/functionutil";
import { BankIcon } from "@utils/functionutil/Function";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Listbank } from "./Components/Listbank";
import AnimationPlan from "@components/animate/AnimationPlan";
import Button from "@components/ui/button";
import Indicator from "@components/ui/loading-indicator";
import CurrencyInput from "react-currency-input-field";
import { useUI } from "../../contexts/ui-context";

interface IWithdrawProps {
  scrollToTop: () => void;
}

const Withdraw = (props: IWithdrawProps) => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const { data: dataUser }: any = useUserQuery();

  const {
    query: {},
  } = router;
  let valueDefault = 0;
  const [WithdrawValue, setWithdrawValue] = useState<number>(50000);
  const [WithdrawStatus, setWithdrawStatus] = useState(false);
  const { isFetching: isLoadingData, data } = useBankListQuery();

  const [BankName, setBankName] = useState("");
  const [BankNumber, setBankNumber] = useState(
    dataUser ? dataUser.banks[0]?.bank_account_number : ""
  );
  const [BankAcountName, setBankAcountName] = useState("");
  const [FristLoadPage, setFristLoad] = useState(false);
  const [DataSubmited, setDataSubmited] = useState(false);
  const [ModalOpen, setModalOpen] = useState(false);
  const [LoadingPush, setLoadingPush] = useState(false);
  const [DataTotal, setDataTotal] = useState(false);
  const [Limit, setLimit] = useState(20);
  const [BankType, setBankType] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const minWithdrawAmount = 50000;
  const maxWithdrawAmount = 500000000;
  const updateWithdrawValue = (value: number) => {
    if (Number.isNaN(value))  return setWithdrawValue(0);
    if (value.toString().length > maxWithdrawAmount.toString().length) return;
    if (value < minWithdrawAmount)
      setErrorMessage(
        `Minimum withdraw Rp ${currencyFormat(minWithdrawAmount)}`
      );
    else if (value > maxWithdrawAmount)
      setErrorMessage(
        `Maximum withdraw Rp ${currencyFormat(maxWithdrawAmount)}`
      );
    else if (value % 10000 != 0)
      setErrorMessage(`Jumlah harus kelipatan 10.000`);
    else setErrorMessage("");
    value = Math.floor(value);
    setWithdrawValue(value);
  };

  const {
    mutate: withdrawal,
    isLoading: LoadingWd,
    isError: ErrorWithdrawMutation,
    status,
    error,
    isSuccess,
    data: dataEror,
  } = useWithdrawalMutation();
  const [BankChoice, setBankChoice] = useState(
    dataUser ? dataUser.bank_account_number : ""
  );
  const [BankChoice2, setBankChoice2] = useState<any>(
    dataUser ? dataUser.bank_name : "BRI"
  );
  // get Data from api

  const { DataHistory: dataWithdraw, isLoading } = useQueryGetWithdrawalHistory(
    {
      limit: Limit,
      status: ["pending"],
    }
  );

  const { isReady } = useUI();

  useEffect(() => {
    if (isReady) {
      props?.scrollToTop();
    }
  }, [WithdrawStatus, isReady]);

  useEffect(() => {
    if (dataWithdraw && dataWithdraw.length !== 0) {
      dataWithdraw?.map((value: any, index: number) => {
        if (value.status == "pending") {
          setWithdrawValue(value.amount);
          setDataTotal(true);
          setWithdrawStatus(true);
        }
        setFristLoad(false);
        setDataSubmited(true);
      });
    }

    setTimeout(() => {
      const dataHandle = dataWithdraw ? dataWithdraw : [];

      if (FristLoadPage == false) {
        if (Limit == 20) {
          setLimit(Limit + 1);
          setFristLoad(true);
        } else {
          setLimit(Limit - 1);
          setFristLoad(true);
        }
      }
      if (DataSubmited == true) {
        if (Limit == 20) {
          setLimit(Limit + 1);
        } else {
          setLimit(Limit - 1);
        }
        if (dataHandle.length !== 0) {
          setDataSubmited(false);
        }
      } else {
        if (dataHandle.length !== 0) {
          if (Limit == 20) {
            setLimit(Limit + 1);
          } else {
            setLimit(Limit - 1);
          }
        }
      }
    }, 3000);
  }, [isSuccess, dataWithdraw, Limit, router, LoadingWd]);

  useEffect(() => {
    if (DataTotal == true) {
      if (dataWithdraw.length === 0) {
        if (WithdrawStatus == true) {
          router.push(
            {
              pathname: `/wallet`,
              query: {
                tab: 1,
                page: 1,
                HistoryPage: "withdraw",
                id: dataUser._id,
              },
            },
            undefined,
            { shallow: true }
          );
        }

        setWithdrawStatus(false);
        setDataTotal(false);
      }
    }
  }, [isLoading, Limit, WithdrawStatus]);

  useEffect(() => {
    if (dataUser) {
      if (dataUser.banks[0] == undefined) {
        setModalOpen(true);
      }
    }
    if (BankName == "") {
      setBankName(dataUser ? dataUser.banks[0]?.bank_name : "");
      setBankNumber(dataUser ? dataUser.banks[0]?.bank_account_number : "");
      setBankAcountName(dataUser ? dataUser.banks[0]?.bank_account_name : "");
    }
  }, [data]);

  useEffect(() => {
    renderEror();
  }, [ErrorWithdrawMutation, status]);

  const onSubmit = () => {
    if (errorMessage) {
      return toast.error(errorMessage);
    }

    if (dataUser?.balance >= WithdrawValue) {
      withdrawal({
        amount: WithdrawValue,
        player_bank_name: BankName,
        player_bank_account_name: BankAcountName,
        player_bank_account_number: BankNumber,
        bank_type: "withdraw",
      });
      setFristLoad(false);
      setDataSubmited(true);
    } else {
      toast.error("Saldo Tidak Cukup ");
    }
  };

  const renderEror = () => {
    if (isSuccess == true) {
      setWithdrawStatus(true);
    } else {
      if (ErrorWithdrawMutation && status == "error") {
        return toast.error(error?.response?.data?.errors._error);
      }
    }
  };

  const renderHalaman = () => {
    if (WithdrawStatus === false) {
      return (
        <div className="bg_content_container flex flex-col lg:bg-none w-full md:rounded-10 text-white py-6 md:px-0 md:py-0 md:divide-y md:divide-whiteDefault-20">
          {isLoading && <Indicator />}
          {LoadingPush && <Indicator />}
          <div className="flex flex-col xl:flex-row justify-between space-x-0 xl:space-x-10 md:py-[30px] px-mobile md:px-10">
            <div className="flex-1 md:mb-[30px] xl:mb-0">
              <h1 className="text-[24px] text-left mb-[1.8rem]">
                {t(`text-withdraw`)}
              </h1>
              <h1 className="text-[14px] text-left md:text-[18px] font-semibold mb-[18px] md:mb-[24px]">
                Tujuan Penarikan
              </h1>
              {dataUser ? (
                <Listbank
                  dataUser={dataUser}
                  bank_selected={BankName}
                  setBankChoiceUserBankAccount={setBankNumber}
                  setBankChoiceUserBankName={setBankName}
                  setBankChoiceUserBankAccountName={setBankAcountName}
                  bankChoice={BankName}
                  bankValue={BankNumber}
                  setBankType={setBankType}
                  type="withdraw"
                />
              ) : (
                <h1>Loading ...</h1>
              )}
              <h1 className="text-[14px] md:text-[16px] font-medium text-left text-white mt-[24px] md:mt-[40px]">
                Jumlah Withdraw
              </h1>
              <h1 className="text-[12px] md:text-[14px] font-medium text-left text-[#D3F2FF]/60 mt-[18px] md:mt-[24px]">
                Masukkan Nominal Withdraw
              </h1>

              <div className="h-[42px] md:h-[52px] md:w-6/12 relative flex justify-center lg:justify-start self-center mx-auto md:mx-0 mb-[12px] md:mt-[12px] mt-[10px] items-center">
                <button
                  onClick={() => {
                    let nilai;
                    if (+WithdrawValue <= 0) {
                      nilai = WithdrawValue;
                    } else {
                      nilai = +WithdrawValue - 50000;
                    }
                    updateWithdrawValue(nilai);
                  }}
                  className="btn_wallet_add_subs w-[48px] h-[48px] md:w-[52px] md:h-[52px] px-4 py-3 rounded-[5px]  active:scale-95"
                >
                  -
                </button>
                <div className="relative flex w-full items-center mx-[6px]  h-[48px]  md:h-[52px]">
                  <CurrencyInput
                    id="input-example"
                    name="input-name"
                    placeholder="Please enter a number"
                    defaultValue={0}
                    decimalSeparator=","
                    groupSeparator="."
                    onValueChange={(value) =>
                      updateWithdrawValue(Number(value))
                    }
                    value={WithdrawValue}
                    className="bg_input_primary rounded-[4px] text-[16px] md:text-[18px] h-[48px] md:h-[52px] font-bold w-full mb-0 py-3 pl-11 pr-4"
                  />
                  <span className="absolute text-[16px] md:text-[18px]font-bold lg:mb-[-1rem] ml-[1rem] mt-[0rem] lg:mt-[-1rem] text-whiteDefault-60/30">
                    Rp
                  </span>
                </div>
                <button
                  onClick={() => {
                    const nilai = +WithdrawValue + 50000;
                    updateWithdrawValue(nilai);
                  }}
                  className="btn_wallet_add_subs w-[50px] h-[53px] px-4 py-3 rounded-[5px] active:scale-95"
                >
                  +
                </button>
              </div>
              <p className="text-failed text-left text-sm md:text-base font-normal mb-[16px] md:mb-[24px]">
                {errorMessage}
              </p>
              <p className="text-whiteDefault-60 text-left text-sm md:text-base font-normal mb-[16px] md:mb-[24px]">
                Saldo setelah penarikan Rp.
                <span className="text-white">
                  {currencyFormat(dataUser?.balance - WithdrawValue)}
                </span>
              </p>
              <div className="  w-full  flex justify-start space-x-[6px] md:flex">
                <button
                  onClick={() => {
                    updateWithdrawValue(50000);
                  }}
                  className={`btn_wallet_selected_nominal ${
                    WithdrawValue === 50000 ? "active" : ""
                  }`}
                >
                  50.000
                </button>
                <button
                  onClick={() => {
                    updateWithdrawValue(100000);
                  }}
                  className={`btn_wallet_selected_nominal ${
                    WithdrawValue === 100000 ? "active" : ""
                  }`}
                >
                  100.000
                </button>
                <button
                  onClick={() => {
                    updateWithdrawValue(
                      Math.floor(dataUser?.balance / 10000) * 10000
                    );
                  }}
                  className={`btn_wallet_selected_nominal ${
                    WithdrawValue ===
                    Math.floor(dataUser?.balance / 10000) * 10000
                      ? "active"
                      : ""
                  }`}
                >
                  MAX
                </button>
              </div>
            </div>
          </div>
          {/* <hr className="border-[#4a71a06e]" /> */}
          <div className="mt-5 md:mt-0 flex justify-end items-center px-mobile md:px-10 md:py-[30px]">
            <div className="w-full flex space-x-2 lg:w-fit">
              <Button
                type="submit"
                variant="primary"
                onClick={() => {
                  onSubmit();
                }}
                className="flex flex-row w-full md:w-fit h-11 font-extrabold text-sm px-5"
              >
                Proses
              </Button>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="bg-[#07243A]  lg:bg-backgroundDefault-100 lg:bg-none md:rounded-10 flex flex-col justify-center items-center pb-[40px]">
          {isLoading && <Indicator />}
          <div className="w-full md:w-5/12 md:max-w-[415px]  px-mobile flex flex-col mt-[30px] justify-center">
            <h1 className=" text-[16px] md:text-[18px] font-medium text-center text-white ">
              {t(`text-withdraw`)} Sedang di Proses
            </h1>
            <div className="h-[98px] mt-[14px]  relative flex justify-center ">
              <AnimationPlan />
            </div>

            {dataWithdraw[0] ? (
              <div className="mt-[24px] w-full bg-[#B9D6FF]/5 flex justify-center flex-col rounded-[4px]">
                <div className="bg-[#07243A]/40 my-[16px] mx-[13px]  md:mt-[15px] md:mx-[13px] md:mb-[20px] flex flex-col justify-center rounded-[4px]">
                  <h1 className="text-[12px] md:text-[14px] text-[#D3F2FF]/60 mt-[12px] font-medium  text-center">
                    Jumlah Penarikan
                  </h1>
                  <div className="flex item-center space-x-2 w-full justify-center text-center mb-[13px] text-[20px] md:text-[24px]  font-semibold">
                    <span className="text-rupiah leading-10">Rp </span>
                    <span className="flex items-center justify-center font text-white ">
                      {currencyFormat(
                        isNaN(WithdrawValue) ? "0" : WithdrawValue
                      )}
                    </span>
                  </div>
                </div>
                <hr className="border-[1px] border-[#B9D6FF]/5 mb-[16px] md:mb-[20px]" />
                <div className="px-[16px] pb-[20px]">
                  <h1 className="text-[12px] md: text-[12px] md:text-[14px] font-medium text-left text-white">
                    {t(`text-bankDestination`)}
                  </h1>
                  <div className="flex  w-full">
                    <div className="w-9/12 flex flex-col mt-[14px] md:mt-[16px]">
                      <h2 className="text-[10px] md:text-[12px] font-normal  text-left text-[#D3F2FF]/60">
                        {dataWithdraw[0].type == "bank"
                          ? "Nomor Rekening"
                          : "Nomor Handphone"}
                      </h2>
                      <div className="text-white mt-[7px] md:mt-[10px] flex justify-start items-center md:text-[14px] text-[12px]">
                        {BankIcon(dataWithdraw[0]?.bank, 1.5)}{" "}
                        <span className="ml-[6px]">
                          {dataWithdraw[0]?.bank_account_number}
                        </span>
                      </div>
                    </div>
                    <div className="w-4/12 flex flex-col mt-[16px]">
                      <h2 className=" text-[10px] md:text-[12px] font-normal text-left text-[#D3F2FF]/60">
                        {dataWithdraw[0].type == "bank"
                          ? "Nama Rekening"
                          : "Nama Handphone"}
                      </h2>
                      <div className="text-white mt-[7px] md:mt-[10px] flex justify-start items-center md:text-[14px] text-[12px]">
                        <span className=" uppercase ">
                          {dataWithdraw[0]?.bank_account_name}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      );
    }
  };
  return <>{renderHalaman()}</>;
};

export default Withdraw;
