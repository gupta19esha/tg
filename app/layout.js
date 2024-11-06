// app/layout.js
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Tic Tac Toe Game',
  description: 'Play Tic Tac Toe with an AI opponent!',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex items-center justify-center min-h-screen bg-purple-100`}>
        {children}
      </body>
    </html>
  );
}
