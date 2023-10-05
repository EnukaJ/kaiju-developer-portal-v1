"use client"
import Image from "next/image";
import { useReduxSelector } from "@/redux/hooks";

const Header = () => {
  const authContext = useReduxSelector((state) => state.auth);
  
  return (
    <div className="w-full h-[6vh] flex flex-row bg-black items-center justify-between px-4">
      <Image
        src="/icons/White_Icon.png"
        alt="Google"
        width={24}
        height={24}
      />
      
      {authContext.userProfile && <div className="flex flex-row space-x-2">
        <Image
          src={authContext.userProfile?.userProfileImage}
          alt="Google"
          width={24}
          height={24}
          className="rounded-full"
        />
        <div className="flex flex-col ">
          <p className=" text-white ">{authContext.userProfile?.name}</p>
          <p className=" text-gray-400 text-xs">{authContext.userProfile?.blockchains.evm.contract.slice(0, 7) + '...' + authContext.userProfile?.blockchains.evm.contract.slice(-5)}</p>
        </div>
      </div>}
    </div>
  );
};

export default Header;