import { useForm } from "react-hook-form";
import Button from "@components/ui/button";
import Input from "@components/ui/input";
import { useTranslation } from "next-i18next";
import { useUI } from "@contexts/ui-context";
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";
import { useCreateBankMutation } from "@framework/user/use-create-bank";
import toastErrorMessage from "@utils/toastErrorMessage";
import { useEffect, useMemo, useState } from "react";
import { getListBank } from "@framework/user/get-bank-list";
import { Bank, BankOptions} from "@framework/types";
import FormSelect from "@components/form/select";

const PaymentChannelCreate = () => {
  const { t } = useTranslation();
  const {
    closeModal,
    modalData
  } = useUI();

  const { refetchUser, username, payment } = modalData;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
    control,
  } = useForm();

  const watchBankName = watch("bank_name");
  setValue("bank_account_name", username)

  const {
    mutate: createBank,
    isLoading,
  } = useCreateBankMutation(
    () => {
      toast.success(t("forms:text-add-payment-channel-success") as string);
      reset();
      closeModal();
      refetchUser();
    },
    toastErrorMessage
  );

  const [dataBank, setDataBank] = useState(null);
  
  const getAllListBanks = async () => {
    const data = await getListBank();
    setDataBank(data);
  };
  
  useEffect(() => {
    getAllListBanks();
  }, []);
    
  const listPayment = useMemo(() => {
    if(!dataBank) return []
    const banks: BankOptions = [];
    dataBank.forEach((item: Bank) => {
      if(!banks.find(i => item.bank === i.value)){
        if (!payment) {
             // @ts-ignore
             banks.push({
              label: item.bank,
              value: item.bank,
              type: item.type,
            });
        } else {
          if (item.type != payment) return;
          // @ts-ignore
          banks.push({
            label: item.bank,
            value: item.bank,
            type: item.type,
          });
        }
      }
    });
    return banks;
  },[dataBank])

  const onSubmit = (data: any) => {
    const paymentType = listPayment.find(item => item.value === data.bank_name)?.type;
    if (data.bank_account_name.toLowerCase() == username.toLowerCase()) {
      createBank({
        ...data,
        type: paymentType
      });
    } else {
      toast.error(t("common:text-name-not-match") as string, {
        bodyStyle: {
          whiteSpace: "pre-wrap",
        },
        toastId: "add-payment-channel",
      });
    }
  }
  const labelPaymentNumber = useMemo(() => {
    const paymentType = listPayment.find(item => item.value === watchBankName)?.type;
    if (paymentType === 'bank')
      return 'Nomor Rekening';
    else if (paymentType === "e_wallet") return "Nomor Handphone";
    return "Nomor Rekening / Handphone";
  }, [watchBankName])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='w-full sm:w-[362px] flex flex-col mx-auto rounded-md text-white px-[35px] py-[30px] space-y-4'>
      <div className="flex justify-between pb-0">
        <span className="text-base font-bold text-whiteDefault-100">Tambah Pembayaran</span>
        <button
          type="button"
          onClick={closeModal}
          aria-label="Close panel"
          className="inline-flex items-center justify-center text-CadetGrey-100 hover:text-whiteDefault-100 transition duration-200 focus:outline-none"
        >
          <IoClose className="text-xl" />
        </button>
      </div>
      <div>
        <label className="block text-CadetGrey-100 font-semibold text-sm leading-none mb-[10px] capitalize">
        Pilih Channel Pembayaran
        </label>
        <FormSelect
          autoFocus
          control={control}
          options={listPayment}
          tabIndex={6}
          errorKey={errors.bank_name?.message}
          placeholder="Pilih Metode Pembayaran"
          {...register("bank_name", {
            required: 'Channel pembayaran harus diisi',
          })}
        />
      </div>
      <Input
        labelKey={labelPaymentNumber}
        type="text"
        variant="solid"
        {...register("bank_account_number", {
          required: `${labelPaymentNumber} harus diisi`,
          pattern: {
            value: /^[0-9]+$/,
            message: t("forms:bank-account-number-error"),
          },
          onChange: (e)=>{
            e.currentTarget.value = e.currentTarget.value.replace(/\D+/g, "");
            e.currentTarget.value = e.currentTarget.value.substring(0, 20);
          }
        })}
        errorKey={errors.bank_account_number?.message}
        placeholder={`${labelPaymentNumber}`}
      />
      <Input
        labelKey="Nama Lengkap"
        type="text"
        disabled
        variant="solid"
        {...register("bank_account_name", {
          required: 'Nama lengkap harus diisi',
        })}
        errorKey={errors.bank_account_name?.message}
        placeholder="Masukkan Nama Lengkap"
      />
      <div className="flex justify-between sm:justify-end space-x-2 sm:space-x-0 mt-5">
        <Button
          type="submit"
          variant="primary"
          loading={isLoading}
          disabled={isLoading}
          className="w-full md:w-fit md:px-5 h-11 font-extrabold capitalize"
        >
          {isLoading ? t("common:text-add") + '...' : t("common:text-add")}
        </Button>
      </div>
    </form>
  )
}

export default PaymentChannelCreate;