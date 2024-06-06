import React from 'react';
import { useMessageContext } from './MessageContext';
import Image from 'next/image';

const MediaBox: React.FC = () => {
  const { ongoingMessages } = useMessageContext();

  const currentImageMessage = ongoingMessages.slice().reverse().find(message => message.type === 'image');

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 p-4 md:w-1/3">
      {currentImageMessage ? (
        <Image
          src={currentImageMessage.imageUrl as string}
          alt="Current"
          width={500}
          height={500}
          className="w-20 h-20"
        />
      ) : (
        <p>No image to display</p>
      )}
    </div>
  );
};

export default MediaBox;