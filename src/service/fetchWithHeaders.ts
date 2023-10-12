import { Auth } from 'aws-amplify';

export const fetchWithHeader = async (
  path: string,
  method: string,
  body?: any,
  contentType: string = 'application/json'
) => {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', contentType);

  const currentUser = await Auth.currentAuthenticatedUser();
  const access_token = currentUser.signInUserSession.idToken.jwtToken;

  if (access_token) {
    myHeaders.append('Authorization', `Bearer ${access_token}`);
  }

  const requestOptions = {
    method: method,
    headers: myHeaders,
    body: body ? JSON.stringify(body) : undefined,
  };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}${path}`,
    requestOptions
  );
  const responseJson = await response.json();
  return responseJson;
};
