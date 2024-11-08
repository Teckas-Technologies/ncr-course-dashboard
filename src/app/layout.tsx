import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import "@near-wallet-selector/modal-ui/styles.css";
import DataProvider from "@/providers/data";
const inter = Inter({ subsets: ["latin"] });
import { WalletProvider } from "@/providers/WalletProvider";

export const metadata: Metadata = {
  title: "Near Certified Researcher",
  description: "The NEAR Certified Researcher course equips participants with foundational blockchain knowledge, focusing on practical Web3 skills with applied NEAR Protocol experiences. It’s designed to teach learners how to earn by becoming proficient blockchain researchers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <WalletProvider>
      <html lang="en">
        <body className={inter.className}>
          <div className="">
            <DataProvider>{children}</DataProvider>
            <Toaster />
          </div>
        </body>
      </html>
    </WalletProvider>
  );
}
