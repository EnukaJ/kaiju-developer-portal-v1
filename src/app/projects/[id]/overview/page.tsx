type ProjectOverviewProps = {
  params: {
    id: string;
  };
};

const ProjectOverview: React.FC<ProjectOverviewProps> = ({ params: { id } }) => {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center">
      Project {id} overview
    </div>
  );
};

export default ProjectOverview;