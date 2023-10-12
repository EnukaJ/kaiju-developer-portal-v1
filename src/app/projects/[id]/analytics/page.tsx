type ProjectAnalyticsProps = {
  params: {
    id: string;
  };
};

const ProjectAnalytics: React.FC<ProjectAnalyticsProps> = ({
  params: { id },
}) => {
  return (
    <div className='flex h-full w-full flex-col items-center justify-center'>
      Project {id} analytics
    </div>
  );
};

export default ProjectAnalytics;
