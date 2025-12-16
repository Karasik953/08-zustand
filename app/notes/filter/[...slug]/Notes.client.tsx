// app/notes/filter/[...slug]/Notes.client.tsx
"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";
import Link from "next/link";

import { fetchNotes } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";

type Props = {
  tag?: string;
};

const PER_PAGE = 12;

export default function NotesClient({ tag }: Props) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // 🔹 DEBOUNCE пошуку
  const debouncedSetSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, 500);

  const handleSearchChange = (value: string) => {
    debouncedSetSearch(value);
  };

  const handlePageChange = (nextPage: number) => {
    setPage(nextPage);
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", { tag, search, page, perPage: PER_PAGE }],
    queryFn: () => fetchNotes(search, page, PER_PAGE, tag),
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError || !data) return <p>Something went wrong...</p>;

  const notes = data.notes;

  return (
    <div>
      {/* 🔹 Лінк на сторінку створення нотатки */}
      <Link href="/notes/action/create">Create note</Link>

      {/* 🔹 Пошук */}
      <SearchBox onSearchChange={handleSearchChange} />

      {/* 🔹 Список + пагінація */}
      {notes.length > 0 ? (
        <>
          <NoteList notes={notes} />
          <Pagination
            currentPage={page}
            totalPages={data.totalPages}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        <p>No notes found</p>
      )}
    </div>
  );
}
