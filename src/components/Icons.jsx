"use client";
import {
  HiOutlineChat,
  HiOutlineHeart,
  HiOutlineTrash,
  HiHeart,
} from "react-icons/hi";
import { app } from "../firebase";
import {
  collection,
  deleteDoc,
  doc,
  getFirestore,
  onSnapshot,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Icons({ id, uid }) {
  const db = getFirestore(app);
  const { data: session } = useSession();
  const [like, setLike] = useState([]);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = async () => {
    if (session) {
      if (isLiked) {
        await deleteDoc(doc(db, "posts", id, "likes", session?.user.uid));
      } else {
        await setDoc(doc(db, "posts", id, "likes", session?.user.uid), {
          username: session.user.username,
          timestamp: serverTimestamp(),
        });
      }
    } else {
      signIn();
    }
  };

  useEffect(() => {
    onSnapshot(collection(db, "posts", id, "likes"), (snapshot) => {
      setLike(snapshot.docs);
    });
  }, [db]);
  useEffect(() => {
    setIsLiked(like.findIndex((l) => l.id === session?.user?.uid) !== -1);
  }, [like]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      if (session?.user.uid === uid) {
        deleteDoc(doc(db, "posts", id))
          .then(() => {
            console.log("post succussfully deleted!");
            window.location.reload();
          })
          .catch((error) => {
            console.log("post delete error", error);
          });
      } else {
        alert("You are not authorized to delete this post");
      }
    }
  };
  return (
    <div className=" flex justify-start gap-5 p-2 text-gray-500">
      <HiOutlineChat className=" h-8 w-8 cursor-pointer rounded-full transition duration-500 ease-in-out p-2 hover:text-sky-500 hover:bg-sky-100" />
      <div className=" flex items-center">
        {isLiked ? (
          <HiHeart
            onClick={handleLike}
            className=" text-red-600 h-8 w-8 cursor-pointer rounded-full transition duration-500 ease-in-out p-2 hover:text-red-500 hover:bg-red-100"
          />
        ) : (
          <HiOutlineHeart
            onClick={handleLike}
            className=" h-8 w-8 cursor-pointer rounded-full transition duration-500 ease-in-out p-2 hover:text-red-500 hover:bg-red-100"
          />
        )}
        {like.length > 0 && (
          <span className={` text-xs ${isLiked && " text-red-600"}`}>
            {like.length}
          </span>
        )}
      </div>
      {session?.user.uid === uid && (
        <HiOutlineTrash
          onClick={handleDelete}
          className=" h-8 w-8 cursor-pointer rounded-full transition duration-500 ease-in-out p-2 hover:text-red-500 hover:bg-red-100"
        />
      )}
    </div>
  );
}
