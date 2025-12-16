"use server";

import { createNote } from "@/lib/api";

type ActionState = {
  error?: string;
};

type Tag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";

export async function createNoteAction(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const title = String(formData.get("title") ?? "").trim();
  const content = String(formData.get("content") ?? "");
  const tag = String(formData.get("tag") ?? "Todo") as Tag;

  if (!title) return { error: "Title is required" };
  if (title.length < 3) return { error: "Title must be at least 3 characters" };
  if (title.length > 50) return { error: "Title must be at most 50 characters" };
  if (content.length > 500) return { error: "Content must be at most 500 characters" };

  await createNote({ title, content, tag });

  return {};
}
