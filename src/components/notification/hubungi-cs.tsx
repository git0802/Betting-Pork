import { useUI } from "@contexts/ui-context";
import { useTranslation } from "next-i18next";
import { IoClose } from "react-icons/io5";
import { RiCustomerService2Fill } from 'react-icons/ri'
import Image from "next/image";

const HubungiCS: React.FC = () => {
    const { t } = useTranslation();

    const {
        modalData: { data },
        setModalView,
        openModal,
        closeModal
    } = useUI();


    return (
        <div className="w-full mx-auto overflow-hidden border border-blueDefault-45 rounded-lg pb-5 md:pb-0 h-full md:w-96">

            <div className="flex flex-col p-5 w-full h-full">
                <div className="flex items-center justify-between relative mb-5">
                    <span className="text-xl font-semibold uppercase"></span>
                    <button
                        onClick={closeModal}
                        aria-label="Close panel"
                        className="h-5"
                    >
                        <IoClose className="text-xl" />&nbsp;
                    </button>
                </div>
                <div className="flex flex-col items-center justify-center text-center mb-5">
                    <RiCustomerService2Fill className="w-20 h-20"/>
                </div>
                <div className="text-center">
                    <p className="text-2xl">
                    Akun Anda Terblokir!<br/>
                    Silahkan hubungi CS kami</p>
                </div>
            </div>
        </div>
    );
};

export default HubungiCS;