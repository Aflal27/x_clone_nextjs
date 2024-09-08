"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { FaXTwitter } from "react-icons/fa6";
import { IoMdHome } from "react-icons/io";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

export default function Sidebar() {
  const { data: session } = useSession();
  return (
    <div className=" flex flex-col  h-screen p-3 justify-between">
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
      <div className="">
        {session && (
          <div className=" text-gray-700 text-sm flex items-center cursor-pointer p-3 hover:bg-gray-100 rounded-full transition-all duration-200">
            <img
              className=" h-10 w-10 rounded-full xl:mr-2"
              src={session.user.image}
              alt="user-image"
            />
            <div className=" hidden xl:inline">
              <p className=" font-bold">{session.user.name}</p>
              <p className=" text-gray-400">@{session.user.username}</p>
            </div>
            <HiOutlineDotsHorizontal className=" hidden xl:inline h-5 xl:ml-8" />
          </div>
        )}
      </div>
    </div>
  );
}
