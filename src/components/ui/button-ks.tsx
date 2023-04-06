import cn from "classnames";
import React, { forwardRef, ButtonHTMLAttributes } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: "darkBlue" | "yellow" | "primary" | "transparent" | "loadmore" | "cancel" | "deposit";
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
      "button-transparent":
        variant === "transparent",
      "button-yellow":
        variant === "yellow",
      "btn_primary":
        variant === "primary",
      "button-darkblue":
        variant === "darkBlue",
      "btn_loadmore":
        variant === "loadmore",
      "btn_cancel":
        variant === "cancel",
      "btn_deposit":
        variant === "deposit",
      "cursor-not-allowed": loading,
      "cursor-not-allowed hover:cursor-not-allowed": disabled,
      "w-full": width === "w-full",
      "w-fit": width === "w-fit"
    },
    className,
  );

  if (variant === "primary") {
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
        <span>{loading ? 'Loading..' : children}</span>
      </button>
    );
  }
});

export default Button;
