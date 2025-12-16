import type { Metadata } from "next";
import css from "./CreateNote.module.css";
import NoteForm from "@/components/NoteForm/NoteForm";

const url = "https://notehub.com/notes/action/create";

export const metadata: Metadata = {
  title: "Create note — NoteHub",
  description: "Create a new note in NoteHub.",

  alternates: {
    canonical: url, // ✅ це “url” для сторінки (канонічний)
  },

  openGraph: {
    title: "Create note — NoteHub",
    description: "Create a new note in NoteHub.",
    url,
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 600,
        alt: "NoteHub",
      },
    ],
    type: "website",
  },
};

export default function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}
