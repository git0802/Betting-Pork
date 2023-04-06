import { CookieKeys } from '@lib/constant';
import { CookieStorage } from '@lib/cookie';

export const getToken = () => {
    if (typeof window === undefined) {
        return null;
    }
    return CookieStorage.get(CookieKeys.AuthToken);
};
