import Button from "@components/ui/button";
import { useUI } from "@contexts/ui-context";
import { useTranslation } from "next-i18next";
import { BsExclamationCircle, BsCheck2Circle } from "react-icons/bs";
import { useDepositMutation } from "@framework/user/use-create-deposit";

const DepositForm: React.FC = () => {
  const { t } = useTranslation();
  const {
    modalData: { data },
    setModalView,
    openModal,
    closeModal,
  } = useUI();
  const { mutate: deposit, isLoading } = useDepositMutation();
  const { amount, bank } = data;
  let bank_id = 0;

  if (bank) {
    bank_id = bank._id;
  }

  function onSubmit() {
    deposit({
      amount,
      bank_id,
    });
    setModalView("DEPOSIT_SUBMITTED_VIEW");
    return openModal();
  }

  return (
    <div className="w-full px-5 py-5 mx-auto overflow-hidden bg-white border border-gray-300 rounded-lg sm:w-96 md:w-450px sm:px-8">
      <div className="text-center mb-6 pt-2.5">
        <div onClick={closeModal}>
          <div className="w-[120px] h-[120px] rounded-full bg-gray-400 mx-auto"></div>
        </div>
        <p className="mt-2 mb-0 text-sm md:text-base text-body">
          {t("deposit:deposit-confirm-text")}
        </p>
      </div>
      <div className="rounded-md bg-yellow-50 p-4 mb-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <BsExclamationCircle
              className="h-5 w-5 text-yellow-400"
              aria-hidden="true"
            />
          </div>
          <div className="ml-3">
            <div className="text-sm text-grey-700">
              <p>
                To process your payment, please transfer from&nbsp;
                <b>Mark Johnson's</b> bank account.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-8">
        <h3 className="mb-4 text-sm">Transfer Details:</h3>
        <div className="p-5 bg-gray-200 border-2 rounded-md border-gray-350">
          <div className="flex mb-6">
            <div className="w-1/2">
              <div className="text-sm">Name:</div>
              <h2 className="font-semibold">{bank.name}</h2>
            </div>
            <div className="w-1/2">
              <div className="text-sm">Account Number:</div>
              <h2 className="font-semibold">{bank.account_number}</h2>
            </div>
          </div>
          <div className="flex">
            <div className="w-1/2">
              <div className="text-sm">Transfer Amount:</div>
              <h2 className="font-semibold">RP. {amount}</h2>
            </div>
          </div>
        </div>
      </div>
      <p className="my-2 flex text-gray-600">
        <BsCheck2Circle className="w-5 h-5 mr-2" />
        Silahkan transfer jumlah yang tepat
      </p>
      <p className="my-2 flex text-gray-600">
        <BsCheck2Circle className="w-5 h-5 mr-2" />
        Pastikan status Bank asal dan Bank tujuan online
      </p>
      <div className="mx-auto mt-8">
        <Button
          onClick={() => onSubmit()}
          type="submit"
          className="h-11 md:h-12 w-full mt-1.5 bg-purple-600"
        >
          {t("deposit:text-confirm-request")}
        </Button>
      </div>
    </div>
  );
};

export default DepositForm;
