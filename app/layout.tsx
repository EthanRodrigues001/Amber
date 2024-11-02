import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { Link as Github } from "lucide-react";
import "./globals.css";
import { IconDatabase, IconHome } from "@tabler/icons-react";
import { FloatingNav } from "@/components/ui/floating-navbar";
import Head from "next/head";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Amber",
  description: "File storage made simple.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navItems = [
    {
      name: "Home",
      link: "/",
      icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Storage",
      link: "/storage",
      icon: (
        <IconDatabase className="h-4 w-4 text-neutral-500 dark:text-white" />
      ),
    },
  ];
  return (
    <html lang="en">
      {/* <Head>
        {" "}
        <link rel="icon" href="/favicon.ico" />{" "}
      </Head> */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <FloatingNav navItems={navItems} />
          {children}
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

function Footer() {
  return (
    <footer className="w-full bg-zinc-900 text-zinc-400 py-8">
      <div className="max-w-5xl mx-auto px-4 flex justify-between items-center">
        <p>© 2024 Amber. Created by Ethan.</p>
        <a
          href="https://github.com/EthanRodrigues001"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center hover:text-zinc-100 transition-colors"
        >
          <Github className="w-5 h-5 mr-2" />
          View on GitHub
        </a>
      </div>
    </footer>
  );
}
