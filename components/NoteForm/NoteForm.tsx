// src/components/NoteForm/NoteForm.tsx
"use client";

import css from "./NoteForm.module.css";
import { createNote } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useNoteStore } from "@/lib/store/noteStore";
import type { Tag } from "@/lib/store/noteStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";

interface NoteFormProps {
  onClose?: () => void;
}

export default function NoteForm({ onClose }: NoteFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { draft, setDraft, clearDraft } = useNoteStore();

  const createNoteMutation = useMutation({
    mutationFn: createNote,
    onSuccess: async () => {
      // ✅ після успішного створення — оновлюємо кеш списку нотаток
      await queryClient.invalidateQueries({ queryKey: ["notes"] });

      // ✅ тільки після успіху чистимо draft
      clearDraft();

      // ✅ навігація назад + закриття модалки (якщо є)
      router.back();
      onClose?.();
    },
  });

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    // беремо актуальний глобальний draft (він і так оновлюється onChange)
    const payload = {
      title: draft.title.trim(),
      content: draft.content.trim(),
      tag: draft.tag as Tag,
    };

    // за потреби — можна додати мінімальну валідацію
    // якщо у вас вона не потрібна — видаляй цей блок
    if (!payload.title || !payload.content) return;

    createNoteMutation.mutate(payload);
  };

  const handleCancel = (): void => {
    // ❌ draft НЕ очищаємо
    router.back();
    onClose?.();
  };

  const isPending = createNoteMutation.isPending;

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
