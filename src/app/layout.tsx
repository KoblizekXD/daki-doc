import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const inter = Inter({
  subsets: ["latin"],
  weight: 'variable'
});

export const metadata: Metadata = {
  title: "Daki Docs",
  description: "Browse Javadocs with modern UI!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
            attribute="class"
            defaultTheme='dark'
            enableSystem
            disableTransitionOnChange>
              {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
