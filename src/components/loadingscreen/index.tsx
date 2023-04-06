import { useUI } from "@contexts/ui-context";
import Image from "next/image";
import React from "react";
import styled from "styled-components";

const ScreenContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  gap: 10px;
  height: 100vh;
  width: 100vw;
  animation: fade 0.4s ease-in forwards;
  background: linear-gradient(180deg, #276c8a, rgba(39, 108, 139, 1));
  z-index:1000;
`;

const Balls = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;

  .ball {
    height: 8px;
    width: 8px;
    border-radius: 50%;
    background: rgb(255, 255, 255, 0.5);
    animation: oscillate 0.7s ease-in forwards infinite;
  }

  .one {
    animation-delay: 0.1s;
  }
  .two {
    animation-delay: 0.3s;
  }
  .three {
    animation-delay: 0.5s;
  }

  @keyframes oscillate {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(10px);
    }
    100% {
      transform: translateY(0);
    }
  }
`;


const LoadingScreen = () => {
  const {template} = useUI();
  return (
    <ScreenContainer>
      <Image
        alt=""
        src={`/images/theme/${template}/logo.png`}
        width={200}
        height={200}
        quality={100}
        objectFit="contain"
        objectPosition="center"
      />
      <Balls>
        <div className="ball one"></div>
        <div className="ball two"></div>
        <div className="ball three"></div>
      </Balls>
    </ScreenContainer>
  );
};

export default LoadingScreen;