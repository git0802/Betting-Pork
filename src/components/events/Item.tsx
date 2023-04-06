/* eslint-disable @next/next/no-img-element */
import Image from "next/image";

const Item = ({ banner, name, onSelect }: { banner: string, name: string, onSelect?: () => void }) => {
  return (
    <div
      className='cursor-pointer'
      onClick={() => onSelect ? onSelect() : {}}
    >
      <div className='relative flex flex-col justify-between w-full h-full'>
        <Image
          alt={name}
          src={banner}
          width={335}
          height={200}
          quality={100}
          loading="lazy"
          layout="responsive"
          objectFit="contain"
        />
      </div>
    </div >
  )
}

export default Item;