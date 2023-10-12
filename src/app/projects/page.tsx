'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { iProject } from '@/types/Project';
import { getProjectsByUserId } from '@/service/projectApi';
import { useReduxDispatch, useReduxSelector } from '@/redux/hooks';
import { PulseLoader } from 'react-spinners';
import CreateProjectButton from '@/components/CreateProjectButton';
import { setSelectedProject } from '@/redux/features/projectsSlice';
import { networks } from '@/utils/constants';

const Projects: React.FC = () => {
  const router = useRouter();
  const dispatch = useReduxDispatch();
  const userProfile = useReduxSelector((state) => state.auth.userProfile);
  const [isLoadingProjects, setIsLoadingProjects] = useState<boolean>(true);
  const [myProjects, setMyProjects] = useState<iProject[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      if (userProfile) {
        const projects = await getProjectsByUserId(userProfile.id);
        setMyProjects(projects);
        setIsLoadingProjects(false);
      }
    };

    fetchProjects();
  }, [userProfile]);

  const onProjectClick = (project: iProject) => {
    dispatch(setSelectedProject(project));
    router.push(`projects/${project.id}/overview`);
  };

  return (
    <div className='flex h-full w-full flex-col px-[35px] py-[25px]'>
      <div className='flex items-center justify-between'>
        <h1 className='text-[32px]'>My Projects</h1>
        {myProjects && myProjects.length > 0 && <CreateProjectButton />}
      </div>
      {!isLoadingProjects && myProjects && myProjects.length > 0 && (
        <div className='grid gap-[45px] pt-[52px] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {myProjects.map((project) => (
            <div
              className='flex min-w-[300px] cursor-pointer flex-col rounded-[10px] p-[18px]
              shadow-xl transition duration-300 hover:scale-105'
              onClick={() => onProjectClick(project)}
              key={project.displayProjectId}
            >
              <div className='flex flex-row justify-between'>
                <div className='flex flex-row space-x-[10px]'>
                  <Image
                    src={project.logo}
                    alt={project.name}
                    width={64}
                    height={64}
                    className='rounded-[5px]'
                  />
                  <h1 className='text-[20px]'>{project.name}</h1>
                </div>
                <Link href={`projects/${project.id}/settings`}>
                  <Image
                    src='/icons/gear.svg'
                    alt='Settings'
                    width={24}
                    height={24}
                  />
                </Link>
              </div>
              <div className='mt-[17px]'>
                <h1>
                  Network :{' '}
                  {
                    networks.find(
                      (network) => network.value === project?.blockchain
                    )?.name
                  }
                </h1>
                <h1>Project ID : {project.displayProjectId}</h1>
              </div>
            </div>
          ))}
        </div>
      )}
      {!isLoadingProjects && (!myProjects || myProjects.length) <= 0 && (
        <div className='flex flex-1 flex-col items-center justify-center space-y-[16px]'>
          <Image
            src='/images/projectsEmpty.svg'
            alt='Create'
            width={250}
            height={250}
            className='rounded-[5px]'
          />
          <label className='text-[16px] text-gray-500'>
            You do not have any projects
          </label>
          <CreateProjectButton />
        </div>
      )}
      {isLoadingProjects && (
        <div className='flex flex-1 flex-col items-center justify-center space-y-[16px]'>
          <PulseLoader size={30} color='#605BFF' />
        </div>
      )}
    </div>
  );
};

export default Projects;
