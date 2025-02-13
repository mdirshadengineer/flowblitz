import "app/_styles/globals.css";

import type { Metadata } from "next";
import { Dancing_Script, Poppins } from "next/font/google";
import { ThemeProvider } from "src/theme/theme-provider";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "500", "600", "700", "800", "900"]
});

const dancingScript = Dancing_Script({
  variable: "--font-dancing-script",
  subsets: ["latin"],
  weight: "variable"
});

export const metadata: Metadata = {
  title: "Flowblitz",
  description: "Empower automated workflows"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`${poppins.variable} ${dancingScript.variable} bg-background text-foreground antialiased`}
      >
        <ThemeProvider
          attribute={"class"}
          enableSystem={true}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
