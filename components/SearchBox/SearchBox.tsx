import css from "./SearchBox.module.css";
import { useDebouncedCallback } from "use-debounce";
import type React from "react";

interface SearchBoxProps {
  onSearchChange: (value: string) => void;
}

export default function SearchBox({ onSearchChange }: SearchBoxProps) {
  const handleChange = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onSearchChange(event.target.value);
    },
    500 // мс затримки
  );

  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      onChange={handleChange}
    />
  );
}
