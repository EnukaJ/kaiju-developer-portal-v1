import LoginButton from '@/components/LoginButton';
import Image from 'next/image';

const Login: React.FC = () => {
  return (
    <main className='flex h-screen w-full '>
      <div className='flex-3 flex h-screen  w-[450px]  flex-col items-center p-8 '>
        <Image
          src='/icons/Black_Icon.png'
          alt='Google'
          width={75}
          height={75}
          className='pt-12'
        />
        <h1 className='p-12 text-center text-[24px] font-bold text-gray-800'>
          Welcome to Kaiju Developer Portal
        </h1>
        <LoginButton />
      </div>
      <div>
        <Image
          src='/Home_Image.png'
          alt='Google'
          width={1090}
          height={980}
          className='max-width-[100vh] max-h-[100vh]'
        />
      </div>
    </main>
  );
};

export default Login;
