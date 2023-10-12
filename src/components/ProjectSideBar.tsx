'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  BsFillFileTextFill,
  BsFillGridFill,
  BsGearFill,
  BsTicketDetailedFill,
} from 'react-icons/bs';
import { BiSolidBarChartSquare } from 'react-icons/bi';
import { useReduxSelector } from '@/redux/hooks';
import ImageWithLoader from './ImageWithLoader';

const ProjectSideBar: React.FC = () => {
  const selectedProject = useReduxSelector(
    (state) => state.projects.selectedProject
  );
  const pathname = usePathname();
  const router = pathname.split('/')[3];

  return (
    <div className='flex w-80 flex-col space-y-6 border-r-[2px] border-r-gray-100 p-5 text-lg text-gray-500 '>
      <div>
        <ImageWithLoader
          imageUri={selectedProject?.logo ?? ''}
          width={60}
          height={60}
        />
        <h1 className='mt-3 text-[20px] font-semibold text-black'>
          {selectedProject?.name}
        </h1>
      </div>

      <Link href='overview'>
        <div
          className={`flex flex-row items-center space-x-3 hover:text-[#605BFF] ${
            router === 'overview' ? 'text-[#605BFF]' : 'text-gray-500'
          }`}
        >
          <BsFillGridFill size={20} />
          <h1 className='text-[16px]'>Overview</h1>
        </div>
      </Link>
      <Link href='players'>
        <div
          className={`flex flex-row items-center space-x-3 hover:text-[#605BFF] ${
            router === 'players' ? 'text-[#605BFF]' : 'text-gray-500'
          }`}
        >
          <BsFillFileTextFill size={20} />
          <h1 className='text-[16px]'>Players</h1>
        </div>
      </Link>
      <Link href='analytics'>
        <div
          className={`flex flex-row items-center space-x-3 hover:text-[#605BFF] ${
            router === 'analytics' ? 'text-[#605BFF]' : 'text-gray-500'
          }`}
        >
          <BiSolidBarChartSquare size={20} />
          <h1 className='text-[16px]'>Analytics</h1>
        </div>
      </Link>
      <Link href='economy'>
        <div
          className={`flex flex-row items-center space-x-3 hover:text-[#605BFF] ${
            router === 'economy' ? 'text-[#605BFF]' : 'text-gray-500'
          }`}
        >
          <BsTicketDetailedFill size={20} />
          <h1 className='text-[16px]'>Economy</h1>
        </div>
      </Link>
      <Link href='settings'>
        <div
          className={`flex flex-row items-center space-x-3 hover:text-[#605BFF] ${
            router === 'settings' ? 'text-[#605BFF]' : 'text-gray-500'
          }`}
        >
          <BsGearFill size={20} />
          <h1 className='text-[16px]'>Settings</h1>
        </div>
      </Link>
    </div>
  );
};

export default ProjectSideBar;
