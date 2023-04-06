import { useUI } from "@contexts/ui-context";
import { useTranslation } from "next-i18next";
import { useState } from "react"
import Button from "@components/ui/button";
import { ROUTES } from "@utils/routes";
import { useLogoutMutation } from "@framework/auth/use-logout";

const SigninTerms: React.FC = () => {
    const { t } = useTranslation();
    const { closeModal } = useUI();
    const [checked, setChecked] = useState(true)

    const { mutate: logout } = useLogoutMutation();
    function handleLogin() {
        closeModal();
    }
    function handleRefuse() {
        logout()
        closeModal();
    }
    return (
        <div className="w-full px-5 py-5 mx-auto overflow-hidden border border-blueDefault-45 rounded-lg sm:w-96 md:w-[100%] sm:px-8">
            <div className="text-center mb-3">
                <p className="text-md font-bold	mt-3 mb-5 uppercase">
                    {t("forms:text-header-signin-terms")}
                </p>
                <p className="text-left mt-2 mb-8 text-sm md:text-base text-body sm:mb-10">
                    {t("forms:text-signin-terms-description")}
                </p>
            </div>

            <div className="flex flex-col space-y-3.5 overflow-y-auto max-h-[50vh]">
                <div className="overflow-auto border-2 rounded-md border-gray-300 pl-8 text-justify pr-4 py-2">
                    <ol className="space-y-3.5 list-decimal text-sm">
                        <li>
                            Mengingat perbedaan zona waktu GMT Amerika & Oceania, Jika terjadi RESULT LEBIH AWAL dari yang di jadwalkan, semua BETTINGAN kami anggap BATAL ( CONTOH : KENTUCKY Result dijadwalkan jam 10.55, misal jam 10.30 sdh result, semua BETTINGAN kami anggap BATAL)
                        </li>

                        <li>
                            Semua betting yang telah dibeli adalah sah dan tidak bisa di
                            batalkan atau dipindahkan.
                        </li>

                        <li>
                            Betting yang sah adalah betting yang memiliki data yang tampil di
                            menu invoice.
                        </li>

                        <li>
                            Diharuskan kepada member untuk selalu perhatikan ada tidaknya
                            berita penurunan pembayaran nomor pada masing-masing menu betting.
                        </li>
                        <li>
                            Member tidak boleh melakukan penipuan deposit, deposit kosong
                            maupun pembelian curang, Jika ditemukan kesengajaan, member akan
                            diberi peringatan ringan sampai terjadinya pemblokiran total
                            account dan dana tidak dikembalikan
                        </li>
                    </ol>
                </div>

                <div className="relative text-center text-xs flex items-center">
                    <div className="flex items-center h-5">
                        <input
                            id="agreement"
                            aria-describedby="agreement-description"
                            name="agreement"
                            type="checkbox"
                            checked={checked}
                            onChange={() => setChecked((state) => !state)}
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                        />
                    </div>
                    <div className="ml-3 text-sm">
                        <label htmlFor="agreement" className="text-xs md:text-md font-medium text-whiteDefault-60 w-full text-left">
                            Saya telah membaca peraturan di atas dengan teliti
                        </label>
                    </div>
                </div>

                <div className="pt-5">
                    <div className="flex justify-end space-x-3">
                        <Button
                            type="button"
                            onClick={() => handleRefuse()}
                            className="h-11 font-extrabold"
                        >
                            {t("common:text-refuse")}
                        </Button>
                        {checked && (
                            <Button
                                type="button"
                                variant="yellow"
                                onClick={() => handleLogin()}
                                className="h-11 font-extrabold"
                            >
                                {t("common:text-accept")}
                            </Button>
                        )}
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SigninTerms;
