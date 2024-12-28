import type { Metadata } from "next";
import { Roboto } from 'next/font/google'
 
import "./globals.css";
import Script from "next/script";

const roboto = Roboto({
  weight: ['100', '300', '400', '500', '700', '900'],
  subsets: ['latin'],
  style: ['normal', 'italic']
})


export const metadata: Metadata = {
  title: "Undangan Pernikahan - Fatih & Fathiyyah",
  description: "Undangan Pernikahan - Fatih & Fathiyyah",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Script src="https://kit.fontawesome.com/c4174e8d2c.js"></Script>
      <body className={`${roboto.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
