type ProjectEconomyProps = {
  params: {
    id: string;
  };
};

const ProjectEconomy: React.FC<ProjectEconomyProps> = ({ params: { id } }) => {
  return (
    <div className='flex h-full w-full flex-col items-center justify-center'>
      Project {id} economy
    </div>
  );
};

export default ProjectEconomy;
