import Constants from "expo-constants";
const hostUri = Constants?.expoConfig?.hostUri;
export const API_URL =
  hostUri !== undefined
    ? "http://"+hostUri.split(`:`).shift()!.concat(`:3000/api`)
    : `yourapi.com`;
