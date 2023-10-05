type SocialLink = {
  title: string;
  value: string;
};

export type UserProfile = {
  _id: string;
  name: string;
  email: string;
  username: string;
  userProfileImage: string;
  publicKeys: [
    {
      evm: string;
    }
  ];
  ens: string;
  bio: string;
  website: SocialLink;
  instagram: SocialLink;
  twitter: SocialLink;
  discord: SocialLink;
  youtube: SocialLink;
  linkedin: SocialLink;
  userLevel: string;
  publicNFTProfile: boolean;
  analytics: boolean;
  currency: string;
  blockchains: {
    evm: {
      contract: string;
      contractOwner: string;
    };
  };
};

export type AWSUser = {
  username: string;
  signInUserSession: {
    idToken: {
      jwtToken: string;
      payload: {
        at_hash: string;
        sub: string;
        'cognito:groups': string[];
        email_verified: boolean;
        iss: string; //'https://cognito-idp.us-east-1.amazonaws.com/us-east-1_xJQJz1OYK';
        'cognito:username': string;
        given_name: string; //'Pabasara';
        picture: string; //'https://lh3.googleusercontent.com/a/AGNmyxa28jiBHtPwubPFn54YdCU-Nc1_kjImC-tcBIxSew=s96-c';
        origin_jti: string;
        aud: string;
        identities: [
          {
            userId: string; //'111285450320973138376';
            providerName: string; //'Google';
            providerType: string; //'Google';
            issuer: null;
            primary: boolean;
            dateCreated: string;
          },
        ];
        token_use: string;
        auth_time: number;
        name: string; //'Pabasara Dilshan';
        exp: number;
        iat: number;
        family_name: string; //'Dilshan';
        jti: string; //'981bc586-0e75-4c9b-a3c0-ed3450dac035';
        email: string; //'dilshanpabasara@gmail.com';
      };
    };
    refreshToken: {
      token: string;
    };
    accessToken: {
      jwtToken: string;
      payload: {
        sub: string;
        'cognito:groups': string[];
        iss: string;
        version: number;
        client_id: string;
        origin_jti: string;
        token_use: string;
        scope: string; //'openid profile email'
        auth_time: number;
        exp: number;
        iat: number;
        jti: string;
        username: string; //'google_111285450320973138376';
      };
    };
    clockDrift: number;
  };
  authenticationFlowType: string;
  keyPrefix: string;
  userDataKey: string;
};
