import { iProject } from '@/types/Project';

export const getKaijuConfig = (project: iProject) => {
  return {
    projectInfo: project,

    cognitoClientId: project.appClient,
    cognitoDomain: 'kaijuunitytest',
    cognitoRegion: 'us-east-1',
    cognitoAuthUrl: '.auth.us-east-1.amazoncognito.com',
    loginRedirectUrl: project.allowedCallbackUrls[0] ?? '',

    cognitoTokenEndpoint: '/oauth2/token',
    cognitoAuthorizeEndpoint: '/oauth2/authorize',
    authCodeGrantType: 'authorization_code',
    refreshTokenGrantType: 'refresh_token',
    responseType: 'code',
    identityProvider: 'Google',
    scopes: ['email', 'openid', 'profile'],
  };
};
