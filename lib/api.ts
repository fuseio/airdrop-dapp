import axios from "axios";
import { NEXT_PUBLIC_AIRDROP_API_BASE_URL, NEXT_PUBLIC_COIN_GECKO_API_KEY } from './config'
import { CreateUser, Leaderboard, SignData, User } from "./types";

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


export const postAuthenticateUser = async (signData: SignData): Promise<{ jwt: string }> => {
  const response = await axios.post(
    `${NEXT_PUBLIC_AIRDROP_API_BASE_URL}/auth`,
    signData
  )
  return response.data
}

export const postCreateUser = async (createUserDetail: CreateUser, token: string): Promise<User> => {
  const response = await axios.post(
    `${NEXT_PUBLIC_AIRDROP_API_BASE_URL}/user`,
    createUserDetail,
    {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }
  )
  return response.data
}

export const fetchUser = async (token: string): Promise<User> => {
  const response = await axios.get(
    `${NEXT_PUBLIC_AIRDROP_API_BASE_URL}/user`,
    {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }
  )
  return response.data
}


export const fetchLeaderboard = async (queryParams: Record<string, string>, token: string): Promise<Leaderboard> => {
  const url = new URL(`${NEXT_PUBLIC_AIRDROP_API_BASE_URL}/leaderboard`);
  const searchParams = new URLSearchParams(queryParams);
  url.search = searchParams.toString();
  const endpointUrl = url.toString();

  const response = await axios.get(
    endpointUrl,
    {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }
  )
  return response.data
}
