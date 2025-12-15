// components/ModalNote/ModalNote.tsx
"use client";

import type { ReactNode } from "react";
import css from "./ModalNote.module.css";

type Props = {
  children: ReactNode;
};

const ModalNote = ({ children }: Props) => {
  return (
    <div className={css.backdrop}>
      <div className={css.modal}>
        {children}
      </div>
    </div>
  );
};

export default ModalNote;

