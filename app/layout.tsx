import "./globals.css";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import ClientOnly from "./components/ClientOnly";
import Sidebar from "./components/sidebar/Sidebar";
import Navbar from "./components/navbar/Navbar";
import LoginModal from "./components/modals/LoginModal";
import RegisterModal from "./components/modals/RegisterModal";
import EventModal from "./components/modals/EventModal";

import ToasterProvider from "./providers/ToasterProvider";
import getCurrentUser from "./actions/getCurrentUser";
const font = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Quản lý đoàn viên",
  description: "Website quản lý đoàn viên",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={font.className}>
        <div className="flex p-5 gap-5">
          <ClientOnly>
            <Sidebar currentUser={currentUser} />
          </ClientOnly>
          <div className="flex flex-col w-full">
            <ClientOnly>
              <ToasterProvider />
              <LoginModal />
              <RegisterModal />
              <EventModal />
              <Navbar currentUser={currentUser} />
            </ClientOnly>
            <div className="pb-20 pt-4">{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}
