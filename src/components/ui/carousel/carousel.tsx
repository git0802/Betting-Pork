import { useRef } from "react";
import { Swiper } from "swiper/react";
import { useRouter } from "next/router";
import { Navigation, Scrollbar, Pagination, Autoplay } from "swiper";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { getDirection } from "@utils/get-direction";
import cn from "classnames";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/scrollbar";

type CarouselPropsType = {
	className?: string;
	buttonGroupClassName?: string;
	prevActivateId?: string;
	nextActivateId?: string;
	prevButtonClasses?: string;
	nextButtonClasses?: string;
	buttonSize?: "default" | "small";
	paginationVariant?: "default" | "circle";
	paginationPosition?: "center" | "left" | "right";
	loop?: boolean;
	centeredSlides?: boolean;
	breakpoints?: {} | any;
	pagination?: {} | any;
	navigation?: {} | any;
	scrollbar?: {} | any;
	autoplay?: {} | any;
};

const Carousel: React.FunctionComponent<CarouselPropsType> = ({
	children,
	className = "",
	buttonGroupClassName = "",
	prevActivateId = "",
	nextActivateId = "",
	prevButtonClasses = "start-0",
	nextButtonClasses = "end-0",
	buttonSize = "default",
	paginationVariant = "default",
	paginationPosition,
	breakpoints,
	loop = true,
	navigation = true,
	pagination = false,
	autoplay = false,
	...props
}) => {
	const { locale } = useRouter();
	const dir = getDirection(locale);
	const prevRef = useRef<HTMLButtonElement>(null);
	const nextRef = useRef<HTMLButtonElement>(null);
	const classPagination = paginationPosition
		? `pagination-${paginationPosition}`
		: "";

	let nextButtonClassName = cn(
		"w-7 h-7 lg:w-8 lg:h-8 text-sm md:text-base lg:text-lg text-black flex items-center justify-center rounded-full bg-white absolute transition duration-250 hover:bg-gray-900 hover:text-white focus:outline-none transform shadow-navigation translate-x-1/2",
		{
			"lg:w-9 lg:h-9 xl:w-10 xl:h-10 3xl:w-12 3xl:h-12 text-sm md:text-base lg:text-xl 3xl:text-2xl":
				buttonSize === "default",
			"shadow-navigationReverse -translate-x-1/2": dir === "rtl",
		},
		nextButtonClasses
	);

	let prevButtonClassName = cn(
		"w-7 h-7 lg:w-8 lg:h-8 text-sm md:text-base lg:text-lg text-black flex items-center justify-center rounded-full bg-white absolute transition duration-250 hover:bg-gray-900 hover:text-white focus:outline-none transform shadow-navigation -translate-x-1/2",
		{
			"lg:w-9 lg:h-9 xl:w-10 xl:h-10 3xl:w-12 3xl:h-12 text-sm md:text-base lg:text-xl 3xl:text-2xl":
				buttonSize === "default",
			"shadow-navigationReverse translate-x-1/2": dir === "rtl",
		},
		prevButtonClasses
	);
	return (
		<div
			className={`carouselWrapper relative ${className} ${classPagination} ${
				paginationVariant === "circle" ? "dotsCircle" : ""
			}`}
		>
			<Swiper
				modules={[Navigation, Autoplay, Pagination, Scrollbar]}
				loop={loop}
				autoplay={autoplay}
				breakpoints={breakpoints}
				pagination={pagination}
				dir={dir}
				navigation={
					navigation
						? {
								prevEl: prevActivateId.length
									? `#${prevActivateId}`
									: prevRef.current!, // Assert non-null
								nextEl: nextActivateId.length
									? `#${nextActivateId}`
									: nextRef.current!, // Assert non-null
						  }
						: {}
				}
				{...props}
			>
				{children}
			</Swiper>
			{Boolean(navigation) && (
				<div
					className={`flex items-center w-full absolute top-2/4 z-10 ${buttonGroupClassName}`}
				>
					{prevActivateId.length > 0 ? (
						<button
							className={prevButtonClassName}
							id={prevActivateId}
							aria-label="prev-button"
						>
							{dir === "rtl" ? <IoIosArrowForward /> : <IoIosArrowBack />}
						</button>
					) : (
						<button
							ref={prevRef}
							className={prevButtonClassName}
							aria-label="prev-button"
						>
							{dir === "rtl" ? <IoIosArrowForward /> : <IoIosArrowBack />}
						</button>
					)}

					{nextActivateId.length > 0 ? (
						<button
							className={nextButtonClassName}
							id={nextActivateId}
							aria-label="next-button"
						>
							{dir === "rtl" ? <IoIosArrowBack /> : <IoIosArrowForward />}
						</button>
					) : (
						<button
							ref={nextRef}
							className={nextButtonClassName}
							aria-label="next-button"
						>
							{dir === "rtl" ? <IoIosArrowBack /> : <IoIosArrowForward />}
						</button>
					)}
				</div>
			)}
		</div>
	);
};

export default Carousel;
