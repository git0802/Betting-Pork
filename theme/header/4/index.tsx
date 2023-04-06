import { useDevice } from '@contexts/device-context';
import React from 'react'
import SubHeader from './SubHeader'
import TopHeader from './TopHeader'

const Header = () => {
  const device = useDevice();
  return (
    <>
      <div
        className={`background_web absolute -z-[1] top-0 w-full h-[600px]`}
      // style={{ background: `${style.background_web}` }}
      >
        {""}
      </div>
      
      {device.isMobileDevice ? (
        <header
          className="bg_header4"
        >
          <TopHeader />
        </header>
      ) : null}

      {!device.isMobileDevice ? (
        <header
          className="bg_header4"
        >
          <TopHeader />
          <SubHeader />
        </header>
      ) : null}
    </>
  )
}

export default Header