'use client';

import { networks } from '@/utils/constants';
import { useReduxSelector } from '@/redux/hooks';
import ImageWithLoader from '@/components/ImageWithLoader';

type ProjectOverviewProps = {
  params: {
    id: string;
  };
};

const ProjectOverview: React.FC<ProjectOverviewProps> = () => {
  const selectedProject = useReduxSelector(
    (state) => state.projects.selectedProject
  );

  return (
    <div className='flex h-full w-full flex-row items-center justify-center'>
      <div className='flex justify-center space-x-[64px]'>
        <div className='rounded-[10px]'>
          <ImageWithLoader imageUri={selectedProject?.logo ?? ''} />
        </div>
        <div className='flex flex-col items-center justify-center space-y-[16px]'>
          <div className='flex flex-col space-y-[8px]'>
            <label className='text-[14px]'>Project ID</label>
            <div className='info-box'>
              <p>{selectedProject?.displayProjectId}</p>
            </div>
          </div>

          <div className='flex flex-col space-y-[8px]'>
            <label className='text-[14px]'>Website URL</label>
            <div className='info-box'>
              <p>{selectedProject?.websiteUrl}</p>
            </div>
          </div>

          <div className='flex flex-col space-y-[8px]'>
            <label className='text-[14px]'>Network</label>
            <div className='info-box'>
              <p>
                {
                  networks.find(
                    (network) => network.value === selectedProject?.blockchain
                  )?.name
                }
              </p>
            </div>
          </div>

          <div className='flex flex-col space-y-[8px]'>
            <label className='text-[14px]'>Description</label>
            <div className='info-box'>
              <p>{selectedProject?.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectOverview;
