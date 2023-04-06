import { NextPageContext } from 'next';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
let serverCookies: Cookies | undefined = undefined;

const getCookieInstance = (ctx?: NextPageContext) => {
  if (ctx?.req) {
    serverCookies = serverCookies || new Cookies(ctx?.req?.headers?.cookie);
    return serverCookies;
  }

  return cookies;
};

const CookieOptions = {
  path: '/',
};

export const CookieStorage = {
  set: (key: string, data: any, ctx?: NextPageContext) => {
    const cookieInstances = getCookieInstance(ctx);
    return cookieInstances.set(key, data, CookieOptions);
  },
  get: (key: string, ctx?: NextPageContext) => {
    const cookieInstances = getCookieInstance(ctx);
    return cookieInstances.get(key);
  },
  remove: (key: string, ctx?: NextPageContext) => {
    const cookieInstances = getCookieInstance(ctx);
    return cookieInstances.remove(key, CookieOptions);
  },
};
