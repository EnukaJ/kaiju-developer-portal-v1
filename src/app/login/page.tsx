import LoginButton from "@/components/LoginButton";
import Image from "next/image";

const Login: React.FC = () => {
  return (
    <main className="h-screen w-full flex ">
      <div className="flex flex-3 flex-col  items-center  p-8 w-[450px] h-screen ">
        <Image
          src="/icons/Black_Icon.png"
          alt="Google"
          width={75}
          height={75}
          className="pt-12"
        />
        <h1 className="text-[24px] text-gray-800 font-bold text-center p-12">
          Welcome to Kaiju Developer Portal
        </h1>
        <LoginButton />
      </div>
      <div >
        <Image
          src="/Home_Image.png"
          alt="Google"
          width={1090}
          height={980}
          className="max-width-[100vh] max-h-[100vh]"
        />
      </div>
    </main>
  );
};

export default Login;