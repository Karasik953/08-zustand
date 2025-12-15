import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const handlePageChange = (e: { selected: number }) => {
    onPageChange(e.selected + 1); // selected починається з 0
  };

  if (totalPages <= 1) return null; 

  return (
    <ReactPaginate
      pageCount={totalPages}
      onPageChange={handlePageChange}
      forcePage={currentPage - 1}
      previousLabel="<"
      nextLabel=">"
      breakLabel="..."
      containerClassName={css.pagination}
      pageClassName={css.page}
      pageLinkClassName={css.pageLink}
      activeClassName={css.active}
      previousClassName={css.prev}
      nextClassName={css.next}
      breakClassName={css.break}
    />
  );
}
