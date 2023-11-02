import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { cn } from "../lib/utils";
import { usePagination, DOTS } from "../hooks/usePagination";

interface PaginationProps {
  currentPage: number;
  totalCount: number;
  siblingCount?: number;
  pageCount: number;
  pageSize: number;
}

export const Pagination = ({
  currentPage,
  siblingCount = 1,
  totalCount,
  pageCount,
  pageSize,
}: PaginationProps) => {
  const [searchParams] = useSearchParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  /* Optional: Provide a prop to pass a custom handlePageChange function*/
  const handlePageChange = (pageNumber: number) => {
    if (searchParams.get("page") === pageNumber.toString()) return;

    searchParams.set("page", pageNumber.toString());
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  const prevPage = () => {
    let prevPage = currentPage - 1;
    if (prevPage < 1) return;
    handlePageChange(prevPage);
  };

  const nextPage = () => {
    let nextPage = currentPage + 1;
    if (nextPage > pageCount) return;
    handlePageChange(nextPage);
  };

  if (pageCount < 2) return null;

  return (
    <div className="mt-16 flex justify-end">
      <div className="join">
        <button className="btn btn-xs sm:btn-md join-item" onClick={prevPage}>
          Prev
        </button>
        {paginationRange?.map((pageNumber, i) => {
          if (pageNumber === DOTS) {
            return (
              <button
                key={`${pageNumber}-${i}`}
                className="btn btn-xs sm:btn-md border-none join-item"
              >
                &#8230;
              </button>
            );
          }
          return (
            <button
              key={pageNumber}
              className={cn(
                "btn btn-xs sm:btn-md border-none join-item",
                pageNumber === currentPage && "bg-base-300 border-base-300"
              )}
              onClick={() => handlePageChange(pageNumber as number)}
            >
              {pageNumber}
            </button>
          );
        })}
        <button className="btn btn-xs sm:btn-md join-item" onClick={nextPage}>
          Next
        </button>
      </div>
    </div>
  );
};
