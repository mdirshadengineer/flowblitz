'use client';

import { Toaster } from 'components/ui/sonner';
import { useTheme } from 'next-themes';

export default function ClientProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const { theme } = useTheme();
  return (
    <>
      <Toaster
        expand={false}
        richColors
        theme={theme as any} // TODO: fix type maybe do some processing before using here have a util function
        position="bottom-right"
        className="!z-[100]"
        closeButton
        duration={40000}
      />
      {children}
    </>
  );
}
