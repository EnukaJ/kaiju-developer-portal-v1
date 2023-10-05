import Link from "next/link";
import { ImCamera } from "react-icons/im";
const CreateProject: React.FC = () => {
  return (
    <main>
      <div className="h-full w-full flex flex-col p-4">
        <h1 className="text-[20px] font-semibold">Create new project</h1>
      </div>
      <form className="flex flex-col items-center font-semibold text-[12px] space-y-5">
        <div className="items-start flex flex-col space-y-5">
          <label>Project Logo</label>
          <div className="bg-[#FAFAFB] rounded-full p-12">
            <ImCamera size={20} />
          </div>
          <label>Project Name</label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="bg-[#FAFAFB] p-3 rounded-lg w-[250px]"
          />
          <label>Website URL</label>
          <input
            type="text"
            name="websiteUrl"
            placeholder="https://"
            className="bg-[#FAFAFB] p-3 rounded-lg w-[250px]"
          />
          <label>Network</label>
          <select
            className="bg-[#FAFAFB] p-3 rounded-lg w-[250px] text-gray-400"

          >
            <option>Polygon</option>
            <option>Aelf</option>
          </select>
          <label>Description</label>
          <textarea
            name="Description"
            placeholder="Description"
            className="bg-[#FAFAFB] p-3 rounded-lg w-[250px] h-[100px] resize-none"
          />

        </div>
        <Link href="/projects" className="bg-[#605BFF] text-white p-[10px] rounded-[10px] w-[250px] text-center"> Create Project</Link>
      </form>
    </main>
  );
};

export default CreateProject;