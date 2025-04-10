import 'src/styles/globals.css';
import type { Metadata } from 'next';
import { Geist, Geist_Mono, Dancing_Script } from 'next/font/google';
import { ThemeProvider } from 'global/theme/providers/theme-provider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
});

const dancingScript = Dancing_Script({
  variable: '--font-dancing-script',
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: 'Flowblitz',
  description: 'Automate. Innovate. Elevate.'
};

/**
 * The `RootLayout` function is a React component that sets up the basic layout structure for a webpage
 * with specific font styles and a theme provider.
 * @param  - The `RootLayout` function is a React component that serves as the root layout for your
 * application. It takes a single prop `children`, which represents the child components that will be
 * rendered within this layout.
 * @returns The `RootLayout` function is returning a JSX structure that includes an HTML document with
 * a `<body>` element. Inside the `<body>` element, it includes a `ThemeProvider` component with some
 * props like `attribute`, `defaultTheme`, and `enableSystem`, and renders the `children` passed to the
 * `RootLayout` component.
 */
export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${dancingScript.variable} antialiased`}
      >
        <ThemeProvider
          attribute={'class'}
          defaultTheme={'system'}
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
