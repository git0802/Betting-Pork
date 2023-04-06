import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface IconProps {
  src: string;
  srcOnHover: string;
  alt?: string;
  styleContainer?: string;
}

export const ImageHover: React.FC<IconProps> = ({ src, srcOnHover, alt, styleContainer }: IconProps) => {
  const [isHovering, setIsHovered] = useState(false);
  const onMouseEnter = () => setIsHovered(true);
  const onMouseLeave = () => setIsHovered(false);
  return (
    <div
      className={`${styleContainer ? styleContainer : "w-full h-full"} relative`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {isHovering ? (
        <Image
          alt={alt}
          src={srcOnHover}
          layout="fill"
          quality={100}
          loading="lazy"
          objectFit="contain"
        />
      ) : (
        <Image
          alt={alt}
          src={src}
          layout="fill"
          quality={100}
          loading="lazy"
          objectFit="contain"
        />
      )}
    </div>
  );
};

export const ImageHoverMobile: React.FC<IconProps> = ({ src, srcOnHover, alt, styleContainer }: IconProps) => {
  const [isHovering, setIsHovered] = useState(false);
  const [ratio, setRatio] = useState(1/1);
  const onMouseEnter = () => setIsHovered(true);
  const onMouseLeave = () => setIsHovered(false);
  return (
    <div
      className={`${styleContainer ? styleContainer : "w-full h-full"} relative`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {isHovering ? (
        <Image
          alt={alt}
          src={srcOnHover}
          width={100}
          height={28}
          layout="fixed"
          onLoadingComplete={({ naturalWidth, naturalHeight }) => { 
            setRatio(naturalWidth / naturalHeight);
          }}
        />
      ) : (
        <Image
          alt={alt}
          src={src}
          width={100}
          height={28}
          layout="fixed"
          onLoadingComplete={({ naturalWidth, naturalHeight }) => {
            setRatio(naturalWidth / naturalHeight);
          }}
        />
      )}
    </div>
  );
};