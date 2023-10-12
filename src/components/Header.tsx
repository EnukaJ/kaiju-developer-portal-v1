'use client';
import Image from 'next/image';
import { useReduxSelector } from '@/redux/hooks';

const Header = () => {
  const userProfile = useReduxSelector((state) => state.auth.userProfile);

  return (
    <div className='flex w-full flex-row items-center justify-between bg-[#21272B] px-[21px] py-[10px]'>
      <Image src='/icons/White_Icon.png' alt='Google' width={24} height={24} />

      {userProfile && (
        <div className='flex flex-row items-center space-x-[10px]'>
          <Image
            src={userProfile?.userProfileImage ?? 'Profile'}
            alt={userProfile.username}
            width={40}
            height={40}
            className='rounded-full'
          />
          <div className='flex flex-col text-white'>
            <p className='text-[12px] font-semibold'>{userProfile?.name}</p>
            <p className='text-[10px] opacity-50'>
              {userProfile?.blockchains.evm.contract.slice(0, 7) +
                '...' +
                userProfile?.blockchains.evm.contract.slice(-5)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
