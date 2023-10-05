import { iPlayer } from "@/types/Player";
import { setTimeout } from "timers/promises";
import { AiOutlineSearch } from "react-icons/ai";
import { BsArrowDown, BsFillCaretDownFill, BsPersonFill, BsThreeDots } from "react-icons/bs";

type ProjectPlayersProps = {
  params: {
    id: string;
  };
};

const getPlayers = async (): Promise<iPlayer[]> => {
  await setTimeout(3000);
  return [
    { id: '1', name: 'John Deo', email: 'johndoe2211@gmail.com', dateJoined: '20/08/2021', walletAddress: "0xABDSJNDJMNDNKDNDK" },
    { id: '2', name: 'Shelby Goode', email: 'shelbygoode481@gmail.com', dateJoined: '25/09/2021', walletAddress: "0xABDGFBJDNDNKDNDK" },
    { id: '3', name: 'Robert Bacins', email: 'jrobertbacins4182@gmail.com', dateJoined: '10/08/2022', walletAddress: "0xABDFRGRTFNDNKDNDK" },
    { id: '4', name: 'John Carilo', email: 'johncarilo182@gmail.com', dateJoined: '20/12/2022', walletAddress: "0xABDSJNDDGDKDNDK" },
    { id: '5', name: 'Adriene Watson', email: 'adrienewatson82@gmail.com', dateJoined: '08/08/2023', walletAddress: "0xABDSJFGDFDNKDNDK" },

  ];
};
const ProjectPlayers: React.FC<ProjectPlayersProps> = async () => {
  const myPlayers = await getPlayers();
  
  return (
    <div className="h-full w-full flex flex-col justify-center mx-10  my-5 relative">
      <div className="flex flex-row items-center">
        <div className="absolute left-2">
          <AiOutlineSearch size={15} />
        </div>
        <input
          type="text"
          name="search"
          placeholder="Search"
          className="bg-[#FAFAFB] py-3 px-10 rounded-full w-[1000px]"
        />
      </div>
      
      <div className="w-[1000px] p-2 grid grid-cols-4 justify-between">
        <span className="flex flex-row items-center gap-2">
          <p>Name</p> 
          <BsFillCaretDownFill/>
          </span>        
        <span className="flex flex-row items-center gap-2">
          <p>Email</p>
          <BsFillCaretDownFill/>
        </span>
        <span className="flex flex-row items-center gap-2">
          <p>Wallet Address</p>
          <BsFillCaretDownFill/>
        </span>
        <span className="flex flex-row items-center gap-2">
          <p>Date Joined</p>
          <BsFillCaretDownFill/>
        </span>
      </div>
      <ul>
        {myPlayers.map((Player) => (
          <li
            key={Player.id}
            className="group hover:shadow-lg rounded-lg my-3 p-2 grid grid-cols-4 w-[1000px]"
          >
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-full">
                <BsPersonFill className='text-purple-800' />
              </div>
              <p className="pl-4">{Player.name}</p>
            </div>
            <p className="text-gray-600 ">{Player.email}</p>
            <p className="text-gray-600 ">{Player.walletAddress.slice(0, 7) + '...' + Player.walletAddress.slice(-5)}</p>
            <div className="flex justify-between items-center  mr-10">
              <p className="opacity-0 group-hover:opacity-100 text-gray-600 ">{Player.dateJoined}</p>
              <div className=" group-hover:text-[#605BFF]">
                <BsThreeDots size={15} />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectPlayers;