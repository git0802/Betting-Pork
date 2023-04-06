/* eslint-disable @next/next/no-img-element */
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'

const Banner = () => {
  const { t } = useTranslation();
  const router = useRouter()
  const { query: { tab } } = router

  const bgCont = (type: any) => {
    switch (type) {
      case '0':
        return "/images/bg-featured-game-1.png"
      case '1':
        return "/images/bg-popular-game-1.png"
      case '2':
        return "/images/bg-newest-game-1.png"
      default:
        break;
    }
  }
  const tabImage = bgCont(tab)

  const textType = (type: any) => {
    switch (type) {
      case '0':
        return t("text-featured-games-header")
      case '1':
        return t("text-popular-games-header")
      case '2':
        return t("text-latest-games-header")
      default:
        break;
    }
  }

  const subTextType = (type: any) => {
    switch (type) {
      case '0':
        return t("text-featured-sub-header")
      case '1':
        return t("text-popular-sub-header")
      case '2':
        return t("text-new-sub-header")
      default:
        break;
    }
  }

  return (
    <div
      className="flex flex-col w-full bg-no-repeat md:bg-right md:bg-contain px-mobile px-desktop md:px-0 md:flex-row lg:w-[675px] h-[300px] -mb-[40px] md:h-[330px] md:-mb-[30px]"
      style={{
        backgroundImage: `url(${tabImage})`,
        backgroundPosition: '130px 35px',
        backgroundSize: '350px'
      }}
    >
      <div className='relative bg-no-repeat flex flex-col min-h-full items-start text-white w-full'>
        <div className='relative z-[2] mt-[90px] w-[200px] md:w-fit md:mt-[170px]'>
          <h1 className='text-[32px] leading-[32px] md:leading-[50px] font-light mb-[13px] xl:text-[44px] uppercase'>{textType(tab)}</h1>
          <h5 className='text-sm md:text-base max-w-[280px] md:max-w-[430px] font-normal xl:text-base xl:font-semibold mt-0 capitalize'>{subTextType(tab)}</h5>
        </div>
      </div>
    </div>
  )
}

export default Banner