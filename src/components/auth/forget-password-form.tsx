import Button from "@components/ui/button";
import Input from "@components/ui/input";
import PasswordInput from "@components/ui/password-input";
import { useForm } from "react-hook-form";
import { useUI } from "@contexts/ui-context";
import { useTranslation } from "next-i18next";
import { IoClose } from "react-icons/io5";

type FormValues = {
	email: string;
};

const defaultValues = {
	email: "",
};

const ForgetPasswordForm = () => {
	const { t } = useTranslation();
	const { setModalView, openModal, closeModal } = useUI();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormValues>({
		defaultValues,
	});

	function handleSignIn() {
		setModalView("LOGIN_VIEW");
		return openModal();
	}

	const onSubmit = (values: FormValues) => {
		closeModal()
	};

	return (
		<div className="w-full mx-auto overflow-hidden text-white border border-blueDefault-45 rounded-lg pb-5 md:pb-0 sm:w-96 md:w-[720px] md:h-[425px]">
			<div className="grid md:grid-cols-2 h-full">
				<div className="bg-darkBlue-100">
					
				</div>
				<div className="flex flex-col p-5">
					<div className="flex justify-between pb-0">
						<span className="text-base font-bold text-whiteDefault-100">{t("common:text-reset-password")}</span>
						<button
							onClick={closeModal}
							aria-label="Close panel"
							className="inline-flex items-center justify-center text-CadetGrey-100 hover:text-whiteDefault-100 transition duration-200 focus:outline-none"
						>
							<IoClose className="text-xl" />
						</button>
					</div>
					<div className="flex justify-between pt-0">
						<span className="text-xs font-medium text-whiteDefault-40">Pulihkan kembali password akun anda.</span>
					</div>
					<form
						onSubmit={handleSubmit((data) => onSubmit(data))}
						className="flex flex-col space-y-5 justify-center mt-5"
						noValidate
					>
						{/* <PasswordInput
							labelKey="forms:label-new-password"
							placeholderKey="forms:placeholder-new-password"
							errorKey={errors.password?.message}
							{...register("password", {
								required: `${t("forms:new-password-required")}`,
							})}
						/>
						<PasswordInput
							labelKey="forms:label-retype-new-password"
							placeholderKey="forms:placeholder-retype-new-password"
							errorKey={errors.password?.message}
							{...register("password", {
								required: `${t("forms:retype-new-password-required")}`,
							})}
							className='mt-3'
						/> */}
						<Input
							labelKey="forms:label-email"
							type="email"
							variant="solid"
							className="mb-4"
							placeholderKey="forms:placeholder-email"
							{...register("email", {
								required: `${t("forms:email-required")}`,
								pattern: {
									value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
									message: t("forms:email-error"),
								},
							})}
							errorKey={errors.email?.message}
						/>

						<Button type="submit" className="bg-blue-gradient h-11 md:h-12 w-full mt-2">
							{t("common:text-reset-password")}
						</Button>
					</form>

					{/* <div className="text-sm sm:text-base text-body text-center">
						{t("common:text-back-to")}{" "}
						<button
							type="button"
							className="text-sm sm:text-base text-heading underline font-bold hover:no-underline focus:outline-none"
							onClick={handleSignIn}
						>
							{t("common:text-login")}
						</button>
					</div> */}
				</div>
			</div>
		</div>
	);
};

export default ForgetPasswordForm;
