'use client';

import { Fragment, useRef, useState } from 'react';
import Image from 'next/image';
import { Listbox, Transition } from '@headlessui/react';
import { BiCopy } from 'react-icons/bi';
import { HiChevronDown } from 'react-icons/hi';
import { ToastContainer, toast } from 'react-toastify';
import { PulseLoader } from 'react-spinners';
import { HiOutlineX, HiPlus } from 'react-icons/hi';
import { useReduxDispatch, useReduxSelector } from '@/redux/hooks';
import {
  deleteProject,
  generateAccessKey,
  updateProject,
  uploadImage,
  uploadProjectProfileImage,
} from '@/service/projectApi';
import { FormikHelpers, useFormik } from 'formik';
import * as Yup from 'yup';
import { iProject } from '@/types/Project';
import { setSelectedProject } from '@/redux/features/projectsSlice';
import { useRouter } from 'next/navigation';
import { getKaijuConfig } from '@/utils/helpers';

type ProjectSettingsProps = {
  params: {
    id: string;
  };
};

const blockchains = [{ name: 'Polygon' }];

const ProjectSettings: React.FC<ProjectSettingsProps> = () => {
  const router = useRouter();
  const selectedProject = useReduxSelector(
    (state) => state.projects.selectedProject
  );
  const dispatch = useReduxDispatch();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<File>();
  const [callbackUrlInput, setCallbackUrlInput] = useState<string>('');
  const [signoutUrlInput, setSignoutUrlInput] = useState<string>('');
  const [allowedCallbackUrls, setAllowedCallbackUrls] = useState<string[]>(
    selectedProject?.allowedCallbackUrls ?? []
  );
  const [allowedSignoutUrls, setAllowedSignoutUrls] = useState<string[]>(
    selectedProject?.allowedSignoutUrls ?? []
  );
  const [selected, setSelected] = useState(blockchains[0]);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isRegeneratingAccessKey, setIsRegeneratingAccessKey] =
    useState<boolean>(false);

  const formik = useFormik({
    initialValues: selectedProject!,
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
    }),
    onSubmit: async (
      values: iProject,
      { setSubmitting }: FormikHelpers<iProject>
    ) => {
      try {
        let logoUrl = selectedProject?.logo!;
        if (selectedImage) {
          const urls = await uploadProjectProfileImage(selectedImage.type);
          await uploadImage(urls.url.put, selectedImage.type, selectedImage);
          logoUrl = urls.url.get;
        }
        const updatedProject: iProject = {
          ...values,
          allowedCallbackUrls,
          allowedSignoutUrls,
          logo: logoUrl,
        };
        const newProject = await updateProject(updatedProject);
        dispatch(setSelectedProject(newProject));
        toast.success(`Project updated successfully`);
        setSubmitting(false);
      } catch (error) {
        console.error(error);
        setSubmitting(false);
        toast.error(`Failed to create project`);
      }
    },
  });

  const onDownloadClick = () => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(getKaijuConfig(selectedProject!), null, 2)
    )}`;
    const link = document.createElement('a');
    link.href = jsonString;
    link.download = 'kaijuconfig.json';
    link.click();
  };

  const onRegenrateClick = async () => {
    try {
      setIsRegeneratingAccessKey(true);
      const newAccessKey = await generateAccessKey(selectedProject?.id!);
      dispatch(
        setSelectedProject({
          ...selectedProject!,
          accessKey: newAccessKey,
        })
      );
      setIsRegeneratingAccessKey(false);
      toast.success(`New Access token created successfully`);
    } catch (error) {
      console.error(error);
      setIsRegeneratingAccessKey(false);
      toast.error(`Failed to create Access token`);
    }
  };

  const onAddCallbackUrlClick = () => {
    if (callbackUrlInput !== '') {
      setAllowedCallbackUrls((prevState) => {
        if (prevState.length >= 2) {
          return prevState;
        }
        return [...prevState, callbackUrlInput];
      });
      setCallbackUrlInput('');
    }
  };

  const onAddSignoutUrlClick = () => {
    if (signoutUrlInput !== '') {
      setAllowedSignoutUrls((prevState) => {
        if (prevState.length >= 2) {
          return prevState;
        }
        return [...prevState, signoutUrlInput];
      });
      setSignoutUrlInput('');
    }
  };

  const onRemoveCallbackUrl = (url: string) => {
    setAllowedCallbackUrls((prevState) =>
      prevState.filter((urlEntry) => urlEntry !== url)
    );
  };

  const onRemoveSignoutUrl = (url: string) => {
    setAllowedSignoutUrls((prevState) =>
      prevState.filter((urlEntry) => urlEntry !== url)
    );
  };

  const onDeleteClick = async () => {
    try {
      setIsDeleting(true);
      await deleteProject(selectedProject?.id!);
      setIsDeleting(false);
      toast.success(`Project deleted successfully`);
      router.replace('/projects');
    } catch (error) {
      console.error(error);
      setIsDeleting(false);
      toast.error(`Failed to delete project`);
    }
  };

  return (
    <div className='flex h-full w-full flex-col items-center overflow-y-scroll py-[20px]'>
      <form className='flex h-full flex-col space-y-[16px]'>
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
                  event.target.value = '';
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
          <label className='text-[14px]'>Description</label>
          <textarea
            id='description'
            name='description'
            className='info-box max-h-[80px] min-h-[80px] text-[16px] font-light'
            onChange={formik.handleChange}
            value={formik.values.description}
          />
        </div>

        <div className='flex flex-col space-y-[8px]'>
          <label className='text-[14px]'>Access token</label>
          <div className='info-box'>
            <p>******************************</p>
            <div className='flex flex-row items-center space-x-2'>
              <span
                className='cursor-pointer rounded-md p-2 text-[#605BFF] hover:bg-[#EFEFFF]'
                onClick={() =>
                  navigator.clipboard.writeText(selectedProject?.accessKey!)
                }
              >
                <BiCopy size={20} />
              </span>
              <p
                className='flex w-[80px] cursor-pointer flex-col items-center justify-center rounded-md border-[1px] border-[#605BFF] p-2 text-[10px] text-[#605BFF] hover:bg-[#EFEFFF]'
                onClick={onRegenrateClick}
              >
                {isRegeneratingAccessKey ? (
                  <PulseLoader size={10} color='#605BFF' />
                ) : (
                  <p>REGENERATE</p>
                )}
              </p>
            </div>
          </div>
        </div>

        <div className='flex flex-col space-y-[8px]'>
          <label className='text-[14px]'>Network</label>
          <div className='w-72'>
            <Listbox value={selected} onChange={setSelected}>
              <div className='relative mt-1'>
                <Listbox.Button className='relative w-[500px] cursor-default rounded-lg border-[1px] border-[#E1E1E2] bg-[#FAFAFB] py-2 pl-3 pr-10 text-left'>
                  <span className='text-[16px]'>{selected.name}</span>
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
                    {blockchains.map((network, networkIdx) => (
                      <Listbox.Option
                        key={networkIdx}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 ${
                            active
                              ? 'bg-[#EFEFFF] text-[#605BFF]'
                              : 'text-gray-900'
                          }`
                        }
                        value={network}
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
          <label className='text-[14px]'>Allowed callback URLs</label>
          <div className='info-box flex-col items-start justify-start space-y-[8px]'>
            {allowedCallbackUrls.map((callbackUrl) => (
              <div
                className='flex w-full flex-row items-center justify-between rounded-md px-[3px] py-[1px] hover:border-[1px] hover:border-gray-400'
                key={callbackUrl}
              >
                <p>{callbackUrl}</p>
                <div
                  className='cursor-pointer text-red-500'
                  onClick={() => onRemoveCallbackUrl(callbackUrl)}
                >
                  <HiOutlineX size={20} color='' />
                </div>
              </div>
            ))}
            <div className='flex w-full flex-row items-center space-x-[8px]'>
              <input
                type='text'
                id='websiteUrl'
                className='info-box w-full'
                value={callbackUrlInput}
                onChange={(e) => setCallbackUrlInput(e.target.value)}
              />
              <div className='cursor-pointer' onClick={onAddCallbackUrlClick}>
                <HiPlus size={20} color='' />
              </div>
            </div>
          </div>
          <label className='text-[12px] text-gray-500'>
            Maximum 2 urls allowed
          </label>
        </div>

        <div className='flex flex-col space-y-[8px]'>
          <label className='text-[14px]'>Allowed signout URLs</label>
          <div className='info-box flex-col items-start justify-start space-y-[8px]'>
            {allowedSignoutUrls.map((signoutUrl) => (
              <div
                className='flex w-full flex-row items-center justify-between rounded-md px-[3px] py-[1px] hover:border-[1px] hover:border-gray-400'
                key={signoutUrl}
              >
                <p>{signoutUrl}</p>
                <div
                  className='cursor-pointer text-red-500'
                  onClick={() => onRemoveSignoutUrl(signoutUrl)}
                >
                  <HiOutlineX size={20} color='' />
                </div>
              </div>
            ))}
            <div className='flex w-full flex-row items-center space-x-[8px]'>
              <input
                type='text'
                id='websiteUrl'
                className='info-box w-full'
                value={signoutUrlInput}
                onChange={(e) => setSignoutUrlInput(e.target.value)}
              />
              <div className='cursor-pointer' onClick={onAddSignoutUrlClick}>
                <HiPlus size={20} />
              </div>
            </div>
          </div>
          <label className='text-[12px] text-gray-500'>
            Maximum 2 urls allowed
          </label>
        </div>

        <div className='flex flex-row items-center justify-end space-x-[8px]'>
          <button
            className='mt-[16px] h-[45px] w-[160px] rounded-[10px] border-[1px] border-[#605BFF] text-center
            text-[14px] text-[#605BFF] hover:bg-[#EFEFFF]'
            onClick={onDownloadClick}
            type='button'
          >
            Download config.json
          </button>
          <button
            className='mt-[16px] flex h-[45px] w-[150px] flex-col items-center justify-center rounded-[10px] bg-[#605BFF] text-center text-[14px] text-white'
            onClick={() => formik.handleSubmit()}
            type='button'
          >
            {formik.isSubmitting ? (
              <PulseLoader size={10} color='#FFFFFF' />
            ) : (
              <p>Save changes</p>
            )}
          </button>
        </div>

        <hr />

        <div className='flex flex-row items-center justify-between space-x-[8px] rounded-md bg-red-100 px-4 py-4'>
          <p className='text-[16px] text-red-700'>Delete this project</p>
          <button
            className='flex h-[45px] w-[150px] flex-col items-center justify-center rounded-[10px] bg-red-500 text-center text-[14px] text-white'
            onClick={onDeleteClick}
            type='button'
          >
            {isDeleting ? (
              <PulseLoader size={10} color='#FFFFFF' />
            ) : (
              <p>Delete project</p>
            )}
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default ProjectSettings;
