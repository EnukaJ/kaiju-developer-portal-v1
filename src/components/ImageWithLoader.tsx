'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

type ImageWithLoaderProps = {
  imageUri: string;
  width?: number;
  height?: number;
};

const ImageWithLoader: React.FC<ImageWithLoaderProps> = ({
  imageUri,
  width = 180,
  height = 180,
}) => {
  const [image, setImage] = useState<string>('');

  useEffect(() => {
    setImage(imageUri ?? '');
  }, [imageUri]);

  return (
    <Image
      src={image}
      alt='image'
      width={width}
      height={height}
      onError={() => {
        setImage('/icons/imagePlaceholder.svg');
      }}
      className='rounded-md object-cover'
    />
  );
};

export default ImageWithLoader;
