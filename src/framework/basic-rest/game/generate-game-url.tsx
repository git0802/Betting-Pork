import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useMutation } from "react-query";

export interface GameInputType {
  game_id: string | number;
}
export async function generateGameURL(input: GameInputType) {
  return http.post(API_ENDPOINTS.GENERATE_GAMES_URL, input);
}

export const useGenerateGameUrlMutation = (
  onSuccess?: Function,
  onError?: Function
) => {
  return useMutation((input: GameInputType) => generateGameURL(input), {
    onError: onError ? (data) => onError(data) : (data) => {},
    onSuccess: onSuccess ? (data) => onSuccess(data) : (data) => {},
  });
};

export interface GameInputParamType {
  game_id: string | number;
  provider: string;
  type: string;
}
async function generateGameURLWithParam(input: GameInputParamType) {
  return {
    ok: true,
    message: "Logout Successful!",
    param: input,
  };
}
export const useGenerateGameUrlMutationWithParam = () => {
  return useMutation(
    (input: GameInputParamType) => generateGameURLWithParam(input),
    {
      onSuccess: (data) => {
        window.open(
          `live-game/${data.param.provider}/${data.param.type}/${data.param.game_id}`
        );
      },
      onError: (data) => {
        console.log(data, "get game url error response");
      },
    }
  );
};
