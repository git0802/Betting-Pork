import { CookieStorage } from "@lib/cookie";
import { CookieKeys } from "@lib/constant";
import { useMemo } from "react";

const lobby_url = CookieStorage.get(CookieKeys.LOBBY_URL);
const auth_token = CookieStorage.get(CookieKeys.AuthToken);
const api_key = CookieStorage.get(CookieKeys.API_KEY);

const LobbyUrl = () => {
  const newLink = useMemo(() => {
    if (lobby_url) return lobby_url + "/result-market?player_token=" + auth_token + "&api_key=" + api_key;
  }, [lobby_url,auth_token,api_key]);
  return newLink;
};

export default LobbyUrl;
