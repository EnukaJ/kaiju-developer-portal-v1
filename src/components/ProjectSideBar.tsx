"use client"
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { BsFillFileTextFill, BsFillGridFill, BsGearFill } from "react-icons/bs";
import { BiSolidBarChartSquare } from "react-icons/bi";
import { TiPuzzle } from "react-icons/ti";

interface ProjectSideBarProps {
  id: string,
  name: string
}

const ProjectSideBar: React.FC<ProjectSideBarProps> = ({ id, name }) => {
  const pathname = usePathname();
  const router = pathname.split('/')[3];
  
  return (
    <div className="flex flex-col border-2 border-r-gray-400 space-y-6 p-5 h-[94vh] w-80 text-lg text-gray-500 ">
      <div>
        <Image
          src="/icons/beat.png"
          alt="Google"
          width={60}
          height={60}
        />
        <h1 className='text-black text-[20px] mt-3 font-semibold'>{name}</h1>
      </div>

      <Link href="overview">
        <div className={`flex flex-row items-center space-x-3 ${router === 'overview' ? 'text-blue-500' : 'text-gray-500'}`}>
          <BsFillGridFill size={20} />
          <h1>Overview</h1>
        </div>
      </Link>
      <Link href="players">
      <div className={`flex flex-row items-center space-x-3 ${router === 'players' ? 'text-blue-500' : 'text-gray-500'}`}>
          <BsFillFileTextFill size={20} />
          <h1>Players</h1>
        </div>
      </Link>
      <Link href="analytics">
      <div className={`flex flex-row items-center space-x-3 ${router === 'analytics' ? 'text-blue-500' : 'text-gray-500'}`}>
          <BiSolidBarChartSquare size={20} />
          <h1>Analytics</h1>
        </div>
      </Link>
      <Link href="economy">
      <div className={`flex flex-row items-center space-x-3 ${router === 'economy' ? 'text-blue-500' : 'text-gray-500'}`}>
          <TiPuzzle size={20} />
          <h1>Economy</h1>
        </div>
      </Link>
      <Link href="settings">
      <div className={`flex flex-row items-center space-x-3 ${router === 'settings' ? 'text-blue-500' : 'text-gray-500'}`}>
          <BsGearFill size={20} />
          <h1>Settings</h1>
        </div>
      </Link>
    </div>
  );
};

export default ProjectSideBar;