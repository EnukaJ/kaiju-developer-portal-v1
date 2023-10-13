import { UserProfile } from '@/types/User';
import { fetchWithHeader } from './fetchWithHeaders';

type addUserByTokenIdIResponse = {
  message: string;
  code: number;
  data: UserProfile;
};
type GetUserProfileByEmailResponse = {
  message: string;
  code: number;
  data: UserProfile;
};



export const getUserProfileByEmail = async (
    email:string
):  Promise<GetUserProfileByEmailResponse> => {
  const responseJson = (await fetchWithHeader(
    `user/getUserByEmail?email=${email}`,
    'GET'
  )) as GetUserProfileByEmailResponse;
  return responseJson;
}

export const addUserByTokenIdI =  async (
  email: string,
  idToken: string,
  isDeveloper:boolean
): Promise<UserProfile> => {
  const responseJson = (await fetchWithHeader('user/addUserByTokenIdI', 'POST', {
    email,
    idToken,
    isDeveloper
  })) as addUserByTokenIdIResponse;

  return responseJson.data;
};