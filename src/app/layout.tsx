import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import '@mantine/core/styles.css';

import {ColorSchemeScript, Combobox, MantineProvider} from '@mantine/core';
import Footer from "@/app/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "IC 2024 ROI Calculator",
  description: "How many approvals do you need to do to break even? Calculate your ROI now!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <title>IC 2024 ROI Calculator</title>
      </head>
      <body className={inter.className}>
        <MantineProvider>
            <div className={`bg-gray-100 flex flex-col min-w-screen min-h-screen items-center justify-center text-gray-800 h-full`}>
                <div className={`flex flex-1 items-center justify-center w-full md:w-fit`}>{children}</div>
                <Footer/>
            </div>
        </MantineProvider>
      </body>
    </html>
  );
}
