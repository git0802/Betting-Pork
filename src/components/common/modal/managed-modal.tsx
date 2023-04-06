import { useUI } from "@contexts/ui-context";
import Modal from "./modal";
import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
const LoginForm = dynamic(() => import("@components/auth/login-form"));
const PinVerificationForm = dynamic(() => import("@components/auth/pin-verification-form"));
const NewPinForm = dynamic(() => import("@components/auth/new-pin-form"));
const SigninTerm = dynamic(() => import("@components/auth/signin-terms"));
const SignUpForm = dynamic(() => import("@components/auth/sign-up-form"));
const WithdrawalForm = dynamic(() => import("@components/auth/withdrawal-form"));
const WithdrawalSubmitted = dynamic(() => import("@components/auth/withdrawal-submitted"));
const DepositConfirmation = dynamic(() => import("@components/auth/deposit-confirmation"));
const DepositSubmitted = dynamic(() => import("@components/auth/deposit-submitted"));
const ForgetPasswordForm = dynamic(() => import("@components/auth/forget-password-form"));
const ClaimBonus = dynamic(() => import("@components/referral/modal-claim-bonus"));
const ClaimConfirm = dynamic(() => import("@components/referral/modal-claim-confirm"));
const ProviderProfileSelector = dynamic(() => import("@components/provider/provider-profile-selector"));

const PaymentChannelCreate = dynamic(() => import("@components/user-information/PaymentChannelCreate"));
const ReadNotification = dynamic(() => import("@components/notification/modal"));
const HubungiCS = dynamic(() => import("@components/notification/hubungi-cs"));

const ManagedModal: React.FC = () => {
	const { displayModal, closeModal, modalView } = useUI();

	return (
		<Modal open={displayModal} onClose={closeModal} >
			{modalView === "LOGIN_VIEW" && <LoginForm />}
			{modalView === "PIN_VERIFICATION" && <PinVerificationForm/>}
			{modalView === "NEW_PIN" && <NewPinForm/>}
			{modalView === "SIGNIN_TERMS" && <SigninTerm/>}
			{modalView === "SIGN_UP_VIEW" && <SignUpForm />}
			{modalView === "FORGET_PASSWORD" && <ForgetPasswordForm />}
			{modalView === "WITHDRAWAL_CONFIRM_VIEW" && <WithdrawalForm />}
			{modalView === "WITHDRAWAL_SUBMITTED_VIEW" && <WithdrawalSubmitted />}
			{modalView === "DEPOSIT_CONFIRMATION_VIEW" && <DepositConfirmation />}
			{modalView === "DEPOSIT_SUBMITTED_VIEW" && <DepositSubmitted />}
			{modalView === "CLAIM_BONUS" && <ClaimBonus />}
			{modalView === "NOTIFICATION_CLAIM_BONUS" && <ClaimConfirm />}
			{modalView === "PROVIDER_PROFILE_SELECTOR" && <ProviderProfileSelector />}
			{modalView === "PAYMENT_CHANNEL_CREATE" && <PaymentChannelCreate />}
			{modalView === "NOTIFICATION_READ" && <ReadNotification />}
			{modalView === "HUBUNGI_CS" && <HubungiCS />}
		</Modal>
	);
};

export default ManagedModal;
