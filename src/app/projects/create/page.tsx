"use client"
import Link from "next/link";
import Image from "next/image";
import { Listbox } from "@headlessui/react";
import { useState } from "react";

const networks = [
  { id: 1, name: 'Polygon', unavailable: false },
  { id: 2, name: 'Aelf', unavailable: false },
]
const CreateProject: React.FC = () => {
  const [selectednetwork, setSelectednetwork] = useState(networks[0])

  return (
    <main>
      <div className="h-full w-full flex flex-col p-4">
        <h1 className="text-[20px] font-normal">Create new project</h1>
      </div>
      <form className="flex flex-col items-center font-normal text-[12px] space-y-5">
        <div className="items-start flex flex-col space-y-5 text-[14px]">
          <label>Project Logo</label>
          <div className="bg-[#FAFAFB] rounded-full p-12">
            <Image
              src="/icons/Camera.svg"
              alt="Camera"
              width={22}
              height={20}
            />
          </div>
          <label>Project Name</label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="bg-[#FAFAFB] p-3 rounded-lg w-[300px] "
          />
          <label>Website URL</label>
          <input
            type="text"
            name="websiteUrl"
            placeholder="https://"
            className="bg-[#FAFAFB] p-3 rounded-lg w-[300px] "
          />
          <label>Network</label>
          <div className="relative">
            <Listbox
              value={selectednetwork}
              onChange={setSelectednetwork}
            >
              <Listbox.Button className="bg-[#FAFAFB] p-3 rounded-lg text-left w-[300px] text-gray-400 flex flex-row justify-between items-center " >
                {selectednetwork.name}
                <Image
                  src="/icons/arrow-btn.svg"
                  alt="Camera"
                  width={6}
                  height={5}
                  className="text-gray-400"
                />
              </Listbox.Button>
              <Listbox.Options className="cursor-pointer transform -translate-y-5 absolute top-16" >
                {networks.map((network) => (
                  <Listbox.Option
                    key={network.id}
                    value={network}
                    disabled={network.unavailable}
                    className="bg-[#FAFAFB] p-3 rounded-lg w-[300px] text-gray-400  hover:bg-[#605BFF] hover:text-white"
                  >
                    {network.name}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Listbox>
          </div>
          <label>Description</label>
          <textarea
            name="Description"
            placeholder="Description"
            className="bg-[#FAFAFB] p-3 rounded-lg w-[300px] h-[100px] resize-none "
          />

        </div>
        <Link href="/projects" className="bg-[#605BFF] text-white p-[10px] rounded-[10px] w-[300px] text-center"> Create Project</Link>
      </form>
    </main>
  );
};

export default CreateProject;