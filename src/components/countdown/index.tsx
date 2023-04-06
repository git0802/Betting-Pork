import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslation } from "next-i18next";

type CountdownProps = {
  dragConstraints: any;
  handleButtonClose: () => void;
  handleRedirect: () => void;
  endDate: Date;
  data: {
    status: "ongoing" | "drawing" | "completed";
  };
};

const CountdownTimer = (props: CountdownProps) => {
  const { dragConstraints, handleButtonClose, handleRedirect, endDate, data } =
    props;
  // const [timerDays, setTimerDays] = useState(0);
  const [timerHours, setTimerHours] = useState(0);
  const [timerMinutes, setTimerMinutes] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const targetDate = new Date(endDate).getTime();
  const [stopCountdown, setStopCountdown] = useState(false);
  const { t } = useTranslation();

  let interval: any;

  const startTimer = () => {
    interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      // const days = Math.floor(distance / (24 * 60 * 60 * 1000));
      const hours = Math.floor(
        (distance % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (60 * 60 * 1000)) / (1000 * 60));
      const seconds = Math.floor((distance % (60 * 1000)) / 1000);

      if (distance < 0) {
        clearInterval(interval);
        setStopCountdown(true);
      } else {
        // setTimerDays(days);
        setTimerHours(hours);
        setTimerMinutes(minutes);
        setTimerSeconds(seconds);
      }
    });
  };

  useEffect(() => {
    startTimer();
  }, []);

  const doubleDigit = (num: number) => {
    let str = num.toString();
    if (str.length === 1) {
      return `0${str}`;
    } else {
      return str;
    }
  };

  return (
    <motion.div
      className="draggable-countdown"
      drag
      dragConstraints={dragConstraints}
      initial={{ y: 150, x: 0 }}
    >
      <div className="flex justify-end">
        <button className="close-countdown" onClick={handleButtonClose}>
          X
        </button>
      </div>
      <button
        onClick={handleRedirect}
        style={{
          pointerEvents: "all",
          cursor: "pointer",
          display: "flex",
          alignItems: "flex-end",
          marginBottom: "6px",
        }}
      >
        <div
          className="rounded-md"
          style={{
            fontSize: "12px",
            background: "#134059",
            display: "flex",
            justifyContent: "end",
            bottom: "44px",
            position: 'absolute',
            zIndex: 1,
            left: 0,
            padding: '0px 2px',
          }}
        >
          LUCKY
          <br />
          DRAW
        </div>
        <div
          className="countdown-gradient p-2 rounded-md"
          style={{
            height: "42px",
            width: "81%",
            position: "relative",
            top: 0,
            left: "32px",
          }}
        >
          <Image
            alt="pointer"
            src="/images/fab/pointer.png"
            width={30}
            height={17}
            objectFit="contain"
            className="fab-pointer"
          />
          <Image
            alt="turntable"
            src="/images/fab/turntable.png"
            width={33}
            height={33}
            objectFit="contain"
            className="rotate-fab"
          />
          
        </div>
      </button>
      <div className="flex items-center justify-around gap-x-[6px] text-[#3E2F01] p-2 rounded-md countdown-gradient">
        {stopCountdown && (
          <div className="text-xs p-[1px] bg-[#FBCF79] rounded border-white border-[1px] w-full">
            {data?.status !== "completed" && (
              <div className="text-center">{t("common:text-drawing")}</div>
            )}
            {data?.status === "completed" && (
              <div className="text-center">{t("common:text-completed")}</div>
            )}
          </div>
        )}
        {!stopCountdown && (
          <>
            {/* <div className="item title">
              <div className="text-center">{timerDays}</div>
            </div> */}
            <div className="text-xs p-[1px] bg-[#FBCF79] rounded border-white border-[1px]">
              <div className="text-center">{doubleDigit(timerHours)}</div>
            </div>
            <div className="text-xs p-[1px] bg-[#FBCF79] rounded border-white border-[1px]">
              <div className="text-center">{doubleDigit(timerMinutes)}</div>
            </div>
            <div className="text-xs p-[1px] bg-[#FBCF79] rounded border-white border-[1px]">
              <div className="text-center">{doubleDigit(timerSeconds)}</div>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default CountdownTimer;
