"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { HiOutlinePhotograph } from "react-icons/hi";

export default function Input() {
  const { data: session } = useSession();
  if (!session) return null;
  return (
    <div className=" p-2 flex border-b border-gray-200 space-x-3 w-full">
      <img
        src={session.user?.image}
        alt="user-image"
        className=" w-11 h-11 rounded-full cursor-pointer hover:brightness-95"
      />
      <div className=" w-full divide-y divide-gray-200">
        <textarea
          className=" w-full border-none outline-none tracking-wide text-gray-700 min-h-[50px]"
          placeholder="whats happaning"
          rows="2"></textarea>
        <div className=" flex items-center justify-between pt-2.5">
          <HiOutlinePhotograph className=" h-10 w-10 p-2 text-sky-500 hover:text-sky-100 cursor-pointer" />
          <button className="  bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50">
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
