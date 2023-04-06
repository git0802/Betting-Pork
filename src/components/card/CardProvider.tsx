import React from 'react'
import Image from 'next/image'
import ArrowRight from 'public/icons/arrowRight.svg'

export interface cardProviderType {
    title: string,
    total_all_games: number,
    total_games_category: number,
    image_url: string;
    id?: string,
    index: number
}

const CardProvider = (params: cardProviderType) => {

    return (
        <div key={params?.index} className='relative w-full h-[150px] border border-lightBlue-100 rounded bg-blueDefault-45'>
            <div className='flex flex-row h-[70px] items-center justify-between border-b border-lightBlue-100 p-3'>
                <div className='flex flex-row space-x-3'>
                    <div className='flex items-center justify-center w-[40px] h-[40px] rounded-full bg-[#021626]'>
                        <Image
                            alt=""
                            src={params?.image_url}
                            layout="fill"
                        />
                    </div>
                    <div className='flex flex-col space-y-1'>
                        <span className='text-CadetGrey-100 text-xs font-semibold'>Provider Name</span>
                        <span className='text-whiteDefault-100 text-sm font-extrabold capitalize'>{params?.title}</span>
                    </div>
                </div>
                <button
                    className='uppercase bg-[#CBEFFF] text-xs text-maastrichtBlue-100 font-semibold  w-[82px] h-8 rounded'
                >VISIT</button>
            </div>
            <div className='flex flex-row items-center justify-center divide-x divide-lightBlue-100'>
                <div className='flex flex-col flex-1 h-[80px] items-center justify-center'>
                    <span className='text-lg font-semibold'>{params?.total_all_games}</span>
                    <span className='text-xs text-CadetGrey-100 font-semibold capitalize'>Total all games</span>
                </div>
                <div className='flex flex-col flex-1 h-[80px] items-center justify-center'>
                    <span className='text-lg font-semibold'>{params?.total_games_category}</span>
                    <span className='text-xs text-CadetGrey-100 font-semibold capitalize'>Games Category</span>
                </div>
            </div>
        </div>
    )
}

export default CardProvider