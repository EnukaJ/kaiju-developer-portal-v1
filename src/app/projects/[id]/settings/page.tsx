type ProjectSettingsProps = {
  params: {
    id: string;
  };
};

const ProjectSettings: React.FC<ProjectSettingsProps> = ({ params: { id } }) => {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center">
      Project {id} settings
    </div>
  );
};

export default ProjectSettings;