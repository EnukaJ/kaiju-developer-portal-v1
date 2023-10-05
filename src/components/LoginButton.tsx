'use client'

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
      className="bg-[#F7F7F8] w-full flex flex-row items-center justify-center space-x-[16px]
      py-[14px] rounded-[16px] mt-[24px] px-[36px] transition duration-300"
      onClick={onLoginPress}
    >
      <Image
        src="/icons/google.svg"
        alt="Google"
        width={24}
        height={24}
      />
      <h3 className="text-[16px] font-bold ">
        Continue with Google
      </h3>
    </button>
  );
};

export default LoginButton;