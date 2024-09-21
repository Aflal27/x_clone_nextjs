import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import News from "@/components/News";
import SessionWrapper from "@/components/SessionWrapper";
import CommentModal from "@/components/CommentModal";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "X Clone",
  description: "X clone using next js",
};

export default function RootLayout({ children }) {
  return (
    <SessionWrapper>
      <html lang="en">
        <body className={inter.className}>
          <div className=" flex justify-between max-w-6xl mx-auto">
            <div className=" hidden sm:inline border-r h-screen sticky top-0">
              <Sidebar />
            </div>
            <div className=" w-2xl flex-1">{children}</div>
            <div className=" lg:flex lg:flex-col h-screen border-l w-[24rem] p-2">
              <div className=" sticky top-0 bg-white py-2">
                <input
                  placeholder="Search"
                  className=" bg-gray-100 border border-gray-100 rounded-3xl text-sm w-full px-4 py-2"
                />
                <News />
              </div>
            </div>
          </div>
        </body>
        <CommentModal />
      </html>
    </SessionWrapper>
  );
}
