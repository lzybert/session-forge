import './globals.css';

import type { Metadata } from 'next';
import { Bitter, Jacquard_24 } from 'next/font/google';

import { Provider } from '@/components/ui/provider';

import { AuthProvider } from './authProvider';
import { Topbar } from './components/forms/navigation/topbar';

const jacquard24 = Jacquard_24({
  variable: '--font-jacquard-24',
  weight: '400',
  style: 'normal',
  subsets: ['latin'],
});

const bitter = Bitter({
  variable: '--font-bitter',
  weight: ['100', '200', '400', '500', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Session Forge',
  description: 'Craft Epic Adventures, One Session at a Time',
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jacquard24.variable} ${bitter.variable}`}>
        <AuthProvider>
          <Provider>
            <Topbar/>
            {children}
          </Provider>
        </AuthProvider>
      </body>
    </html>
  );
}
