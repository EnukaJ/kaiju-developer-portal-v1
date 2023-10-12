import ProjectSideBar from '@/components/ProjectSideBar';

export default function ProjectLayout({
  children,
  id,
  name,
}: {
  children: React.ReactNode;
  id: string;
  name: string;
}) {
  return (
    <div className='no-scrollbar flex h-full w-full flex-row overflow-y-scroll'>
      <ProjectSideBar />
      {children}
    </div>
  );
}
