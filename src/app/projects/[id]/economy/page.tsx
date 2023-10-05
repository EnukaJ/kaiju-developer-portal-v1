type ProjectEconomyProps = {
  params: {
    id: string;
  };
};

const ProjectEconomy: React.FC<ProjectEconomyProps> = ({ params: { id } }) => {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center">
      Project {id} economy
    </div>
  );
};

export default ProjectEconomy;