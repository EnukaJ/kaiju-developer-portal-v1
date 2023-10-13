import { ReactNode, useCallback, useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Amplify, Hub, Auth } from 'aws-amplify';
import awsConfig from '@/config/awsConfig';
import { useReduxDispatch, useReduxSelector } from '@/redux/hooks';
import { setUser, setUserProfile } from '@/redux/features/authSlice';
import { getUserProfileByEmail,addUserByTokenIdI } from '@/service/userApi';

// https://docs.amplify.aws/lib/client-configuration/configuring-amplify-categories/q/platform/js/#scoped-configuration
Amplify.configure({
  Auth: {
    identityPoolId: awsConfig.identityPoolId,
    region: awsConfig.region,
    identityPoolRegion: awsConfig.identityPoolRegion,
    userPoolId: awsConfig.userPoolId,
    userPoolWebClientId: awsConfig.userPoolWebClientId,
    oauth: awsConfig.oauth,
  },
});

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const dispatch = useReduxDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const authContext = useReduxSelector((state) => state.auth);

  const authCheck = useCallback(
    async (url: string) => {
      const path = url.split('?')[0];
      if (
        !authContext.userProfile &&
        !path.includes('login') &&
        !path.includes('auth')
      ) {
        router.push('/login');
      }
      if (authContext.userProfile && path.includes('login')) {
        router.replace('/projects');
      }
    },
    [authContext, router]
  );

  useEffect(() => {
    authCheck(pathname);
  }, [authCheck, pathname, searchParams]);

  useEffect(() => {
    const unsubscribe = Hub.listen(
      'auth',
      async ({ payload: { event, data } }) => {
        switch (event) {
          case 'signIn':
            console.log('Signin.......... ', data);
            dispatch(setUser(data));
            const currentSession = await Auth.currentSession();
            const currentUser = await Auth.currentAuthenticatedUser()
            const access_token = currentUser.signInUserSession.idToken.jwtToken;
            const email = currentSession.getIdToken().payload.email;
            let res
            const exist = await getUserProfileByEmail(email)
            res= exist.data
            if (exist.message !== "success") {
              const addUser = addUserByTokenIdI(currentSession.getIdToken().payload.email,access_token,true)              
              res = addUser
            }

            const userProfile = res
            if (userProfile) {
              dispatch(setUserProfile(await userProfile));
            }
            router.push('/projects');
            break;
          case 'signOut':
            break;
          case 'customOAuthState':
            break;
        }
      }
    );
    return unsubscribe;
  }, [dispatch, router, authContext.userProfile]);

  return <>{children}</>;
};

export default AuthProvider;
