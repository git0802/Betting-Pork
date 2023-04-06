import { useRef, useState } from "react";
import CountdownTimer from "@components/countdown";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useGetListLuckyDraw } from "@framework/luckyDraw/get-list-luckydraw";

const FABCountdown = () => {
  const router = useRouter();
  const [showCountdown, setShowCountdown] = useState(true);
  const constraintsRef = useRef(null);

  const handleButtonClose = () => {
    setShowCountdown(() => false);
  };

  const { isFetching: isLoading, data, error } = useGetListLuckyDraw();

  const redirectToEvent = () => {
    let id = data[0]?._id;
    router.push(`/live-events?id=${id}`);
  };

  if (isLoading) {
    return null;
  }

  return (
    <motion.div
      className="fab-countdown"
      ref={constraintsRef}
      style={{ display: showCountdown ? "block" : "none" }}
    >
      {!isLoading && (
        <CountdownTimer
          dragConstraints={constraintsRef}
          handleButtonClose={handleButtonClose}
          handleRedirect={redirectToEvent}
          endDate={data[0]?.end_date}
          data={data[0]}
        />
      )}
    </motion.div>
  );
};

export default FABCountdown;
