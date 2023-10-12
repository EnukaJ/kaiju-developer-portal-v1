'use client';

import { useState } from 'react';
import Image from 'next/image';
import { BsPersonFill, BsThreeDots } from 'react-icons/bs';
import PlayerDetailsModal from '@/components/PlayerDetailsModal';

type ProjectPlayersProps = {
  params: {
    id: string;
  };
};

const dummyPlayers = [
  {
    id: '1',
    name: 'John Deo',
    email: 'johndoe2211@gmail.com',
    dateJoined: '20/08/2021',
    walletAddress: '0xABDSJNDJMNDNKDNDK',
  },
  {
    id: '2',
    name: 'Shelby Goode',
    email: 'shelbygoode481@gmail.com',
    dateJoined: '25/09/2021',
    walletAddress: '0xABDGFBJDNDNKDNDK',
  },
  {
    id: '3',
    name: 'Robert Bacins',
    email: 'jrobertbacins4182@gmail.com',
    dateJoined: '10/08/2022',
    walletAddress: '0xABDFRGRTFNDNKDNDK',
  },
  {
    id: '4',
    name: 'John Carilo',
    email: 'johncarilo182@gmail.com',
    dateJoined: '20/12/2022',
    walletAddress: '0xABDSJNDDGDKDNDK',
  },
  {
    id: '5',
    name: 'Adriene Watson',
    email: 'adrienewatson82@gmail.com',
    dateJoined: '08/08/2023',
    walletAddress: '0xABDSJFGDFDNKDNDK',
  },
];

const ProjectPlayers: React.FC<ProjectPlayersProps> = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <div className='relative mx-10 my-5 flex  h-[90vh]  w-full flex-col'>
      <div className='flex flex-row items-center'>
        <div className='absolute left-2'>
          <Image src='/icons/Search.svg' alt='Google' width={20} height={20} />
        </div>
        <input
          type='text'
          name='search'
          placeholder='Search'
          className='w-[1000px] rounded-[5px] bg-[#FAFAFB] px-10 py-3'
        />
      </div>

      <div className='mt-[25px] grid w-[1000px] grid-cols-4 justify-between p-2 font-[400] text-[#030229]'>
        <span className='flex flex-row items-center gap-2 text-gray-600'>
          <p>Name</p>
          <Image
            src='/icons/Arrow-down.svg'
            alt='Google'
            width={6}
            height={5}
          />
        </span>
        <span className='flex flex-row items-center gap-2 text-gray-600'>
          <p>Email</p>
          <Image
            src='/icons/Arrow-down.svg'
            alt='Google'
            width={6}
            height={5}
          />
        </span>
        <span className='flex flex-row items-center gap-2 text-gray-600'>
          <p>Wallet Address</p>
          <Image
            src='/icons/Arrow-down.svg'
            alt='Google'
            width={6}
            height={5}
          />
        </span>
        <span className='flex flex-row items-center gap-2 text-gray-600'>
          <p>Date Joined</p>
          <Image
            src='/icons/Arrow-down.svg'
            alt='Google'
            width={6}
            height={5}
          />
        </span>
      </div>
      <ul>
        {dummyPlayers.map((player) => (
          <li
            key={player.id}
            className='group my-3 grid w-[1000px] cursor-pointer grid-cols-4 items-center rounded-lg p-2 hover:shadow-lg'
            onClick={() => setIsModalOpen(true)}
          >
            <div className='flex items-center'>
              <div className='rounded-full bg-purple-100 p-3'>
                <BsPersonFill className='text-purple-800' />
              </div>
              <p className='pl-4'>{player.name}</p>
            </div>
            <p>{player.email}</p>
            <p>
              {player.walletAddress.slice(0, 7) +
                '...' +
                player.walletAddress.slice(-5)}
            </p>
            <div className='mr-10 flex items-center  justify-between'>
              <p className='opacity-0 group-hover:opacity-100'>
                {player.dateJoined}
              </p>
              <div className=' group-hover:text-[#605BFF]'>
                <BsThreeDots size={15} />
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className=' absolute bottom-0 flex w-[1000px] justify-center '>
        <p>1 2 3 4 5 6 ... 12</p>
      </div>
      <PlayerDetailsModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    </div>
  );
};

export default ProjectPlayers;
