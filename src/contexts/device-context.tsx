import React, { useContext, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { PropsChildren } from "../../additional";

interface IDevice {
    isMobileDevice:boolean,
    isTabDevice:boolean
}

const DeviceContext = React.createContext<IDevice>({
    isMobileDevice:false,
    isTabDevice:false
});

export const DeviceProvider = ({ children }: PropsChildren) => {
    const [isMobileDevice, setMobileDevice] = useState(false);
    const [isTabDevice, setTabDevice] = useState(false);
    const isMobileDeviceMediaQuery = useMediaQuery({
        query: "(max-width: 768px)"
    });
    const isTabDeviceMediaQuery = useMediaQuery({
        query: "(max-width: 1024px)"
    });
    useEffect(() => {
        setMobileDevice(isMobileDeviceMediaQuery);
        setTabDevice(isTabDeviceMediaQuery);
    }, [isMobileDeviceMediaQuery, isTabDeviceMediaQuery]);
    return (
        <DeviceContext.Provider value={{isMobileDevice, isTabDevice}}>
            {children}
        </DeviceContext.Provider>
    )
}

export const useDevice = ():IDevice => useContext(DeviceContext);