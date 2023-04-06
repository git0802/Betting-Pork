import React from "react";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import animationPlane from "../../../public/images/animation/animationPlane.json"

export default function AnimationPlan() {
  return (

    <div className="">
      <Player
        autoplay
        loop
        src={animationPlane}
        style={{ height: "290", width: "327" }}
      >
        <Controls
          visible={false}
        />
      </Player>
    </div>
  );
}
