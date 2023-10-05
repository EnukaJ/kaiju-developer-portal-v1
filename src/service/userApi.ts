import { UserProfile } from "@/types/User";
import { fetchWithHeader } from "./fetchWithHeaders";

type GenerateUserPublicKeyAPIResponse = {
  message: string;
  code: number;
  data: UserProfile;
};

export const getUserProfile =  async (email: string, idToken: string): Promise<UserProfile> => {
  const responseJson = await fetchWithHeader(
    'user/addUserByTokenId',
    'POST',
    { email, idToken }
  ) as GenerateUserPublicKeyAPIResponse;
  
  return responseJson.data;
};