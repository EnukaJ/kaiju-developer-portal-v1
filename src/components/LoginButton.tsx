'use client';

import { Auth } from 'aws-amplify';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
import Image from 'next/image';

const LoginButton: React.FC = () => {
  const onLoginPress = async () => {
    await Auth.federatedSignIn({
      provider: CognitoHostedUIIdentityProvider.Google,
    });
  };

  return (
    <button
      className='mt-[24px] flex w-full flex-row items-center justify-center space-x-[16px]
      rounded-[16px] bg-[#F7F7F8] px-[36px] py-[14px] transition duration-300'
      onClick={onLoginPress}
    >
      <Image src='/icons/google.svg' alt='Google' width={24} height={24} />
      <h3 className='text-[16px] font-bold '>Continue with Google</h3>
    </button>
  );
};

export default LoginButton;
