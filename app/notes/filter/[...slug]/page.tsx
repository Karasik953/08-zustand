// app/notes/filter/[...slug]/page.tsx

import { fetchNotes } from "@/lib/api";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import NotesClient from "./Notes.client";

type Props = {
  params: Promise<{ slug: string[] }>;
};

const NotesByTag = async ({ params }: Props) => {
  const { slug } = await params;

  const tagFromUrl = slug[0];
  const tag = tagFromUrl === "all" ? undefined : tagFromUrl;

  const search = "";
  const page = 1;
  const perPage = 12;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", { tag, search, page, perPage }],
    queryFn: () => fetchNotes(search, page, perPage, tag),
  });

  return (
    <div>
      <h1>Notes list</h1>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NotesClient tag={tag} />
      </HydrationBoundary>
    </div>
  );
};

export default NotesByTag;
