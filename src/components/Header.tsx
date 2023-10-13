'use client';
import Image from 'next/image';
import { useReduxSelector, useReduxDispatch } from '@/redux/hooks';
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { Auth } from 'aws-amplify';
import { resetAuth } from '@/redux/features/authSlice';
import { useCallback } from 'react';


const Header = () => {
  const userProfile = useReduxSelector((state) => state.auth.userProfile);
  const dispatch = useReduxDispatch();

  const onLogoutClick = useCallback(async () => {
    console.log("clicked");
    dispatch(resetAuth());
    await Auth.signOut();
  }, [dispatch]);


  return (
    <div className='flex w-full flex-row items-center justify-between bg-[#21272B] px-[21px] py-[10px]'>
      <a href='/projects'><Image src='/icons/White_Icon.png' alt='Google' width={24} height={24} /></a>


      {userProfile && (
        <div className='flex flex-row items-center space-x-[10px]'>
          <div className='relative'>
            <Image
              src={userProfile?.userProfileImage ?? 'Profile'}
              alt={userProfile.username}
              width={40}
              height={40}
              className='rounded-full'
            />
            <div
              className="opacity-0 hover:opacity-100 absolute flex flex-col justify-center items-center bg-black rounded-full inset-0 cursor-pointer h-[40px] w-[40px]"
              onClick={onLogoutClick}
            >
              <ArrowRightOnRectangleIcon
                className="h-[20px] w-[20px] text-white"
              />
            </div>
          </div>
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
function setContext(arg0: (state: any) => any) {
  throw new Error('Function not implemented.');
}

