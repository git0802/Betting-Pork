import cn from "classnames";
import React, { forwardRef, ButtonHTMLAttributes } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    variant?: "darkBlue" | "yellow" | "primary" | "transparent" | "loadmore" | "cancel" | "deposit" | "animation" | "text";
    active?: boolean;
    type?: "submit" | "reset" | "button";
    loading?: boolean;
    disabled?: boolean;
    width?: "w-full" | "w-fit";
}

// eslint-disable-next-line react/display-name
const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
    const {
        className,
        variant = "flat",
        children,
        active,
        loading = false,
        disabled = false,
        width,
        ...rest
    } = props;

    const rootClassName = cn(
        "flex justify-center items-center uppercase cursor-pointer transition ease-in-out duration-200 focus-visible:outline-none focus:outline-none",
        {
            "button-transparent rounded-md active:translate-y-1":
                variant === "transparent",
            "button-yellow":
                variant === "yellow",
            "btn_primary rounded-md active:translate-y-1":
                variant === "primary",
            "button-darkblue rounded-md active:translate-y-1":
                variant === "darkBlue",
            "btn_loadmore rounded-md active:translate-y-1":
                variant === "loadmore",
            "btn_cancel rounded-md active:translate-y-1":
                variant === "cancel",
            "btn_deposit rounded-md active:translate-y-1":
                variant === "deposit",
            "btn_animation active:translate-y-1":
                variant === "animation",
            "active:translate-y-1":
                variant === "text",
            "cursor-not-allowed": loading,
            "cursor-not-allowed hover:cursor-not-allowed": disabled,
            "w-full": width === "w-full",
            "w-fit": width === "w-fit"
        },
        className,
    );

    // return (
    //     <button
    //         aria-pressed={active}
    //         data-variant={variant}
    //         ref={ref}
    //         className={rootClassName}
    //         disabled={disabled}
    //         {...rest}
    //     >
    //         {loading ? 'Loading..' : children}
    //     </button>
    // );
    if (variant !== "animation") {
        return (
            <button
                aria-pressed={active}
                data-variant={variant}
                ref={ref}
                className={rootClassName}
                disabled={disabled}
                {...rest}
            >
                {loading ? 'Loading..' : children}
            </button>
        );
    } else {
        return (
            <button
                aria-pressed={active}
                data-variant={variant}
                ref={ref}
                className={rootClassName}
                disabled={disabled}
                {...rest}
            >
                <div></div>
                    <span>{loading ? 'Loading..' : children}</span>
                <div></div>
            </button>
        );
    }
});

export default Button;
