"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { fetchNoteById } from "@/lib/api";
import ModalNote from "@/components/ModalNote/ModalNote";

type Props = {
  id: string;
};

const NotePreviewClient = ({ id }: Props) => {
  const router = useRouter();

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false, // 👈 додали це
  });

  if (isLoading) {
    return (
      <ModalNote>
        <p>Loading...</p>
      </ModalNote>
    );
  }

  if (isError || !note) {
    return (
      <ModalNote>
        <p>Failed to load note</p>
        <button onClick={() => router.back()}>Close</button>
      </ModalNote>
    );
  }

  return (
    <ModalNote>
      <button onClick={() => router.back()}>Close</button>
      <h2>{note.title}</h2>
      <p>{note.content}</p>
      <p>
        <strong>Tag:</strong> {note.tag}
      </p>
      <p>
        <small>Created at: {note.createdAt}</small>
      </p>
    </ModalNote>
  );
};

export default NotePreviewClient;
