import React from 'react'
import { useUserQuery } from "@framework/user/get-user-profile";
import { useTranslation } from 'next-i18next'
import PasswordInput from "@components/ui/password-input";
import Button from "@components/ui/button";
import { useForm } from 'react-hook-form';
import { useChangePasswordMutation } from '@framework/user/use-change-password';
import { toast } from 'react-toastify';
import toastErrorMessage from '@utils/toastErrorMessage';

const Password = () => {
    const { t } = useTranslation("common");

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        getValues,
    } = useForm();


    const {
        mutate: changePassword,
        isLoading,
    } = useChangePasswordMutation(
        () => {
            toast.success("Password update has been successful.");
            reset();
        },
        toastErrorMessage
    );

    function onSubmit(data: any) {
        changePassword(data);
    }

    const contInput = "md:grid md:grid-cols-3 md:gap-3"

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={`bg_content_user_container lg:w-full lg:mx-auto md:rounded-[10px] lg:text-white lg:py-6 lg:mb-4 space-y-4 px-mobile py-4 lg:p-6`}>
            <div className='flex flex-col space-y-1'>
                <span className='text-md font-semibold text-whiteDefault-100'>Ganti Password</span>
                <span className='text-xs font-medium text-whiteDefault-40'>Ganti password untuk keamanan akun anda.</span>
            </div>
            <div className={contInput}>
            <PasswordInput
                labelKey="forms:label-password"
                autoComplete='new-password'
                placeholderKey="forms:placeholder-password"
                {...register("old_password", {
                    required: `${t("forms:password-required")}`,
                    onChange: (e) => {
                        e.currentTarget.value = e.currentTarget.value.substring(0, 25);
                    },
                })}
                errorKey={errors.old_password?.message}
            />
            </div>
            <div className={contInput}>
            <PasswordInput
                labelKey="forms:label-new-password"
                placeholderKey="forms:placeholder-password"
                {...register("password", {
                    required: `${t("forms:new-password-required")}`,
                    onChange: (e) => {
                        e.currentTarget.value = e.currentTarget.value.substring(0, 25);
                    },
                })}
                errorKey={errors.password?.message}
            />
            <PasswordInput
                labelKey="forms:label-retype-new-password"
                className="mt-4 md:mt-0"
                placeholderKey="forms:placeholder-retype-new-password"
                {...register("re_password", {
                    required: "forms:password-confirm-required",
                    validate: {
                        matchesPreviousPassword: (value: any) => {
                            const { password } = getValues();
                            return (
                                password === value || "forms:passwordConfirm-error"
                            );
                        },
                    },
                    onChange: (e) => {
                        e.currentTarget.value = e.currentTarget.value.substring(0, 25);
                    },
                })}
                errorKey={errors.re_password?.message}
            />
            <Button
                type="submit"
                variant="primary"
                loading={isLoading}
                disabled={isLoading}
                width="w-full"
                className="flex flex-row h-11 font-extrabold uppercase mt-4 md:mt-0 md:w-fit px-3 md:self-end md:ml-auto"
            >
                {t("common:text-submit")}
            </Button>
            </div>
        </form>
    )
}

export default Password