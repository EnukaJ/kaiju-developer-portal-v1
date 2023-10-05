"use client"

import { PulseLoader } from "react-spinners";

const Auth: React.FC = () => {
  return (
    <main className="h-screen w-full flex flex-col justify-center items-center">
      <div className="h-screen w-full flex flex-col justify-center items-center">
        <PulseLoader size={30} color="#60A5FA" />
      </div>
    </main>
  );
};

export default Auth;
