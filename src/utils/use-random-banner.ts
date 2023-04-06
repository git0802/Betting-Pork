import { SPORTSBOOKS_IMAGES } from "@lib/constant";
import sample from "lodash/sample";

type RandomBanner =
  | "arcade"
  | "poker"
  | "casino"
  | "arcade"
  | "sport"
  | "togel";
export function useRandomBanner(type: RandomBanner) {
  if (type === "sport") {
    return sample(SPORTSBOOKS_IMAGES);
  }
}
