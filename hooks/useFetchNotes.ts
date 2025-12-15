// src/hooks/useFetchNotes.ts
import { useQuery } from "@tanstack/react-query";
import { fetchNotes, type NotesResponse } from "../lib/api";

export const useFetchNotes = (searchQuery: string, page: number) => {
  return useQuery<NotesResponse>({
    queryKey: ["notes", searchQuery, page],
    queryFn: () => fetchNotes(searchQuery, page),
  });
};
