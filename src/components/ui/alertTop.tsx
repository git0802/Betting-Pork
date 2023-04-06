import { useState } from "react";

interface AlertProps {
	message?: string;
}

const AlertTop: React.FC<AlertProps> = ({ message }) => {
    const [Loading, setLoading] = useState(true)

        const SetTimer =()=>{
            setTimeout(() => {
                setLoading(false)
            }, 2000);
        }


        const returnAllert =()=>{
            SetTimer()
            return <div className=" fixed right-1 top-7 w-3/12 h-fix py-4 px-5 text-sm bg-red-600 text-white font-semibold flex items-center justify-center border border-red-200 rounded z-50"  >
			{message}
		</div>
        }

	return (
        Loading ? returnAllert(): null 
	);
};

export default AlertTop;
