import Indicator from "@components/ui/loading-indicator";
import copy from "copy-to-clipboard";
import CurrencyInput from "react-currency-input-field";
import AnimationPlan from "@components/animate/AnimationPlan";
import { DropdownCustom } from "@components/common/dropdown/DropdownCustom";
import {
  IconCopy,
  WarinigICon,
  WarinigIConBlue,
  WarinigIConGray,
} from "@components/icons";
import { useBankListQuery } from "@framework/user/get-bank-list";
import { useQueryGetDeposit } from "@framework/user/get-user-deposit-history";
import { useUserQuery } from "@framework/user/get-user-profile";
import { useDepositMutation } from "@framework/user/use-create-deposit";
import { currencyFormat } from "@utils/functionutil";
import { BankIcon, generateUniqueNumber } from "@utils/functionutil/Function";
import isNaN from "lodash/isNaN";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FiChevronLeft } from "react-icons/fi";
import { toast } from "react-toastify";
import { useUI } from "@contexts/ui-context";
import { Countdown } from "../Components/Countdown";
import { DropdownTataCara } from "../Components/DropdownTataCara";
import { Listbank } from "../Components/Listbank";
import { Stepper } from "../Components/Stepper";

interface IDepositInstanProps {
  setDepositInstant: (instant: boolean) => void;
  scrollToTop: () => void;
}

