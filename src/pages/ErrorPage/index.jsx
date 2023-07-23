import React from 'react';
import { useParams } from 'react-router-dom';

export default function ErrorPage() {
  const { errorCode } = useParams();
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <p className="text-2xl">Something went wrong!</p>
      {errorCode && <p className="text-2xl">{`Error code: ${errorCode}`}</p>}
    </div>
  );
}
