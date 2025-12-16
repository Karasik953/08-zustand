import type { Metadata } from "next";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";

import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const tagFromUrl = slug?.[0] ?? "all";
  const filterLabel = tagFromUrl === "all" ? "All notes" : `Tag: ${tagFromUrl}`;

  const title = `NoteHub — ${filterLabel}`;
  const description =
    tagFromUrl === "all"
      ? "Browse all notes in NoteHub."
      : `Browse notes filtered by tag "${tagFromUrl}" in NoteHub.`;

  const url =
    tagFromUrl === "all"
      ? "https://notehub.com/notes/filter/all"
      : `https://notehub.com/notes/filter/${encodeURIComponent(tagFromUrl)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
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
}

export default async function NotesByTag({ params }: Props) {
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
}