const DepositInstan = (props: IDepositInstanProps) => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const { instantDepo, isReady } = useUI();
  const {
    query: {},
  } = router;
  let valueDefault: any = 0;
  const { isFetching: isLoading, data } = useBankListQuery({
    bank_type: "deposit",
  });
  const { data: dataUser }: any = useUserQuery();
  const [LoadingPush, setLoadingPush] = useState(false);
  const [Limit, setLimit] = useState(20);
  const [PromoID, setPromoID] = useState("");
  const [FristLoadPage, setFristLoad] = useState(false);
  const [DataSubmited, setDataSubmited] = useState(false);
  const [RenderPage, setRenderPage] = useState(0);
  const [BankType, setBankType] = useState("");
  const [setSteper1, setsetSteper1] = useState(1);
  const [setSteper2, setsetSteper2] = useState(0);
  const [setSteper3, setsetSteper3] = useState(0);

  const {
    mutate: deposit,
    isLoading: LoadingDepo,
    isError: ErrorDepositMutation,
    status,
    error,
    isSuccess,
    data: dataEror,
  } = useDepositMutation();

  const {
    DataHistory: dataDeposit,
    isSuccess: checkDataSucces,
    isLoading: loadingData,
  } = useQueryGetDeposit({
    limit: Limit,
    status: ["pending"],
  });

  const [DepositValue, setDepositValue] = useState<number>(5000);
  const [DepositValueReg, setDepositValueReg] = useState(0);
  const [DataTotal, setDataTotal] = useState(false);
  const [isloadingData, setisloadingData] = useState(true);
  const [ModalOpen, setModalOpen] = useState(false);
  const [BankID, setBankID] = useState("");
  const [DepositStatus, setDepositStatus] = useState<any>(false);
  const [DataRekeningPembayaran, setDataRekeningPembayaran] = useState(null);
  const [BankChoiceUserBankAccountName, setBankChoiceUserBankAccountName] =
    useState<any>(dataUser ? dataUser.banks[0]?.bank_account_number : "");
  const [BankChoiceUserBankAccount, setBankChoiceUserBankAccount] =
    useState<any>(dataUser ? dataUser.banks[0]?.bank_account_number : "");
  const [BankChoiceUserBankName, setBankChoiceUserBankName] = useState(
    dataUser ? dataUser?.banks[0]?.bank_name : dataUser?.banks[0]?.bank_name
  );

  const [errorMessage, setErrorMessage] = useState("");

  const minDepoAmount = 5000;
  const maxDepoAmount = 200000000;
  const updateDepositValue = (value: number) => {
    if (Number.isNaN(value)) return  setDepositValue(0);
    if (value.toString().length > maxDepoAmount.toString().length) return;
    if (value < minDepoAmount)
      setErrorMessage(`Minimum deposit Rp ${currencyFormat(minDepoAmount)}`);
    else if (value > maxDepoAmount)
      setErrorMessage(`Maximum deposit Rp ${currencyFormat(maxDepoAmount)}`);
    else setErrorMessage("");
    value = Math.floor(value);
    setDepositValue(value);
  };

  const getSelectedBankList = (data: any) => {
    const handleData = data ? data : [];
    const dataToReturn = handleData.filter((value: any) => {
      return value.bank === BankChoiceUserBankName;
    });
    if (dataToReturn.length == 0 && DataRekeningPembayaran) {
      return [];
    }
    return dataToReturn;
  };

  useEffect(() => {
    const dataBank = getSelectedBankList(data);
    setDataRekeningPembayaran(dataBank[0] ?? null);
  }, [data, BankChoiceUserBankName]);

  useEffect(() => {
    if (isReady) {
      props?.scrollToTop();
    }
  }, [DepositStatus, RenderPage, isReady]);

  useEffect(() => {
    if (dataDeposit[0] !== undefined) {
      setDepositValueReg(
        dataDeposit ? currencyFormat(dataDeposit[0]?.amount) : 0
      );
    }
  }, []);

  useEffect(() => {
    if (dataDeposit && dataDeposit.length !== 0) {
      dataDeposit?.map((value: any, index: number) => {
        if (value.status == "pending") {
          let datahadle = currencyFormat(value.amount);
          setDepositValueReg(datahadle);
          setDataTotal(true);
          setDepositStatus(true);
        }
      });
    }
    loadingData ? setisloadingData(true) : null;
    checkDataSucces ? setisloadingData(false) : null;

    setTimeout(() => {
      const dataHandle = dataDeposit ? dataDeposit : [];

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
  }, [isSuccess, DepositStatus, Limit, router, loadingData]);

  useEffect(() => {
    if (DataTotal == true) {
      if (dataDeposit.length === 0) {
        if (DepositStatus == true) {
          router.push(
            {
              pathname: `/wallet`,
              query: {
                tab: 2,
                page: 1,
                id: dataUser._id,
              },
            },
            undefined,
            { shallow: false }
          );
        }

        setDepositStatus(false);
        setDataTotal(false);
      }
    }
  }, [isLoading, Limit, DepositStatus]);

  useEffect(() => {
    if (dataUser) {
      if (dataUser.banks[0] == undefined) {
        setModalOpen(true);
      }
    }

    if (BankID == "") {
      if (data) {
        setBankID(data ? "" : "");
      }
      setBankChoiceUserBankName(dataUser ? dataUser.banks[0]?.bank_name : "");
      setBankChoiceUserBankAccount(
        dataUser ? dataUser.banks[0]?.bank_account_number : ""
      );
      setBankChoiceUserBankAccountName(
        dataUser ? dataUser.banks[0]?.bank_account_name : ""
      );
    } else {
      if (data) {
        data.map((value: any) => {
          if (BankChoiceUserBankName == value.bank) {
            setBankID(value._id);
          }
        });
      }
    }
  }, [data]);

  useEffect(() => {
    renderDataDeposit();
  }, [DepositValue]);

  useEffect(() => {
    renderEror();
  }, [ErrorDepositMutation, status]);

  const renderDataDeposit = () => {
    valueDefault = currencyFormat(generateUniqueNumber(+DepositValue));
    setDepositValueReg(valueDefault);
    if (+DepositValue <= 0) {
      return "0";
    } else {
      if (DepositStatus == false && Limit == 20) {
        return setDepositValueReg(valueDefault);
      }
    }
  };

  const onSubmit = () => {
    if (errorMessage) {
      return toast.error(errorMessage);
    }

    const dataHandleDeposit = DepositValueReg?.replaceAll(".", "");
    deposit({
      amount: dataHandleDeposit,
      bank_id: DataRekeningPembayaran?._id,
      player_bank_name: BankChoiceUserBankName,
      player_bank_account_name: BankChoiceUserBankAccountName,
      player_bank_account_number: BankChoiceUserBankAccount,
      bank_type: "deposit",
      promotion_id: PromoID,
    });
    setFristLoad(false);
    setDataSubmited(true);
    setDepositValueReg(currencyFormat(dataHandleDeposit).toString());
  };

  const renderEror = () => {
    if (isSuccess == true) {
      setDepositStatus(true);
      setRenderPage(2);
      setsetSteper1(2);
      setsetSteper2(2);
      setsetSteper3(2);
    } else {
      if (ErrorDepositMutation && status == "error") {
        return toast.error(error?.response?.data?.errors._error);
      }
    }
  };

  const HandleDataLangusng = (data: any) => {
    const handleData = data ? data : [];
    const dataToReturn = handleData.filter((value: any) => {
      return value.bank === BankChoiceUserBankName;
      //  && value.status == "online";
    });
    if (dataToReturn.length == 0 && DataRekeningPembayaran) {
      return [];
    }
    return dataToReturn;
  };

  const HandleSplitNumber = (data: any) => {
    if (data) {
      const dataReal = data ? data : 0;
      const dataRealLength = dataReal.length;
      const dataRealMax = dataRealLength - 3;
      const dataSplitFrist = data.slice(0, dataRealMax);
      const dataSplitHasil = data?.slice(dataRealMax, dataRealLength);

      return (
        <div>
          <span className="text-white text-[20px] md:text-[24px]">
            {" "}
            {dataSplitFrist}
          </span>
          <span className="bg-yellow-wallet  text-[20px] md:text-[24px] leading-0 md:leading-[38px]">
            {dataSplitHasil}
          </span>
        </div>
      );
    }
  };

  const renderHalaman = () => {
    {
      isLoading && <Indicator />;
    }
    {
      isloadingData && <Indicator />;
    }

    return (
      <div className="bg_content_container flex flex-col lg:bg-none w-full lg:rounded-10 text-white py-6 md:px-0 lg:py-0">
        {LoadingDepo && <Indicator />}
        {LoadingPush && <Indicator />}

        {instantDepo == true ? (
          <div className="flex justify-around px-mobile  mb-[1rem] lg:hidden">
            <button
              onClick={() => {
                props.setDepositInstant(false);
              }}
              className="btn-wallet-list-nominal active:translate-y-[2px]  bg-[] hover:bg-[#FFC700]/10 hover:text-[#FFC700] hover:border-[1px] hover:border-[#FFC700] animate-transationNormal"
            >
              Deposit Normal
            </button>
            <button
              onClick={() => {
                toast.warning("Anda sekarang berada di Deposit Instant");
              }}
              className="btn_primary btn-wallet-list-nominal active:translate-y-[2px]  hover:bg-[#FFC700]/10 hover:text-[#FFC700] hover:border-[1px] hover:border-[#FFC700] animate-transationNormal"
            >
              Deposit Instant
            </button>
          </div>
        ) : (
          ""
        )}

        <Stepper
          stepOne={setSteper1}
          stepTwo={setSteper2}
          stepThree={setSteper3}
        />

        <div className="flex flex-col xl:flex-row justify-between space-x-0 xl:space-y-0 xl:space-x-10 lg:py-[30px] px-mobile md:px-10">
          <div className="w-full lg:w-8/12 ">
            <div className="flex flex-col    rounded-b-[4px]">
              <div className="text-[16px] text-left font-medium    bg-[#d3f2ff05]  md:bg-[#d3f2ff0a]   p-[14px] flex items-center border-[1px] rounded-t-[4px] border-[#B9D6FF]/10">
                <div className="bg-[#D3F2FF]/30 h-[28px] w-[28px] rounded-full mr-[12px] text-white font-bold text-[18px] flex items-center  justify-center b">
                  1
                </div>{" "}
                <span>
                  Pilih Rekening Anda{" "}
                  {instantDepo == true ? "(Deposit Instant)" : ""}
                </span>
              </div>
              <div className="pb-[14px] px-[14px] border-[#B9D6FF]/10 border-[1px] pt-[1rem] rounded-b-[4px] bg-[#d3f2ff0a] md:bg-[#d3f2ff05] ">
                <Listbank
                  dataUser={dataUser}
                  bank_selected={BankChoiceUserBankName}
                  setBankChoiceUserBankAccount={setBankChoiceUserBankAccount}
                  setBankChoiceUserBankName={setBankChoiceUserBankName}
                  setBankChoiceUserBankAccountName={
                    setBankChoiceUserBankAccountName
                  }
                  setBankType={setBankType}
                  bankChoice={BankChoiceUserBankName}
                  bankValue={BankChoiceUserBankAccount}
                />
              </div>
            </div>
            <div className="flex flex-col mt-[28px]  md:mt-[40px] rounded-b-[4px]">
              <div className="md:my-[20px] md:my-[0px] w-full ">
                <div className="text-[16px] text-left font-medium    bg-[#d3f2ff05]  md:bg-[#d3f2ff0a]   p-[14px] flex items-center border-[1px] rounded-t-[4px] border-[#B9D6FF]/10">
                  <div className="bg-[#D3F2FF]/30 h-[28px] w-[28px] rounded-full mr-[12px] text-white font-bold text-[18px] flex items-center  justify-center b">
                    2
                  </div>{" "}
                  <span>Rekening Tujuan</span>
                </div>
                <div className="px-[14px] pt-[1rem] pb-[14px]  bg-[#d3f2ff0a] md:bg-[#d3f2ff05]  rounded-b-[4px]  border-[#B9D6FF]/10 border-[1px]">
                  <p className="text-[#d3f2ff99] font-medium text-left mb-2">
                    Pilihan Rekening Pembayaran{" "}
                  </p>
                  {data ? (
                    <DropdownCustom
                      data={data ? HandleDataLangusng(data) : []}
                      bankData={DataRekeningPembayaran}
                      setBankValueData={setDataRekeningPembayaran}
                    />
                  ) : (
                    <h1>Loading ...</h1>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col  mt-[28px]  md:mt-[40px]  rounded-b-[4px]">
              <div className="my-[20px] my-[0px] w-full ">
                <div className="text-[16px] text-left font-medium    bg-[#d3f2ff05]  md:bg-[#d3f2ff0a]   p-[14px] flex items-center border-[1px] rounded-t-[4px] border-[#B9D6FF]/10">
                  <div className="bg-[#D3F2FF]/30 h-[28px] w-[28px] rounded-full mr-[12px] text-white font-bold text-[18px] flex items-center  justify-center b">
                    3
                  </div>{" "}
                  <span>Jumlah Deposit</span>
                </div>
                <div className="px-[14px] pb-[14px] pt-[1rem] rounded-b-[4px]  bg-[#d3f2ff0a] md:bg-[#d3f2ff05]  border-[#B9D6FF]/10 border-[1px] ">
                  <p className="text-[14px] text-[#D3F2FF]/60 mb-[12px] text-left">
                    Masukkan Nominal Deposit
                  </p>
                  <div className="h-[42px] md:h-[52px] relative flex justify-center lg:justify-start self-center mx-auto md:mx-0 mb-4 items-center">
                    <button
                      onClick={() => {
                        let nilai;
                        if (+DepositValue <= 0) {
                          nilai = DepositValue;
                        } else if (+DepositValue <= 50000) {
                          nilai = 0;
                        } else if (DepositValue == undefined) {
                          updateDepositValue(0);
                          nilai = 0;
                        } else {
                          nilai = +DepositValue - 50000;
                        }
                        updateDepositValue(nilai);
                      }}
                      className="btn_wallet_add_subs w-[48px] h-[48px] md:w-[52px] md:h-[52px] px-4 py-3 rounded-[5px]  active:scale-95"
                    >
                      -
                    </button>
                    <div className="relative flex w-full items-center mx-[6px]  h-[48px]  md:h-[52px]">
                      <CurrencyInput
                        id="input-example"
                        name="input-name"
                        placeholder={t(`text-insert-number`)}
                        defaultValue={0}
                        decimalSeparator=","
                        groupSeparator="."
                        onValueChange={(value) => {
                          updateDepositValue(value);
                        }}
                        value={DepositValue}
                        className="bg_input_primary rounded-[4px] text-[16px] md:text-[18px] h-[48px] md:h-[52px] font-bold w-full mb-0 py-3 pl-11 pr-4"
                      />

                      <span className="absolute text-[16px] md:text-[18px]font-bold lg:mb-[-1rem] ml-[1rem] mt-[0rem] lg:mt-[-1rem] text-whiteDefault-60/30">
                        Rp
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        if (DepositValue == undefined) {
                          updateDepositValue(0 + 50000);
                        } else {
                          const nilai = +DepositValue + 50000;
                          updateDepositValue(nilai);
                        }
                      }}
                      className="btn_wallet_add_subs w-[48px] h-[48px] md:w-[52px] md:h-[52px] px-4 py-3 rounded-[5px] active:scale-95"
                    >
                      +
                    </button>
                  </div>
                  <p className="text-failed text-left text-sm md:text-base font-normal mb-[16px] md:mb-[24px]">
                    {errorMessage}
                  </p>
                  <div className="w-full flex flex-wrap gap-[6px] justify-start md:flex">
                    <button
                      onClick={() => {
                        updateDepositValue(5000);
                      }}
                      className={`btn_wallet_selected_nominal ${
                        DepositValue === 5000 ? "active" : ""
                      }`}
                    >
                      5.000{" "}
                    </button>
                    <button
                      onClick={() => {
                        updateDepositValue(50000);
                      }}
                      className={`btn_wallet_selected_nominal ${
                        DepositValue === 50000 ? "active" : ""
                      }`}
                    >
                      50.000
                    </button>
                    <button
                      onClick={() => {
                        updateDepositValue(120000);
                      }}
                      className={`btn_wallet_selected_nominal hidden md:block ${
                        DepositValue === 120000 ? "active" : ""
                      }`}
                    >
                      120.000
                    </button>
                    <button
                      onClick={() => {
                        updateDepositValue(500000);
                      }}
                      className={`btn_wallet_selected_nominal ${
                        DepositValue === 500000 ? "active" : ""
                      }`}
                    >
                      <span className="w-full"> 500.000</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-4/12">
            <h1 className="hidden lg:flex">TATA CARA PEMBAYARAN</h1>
            <div className="w-full hidden lg:flex mt-[12px]">
              <DropdownTataCara
                bank={BankChoiceUserBankName}
                noRekning={DataRekeningPembayaran?.account_number}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row justify-end items-center text-[#E1EDFF]/60 pb-10 md:py-[30px] px-mobile md:px-10">
          <div className="w-full lg:w-fit">
            {DepositValue == 0 || DepositValue == undefined ? null : (
              <button
                disabled={
                  DepositValue !== 0 && !DataRekeningPembayaran ? true : false
                }
                onClick={() => {
                  setRenderPage(1);
                  setsetSteper1(2);
                  setsetSteper2(1);
                }}
                className={`${
                  DepositValue !== 0 && !DataRekeningPembayaran
                    ? "bg-[#141414] text-gray "
                    : "btn_primary"
                } mt-5 md:mt-0 text-sm active:text-[13px] transition duration-200 ease-in-out w-full font-bold rounded-br capitalize h-11 px-5 rounded-md active:translate-y-1`}
              >
                Lanjutkan
              </button>
            )}
          </div>
        </div>
        <div className="w-full lg:w-4/12 px-mobile lg:px-10">
          <div className="w-full flex lg:hidden">
            <DropdownTataCara
              bank={BankChoiceUserBankName}
              noRekning={DataRekeningPembayaran?.account_number}
            />
          </div>
        </div>
      </div>
    );
  };

  const renderConfirmation = () => {
    {
      isLoading && <Indicator />;
    }
    {
      isloadingData && <Indicator />;
    }

    const handleWidth = () => {
      const dataValue = DepositValueReg ? DepositValueReg.toString().length : 0;

      if (dataValue <= 5) {
        return (
          <div
            className={`absolute  ml-[3rem] z-50 flex transition duration-200 ease-in-out px-4 py-2 rounded-md first-letter:before:content-[''] before:absolute before:bottom-8  before:right-1/2  before:mb-[-0.34rem]  before:rotate-[90deg] before:border-8 before:border-y-transparent before:border-l-transparent before:border-[#D3F2FF]/10`}
          ></div>
        );
      } else if (dataValue >= 5 && dataValue <= 6) {
        return (
          <div
            className={`absolute  ml-[4.2rem] z-50 flex transition duration-200 ease-in-out px-4 py-2 rounded-md first-letter:before:content-[''] before:absolute before:bottom-8  before:right-1/2  before:mb-[-0.34rem]  before:rotate-[90deg] before:border-8 before:border-y-transparent before:border-l-transparent before:border-[#D3F2FF]/10`}
          ></div>
        );
      } else if (dataValue >= 7 && dataValue <= 8) {
        return (
          <div
            className={`absolute  ml-[4.6rem] z-50 flex transition duration-200 ease-in-out px-4 py-2 rounded-md first-letter:before:content-[''] before:absolute before:bottom-8  before:right-1/2  before:mb-[-0.34rem]  before:rotate-[90deg] before:border-8 before:border-y-transparent before:border-l-transparent before:border-[#D3F2FF]/10`}
          ></div>
        );
      } else if (dataValue >= 8 && dataValue <= 13) {
        return (
          <div
            className={`absolute  ml-[7rem] z-50 flex transition duration-200 ease-in-out px-4 py-2 rounded-md first-letter:before:content-[''] before:absolute before:bottom-8  before:right-1/2  before:mb-[-0.34rem]  before:rotate-[90deg] before:border-8 before:border-y-transparent before:border-l-transparent before:border-[#D3F2FF]/10`}
          ></div>
        );
      }
    };

    return (
      <div className="bg_content_container flex flex-col relative lg:bg-none w-full md:rounded-10 text-white py-6 md:px-0 md:py-0">
        {LoadingDepo && <Indicator />}
        {LoadingPush && <Indicator />}
        <div>
          <Stepper
            stepOne={setSteper1}
            stepTwo={setSteper2}
            stepThree={setSteper3}
          />
        </div>
        <button
          onClick={() => {
            setRenderPage(0);
            setsetSteper1(1);
            setsetSteper2(0);
          }}
          className="mx-[20px] md:mt-[33px] md:mx-[40px] flex  absolute items-center space-x-2"
        >
          <div className="flex items-center justify-center bg-whiteDefault-10 rounded-full w-[20px] h-[20px]">
            <FiChevronLeft
              strokeWidth={3.2}
              className="bg-transparent font-bold text-whiteDefault-100"
            />
          </div>
          <span className="text-sm text-white font-normal"> Kembali</span>
        </button>
        <div className="flex flex-col xl:flex-row justify-center space-x-0 xl:space-y-0 xl:space-x-10 md:py-[40px] px-mobile md:px-10">
          <div className="w-full lg:w-8/12 flex flex-col justify-center">
            <h1 className="text-[16px] md:text-[18px] font-medium text-center border-[1px] rounded-t-[4px] border-[#B9D6FF]/10 bg-[#d3f2ff05] text-[#F1F5F7] py-[14px] ">
              Detail Transfer
            </h1>
            <div className="  border-[1px] rounded-b-[4px] border-[#B9D6FF]/10 bg-[#d3f2ff02] p-[14px]">
              <h1 className="text-[#D3F2FF]/60 text-left  text-[12px] md:text-[18px] font-medium">
                Total Dibayar
              </h1>
              {/* ============================= */}
              <div className="flex relative item-left h-fit justify-left md:justify-start md:text-left text-[24px] mt-[12px] md:mt-[16px]  font-semibold md:font-bold">
                <span className="text-rupiah font-medium  text-[20px] md:text-[24px] flex items-center justify-center ">
                  <span className="mr-[5px]"> Rp </span>
                </span>
                {HandleSplitNumber(
                  isNaN(DepositValueReg) ? "0" : DepositValueReg
                )}
                <button
                  onClick={async () => {
                    copy(DepositValueReg.toString());
                    const CopyTittle = t("text-copied");
                    toast.success(CopyTittle);
                  }}
                  className="flex items-center justify-center ml-5 text-white/30 hover:text-white/80"
                >
                  <IconCopy />
                </button>
              </div>
              {/* ============================= */}
              <div className="bg-[#D3F2FF]/10 px-[10px] py-[10px] text-[12px] font-normal rounded-[3px] mt-[10px] relative">
                {handleWidth()}
                <p className="text-left">
                  Pastikan saat melakukan transfer menyertakan{" "}
                  <span className="text-[#FFC700]">tiga </span> digit angka
                  unik.
                </p>
              </div>
              {/* ============================= */}
              <div className="flex mt-[24px]">
                <div className="w-full">
                  <h1 className="text-[14px]  text-left font-medium">
                    Rekening Pembayaran
                  </h1>
                  <div className="flex w-full  justify-between md:mt-[20px] mt-[18px]">
                    <span className="text-[12px] md:text-[14px] font-normal text-[#D3F2FF]/60">
                      Bank Pembayaran
                    </span>
                    <div>{BankIcon(DataRekeningPembayaran?.bank, 1.5)}</div>
                  </div>
                  <div className="flex w-full  justify-between mt-[18px]">
                    <span className="text-[12px] md:text-[14px] font-normal text-left text-[#D3F2FF]/60">
                      {DataRekeningPembayaran.type == "bank"
                        ? "Nomor Rekening"
                        : "Nomor Handphone"}
                    </span>
                    <div className="text-[12px] md:text-[14px] font-normal text-[#D3F2FF]/60">
                      {DataRekeningPembayaran?.account_number}
                    </div>
                  </div>
                  <div className="flex w-full justify-between mt-[18px]">
                    <span className="text-[12px] md:text-[14px] font-normal text-[#D3F2FF]/60">
                      Nama Pemilik
                    </span>
                    <div className="text-[12px] md:text-[14px] font-normal uppercase text-[#D3F2FF]/60">
                      {DataRekeningPembayaran?.name}
                    </div>
                  </div>
                </div>
              </div>
              <hr className="my-[24px] border-[1px] border-[#B9D6FF]/10"></hr>

              <div className="flex mt-[24px]">
                <div className="w-full">
                  <h1 className="text-[14px] text-left font-medium">
                    Rekening Asal
                  </h1>
                  <div className="flex w-full  justify-between md:mt-[20px] mt-[18px]">
                    <span className="text-[12px] md:text-[14px] font-normal text-[#D3F2FF]/60">
                      Bank Pembayaran
                    </span>
                    <div>{BankIcon(BankChoiceUserBankName, 1.5)}</div>
                  </div>
                  <div className="flex w-full justify-between mt-[18px]">
                    <span className="text-[12px] md:text-[14px] font-normal text-left text-[#D3F2FF]/60">
                      {DataRekeningPembayaran.type == "bank"
                        ? "     Nomor Rekening"
                        : "Nomor Handphone"}
                    </span>
                    <div className="text-[12px] md:text-[14px] font-normal text-[#D3F2FF]/60">
                      {BankChoiceUserBankAccount}
                    </div>
                  </div>
                  <div className="flex w-full bg- justify-between mt-[18px]">
                    <span className="text-[12px] md:text-[14px] font-normal text-[#D3F2FF]/60">
                      Nama Pemilik
                    </span>
                    <div className="text-[12px] md:text-[14px] font-normal uppercase text-[#D3F2FF]/60">
                      {BankChoiceUserBankAccountName}
                    </div>
                  </div>
                </div>
              </div>
              <hr className="my-[24px] border-[1px] border-[#B9D6FF]/10"></hr>

              {/* <div className="mt-[24px]">
                <h1>Bonus Anda</h1>
                <div className="h-[84px] w-full rounded-[5px] bg-yellowPrimary p-[16px]  mt-[14px]">
                  tes
                </div>
              </div> */}
              <div className="space-y-3 text-sm font-normal mt-[24px] mb-[25px]">
                <div className="flex text-left items-center space-x-3">
                  <span className="lg:scale-105 items-center flex">
                    <WarinigICon />
                  </span>
                  <p className="text-[#D3F2FF]/60 text-[12px] font-normal  leading-[15.12px]">
                    Pastikan mentransfer dari rekening yang sama dengan rekening
                    terdaftar
                  </p>
                </div>
                <div className="flex text-left items-center space-x-3">
                  <span className="lg:scale-105  items-center flex">
                    <WarinigICon />
                  </span>
                  <p className="text-[#D3F2FF]/60 text-[12px] font-normal  leading-[15.12px]">
                    Pastikan status Bank asal dan Bank tujuan online
                  </p>
                </div>
              </div>

              <button
                disabled={
                  (DepositValue !== 0 &&
                    BankChoiceUserBankName !== DataRekeningPembayaran.bank) ||
                  !DataRekeningPembayaran
                    ? true
                    : false
                }
                onClick={() => {
                  onSubmit();
                }}
                className={`${
                  BankChoiceUserBankName !== DataRekeningPembayaran.bank ||
                  !DataRekeningPembayaran
                    ? "bg-[#141414] text-gray "
                    : "btn_primary"
                } h-11 rounded-md text-sm active:text-[13px] transition duration-200 ease-in-out w-full font-bold capitalize`}
              >
                Deposit Sekarang
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const RenderWiat = () => {
    return (
      <div className="bg_content_container lg:bg-none md:rounded-10 flex flex-col justify-center items-center pb-[40px]">
        {isLoading && <Indicator />}
        <Stepper stepOne={3} stepTwo={3} stepThree={1} />

        <div className="w-full md:w-5/12 md:max-w-[415px] flex flex-col  px-mobile mt-[30px] justify-center">
          <h1 className=" text-[16px] md:text-[18px] font-medium text-center text-white ">
            Deposit Sedang di Proses
          </h1>
          <div className="h-[98px] mt-[14px]  relative flex justify-center ">
            <AnimationPlan />
          </div>
          {dataDeposit[0] ? (
            <div className=" text-[#D3F2FF] text-[12px] md:text-[14px] font-medium flex justify-center w-full flex-col ">
              <span className="text-center ">Batas waktu deposit anda</span>
              <Countdown data={dataDeposit[0]} />{" "}
            </div>
          ) : null}

          {dataDeposit[0] ? (
            <div className="mt-[24px] w-full bg-[#B9D6FF]/5 flex justify-center flex-col rounded-[4px]">
              <div className="bg-[#07243A]/40 my-[16px] mx-[13px]  md:mt-[15px] md:mx-[13px] md:mb-[20px] flex flex-col justify-center rounded-[4px]">
                <h1 className="text-[12px] md:text-[14px] text-[#D3F2FF]/60 mt-[12px] font-medium  text-center">
                  Total Dibayar
                </h1>
                <div className="flex item-center space-x-2 w-full justify-center text-center mb-[13px] text-[24px]  font-semibold">
                  <span className="text-rupiah font-medium  leading-10">
                    Rp{" "}
                  </span>
                  <span className="flex items-center justify-center font text-white">
                    {HandleSplitNumber(
                      isNaN(DepositValueReg) ? "0" : DepositValueReg
                    )}
                  </span>
                  <button
                    onClick={async () => {
                      copy(DepositValueReg.toString());
                      const CopyTittle = t("text-copied");
                      toast.success(CopyTittle);
                    }}
                    className="flex items-center justify-center ml-5 text-white/30 hover:text-white/80"
                  >
                    <IconCopy />
                  </button>
                </div>
              </div>
              <hr className="border-[1px] border-[#B9D6FF]/5 mb-[16px] md:mb-[20px]" />
              <div className="px-[16px] pb-[20px]">
                <h1 className=" text-[12px] md:text-[14px] font-medium text-left text-white">
                  {t(`text-bankDestination`)}
                </h1>
                <div className="flex  w-full">
                  <div className="w-7/12 md:w-9/12 flex flex-col mt-[14px] md:mt-[16px]">
                    <h2 className=" text-[12px] font-normal text-left text-[#D3F2FF]/60">
                      {dataDeposit[0].type == "bank"
                        ? "Nomor Rekening"
                        : "Nomor Handphone"}
                    </h2>
                    <div className="text-white mt-[7px] md:mt-[10px] flex justify-start items-center md:text-[14px] text-[12px]">
                      {BankIcon(dataDeposit[0]?.bank, 1.5)}{" "}
                      <span className="ml-[6px]">
                        {dataDeposit[0]?.bank_account_number}
                      </span>
                      <button
                        onClick={async () => {
                          copy(dataDeposit[0]?.bank_account_number.toString());
                          const CopyTittle = t("text-copied");
                          toast.success(CopyTittle);
                        }}
                        className="flex items-center justify-center ml-3 text-white/30 hover:text-white/80"
                      >
                        <IconCopy />
                      </button>
                    </div>
                  </div>
                  <div className="w-5/12 md:w-4/12 flex   md:justify-start flex-col mt-[16px]">
                    <h2 className=" text-[12px] font-normal  text-left text-[#D3F2FF]/60">
                      Nama Rekening
                    </h2>
                    <div className="text-white mt-[7px] md:mt-[10px] flex justify-start items-center md:text-[14px] text-[12px] ">
                      <span className=" uppercase">
                        {dataDeposit[0]?.bank_account_name}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          {dataDeposit[0] ? (
            <div className="mt-[10px] w-full bg-[#B9D6FF]/5 flex justify-center flex-col rounded-[4px]">
              <div className="bg-[#1AA9E7]/10 mt-[15px]  p-[6px] min-h-[27px] mx-[13px] mb-[20px] flex flex-row justify-center items-center rounded-[4px]">
                <span className="lg:scale-90  mt-[3px] items-center flex mr-[8px]">
                  <WarinigIConBlue />
                </span>
                <span className="text-[12px] font-medium text-[#1AA9E7]">
                  Harap transfer melalui rekening ini
                </span>
              </div>
              <hr className="border-[1px] border-[#B9D6FF]/5 mb-[16px] md:mb-[20px]" />
              <div className="px-[16px] pb-[20px]">
                <h1 className=" text-[12px] md:text-[14px] font-medium text-left text-white">
                  {t(`text-bankSend`)}
                </h1>
                <div className="flex  w-full space-x-2 md:space-x-0">
                  <div className="w-7/12 md:w-9/12 flex flex-col mt-[14px] md:mt-[16px]">
                    <h2 className=" text-[12px] font-normal  text-left text-[#D3F2FF]/60">
                      {dataDeposit[0]?.type == "bank"
                        ? "Nomor Rekening"
                        : "Nomor Handphone"}
                    </h2>
                    <div className="text-white mt-[7px] md:mt-[10px] flex justify-start items-center md:text-[14px] text-[12px]">
                      {BankIcon(dataDeposit[0]?.sender_bank, 1.5)}{" "}
                      <span className="ml-[6px]">
                        {dataDeposit[0]?.sender_bank_account_number}
                      </span>
                    </div>
                  </div>
                  <div className="w-5/12 md:w-4/12 flex   md:justify-start flex-col mt-[16px]">
                    <h2 className=" text-[12px] font-normal text-left text-[#D3F2FF]/60">
                      {dataDeposit[0].type == "bank"
                        ? "Nama Rekening"
                        : "Nama Handphone"}
                    </h2>
                    <div className="text-white mt-[7px] md:mt-[10px] flex justify-start items-center md:text-[14px] text-[12px]">
                      <span className="uppercase ">
                        {dataDeposit[0]?.sender_bank_account_name}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          <div className="text-whiteDefault-100 text-center text-[12px]  mx-auto md:mx-0 md:text-[14px] font-normal flex mt-[26px]">
            <span className="scale-90 lg:scale-90  items-center flex mr-[4px] md:mr-[8px]">
              <WarinigIConGray />
            </span>
            Lakukan deposit sebelum batas waktu deposit anda habis
          </div>
        </div>
      </div>
    );
  };

  const randerPage = () => {
    if (RenderPage == 0 && DepositStatus == false) {
      return renderHalaman();
    } else if (RenderPage == 1 && DepositStatus == false) {
      return renderConfirmation();
    } else if (DepositStatus == true) {
      return RenderWiat();
    }
  };

  return (
    <>
      {isloadingData && <Indicator />}
      {randerPage()}
    </>
  );
};

export default DepositInstan;
