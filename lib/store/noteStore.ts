// lib/store/noteStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Tag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";

export type NoteDraft = {
  title: string;
  content: string;
  tag: Tag;
};

export const initialDraft: NoteDraft = {
  title: "",
  content: "",
  tag: "Todo",
};

type NoteStore = {
  draft: NoteDraft;
  setDraft: (note: Partial<NoteDraft>) => void;
  clearDraft: () => void;
};

export const useNoteStore = create<NoteStore>()(
  persist(
    (set) => ({
      draft: initialDraft,

      setDraft: (note) =>
        set((state) => ({
          draft: { ...state.draft, ...note },
        })),

      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: "note-draft", // ключ у localStorage
      partialize: (state) => ({ draft: state.draft }), // зберігаємо лише draft
    }
  )
);
