import { CookieKeys } from '@lib/constant';
import { CookieStorage } from '@lib/cookie';

export const getAuthPin = () => {
    if (typeof window === undefined) {
        return null;
    }
    return CookieStorage.get(CookieKeys.AuthPin);
};