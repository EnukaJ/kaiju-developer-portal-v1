import { iPlayer } from "@/types/Player";
import { setTimeout } from "timers/promises";
import Image from "next/image";
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
    <div className="h-[90vh] w-full flex flex-col  mx-10  my-5 relative">
      <div className="flex flex-row items-center">
        <div className="absolute left-2">
          <Image
            src="/icons/Search.svg"
            alt="Google"
            width={20}
            height={20}
          />
        </div>
        <input
          type="text"
          name="search"
          placeholder="Search"
          className="bg-[#FAFAFB] py-3 px-10 rounded-[5px] w-[1000px]"
        />
      </div>

      <div className="w-[1000px] p-2 grid grid-cols-4 mt-[25px] text-[#030229] justify-between font-[400]">
        <span className="flex flex-row items-center gap-2 text-gray-600">
          <p>Name</p>
          <Image
            src="/icons/Arrow-down.svg"
            alt="Google"
            width={6}
            height={5}
          />
          
        </span>
        <span className="flex flex-row items-center gap-2 text-gray-600">
          <p>Email</p>
          <Image
            src="/icons/Arrow-down.svg"
            alt="Google"
            width={6}
            height={5}
          />
        </span>
        <span className="flex flex-row items-center gap-2 text-gray-600">
          <p>Wallet Address</p>
          <Image
            src="/icons/Arrow-down.svg"
            alt="Google"
            width={6}
            height={5}
          />
        </span>
        <span className="flex flex-row items-center gap-2 text-gray-600">
          <p>Date Joined</p>
          <Image
            src="/icons/Arrow-down.svg"
            alt="Google"
            width={6}
            height={5}
          />
        </span>
      </div>
      <ul>
        {myPlayers.map((Player) => (
          <li
            key={Player.id}
            className="group hover:shadow-lg rounded-lg my-3 p-2 grid grid-cols-4 w-[1000px] items-center"
          >
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-full">
                <BsPersonFill className='text-purple-800' />
              </div>
              <p className="pl-4">{Player.name}</p>
            </div>
            <p >{Player.email}</p>
            <p >{Player.walletAddress.slice(0, 7) + '...' + Player.walletAddress.slice(-5)}</p>
            <div className="flex justify-between items-center  mr-10">
              <p className="opacity-0 group-hover:opacity-100">{Player.dateJoined}</p>
              <div className=" group-hover:text-[#605BFF]">
                <BsThreeDots size={15} />
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className=" flex justify-center w-[1000px] absolute bottom-0 ">
        <p>1 2 3 4 5 6 ... 12</p>
      </div>
    </div>
  );
};

export default ProjectPlayers;