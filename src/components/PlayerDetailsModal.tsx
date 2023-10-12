'use client';

import { Dispatch, Fragment, SetStateAction } from 'react';
import Image from 'next/image';
import { Dialog, Transition } from '@headlessui/react';
import { HiOutlineX } from 'react-icons/hi';

type PlayerDetailsModalProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const PlayerDetailsModal: React.FC<PlayerDetailsModalProps> = ({
  isOpen,
  setIsOpen,
}) => {
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black bg-opacity-25' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel className='relative w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                <div
                  className='absolute right-[10px] top-[10px] flex cursor-pointer rounded-full p-2 hover:bg-[#FAFAFB]'
                  onClick={closeModal}
                >
                  <HiOutlineX size={20} />
                </div>
                <div className='flex h-full w-full flex-col items-center justify-center space-y-[16px]'>
                  <div className='h-full rounded-full'>
                    <Image
                      src='/icons/beat.png'
                      alt='project'
                      width={100}
                      height={100}
                      className='rounded-full'
                    />
                  </div>

                  <div className='flex flex-col items-center justify-center'>
                    <h1 className='text-[32px] font-bold'>John Deo Swasss</h1>
                    <h3 className='text-[24px]'>johndeo@123</h3>
                  </div>

                  <div className='flex flex-col space-y-[8px]'>
                    <label className='text-[14px]'>Email</label>
                    <div className='info-box'>
                      <p>johndeo@gmail.com</p>
                    </div>
                  </div>

                  <div className='flex flex-col space-y-[8px]'>
                    <label className='text-[14px]'>Bio</label>
                    <div className='info-box'>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Voluptates officiis quisquam similique magni
                        maiores nam, voluptas enim odit ex quod tempore vel
                        voluptatibus harum repellendus eligendi impedit sunt
                        animi quaerat.
                      </p>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default PlayerDetailsModal;
