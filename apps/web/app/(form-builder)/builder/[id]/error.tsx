'use client';

import React, { useEffect } from 'react';

const ErrorPage = ({ error }: { error: Error }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <h1 className="">Error</h1>
      <p>Something went wrong. Please try again later.</p>
      <p>{error.message}</p>
    </div>
  );
};

export default ErrorPage;
