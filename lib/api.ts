import axios from "axios";
import { NEXT_PUBLIC_COIN_GECKO_API_KEY } from './config'

export const fetchTokenPrice = async (tokenId: string) => {
  const response = await axios.get(
    `https://pro-api.coingecko.com/api/v3/simple/price?ids=${tokenId}&vs_currencies=usd`,
    {
      headers: {
        "x-cg-pro-api-key": NEXT_PUBLIC_COIN_GECKO_API_KEY,
      }
    }
  );
  return response.data[`${tokenId}`].usd as number;
};
