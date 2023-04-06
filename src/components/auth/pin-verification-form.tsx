import React, { useEffect, useRef, useState } from "react";
import Button from "@components/ui/button";
import ReactCodeInput from "react-code-input";
import { usePinAuthMutation } from "@framework/auth/use-pinAuth";
import { useTranslation } from "next-i18next";
import "react-simple-keyboard/build/css/index.css";
import Image from "next/image";
import { useDevice } from "@contexts/device-context";
import { theme_config } from "@themes/config";
import { useUI } from "../../contexts/ui-context";

const PinVerificationForm = () => {
  const { template } = useUI();
  const handleConfig = theme_config(template);
  const INPUT_CODE_PROPS = {
    className:
      "sticky top-1 flex flex-row items-center justify-between ReactCodeInput",
    inputStyle: {
      margin: "",
      width: "44px",
      borderRadius: "0.25rem",
      fontSize: "30px",
      lineHeight: "44px",
      height: "44px",
      padding: "0.5rem",
      backgroundColor: handleConfig?.bg_input_pin,
      color: "#E4F2FF",
      border: "",
      textAlign: "center",
      outline: "none",
      ":disabled": {
        backgroundColor: handleConfig?.bg_input_pin,
      },
    },
    inputStyleInvalid: {
      margin: "",
      width: "44px",
      borderRadius: "0.25rem",
      fontSize: "30px",
      lineHeight: "44px",
      height: "44px",
      padding: "0.5rem",
      backgroundColor: handleConfig?.bg_input_pin,
      color: "red",
      border: "1px solid red",
      textAlign: "center",
      outline: "none",
    },
  };

  const { t } = useTranslation();
  const { mutate: pinAuth, isLoading } = usePinAuthMutation();
  const [pin, setPinCode] = useState("");
  const numpad = useRef("");
  const inputRef = useRef(null);
  const styleButton =
    "bg-[#FFFFFF0D] h-[60px] w-full cursor-pointer duration-200 transition ease-in-out  hover:bg-whiteDefault-10 active:bg-whiteDefault-40";

  const checkPinCode = () => {
    pinAuth({
      pin,
    });
    setPinCode("");
    numpad.current = "";
  };

  const handlePinChange = (pin: string) => {
    setPinCode(pin);
  };

  // @ts-ignore
  const handleNumpad = (e) => {
    const key = e?.target?.id || e;
    if (key !== "-" && numpad?.current.length < 6) {
      const value: string = key;
      numpad.current = numpad.current + value;
    } else if (key === "-") {
      if (numpad?.current.length > 0) {
        numpad.current = numpad?.current.slice(0, numpad?.current.length - 1);
      }
    }

    const input = [];
    for (let i = 0; i < 6; i++) {
      const item = numpad?.current[i];
      if (numpad?.current[i]) {
        input.push(item);
      } else {
        input.push("");
      }
    }

    // @ts-ignore
    inputRef.current.state.input = input;
    // @ts-ignore
    inputRef.current.state.value = numpad?.current;
    setPinCode(numpad?.current);
  };

  const device = useDevice();

  useEffect(() => {
    if (inputRef?.current) {
      // @ts-ignore
      for (let i = 0; i < inputRef?.current?.textInput.length; i++) {
        // @ts-ignore
        const element = inputRef?.current?.textInput[i];
        if (device.isMobileDevice) {
          element.readOnly = true;
        } else {
          element.readOnly = false;
        }
      }
    }
  }, [device, inputRef, pin]);

  return (
    <>
      {!device.isMobileDevice ? (
        <div className="w-full mx-auto overflow-hidden rounded-lg pb-5 md:pb-0 h-full sm:w-96 lg:w-[720px] lg:h-[425px]">
          <div className="grid lg:grid-cols-2 h-full">
            <div className="flex flex-col items-center justify-start text-center pl-5 pr-[10px] py-[15px] space-y-5 relative min-h-[320px]">
              <div className="flex flex-col items-center justify-end w-[304px] h-[356px] bg-contain bg-no-repeat bg-[url('/images/banner/login-banner.png')]">
                <div className="text-2xl leading-6 w-[250px] font-black relative z-[2] bg-clip-text bg-gradient-to-b from-[#E4F2FF] to-[#678199] text-transparent mb-10">
                  SELAMAT DATANG DAN SEGERA BERMAIN
                </div>
                <div className="mb-1">
                  <Image
                    alt=""
                    src={`/images/theme/${handleConfig?.theme}/logo.png`}
                    priority
                    width={250}
                    height={50}
                    quality={100}
                    objectFit="contain"
                    objectPosition="center"
                  />
                </div>
              </div>
            </div>
            <div className="p-5">
              <div className="flex justify-between">
                <div>
                  <h5 className="hidden lg:block mb-[15px] capitalize">
                    {t("forms:text-header-pin-verification")}
                  </h5>
                  <h5 className="text-center text-sm font-normal text-whiteDefault-60">
                    Masukkan kode keamanan akun anda
                  </h5>
                </div>
              </div>
              <div className="hidden md:block lg:hidden text-center mb-7">
                <div className="max-h-[34px] max-w-[178px]">
                  <Image
                    alt=""
                    src={`/images/theme/${handleConfig?.theme}/logo.png`}
                    priority
                    width={250}
                    height={50}
                    quality={100}
                    objectFit="contain"
                    objectPosition="center"
                  />
                </div>
              </div>
              <h5 className="hidden md:block md:text-center lg:hidden">
                {t("forms:text-header-pin-verification")}
              </h5>
              <div className="w-full flex flex-col justify-center mt-[25px]">
                {/* @ts-ignore */}
                <ReactCodeInput
                  // @ts-ignore
                  ref={(input) => (inputRef.current = input)}
                  name="pinCode"
                  value={pin}
                  onChange={handlePinChange}
                  autoFocus={true}
                  type="password"
                  fields={6}
                  inputMode="numeric"
                  {...INPUT_CODE_PROPS}
                />
                <div className="grid grid-cols-3 gap-[1px] mt-5">
                  <button
                    className={`${styleButton} rounded-tl`}
                    id="1"
                    onClick={(e) => handleNumpad(e)}
                  >
                    1
                  </button>
                  <button
                    className={styleButton}
                    id="2"
                    onClick={(e) => handleNumpad(e)}
                  >
                    2
                  </button>
                  <button
                    className={`${styleButton} rounded-tr`}
                    id="3"
                    onClick={(e) => handleNumpad(e)}
                  >
                    3
                  </button>
                  <button
                    className={styleButton}
                    id="4"
                    onClick={(e) => handleNumpad(e)}
                  >
                    4
                  </button>
                  <button
                    className={styleButton}
                    id="5"
                    onClick={(e) => handleNumpad(e)}
                  >
                    5
                  </button>
                  <button
                    className={styleButton}
                    id="6"
                    onClick={(e) => handleNumpad(e)}
                  >
                    6
                  </button>
                  <button
                    className={styleButton}
                    id="7"
                    onClick={(e) => handleNumpad(e)}
                  >
                    7
                  </button>
                  <button
                    className={styleButton}
                    id="8"
                    onClick={(e) => handleNumpad(e)}
                  >
                    8
                  </button>
                  <button
                    className={styleButton}
                    id="9"
                    onClick={(e) => handleNumpad(e)}
                  >
                    9
                  </button>
                  <button
                    className={`${styleButton} flex items-center justify-center bg-center bg-no-repeat rounded-bl`}
                    onClick={(e: any) => handleNumpad(e)}
                    id="-"
                    style={{
                      backgroundImage: `url("/images/button/backspace.png")`,
                    }}
                  ></button>
                  <button
                    className={styleButton}
                    id="0"
                    onClick={(e) => handleNumpad(e)}
                  >
                    0
                  </button>
                  <Button
                    onClick={checkPinCode}
                    loading={isLoading}
                    className="btn_primary text-sm active:text-[13px] transition duration-200 ease-in-out w-full h-full font-bold rounded-none rounded-br capitalize"
                  >
                    {t("forms:text-pin-verification")}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="modal-cont-mobile w-full mx-auto overflow-hidden border border-blueDefault-45 rounded-lg pb-5 md:pb-0 h-full sm:w-96 lg:w-[694px]">
          <div className="flex flex-col p-5 w-full h-full overflow-y-auto">
            <div className="text-center mb-7 flex justify-center">
              <Image
                alt=""
                src={`/images/theme/${handleConfig?.theme}/logo.png`}
                priority
                width={250}
                height={50}
                quality={100}
                objectFit="contain"
                objectPosition="center"
              />
            </div>
            <h5 className="text-center text-lg font-bold text-whiteDefault-100 mb-[5px] capitalize">
              {t("forms:text-header-pin-verification")}
            </h5>
            <h5 className="text-center text-sm font-normal text-whiteDefault-60">
              Masukkan kode keamanan akun anda
            </h5>
            <div className="w-full flex flex-col justify-center mt-8">
              {/* @ts-ignore */}
              <ReactCodeInput
                // @ts-ignore
                ref={(input) => (inputRef.current = input)}
                name="pinCode"
                key={pin}
                value={pin}
                // disabled={true}
                onChange={handlePinChange}
                autoFocus={false}
                type="password"
                fields={6}
                inputMode="numeric"
                {...INPUT_CODE_PROPS}
              />
              <div className="grid grid-cols-3 gap-[1px] mt-10">
                <button
                  className={`${styleButton} rounded-tl`}
                  id="1"
                  onClick={(e) => handleNumpad(e)}
                >
                  1
                </button>
                <button
                  className={styleButton}
                  id="2"
                  onClick={(e) => handleNumpad(e)}
                >
                  2
                </button>
                <button
                  className={`${styleButton} rounded-tr`}
                  id="3"
                  onClick={(e) => handleNumpad(e)}
                >
                  3
                </button>
                <button
                  className={styleButton}
                  id="4"
                  onClick={(e) => handleNumpad(e)}
                >
                  4
                </button>
                <button
                  className={styleButton}
                  id="5"
                  onClick={(e) => handleNumpad(e)}
                >
                  5
                </button>
                <button
                  className={styleButton}
                  id="6"
                  onClick={(e) => handleNumpad(e)}
                >
                  6
                </button>
                <button
                  className={styleButton}
                  id="7"
                  onClick={(e) => handleNumpad(e)}
                >
                  7
                </button>
                <button
                  className={styleButton}
                  id="8"
                  onClick={(e) => handleNumpad(e)}
                >
                  8
                </button>
                <button
                  className={styleButton}
                  id="9"
                  onClick={(e) => handleNumpad(e)}
                >
                  9
                </button>
                <button
                  className={`${styleButton} flex items-center justify-center bg-center bg-no-repeat rounded-bl`}
                  onClick={(e: any) => handleNumpad(e)}
                  id="-"
                  style={{
                    backgroundImage: `url("/images/button/backspace.png")`,
                  }}
                ></button>
                <button
                  className={styleButton}
                  id="0"
                  onClick={(e) => handleNumpad(e)}
                >
                  0
                </button>
                <Button
                  onClick={checkPinCode}
                  loading={isLoading}
                  className="btn_primary text-sm active:text-[13px] transition duration-200 ease-in-out w-full h-full font-bold rounded-none rounded-br capitalize"
                >
                  {t("forms:text-pin-verification")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PinVerificationForm;
