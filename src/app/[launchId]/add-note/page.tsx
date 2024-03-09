import React from "react";
import { AddNoteForm } from "./_components/add-note-form";
import { Metadata } from "next";

interface Params {
  params: {
    launchId: string;
  };
}

export const metadata: Metadata = {
  title: "Add Note - SpaceX Explorer",
  description: "Add Note - SpaceX Explorer",
};

export default function AddNotePage({ params }: Params) {
  return (
    <main className="flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold">Add Note</h1>
      <AddNoteForm launchId={params.launchId} />
    </main>
  );
}
