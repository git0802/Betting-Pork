import Image from "next/image";

const ItemFilterResult = (props: { game_name: string, image: string, provider?: string, onClick: () => void }) => {
  return (
    <div
      onClick={() => props.onClick()}
      className={`cursor-pointer aspect-1/2 sm:aspect-auto h-[168px] bg-[#0B2C44] p-[6px] md:p-[8px] border border-[#2C516A] rounded-md`}
    >
      <div className='relative w-full h-full'>
        <Image
          alt={props.game_name}
          src={props.image}
          width={100}
          height={100}
          quality={100}
          loading="lazy"
          objectFit="contain"
        />
        <div className='absolute bg-slider-description w-full bottom-0 flex flex-col space-y-0 justify-start p-2 pt-8'>
          <span className='carousel-items-title truncate hover:text-clip overflow-hidden text-[#D3F2FF] capitalize'>{props.game_name}</span>
          <span className='carousel-items-subtitle truncate hover:text-clip overflow-hidden text-[#D3F2FFB2] text-xs font-medium capitalize'>{props?.provider}</span>
        </div>
        <div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
      </div>
    </div>
  )
}

export default ItemFilterResult;