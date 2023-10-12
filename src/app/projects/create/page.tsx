'use client';

import { useState, Fragment, useRef } from 'react';
import Image from 'next/image';
import { Listbox, Transition } from '@headlessui/react';
import { HiChevronDown } from 'react-icons/hi';
import { FormikHelpers, useFormik } from 'formik';
import * as Yup from 'yup';
import { PulseLoader } from 'react-spinners';
import { ToastContainer, toast } from 'react-toastify';
import { iProject } from '@/types/Project';
import {
  createProject,
  uploadImage,
  uploadProjectProfileImage,
} from '@/service/projectApi';
import { useReduxSelector } from '@/redux/hooks';
import { networks } from '@/utils/constants';
import { useRouter } from 'next/navigation';

const initialFormValues: iProject = {
  name: '',
  displayProjectId: '',
  accessKey: '',
  blockchain: 'polygon-mumbai',
  rpcUrl: '',
  paymaster: '',
  bundlerUrl: '',
  allowedCallbackUrls: [],
  allowedSignoutUrls: [],
  userId: '',
  websiteUrl: '',
  description: '',
  logo: '',
  appClient: '',
};

const CreateProject: React.FC = () => {
  const router = useRouter();
  const userProfile = useReduxSelector((state) => state.auth.userProfile);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<File>();

  const formik = useFormik({
    initialValues: initialFormValues,
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
    }),
    onSubmit: async (
      values: iProject,
      { setSubmitting }: FormikHelpers<iProject>
    ) => {
      try {
        let logoUrl = '';
        if (selectedImage) {
          const urls = await uploadProjectProfileImage(selectedImage.type);
          await uploadImage(urls.url.put, selectedImage.type, selectedImage);
          logoUrl = urls.url.get;
        }
        const newProject = await createProject({
          ...values,
          userId: userProfile?.id ?? '',
          logo: logoUrl,
        });
        toast.success(`Project ${newProject.name} created successfully`);
        router.replace('/projects');
        setSubmitting(false);
      } catch (error) {
        console.error(error);
        setSubmitting(false);
        toast.error(`Failed to create project`);
      }
    },
  });

  return (
    <main className='flex h-full w-full flex-col items-center justify-center px-[35px] py-[25px]'>
      <h1 className='self-start text-[32px] font-normal'>Create new project</h1>
      <form className='mt-[20px] flex flex-col space-y-[16px]'>
        <div className='flex flex-col items-start justify-center space-y-[8px]'>
          <label className='text-[14px]'>Project logo</label>
          <div
            className='flex h-[100px] w-[100px] cursor-pointer flex-col items-center justify-center rounded-full bg-[#FAFAFB]'
            onClick={() => {
              if (fileInputRef) {
                fileInputRef.current?.click();
              }
            }}
          >
            {selectedImage && (
              <Image
                src={URL.createObjectURL(selectedImage)}
                alt='Project logo'
                width={22}
                height={20}
                className='h-[100px] w-[100px] rounded-full'
              />
            )}
            {!selectedImage && (
              <Image
                src='/icons/Camera.svg'
                alt='Camera'
                width={22}
                height={20}
                className=''
              />
            )}
            <input
              ref={fileInputRef}
              type='file'
              name='myImage'
              accept='image/*'
              onChange={(event) => {
                if (event.target.files) {
                  setSelectedImage(event.target.files[0]);
                }
              }}
              style={{ display: 'none' }}
            />
          </div>
        </div>

        <div className='flex flex-col space-y-[8px]'>
          <label className='text-[14px]'>Project Name</label>
          <input
            type='text'
            id='name'
            placeholder='My project'
            className='info-box'
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          {formik.errors.name ? (
            <label className='text-[12px] text-red-500'>
              * {formik.errors.name}
            </label>
          ) : null}
        </div>

        <div className='flex flex-col space-y-[8px]'>
          <label className='text-[14px]'>Website URL</label>
          <input
            type='text'
            id='websiteUrl'
            placeholder='https://'
            className='info-box'
            onChange={formik.handleChange}
            value={formik.values.websiteUrl}
          />
        </div>

        <div className='flex flex-col space-y-[8px]'>
          <label className='text-[14px]'>Network</label>
          <div className='w-72'>
            <Listbox
              key='blockchain'
              value={formik.values.blockchain}
              onChange={(value) => formik.setFieldValue('blockchain', value)}
            >
              <div className='relative mt-1'>
                <Listbox.Button className='relative w-[500px] cursor-default rounded-lg border-[1px] border-[#E1E1E2] bg-[#FAFAFB] py-2 pl-3 pr-10 text-left'>
                  <span className='text-[16px]'>
                    {
                      networks.find(
                        (network) => network.value === formik.values.blockchain
                      )?.name
                    }
                  </span>
                  <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
                    <HiChevronDown
                      className='h-5 w-5 text-gray-400'
                      aria-hidden='true'
                    />
                  </span>
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave='transition ease-in duration-100'
                  leaveFrom='opacity-100'
                  leaveTo='opacity-0'
                >
                  <Listbox.Options className='absolute mt-1 max-h-60 w-[500px] overflow-auto rounded-md bg-white py-1 text-base shadow-lg'>
                    {networks.map((network, networkIdx) => (
                      <Listbox.Option
                        key={networkIdx}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 ${
                            active
                              ? 'bg-[#EFEFFF] text-[#605BFF]'
                              : 'text-gray-900'
                          }`
                        }
                        value={network.value}
                      >
                        {({ selected }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? 'font-medium' : 'font-normal'
                              }`}
                            >
                              {network.name}
                            </span>
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </div>
        </div>

        <div className='flex flex-col space-y-[8px]'>
          <label className='text-[14px]'>Description</label>
          <textarea
            id='description'
            name='description'
            className='info-box max-h-[80px] min-h-[80px] text-[16px] font-light'
            onChange={formik.handleChange}
            value={formik.values.description}
          />
        </div>

        <button
          className='mt-[16px] w-[300px] self-center rounded-[10px] bg-[#605BFF] p-[10px] text-center text-[14px] text-white'
          type='button'
          onClick={(e) => {
            e.preventDefault();
            formik.handleSubmit();
          }}
        >
          {formik.isSubmitting ? (
            <PulseLoader size={10} color='#FFFFFF' />
          ) : (
            <p>Create project</p>
          )}
        </button>
      </form>
      <ToastContainer />
    </main>
  );
};

export default CreateProject;
