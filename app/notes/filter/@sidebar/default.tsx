// app/notes/filter/@sidebar/default.tsx

import Link from "next/link";
import css from "./SidebarNotes.module.css";


const TAGS = ["Todo", "Work", "Personal", "Meeting", "Shopping"];

const NotesSidebar = async () => {
  return (
    <ul className={css.menuList}>
      <li className={css.menuItem}>
        <Link href="/notes/filter/all" className={css.menuLink}>
          All notes
        </Link>
      </li>

      {TAGS.map((tag) => (
        <li key={tag} className={css.menuItem}>
          <Link
            href={`/notes/filter/${tag}`}
            className={css.menuLink}
          >
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NotesSidebar;
