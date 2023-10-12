'use client';

import { PulseLoader } from 'react-spinners';

const Auth: React.FC = () => {
  return (
    <main className='flex h-screen w-full flex-col items-center justify-center'>
      <div className='flex h-screen w-full flex-col items-center justify-center'>
        <PulseLoader size={30} color='#60A5FA' />
      </div>
    </main>
  );
};

export default Auth;
