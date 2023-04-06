import Input from "@components/ui/input";
import PasswordInput from "@components/ui/password-input";
import Button from "@components/ui/button";
import { useForm } from "react-hook-form";
import { useUI } from "@contexts/ui-context";
import { useTranslation } from "next-i18next";
import { useWithdrawalMutation } from "@framework/user/use-create-withdrawal";

const WithdrawalForm: React.FC = () => {
  const { t } = useTranslation();
  const {
    modalData: { data },
    setModalView,
    openModal,
    closeModal,
  } = useUI();
  const { mutate: withdrawal, isLoading } = useWithdrawalMutation();
  const { amount, bank } = data;
  let bank_id = 0;

  if (bank) {
    bank_id = bank._id;
  }

  function onSubmit() {
    withdrawal({
      amount,
      bank_id,
    });
    setModalView("WITHDRAWAL_SUBMITTED_VIEW");
    return openModal();
  }

  return (
    <div className="w-full px-5 py-5 mx-auto overflow-hidden bg-white border border-gray-300 rounded-lg sm:w-96 md:w-450px sm:px-8">
      <div className="text-center mb-6 pt-2.5">
        <div onClick={closeModal}>
          <div className="w-[120px] h-[120px] rounded-full bg-gray-400 mx-auto"></div>
        </div>
        <p className="mt-2 mb-8 text-sm md:text-base text-body sm:mb-10">
          {t("withdrawal:withdrawal-confirm-text")}
        </p>
      </div>
      <div className="mb-8">
        <h3 className="mb-4 text-sm">Details Penarikan:</h3>
        <div className="p-5 bg-gray-200 border-2 rounded-md border-gray-350">
          <div className="flex mb-6">
            <div className="w-1/2">
              <div className="text-sm">Name:</div>
              <h2 className="font-semibold">{bank?.bank}</h2>
            </div>
            <div className="w-1/2">
              <div className="text-sm">Account Number:</div>
              <h2 className="font-semibold">{bank?.account_number}</h2>
            </div>
          </div>
          <div className="flex">
            <div className="w-1/2">
              <div className="text-sm">Jumlah Penarikan:</div>
              <h2 className="font-semibold">RP. {amount}</h2>
            </div>
          </div>
        </div>
      </div>
      <form className="flex flex-col justify-center" noValidate>
        <div className="flex flex-col space-y-3.5">
          <PasswordInput labelKey="forms:label-pin" />
          <div className="relative">
            <Button
              onClick={() => onSubmit()}
              type="submit"
              loading={isLoading}
              disabled={isLoading}
              className="h-11 md:h-12 w-full mt-1.5 bg-purple-600"
            >
              {t("withdrawal:text-submit-request")}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default WithdrawalForm;
