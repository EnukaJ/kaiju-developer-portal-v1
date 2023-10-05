import Link from 'next/link';
import Image from 'next/image';
import { setTimeout } from "timers/promises";
import { iProject } from "@/types/Project";
import { BsGearWideConnected } from 'react-icons/bs';

const getProjects = async (): Promise<iProject[]> => {
  await setTimeout(3000);
  return [
    { id: 'abcd', name: 'ABCD', network: 'Polygon' },
    { id: 'pqrs', name: 'PQRS', network: 'Aelf' },
  ];
};

const Projects: React.FC = async () => {
  const myProjects = await getProjects();

  return (
    <div className="h-full w-full flex flex-col px-10">
      <div className='flex justify-between items-center'>
        <h1 className='text-[20px] font-semibold'>My Projects</h1>
        <Link href="projects/create" className="bg-[#605BFF] text-white p-[10px] rounded-[10px] my-5 w-48">+ Create new project</Link>
      </div>
      {myProjects && (
        <div className='h-full w-full flex flex-row flex-wrap  items-center space-x-10'>
          {myProjects.map((project) => (
            <Link href={`projects/${project.id}/overview`} key={project.id}>
              <div className="h-[110px] w-[200px]  p-4 rounded-[10px] justify-center items-center shadow-xl" >
                <div className='flex flex-row justify-between'>
                  <div className='flex flex-row space-x-3' >
                    <Image
                      src="/icons/google.svg"
                      alt="Google"
                      width={40}
                      height={40}
                    />
                    <h1 className='font-semibold'>{project.name}</h1>
                  </div>
                  <Link href={`projects/${project.id}/settings`}>
                    <BsGearWideConnected size={20} />
                  </Link>

                </div>
                <div className='mt-3'>
                  <h1>Network : {project.network}</h1>
                  <h1>Project ID : {project.id}</h1>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Projects;