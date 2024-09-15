import Link from "next/link";
import { HiDotsHorizontal } from "react-icons/hi";
import Icons from "./Icons";

export default function Post({ post, id }) {
  return (
    <div className=" flex p-3 border-b border-gray-200 hover:bg-gray-100">
      <img
        src={post.profileImg}
        alt="user-img"
        className=" h-11 w-11 rounded-full mr-2"
      />
      <div className=" flex-1">
        <div className=" flex items-center justify-between">
          <div className=" flex items-center space-x-1 whitespace-nowrap">
            <p className=" text-sm font-bold truncate">{post.name}</p>
            <p className=" text-xs truncate">@{post.username}</p>
          </div>
          <HiDotsHorizontal />
        </div>
        <div className="">
          <Link href={`/posts/${id}`}>
            <p className=" text-gray-800 text-sm my-3">{post?.text}</p>
          </Link>
          <Link href={`/posts/${id}`}>
            <img src={post?.image} className=" rounded-2xl mr-2" />
          </Link>
        </div>
        <div className="">
          <Icons />
        </div>
      </div>
    </div>
  );
}
