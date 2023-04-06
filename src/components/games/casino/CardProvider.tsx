import Button from '@components/ui/button';
import Link from '@components/ui/link';
import { useTranslation } from 'next-i18next';
import Image from 'next/image'
import React from 'react';

const CardProvider = ({ name }: { name: string }) => {
  const { t } = useTranslation();

  return (
    <div className={`bg_card_casino relative rounded-md p-[8px] flex flex-col justify-between w-full h-full`}>
      <div title={name} className='card-casino'>
      <Image
        alt=""
        src={`/images/provider/slider-${name.toLowerCase()}.png`}
        width={207}
        height={193}
        className="rounded"
      />
      </div>
      <Link
        href={`/product/casino?providers=${name.toLowerCase()}`}
        className="w-full"
      >
        <Button
          type="button"
          // variant='darkBlue'
          className={`bg_button_detail_casino w-full rounded uppercase text-sm active:text-[13px] h-[38px] lg:h-11 font-semibold text-white`}
        >{t('text-see-detail')}</Button>
      </Link>
    </div>
  )
}

export default CardProvider