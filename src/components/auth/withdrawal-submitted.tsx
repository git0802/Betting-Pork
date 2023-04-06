import PasswordInput from "@components/ui/password-input";
import Button from "@components/ui/button";
import { useForm } from "react-hook-form";
import { useLoginMutation, LoginInputType } from "@framework/auth/use-login";
import { useUI } from "@contexts/ui-context";
import { useTranslation } from "next-i18next";

const WithdrawalForm: React.FC = () => {
  const { t } = useTranslation();
  const {
    modalData: { data },
    closeModal,
  } = useUI();
  const { amount, bank } = data;
  let date = new Date().toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="w-full px-5 py-5 mx-auto overflow-hidden bg-white border border-gray-300 rounded-lg sm:w-96 md:w-450px sm:px-8">
      <div className="text-center mb-6 pt-2.5">
        <div onClick={closeModal}>
          <div className="w-[120px] h-[120px] rounded-full bg-gray-400 mx-auto"></div>
        </div>
        <p className="mt-2 mb-0 text-sm md:text-base text-body">
          {t("withdrawal:withdrawal-submitted-text")}
        </p>
        <p className="mt-2 mb-8 text-sm md:text-base text-body sm:mb-10">
          {t("withdrawal:withdrawal-information-text")}
        </p>
      </div>
      <div className="mb-4">
        <div className="p-5 border-t-2 border-b-2 border-gray-350">
          <h3 className="text-sm text-center">Withdraw amount</h3>
          <div className="my-2 text-lg font-bold text-center">RP. {amount}</div>
          <div className="text-sm text-center text-gray-400">{date}</div>
        </div>
      </div>
      <div className="mb-8">
        <h3 className="text-sm text-center mb-3">
          We will transfer the amount to:
        </h3>
        <div className="p-5 bg-gray-200 border-2 rounded-md border-gray-350">
          <div className="flex">
            <div className="w-1/2">
              <div className="text-sm">Name:</div>
              <h2 className="font-semibold">{bank?.bank}</h2>
            </div>
            <div className="w-1/2">
              <div className="text-sm">Account Number:</div>
              <h2 className="font-semibold">{bank?.account_number}</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="w-1/2 mx-auto">
        <Button
          onClick={() => closeModal()}
          type="submit"
          className="h-11 md:h-12 w-full mt-1.5 bg-purple-600"
        >
          {t("withdrawal:text-view-request")}
        </Button>
      </div>
    </div>
  );
};

export default WithdrawalForm;
