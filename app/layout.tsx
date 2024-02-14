import type { Metadata } from 'next'
import localFont from 'next/font/local'
import '@/styles/globals.css'

const monaSans = localFont({
  src: './MonaSans.woff2',
  display: 'swap',
  variable: '--font-mona-sans',
})

export const metadata: Metadata = {
  title: "Fuse Airdrop",
  description: "Join the Fuse Airdrop program",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={monaSans.className}>{children}</body>
    </html>
  );
}
