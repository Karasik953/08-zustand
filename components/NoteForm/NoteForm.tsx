"use client";

import React from "react";
import css from "./NoteForm.module.css";
import { createNote } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useNoteStore } from "@/lib/store/noteStore";
import type { Tag } from "@/lib/store/noteStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface NoteFormProps {
  onClose?: () => void;
}

type CreateNotePayload = {
  title: string;
  content: string;
  tag: Tag;
};

export default function NoteForm({ onClose }: NoteFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { draft, setDraft, clearDraft } = useNoteStore();

  const { mutate, isPending } = useMutation({
    mutationFn: (payload: CreateNotePayload) => createNote(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["notes"] });
      clearDraft();
      router.back();
      onClose?.();
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const payload: CreateNotePayload = {
      title: draft.title.trim(),
      content: draft.content.trim(),
      tag: draft.tag,
    };

    if (!payload.title || !payload.content) return;

    mutate(payload);
  };

  const handleCancel = (): void => {
    // ❌ draft НЕ очищаємо
    router.back();
    onClose?.();
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          className={css.input}
          value={draft.title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setDraft({ title: e.target.value })
          }
          disabled={isPending}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={8}
          className={css.textarea}
          value={draft.content}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setDraft({ content: e.target.value })
          }
          disabled={isPending}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          className={css.select}
          value={draft.tag}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setDraft({ tag: e.target.value as Tag })
          }
          disabled={isPending}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        {onClose && (
          <button
            type="button"
            className={css.cancelButton}
            onClick={handleCancel}
            disabled={isPending}
          >
            Cancel
          </button>
        )}

        <button type="submit" className={css.submitButton} disabled={isPending}>
          {isPending ? "Creating..." : "Create note"}
        </button>
      </div>
    </form>
  );
}
