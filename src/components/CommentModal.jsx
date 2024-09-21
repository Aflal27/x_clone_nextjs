"use client";
import { useRecoilState } from "recoil";
import { modalState } from "../atom/modalAtom";

export default function CommentModal() {
  const [open, setOpen] = useRecoilState(modalState);
  return (
    <div>
      <h1>CommendModal</h1>
      {open && <h2>The modal is open </h2>}
    </div>
  );
};
