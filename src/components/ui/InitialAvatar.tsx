import React from 'react'
import { useUserQuery } from "@framework/user/get-user-profile";
import { CookieStorage } from '@lib/cookie';
import { CookieKeys } from '@lib/constant';

interface Props {
    border?:string;
    style?:string;
}

const InitialAvatar = ({ style, border }: Props) => {
    const userName = CookieStorage.get(CookieKeys.User);
    const { isFetching: isLoading, data: dataUser, error } = useUserQuery();
    
    const ArrayUsername = dataUser ? dataUser.username.split(' ', 2) : []

    let avatar: any
    if (ArrayUsername?.length === 1) {
        avatar = ArrayUsername[0]?.charAt(0)
    } else if (ArrayUsername?.length >= 1) {
        avatar = ArrayUsername[0]?.charAt(0) + ArrayUsername[1]?.charAt(0)
    } else {
        avatar = '..'
    }

    return (
        <div className="relative">
            <div className={`${border ? border : 'border-0'}`}>
                <div className={`${style ? style : 'h-10 w-10'} header-bg-avatar flex items-center justify-center text-base font-extrabold rounded-full uppercase cursor-pointer text-center`}>
                    <div className='flex items-center justify-start text-center'>{avatar}</div>
                </div>
            </div>
        </div>
    )
}

export default InitialAvatar