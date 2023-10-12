import Header from '@/components/Header';

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex h-full w-full flex-col'>
      <Header />
      {children}
    </div>
  );
}
