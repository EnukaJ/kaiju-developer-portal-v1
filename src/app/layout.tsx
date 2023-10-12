import Providers from '@/providers/Providers';
import './globals.css';
import 'react-toastify/dist/ReactToastify.css';
import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';

const nunito = Nunito({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Kaiju Developer Portal',
  description: 'Kaiju Developer Portal',
  openGraph: {
    title: 'Developer Portal | kaiju Labs',
    description:
      'Kaiju Labs help game developers to create Web3 games with zero blockchain knowledge by providing an easy to use Wallet, SDK, and Infrastructure.',
    images: {
      url: 'https://ds31qp264qsng.cloudfront.net/kaijugame2048/metaDataImage.png',
      width: 1024,
      height: 1024,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={`h-screen w-full ${nunito.className}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
