"use client";

import React, { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { HiOutlinePhotograph } from "react-icons/hi";
import { app } from "../firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import {
  addDoc,
  serverTimestamp,
  collection,
  getFirestore,
} from "firebase/firestore";

export default function Input() {
  const { data: session } = useSession();
  const imageRef = useRef(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null); // [1
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [postLoading, setpostLoading] = useState(false);
  const [text, setText] = useState("");
  const db = getFirestore(app);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };
  useEffect(() => {
    if (selectedFile) {
      uploadImageToStorage();
    }
  }, [selectedFile]);

  const uploadImageToStorage = () => {
    setImageFileUploading(true);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + "-" + selectedFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, selectedFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        console.log(error);
        setImageFileUploading(false);
        setImageFileUrl(null);
        setSelectedFile(null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setImageFileUploading(false);
        });
      }
    );
  };
  const handleSubmit = async () => {
    setpostLoading(true);
    const docRef = await addDoc(collection(db, "posts"), {
      uid: session.user.uid,
      name: session.user.name,
      username: session.user.username,
      text,
      profileImg: session.user.image,
      timestamp: serverTimestamp(),
      image: imageFileUrl,
    });

    setpostLoading(false);
    setImageFileUrl(null);
    setSelectedFile(null);
  };

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
          value={text}
          onChange={(e) => setText(e.target.value)}
          className=" w-full border-none outline-none tracking-wide text-gray-700 min-h-[50px]"
          placeholder="whats happaning"
          rows="2"></textarea>
        {selectedFile && (
          <div className="">
            <img
              src={imageFileUrl}
              alt="image"
              className={`w-full max-h-[250px] object-cover cursor-pointer ${
                imageFileUploading ? "animate-pulse" : ""
              }`}
            />
          </div>
        )}
        <div className=" flex items-center justify-between pt-2.5">
          <HiOutlinePhotograph
            onClick={() => imageRef.current.click()}
            className=" h-10 w-10 p-2 text-sky-500 hover:text-sky-100 cursor-pointer"
          />
          <input
            hidden
            onChange={handleImage}
            accept="image/*"
            type="file"
            ref={imageRef}
          />
          <button
            onClick={handleSubmit}
            disabled={text.trim() === "" || postLoading || imageFileUploading}
            className="  bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50">
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
