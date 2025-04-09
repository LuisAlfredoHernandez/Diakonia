import { defineStore } from "pinia";
import { useMyFetch } from "~/hooks/http";
import type { AuthLoginResponse } from "#/http";

export const useEpiStore = defineStore("epi", () => {
  const mikroticServiceCall = async (username: string) => {
    const { statusCode, data } = await useMyFetch("")
      .post(username)
      .json<AuthLoginResponse>();
    return { data, statusCode };
  };

  const fortigateServiceCall = async (username: string) => {
    const { statusCode, data } = await useMyFetch("")
      .post(username)
      .json<AuthLoginResponse>();
    return { data, statusCode };
  };

  const gwnServiceCall = async (username: string) => {
    const { statusCode, data } = await useMyFetch("")
      .post(username)
      .json<AuthLoginResponse>();
    return { data, statusCode };
  };

  return {
    gwnServiceCall,
    mikroticServiceCall,
    fortigateServiceCall,
  };
});
