"use client";
import { getNote, saveNote } from "@/lib/note";
import { useRouter } from "next/navigation";
import React from "react";

interface AddNoteFormProps {
  launchId: string;
}

const AddNoteForm = (props: AddNoteFormProps) => {
  const [note, setNote] = React.useState("");
  const router = useRouter();
  const prevNote = getNote(props.launchId);
  function saveToLocalStorage(e: React.FormEvent) {
    e.preventDefault();
    saveNote(props.launchId, note);
    router.replace("/");
  }
  return (
    <form className="flex flex-col gap-5" onSubmit={saveToLocalStorage}>
      <div className="flex flex-col gap-2 w-fit">
        <label htmlFor="note">Note</label>
        <textarea
          id="note"
          name="note"
          defaultValue={prevNote ? prevNote : undefined}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={5}
          cols={41}
          maxLength={150}
          className="text-neutral-900 p-2"
        />
      </div>
      <button
        type="submit"
        className="text-sm font-semibold bg-orange-600 py-2 px-4 rounded-md"
      >
        Save
      </button>
    </form>
  );
};

export { AddNoteForm };
