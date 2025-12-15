//ітерфейс інформації про нотатку
// src/types/note.ts

export interface Note {
  id: string; // було number
  title: string;
  content: string;
  tag: string;
  createdAt: string;
  updatedAt: string;
}

