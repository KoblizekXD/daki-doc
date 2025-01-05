import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@fontsource-variable/jetbrains-mono';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';

const inter = Inter({
  subsets: ['latin'],
  weight: 'variable',
});

export const metadata: Metadata = {
  title: 'Daki Docs',
  description: 'Browse Javadocs with modern UI!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute='class'
          defaultTheme='dark'
          enableSystem
          disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
