import React from 'react';

import Image from 'next/image';

import { ModeToggle } from 'global/theme/mode-toggle';

export default function StudioApplicationLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <React.Fragment>
      {/* <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <div className="flex items-center space-x-4">
            <Image
              src="https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?q=80&w=50&h=50&auto=format&fit=crop"
              width={40}
              height={40}
              className="rounded"
              alt="Logo"
            />
            <h2 className="text-2xl font-bold">Low Code Builder</h2>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <ModeToggle />
          </div>
        </div>
      </div> */}
      {children}
    </React.Fragment>
  );
}
