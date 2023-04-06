import React, { useEffect, useRef, useState } from "react";
import Button from "@components/ui/button";
import ReactCodeInput from "react-code-input";
import { useUI } from "@contexts/ui-context";
import { useTranslation } from "next-i18next";
import Banner from "public/images/banner/login-banner.png";
import "react-simple-keyboard/build/css/index.css";
import Image from "next/image";
import { IconBackSpace } from "@components/icons";
import { useNewPin } from "@framework/auth/use-NewPin";
import { useDevice } from "@contexts/device-context";
import { theme_config } from "@themes/config";

const NewPinForm = () => {
  const { t } = useTranslation();
  const { closeModal, template } = useUI();
  const handleConfig = theme_config(template);

  const [pin, setPinCode] = useState("");
  const [pin_confirmation, setPin_confirmation] = useState("");
  const numpad = useRef("");
  const numpad2 = useRef("");
  const inputRef = useRef(null);
  const inputRefConfirmation = useRef(null);
  const { mutate: NewPin, isLoading } = useNewPin({ pin: numpad.current });
  const [step, setStep] = useState(1);
  const childProps = {
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
  const styleButton =
    "bg-[#FFFFFF0D] h-[60px] w-full duration-200	 transition ease-in-out  hover:bg-whiteDefault-10 active:bg-whiteDefault-40 ";

  const handlePinChange = (pin: any) => {
    setPinCode(pin);
  };
  const handlePinChange2 = (pin: any) => {
    setPin_confirmation(pin);
  };
  // @ts-ignore
  const handleNumpad = (e) => {
    const key = e?.target?.id || e;
    if (key !== "-" && numpad.current.length < 6) {
      const value: string = key;
      numpad.current = numpad.current + value;
    } else if (key === "-") {
      if (numpad?.current.length > 0) {
        numpad.current = numpad?.current.slice(0, numpad?.current.length - 1);
      }
    }
    handlePinChange(numpad?.current);
  };
  // @ts-ignore
  const handleNumpad2 = (e) => {
    const key = e?.target?.id || e;
    if (key !== "-" && numpad2.current.length < 6) {
      const value: string = key;
      numpad2.current = numpad2.current + value;
    } else if (key === "-") {
      if (numpad2.current.length > 0) {
        numpad2.current = numpad2.current.slice(0, numpad2.current.length - 1);
      }
    }
    handlePinChange2(numpad2?.current);
  };

  const device = useDevice();

  useEffect(() => {
    // @ts-ignore
    const keyDownhandler = ({ key }) => {
      const posStep = Number(step);
      const acceptedKeys = [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "Backspace",
      ];
      if (acceptedKeys.find((i) => i === key)) {
        const sendKey = key === "Backspace" ? "-" : key;
        if (posStep === 1) handleNumpad(sendKey);
        else handleNumpad2(sendKey);
      }
    };
    window.addEventListener("keydown", keyDownhandler);
    return () => window.removeEventListener("keydown", keyDownhandler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  const createNewPin = () => {
    setStep(1);
    closeModal();
    NewPin({
      pin: numpad?.current,
      pin_confirmation: numpad2?.current,
    });
    numpad.current = "";
    numpad2.current = "";
    setPinCode("");
    setPin_confirmation("");
  };

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

    if (inputRefConfirmation?.current) {
      // @ts-ignore
      for (
        let i = 0;
        i < inputRefConfirmation?.current?.textInput.length;
        i++
      ) {
        // @ts-ignore
        const element = inputRefConfirmation?.current?.textInput[i];
        if (device.isMobileDevice) {
          element.readOnly = true;
        } else {
          element.readOnly = false;
        }
      }
    }
  }, [device, inputRef, inputRefConfirmation, pin, pin_confirmation]);


  return (
    <div className="w-full mx-auto overflow-hidden rounded-lg pb-5 md:pb-0 h-full sm:w-96 lg:w-[720px] lg:h-[425px]">
      {!device.isMobileDevice ? (
        <>
          <div
            className={`${
              step === 2 ? "hidden" : ""
            } grid md:grid-cols-2 h-full`}
          >
            <div className="hidden md:flex flex-col items-center justify-end bg-darkBlue-100 text-center p-5 space-y-5 relative">
              <Image
                alt=""
                src={Banner}
                className="absolute z-[1] top-0 left-0 right-0 w-full bg-no-repeat"
                layout="fill"
              />
              <div className="text-2xl text-white font-black relative z-[2]">
                SELAMAT DATANG DAN SEGERA BERMAIN
              </div>
              <div className="text-sm text-whiteDefault-60 relative z-[2]">
                Mulai petualangan baru kamu dengan bermain game bersama kami.
              </div>
              <div>
                {/* <LogoApp/> */}
                <Image
                  alt=""
                  src={`/images/theme/${handleConfig?.theme}/logo.png`}
                  priority
                  width={250}
                  height={50}
                  quality={100}
                  objectFit="contain"
                  objectPosition="center"
                  className="z-[2]"
                />
              </div>
            </div>
            <div className="p-5">
              {/* <div className="flex justify-end">
						<button
							onClick={closeModal}
							aria-label="Close panel"
							className="inline-flex items-center justify-center text-CadetGrey-100 hover:text-whiteDefault-100 transition duration-200 focus:outline-none"
						>
							<IoClose className="text-xl" />
						</button>
					</div> */}
              <h5 className="capitalize">
                {t("forms:text-header-create-new-pin")}
              </h5>
              <div className="w-full flex flex-col justify-center mt-8">
                {/* @ts-ignore */}
                <ReactCodeInput
                  name="pinCode"
                  value={pin}
                  key={pin}
                  onChange={handlePinChange}
                  type="password"
                  fields={6}
                  inputMode="numeric"
                  {...childProps}
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
                    onClick={() => setStep(2)}
                    className="btn_primary text-sm active:text-[13px] transition duration-200 ease-in-out w-full h-full font-bold rounded-none rounded-br capitalize"
                  >
                    {t("common:text-next")}
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`${
              step === 1 ? "hidden" : ""
            } grid md:grid-cols-2 h-full`}
          >
            <div className="hidden md:flex flex-col items-center justify-end bg-darkBlue-100 text-center p-5 space-y-5 relative">
              <Image
                alt=""
                src={Banner}
                className="absolute z-[1] top-0 left-0 right-0 w-full bg-no-repeat"
                layout="fill"
              />
              <div className="text-2xl text-white font-black relative z-[2]">
                SELAMAT DATANG DAN SEGERA BERMAIN
              </div>
              <div className="text-sm text-whiteDefault-60 relative z-[2]">
                Mulai petualangan baru kamu dengan bermain game bersama kami.
              </div>
              <div>
                {/* <LogoApp /> */}
                <Image
                  alt=""
                  src={`/images/theme/${handleConfig?.theme}/logo.png`}
                  priority
                  width={250}
                  height={50}
                  quality={100}
                  objectFit="contain"
                  objectPosition="center"
                  className="z-[2]"
                />
              </div>
            </div>
            <div className="p-5">
              {/* <div className="flex justify-end">
						<button
							onClick={closeModal}
							aria-label="Close panel"
							className="inline-flex items-center justify-center text-CadetGrey-100 hover:text-whiteDefault-100 transition duration-200 focus:outline-none"
						>
							<IoClose className="text-xl" />
						</button>
					</div> */}
              <h5 className="capitalize">{t("forms:text-header-new-pin")}</h5>
              <div className="w-full flex flex-col justify-center mt-8">
                {/* @ts-ignore */}
                <ReactCodeInput
                  name="pinCode"
                  value={pin_confirmation}
                  key={pin_confirmation}
                  onChange={handlePinChange2}
                  type="password"
                  fields={6}
                  inputMode="numeric"
                  {...childProps}
                />
                <div className="grid grid-cols-3 gap-[1px] mt-5">
                  <button
                    className={`${styleButton} rounded-tl`}
                    id="1"
                    onClick={(e) => handleNumpad2(e)}
                  >
                    1
                  </button>
                  <button
                    className={styleButton}
                    id="2"
                    onClick={(e) => handleNumpad2(e)}
                  >
                    2
                  </button>
                  <button
                    className={`${styleButton} rounded-tr`}
                    id="3"
                    onClick={(e) => handleNumpad2(e)}
                  >
                    3
                  </button>
                  <button
                    className={styleButton}
                    id="4"
                    onClick={(e) => handleNumpad2(e)}
                  >
                    4
                  </button>
                  <button
                    className={styleButton}
                    id="5"
                    onClick={(e) => handleNumpad2(e)}
                  >
                    5
                  </button>
                  <button
                    className={styleButton}
                    id="6"
                    onClick={(e) => handleNumpad2(e)}
                  >
                    6
                  </button>
                  <button
                    className={styleButton}
                    id="7"
                    onClick={(e) => handleNumpad2(e)}
                  >
                    7
                  </button>
                  <button
                    className={styleButton}
                    id="8"
                    onClick={(e) => handleNumpad2(e)}
                  >
                    8
                  </button>
                  <button
                    className={styleButton}
                    id="9"
                    onClick={(e) => handleNumpad2(e)}
                  >
                    9
                  </button>
                  <button
                    className={`${styleButton} flex items-center justify-center bg-center bg-no-repeat rounded-bl`}
                    onClick={(e: any) => handleNumpad2(e)}
                    id="-"
                    style={{
                      backgroundImage: `url("/images/button/backspace.png")`,
                    }}
                  ></button>
                  <button
                    className={styleButton}
                    id="0"
                    onClick={(e) => handleNumpad2(e)}
                  >
                    0
                  </button>
                  <Button
                    onClick={createNewPin}
                    loading={isLoading}
                    className="btn_primary text-sm active:text-[13px] transition duration-200 ease-in-out w-full h-full font-bold rounded-none rounded-br capitalize"
                  >
                    {t("common:text-submit")}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div
            className={`${
              step === 2 ? "hidden" : ""
            } flex flex-col p-5 w-full h-full`}
          >
            <div className="text-center mb-7">
              <Image
                alt=""
                src={`/images/theme/${handleConfig?.theme}/logo.png`}
                priority
                width={250}
                height={50}
                quality={100}
                objectFit="contain"
                objectPosition="center"
                className="z-[2]"
              />
            </div>
            <h5 className="text-center capitalize">
              {t("forms:text-header-create-new-pin")}
            </h5>
            <div className="w-full flex flex-col justify-center mt-8">
              {/* @ts-ignore */}
              <ReactCodeInput
                name="pinCode"
                value={pin}
                autoFocus={false}
                // @ts-ignore
                ref={(input) => (inputRef.current = input)}
                key={pin}
                onChange={handlePinChange}
                type="password"
                fields={6}
                inputMode="numeric"
                {...childProps}
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
                  className={`${styleButton} flex items-center justify-center cursor-default`}
                >
                  <IconBackSpace
                    id="-"
                    onClick={(e: any) => handleNumpad(e)}
                    className="cursor-pointer"
                  />
                </button>
                <button
                  className={styleButton}
                  id="0"
                  onClick={(e) => handleNumpad(e)}
                >
                  0
                </button>
                <Button
                  onClick={() => {
                    setStep(2);
                  }}
                  loading={isLoading}
                  className="btn_primary text-sm active:text-[13px] transition duration-200 ease-in-out w-full h-full font-bold rounded-none rounded-br capitalize"
                >
                  {t("common:text-next")}
                </Button>
              </div>
            </div>
          </div>
          <div
            className={`${
              step === 1 ? "hidden" : ""
            } flex flex-col p-5 w-full h-full`}
          >
            <div className="text-center mb-7 ">
              {/* <LogoApp positionMobile="center" style="mt-[1rem]" /> */}
              <Image
                alt=""
                src={`/images/theme/${handleConfig?.theme}/logo.png`}
                priority
                width={250}
                height={50}
                quality={100}
                objectFit="contain"
                objectPosition="center"
                className="z-[2]"
              />
            </div>
            <h5 className="text-center capitalize">
              {t("forms:text-header-new-pin")}
            </h5>
            <div className="w-full flex flex-col justify-center mt-8">
              {/* @ts-ignore */}
              <ReactCodeInput
                // @ts-ignore
                ref={(input) => (inputRefConfirmation.current = input)}
                name="pinCode"
                autoFocus={false}
                value={pin_confirmation}
                key={pin_confirmation}
                onChange={handlePinChange2}
                type="password"
                fields={6}
                inputMode="numeric"
                {...childProps}
              />
              <div className="grid grid-cols-3 gap-[1px] mt-10">
                <button
                  className={`${styleButton} rounded-tl`}
                  id="1"
                  onClick={(e) => handleNumpad2(e)}
                >
                  1
                </button>
                <button
                  className={styleButton}
                  id="2"
                  onClick={(e) => handleNumpad2(e)}
                >
                  2
                </button>
                <button
                  className={`${styleButton} rounded-tr`}
                  id="3"
                  onClick={(e) => handleNumpad2(e)}
                >
                  3
                </button>
                <button
                  className={styleButton}
                  id="4"
                  onClick={(e) => handleNumpad2(e)}
                >
                  4
                </button>
                <button
                  className={styleButton}
                  id="5"
                  onClick={(e) => handleNumpad2(e)}
                >
                  5
                </button>
                <button
                  className={styleButton}
                  id="6"
                  onClick={(e) => handleNumpad2(e)}
                >
                  6
                </button>
                <button
                  className={styleButton}
                  id="7"
                  onClick={(e) => handleNumpad2(e)}
                >
                  7
                </button>
                <button
                  className={styleButton}
                  id="8"
                  onClick={(e) => handleNumpad2(e)}
                >
                  8
                </button>
                <button
                  className={styleButton}
                  id="9"
                  onClick={(e) => handleNumpad2(e)}
                >
                  9
                </button>
                <button
                  className={`${styleButton} flex items-center justify-center bg-center bg-no-repeat rounded-bl`}
                  onClick={(e: any) => handleNumpad2(e)}
                  id="-"
                  style={{
                    backgroundImage: `url("/images/button/backspace.png")`,
                  }}
                ></button>
                <button
                  className={styleButton}
                  id="0"
                  onClick={(e) => handleNumpad2(e)}
                >
                  0
                </button>
                <Button
                  onClick={createNewPin}
                  loading={isLoading}
                  className="btn_primary text-sm active:text-[13px] transition duration-200 ease-in-out w-full h-full font-bold rounded-none rounded-br capitalize"
                >
                  {t("common:text-submit")}
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NewPinForm;
