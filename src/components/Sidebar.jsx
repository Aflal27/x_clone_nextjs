"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { FaXTwitter } from "react-icons/fa6";
import { IoMdHome } from "react-icons/io";

export default function Sidebar() {
  const { data: session } = useSession();
  return (
    <div className=" flex flex-col gap-4 p-3">
      <Link href="/">
        <FaXTwitter className=" w-16 h-16 cursor-pointer p-3 hover:bg-gray-100 rounded-full transition-all duration-200" />
      </Link>
      <Link
        className=" flex items-center gap-2 cursor-pointer p-3 hover:bg-gray-100 rounded-full transition-all duration-200 w-fit"
        href="/">
        <IoMdHome className=" w-7 h-7" />
        <span className=" font-bold hidden xl:inline ">Home</span>
      </Link>
      {session ? (
        <button
          className=" shadow-md hidden xl:inline w-48 h-9 bg-blue-400 text-white font-bold rounded-full hover:brightness-75 transition-all duration-200"
          onClick={() => signOut()}>
          Sign Out
        </button>
      ) : (
        <button
          className=" shadow-md hidden xl:inline w-48 h-9 bg-blue-400 text-white font-bold rounded-full hover:brightness-75 transition-all duration-200"
          onClick={() => signIn()}>
          Sign In
        </button>
      )}
    </div>
  );
}
