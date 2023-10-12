import Link from 'next/link';
import Image from 'next/image';

const CreateProjectButton: React.FC = () => {
  return (
    <Link
      href='projects/create'
      className='flex flex-row space-x-[10px] rounded-[10px] bg-[#605BFF] px-[15px] py-[10px]'
    >
      <Image
        src='/icons/plus.svg'
        alt='Create'
        width={12}
        height={12}
        className='rounded-[5px]'
      />
      <p className='text-[16px] text-white'>Create new project</p>
    </Link>
  );
};

export default CreateProjectButton;
