// app/layout.js
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  // Adding variable font support for better performance
  variable: '--font-inter',
  display: 'swap',
});

export const metadata = {
  title: 'Tic Tac Toe Game',
  description: 'Play Tic Tac Toe with an AI opponent!',
  // Adding some additional metadata for better SEO
  keywords: 'tic tac toe, game, AI opponent, board game',
  authors: [{ name: 'Your Name' }],
  openGraph: {
    title: 'Tic Tac Toe Game',
    description: 'Play Tic Tac Toe with an AI opponent!',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`
        ${inter.className}
        min-h-screen
        bg-accent dark:bg-primary
        text-primary dark:text-accent
        transition-colors duration-300
        antialiased
        selection:bg-primary selection:text-accent
        dark:selection:bg-accent dark:selection:text-primary
      `}>
        <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8">
          {children}
        </main>
      </body>
    </html>
  );
}