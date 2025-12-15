import axios from "axios";
import type { Note } from "../types/note";

// Відповідь бекенда для списку нотаток (з пагінацією)
export interface NotesResponse {
  notes: Note[];
  page: number;
  perPage: number;
  totalPages: number;
}

export type Category = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

// Дані, які ми відправляємо при створенні нотатки без id, createAt, updatedAt
export type CreateNotePayload = Omit<Note, "id" | "createdAt" | "updatedAt">;

// 1. Отримати список нотаток (пошук + пагінація)

export const fetchNotes = async (
  searchPost: string,
  page: number,
  perPage: number = 12,
  tag?: string               // ⬅️ було categoryId, міняємо на tag
): Promise<NotesResponse> => {
  const res = await axios.get<NotesResponse>(
    "https://notehub-public.goit.study/api/notes",
    {
      params: {
        search: searchPost,
        page,
        perPage,
        tag,                 // ⬅️ тут теж міняємо ключ запиту
      },
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
      },
    }
  );

  return res.data;
};

// 2. Створити нотатку

export const createNote = async (
  noteData: CreateNotePayload
): Promise<Note> => {
  const res = await axios.post<Note>(
    "https://notehub-public.goit.study/api/notes",
    noteData,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
      },
    }
  );

  return res.data;
};

// 3. Видалити нотатку
export const deleteNote = async (id: string): Promise<Note> => {
  const res = await axios.delete<Note>(
    `https://notehub-public.goit.study/api/notes/${id}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
      },
    }
  );

  return res.data; // повертаємо видалену Note
};


export const fetchNoteById = async (id: string): Promise<Note> => {
  const res = await axios.get<Note>(
    `https://notehub-public.goit.study/api/notes/${id}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
      },
    }
  );

  return res.data;
};


export const getCategories = async () => {
  const res = await axios<Category[]>('https://notehub-public.goit.study/api/notes/categories');
  return res.data;
};

