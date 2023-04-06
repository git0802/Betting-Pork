import { useBankListQuery } from "@framework/user/get-bank-list";
import { BankIcon } from "@utils/functionutil/Function";
import React, { useEffect, useMemo, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { toast } from "react-toastify";
import { useUI } from "../../../contexts/ui-context";
import { useUserQuery } from "../../../framework/basic-rest/user/get-user-profile";

interface IListbank {
  data?: string[] | string | object;
  dataUser?: any;
  bank_selected: string;
  setBankValue?: any;
  setBankChoice?: any;
  bankValue?: string;
  bankChoice?: string;
  type?: string;

  setBankChoiceUserBankAccount?: any;
  setBankChoiceUserBankName?: any;
  setBankChoiceUserBankAccountName?: any;
  setBankType?: any;

  onChange?: any;
  useTititle?: boolean;
  title?: string;
  value?: string;
  labelKey?: string;
  tabIndex?: number;
  selected?: string;
  placeholder?: string;

  rules?: any;
  className?: string;
  positionDropdown?: "bottom" | "top";
  errorKey?: string;
  width?: string;
}

export const Listbank = (props: IListbank) => {
  const [Open, setOpen] = useState(false);
  const [Bank, setBank] = useState("");
  const [Name, setName] = useState("");
  const { setModalView, openModal, setModalData } = useUI();

  const { data: dataUser, refetch }: any = useUserQuery();

  const dataPaymentChannel = useMemo(() => {
    if (dataUser) {
      if (dataUser?.bank_account_number && dataUser?.bank_name) {
        return [
          {
            bank_account_name: dataUser.bank_account_name,
            bank_account_number: dataUser.bank_account_number,
            bank_name: dataUser.bank_name,
          },
          ...dataUser.banks,
          ...dataUser.e_wallets.map((item: any) => ({
            bank_account_name: item.e_wallet_account_name,
            bank_account_number: item.e_wallet_account_number,
            bank_name: item.e_wallet_name,
          })),
        ];
      }
      return [
        ...dataUser.banks,
        ...dataUser.e_wallets.map((item: any) => ({
          bank_account_name: item.e_wallet_account_name,
          bank_account_number: item.e_wallet_account_number,
          bank_name: item.e_wallet_name,
        })),
      ];
    }
    return [];
  }, [dataUser]);

  const handleOpenModalCreate = (e: any, payment: "bank" | "e_wallet" | null) => {
    e.preventDefault();
    setModalData({ refetchUser: refetch, username: dataPaymentChannel[0]?.bank_account_name, payment: payment });
    setModalView("PAYMENT_CHANNEL_CREATE");
    openModal();
  };

  const { isFetching: isLoading, data: dataBankList } = useBankListQuery({
    bank_type: "deposit",
  });

  useEffect(() => {
    const DataUser = props.dataUser ? props.dataUser : undefined;
    let onlineBanks: Array<any> = [];

    if (DataUser && DataUser?.banks.length !== 0) {
      onlineBanks = onlineBanks.concat(DataUser.banks.filter((data: any) => {
        return dataBankList?.find((dataBank) => dataBank.status == "online" && dataBank.bank == data.bank_name) != null || props.type === "withdraw";
      }).map((data: any) => {
        data['type'] = "bank";
        return data;
      }));
    }

    if (DataUser && DataUser?.e_wallets.length !== 0) {
      if (props.type === "withdraw") {
        onlineBanks = onlineBanks.concat(DataUser.e_wallets.filter((data: any) => {
          return dataBankList?.find((dataBank) => dataBank.status == "online" && dataBank.bank == data.bank_name) != null || props.type === "withdraw";
        }).map((data: any) => {
          data['type'] = "ewallet";
          return data;
        }))
      } else {
        onlineBanks = onlineBanks.concat(DataUser.e_wallets.filter((data: any) => {
          return dataBankList?.find((dataBank) => dataBank.status == "online" && dataBank.bank == data.e_wallet_name) != null;
        }).map((data: any) => {
          data['type'] = "ewallet";
          return data;
        }))
      }
    }

    if (onlineBanks.length > 0) {
      const type = onlineBanks[0].type;
      props.setBankChoiceUserBankAccount(type == "ewallet" ? onlineBanks[0].e_wallet_account_number : onlineBanks[0].bank_account_number);
      props.setBankChoiceUserBankName(type == "ewallet" ? onlineBanks[0].e_wallet_name : onlineBanks[0].bank_name);
      props.setBankChoiceUserBankAccountName(type == "ewallet" ? onlineBanks[0].e_wallet_account_name : onlineBanks[0].bank_account_name);
      if (props.setBankType) {
        if (type == "ewallet") {
          props.setBankType("e-walet");
        } else {
          props.setBankType("rekening");
        }
      }
      setBank(type == "ewallet" ? onlineBanks[0].e_wallet_account_number : onlineBanks[0].bank_account_number);
      setName(type == "ewallet" ? onlineBanks[0].e_wallet_account_name : onlineBanks[0].bank_account_name);
    }
  }, [isLoading, props.dataUser]);

  const handleChange = (e: any) => {
    if (e.bank_name !== undefined) {
      props.setBankChoiceUserBankAccount(e.bank_account_number);
      props.setBankChoiceUserBankName(e.bank_name);
      props.setBankChoiceUserBankAccountName(e.bank_account_name);
      props.setBankType ? props.setBankType("rekening") : null;
      setBank(e.bank_account_number);
      setName(e.bank_account_name);
      setOpen(false);
    } else {
      props.setBankChoiceUserBankAccount(e.e_wallet_account_number);
      props.setBankChoiceUserBankName(e.e_wallet_name);
      props.setBankChoiceUserBankAccountName(e.e_wallet_account_name);
      props.setBankType ? props.setBankType("e-walet") : null;
      setBank(e.e_wallet_account_number);
      setName(e.e_wallet_account_name);
      setOpen(false);
    }
  };

  const renderBullet = (data: string | undefined) => {
    if (data == "offline") {
      return (
        <div className="ml-[0.5rem] w-[10px] h-[10px] rounded-full bg-red-600"></div>
      );
    } else if (data == "online") {
      return (
        <div className="ml-[0.5rem] w-[10px] h-[10px] rounded-full bg-green-500"></div>
      );
    } else {
      return (
        <div className="ml-[0.5rem] w-[10px] h-[10px] rounded-full bg-yellow-600"></div>
      );
    }
  };

  const renderData = () => {
    return (
      <div className="flex flex-wrap">
        {
          props?.dataUser?.banks?.map((value: any, index: number) => {
            let bankAccNumber = value.bank_account_number;
            let bankAccName = value.bank_account_name;
            let status: string | undefined = "online";
            if (props.type !== "withdraw" || props.type == undefined) {
              if (dataBankList?.length !== 0) {
                const bankOnline = dataBankList?.find((bankData) => {
                  return bankData.bank == value.bank_name && bankData.status == "online";
                });
                if (!bankOnline) {
                  const bankDisturbance = dataBankList?.find((bankData) => {
                    return bankData.bank == value.bank_name && bankData.status == "disturbance";
                  });
                  status = bankDisturbance ? "disturbance" : "offline"
                }
              }
            }

            return (
              <div
                key={index}
                onClick={() => {
                  // if (status == "online") {
                    handleChange(value);
                  // } else {
                  //   toast.error("Bank yang anda pilih sedang" + " " + status);
                  // }
                }}
                className={`card_bank ${bankAccNumber == Bank && bankAccName == Name
                  ? "active"
                  : null
                  }
                w-full min-w-[149.5px] md:min-w-[227px] md:max-w-[227px] justify-center min-h-[63px] md:min-h-[74px] rounded-[4px] px-[9px] py-[10px] md:px-[18px] flex flex-col duration-200 active:scale-95 mr-[10px] my-[3.5px]  md:mr-[10px] md:my-[5px]`}
              >
                <div className="flex items-center">
                  <span className="items-center md:items-center flex min-h-[22px]">
                    {BankIcon(value.bank_name, 1.5)}
                  </span>
                  {renderBullet(status)}
                </div>
                <span className="text-[12px] md:text-[14px] font-medium text-[#D3F2FF]/60  text-left mt-[3px] uppercase truncate">
                  {" "}
                  {value.bank_account_number} - {value.bank_account_name}
                </span>
              </div>
            );
          })
        }
        <button
          onClick={(e) => handleOpenModalCreate(e, "bank")}
          className={`w-full min-w-[149.5px] md:min-w-[227px] md:max-w-[227px] min-h-[63px]  md:min-h-[74px] px-[9px] py-[10px] md:px-[18px] flex-col duration-200 active:scale-95 mr-[10px] my-[3.5px] md:mr-[10px] md:my-[5px] cursor-pointer rounded-[4px] bg-[rgba(211,242,255,0.2)] flex justify-center items-center sm:flex-col sm:space-y-4 space-x-4 sm:space-x-0 hover:bg-[rgba(211,242,255,0.3)] active:bg-[rgba(211,242,255,0.2)]`}
        >
          <span className="text-white text-center sm:w-24 w-18">
            Tambah Bank
          </span>
        </button>
      </div>
    );
  };

  const renderDataEwallet = () => {
    return (
      <div className="flex flex-wrap">
        {
          props?.dataUser?.e_wallets?.map((value: any, index: number) => {
            let status: string | undefined = "online";
            if (props.type !== "withdraw" || props.type == undefined) {
              if (dataBankList?.length !== 0) {
                const bankOnline = dataBankList?.find((bankData) => {
                  return bankData.bank == value.e_wallet_name && bankData.status == "online";
                });
                if (!bankOnline) {
                  const bankDisturbance = dataBankList?.find((bankData) => {
                    return bankData.bank == value.e_wallet_name && bankData.status == "disturbance";
                  });
                  status = bankDisturbance ? "disturbance" : "offline"
                }
              }
            }
            return (
              <div
                key={index}
                onClick={() => {
                  // if (status == "online") {
                    handleChange(value);
                  // } else {
                  //   toast.error("Bank yang anda pilih sedang" + " " + status);
                  // }
                }}
                className={`card_bank ${value.e_wallet_account_number == Bank && value.e_wallet_account_name == Name
                  ? "active"
                  : null
                  }  w-full min-w-[149.5px] md:min-w-[227px] md:max-w-[227px] justify-center min-h-[63px] md:min-h-[74px] rounded-[4px] px-[9px] py-[10px] md:px-[18px] flex flex-col duration-200 active:scale-95 mr-[10px] my-[3.5px]  md:mr-[10px] md:my-[5px]`}
              >
                <div className="flex items-center">
                  <span className="items-center md:items-center flex min-h-[22px]">
                    {BankIcon(value.e_wallet_name, 1.5)}
                  </span>
                  {renderBullet(status)}
                </div>
                <span className="text-[12px] md:text-[14px]  font-medium text-[#D3F2FF]/60  text-left mt-[3px] uppercase truncate">
                  {value.e_wallet_account_number} - {value.e_wallet_account_name}
                </span>
              </div>
            );
          })
        }
        <button
          onClick={(e) => handleOpenModalCreate(e, "e_wallet")}
          className={`w-full min-w-[149.5px] md:min-w-[227px] md:max-w-[227px] min-h-[63px]  md:min-h-[74px] px-[9px] py-[10px] md:px-[18px] flex-col duration-200 active:scale-95 mr-[10px] my-[3.5px] md:mr-[10px] md:my-[5px] cursor-pointer rounded-[4px] bg-[rgba(211,242,255,0.2)] flex justify-center items-center sm:flex-col sm:space-y-4 space-x-4 sm:space-x-0 hover:bg-[rgba(211,242,255,0.3)] active:bg-[rgba(211,242,255,0.2)]`}
        >
          <span className="text-white text-center">
            Tambah E-Wallet
          </span>
        </button>
      </div>
    )

  };

  return (
    <div className="flex flex-col">
      <div className="">
        <h1 className="text-[12px] md:text-[14px] text-[#D3F2FF]/60 text-left  mb-[5px]">
          Bank Transfer
        </h1>
      </div>
      <div> {renderData()}</div>
      <div className="pt-[18px] md:pt-[1rem]">
        <h1 className="text-[12px] md:text-[14px] text-[#D3F2FF]/60 text-left  mb-[5px] ">
          E-Wallet
        </h1>
      </div>
      <div> {renderDataEwallet()}</div>
    </div>
  );
};
