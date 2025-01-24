import type { Metadata } from "next";
import Script from "next/script";
import { Roboto } from 'next/font/google'

import "@/app/globals.css";
import { marriageDetails } from "@/app/data";

const roboto = Roboto({
  weight: ['100', '300', '400', '500', '700', '900'],
  subsets: ['latin'],
  style: ['normal', 'italic']
})


export const metadata: Metadata = {
  title: `Undangan Pernikahan - ${marriageDetails.groom.nickname} & ${marriageDetails.bride.nickname}`,
  description: `Undangan Pernikahan - ${marriageDetails.groom.nickname} & ${marriageDetails.bride.nickname}`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Script src="https://kit.fontawesome.com/c4174e8d2c.js"></Script>
      <body className={`${roboto.className} antialiased overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}
