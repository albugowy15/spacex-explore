"use client";

import { deleteNote, getNote } from "@/lib/note";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

interface NoteProps {
  launchId: string;
}

const Note = ({ launchId }: NoteProps) => {
  const router = useRouter();
  const note = getNote(launchId);
  function handleDeleteNote() {
    deleteNote(launchId);
    router.refresh();
  }
  return note ? (
    <>
      <h2 className="text-xl font-bold">Note</h2>
      <p>{note}</p>
      <div className="flex gap-2">
        <button
          onClick={handleDeleteNote}
          className="text-sm font-semibold bg-red-600 py-2 px-4 rounded-md"
        >
          Delete Note
        </button>
        <Link
          href={`/${launchId}/add-note`}
          className="text-sm font-semibold bg-orange-600 py-2 px-4 rounded-md "
        >
          Edit Note
        </Link>
      </div>
    </>
  ) : (
    <Link
      href={`/${launchId}/add-note`}
      className="text-sm font-semibold bg-orange-600 py-2 px-4 rounded-md "
    >
      Add Note
    </Link>
  );
};

export { Note };
