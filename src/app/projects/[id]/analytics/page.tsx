type ProjectAnalyticsProps = {
  params: {
    id: string;
  };
};

const ProjectAnalytics: React.FC<ProjectAnalyticsProps> = ({ params: { id } }) => {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center">
      Project {id} analytics
    </div>
  );
};

export default ProjectAnalytics;