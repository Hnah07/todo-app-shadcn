import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setCurrentPage, setItemsPerPage } from "@/store/filterSlice";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

interface PaginationProps {
  totalItems: number;
}

const Pagination = ({ totalItems }: PaginationProps) => {
  const dispatch = useDispatch();
  const { currentPage, itemsPerPage } = useSelector(
    (state: RootState) => state.filters,
  );

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      dispatch(setCurrentPage(page));
    }
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-col items-center gap-4 text-sm sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center justify-center gap-2 sm:justify-start">
        <span className="hidden sm:inline">Show:</span>
        <Select
          value={itemsPerPage.toString()}
          onValueChange={(value) => dispatch(setItemsPerPage(Number(value)))}
        >
          <SelectTrigger className="h-8 w-[120px] text-sm sm:w-[130px]">
            <SelectValue placeholder="Per page" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5" className="text-sm">
              5 per page
            </SelectItem>
            <SelectItem value="10" className="text-sm">
              10 per page
            </SelectItem>
            <SelectItem value="15" className="text-sm">
              15 per page
            </SelectItem>
            <SelectItem value="20" className="text-sm">
              20 per page
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center justify-center gap-1 sm:gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
          className="h-8 w-8 p-0 sm:h-9 sm:w-auto sm:px-3"
        >
          <ChevronsLeft className="h-4 w-4 sm:hidden" />
          <span className="hidden sm:inline">First</span>
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="h-8 w-8 p-0 sm:h-9 sm:w-auto sm:px-3"
        >
          <ChevronLeft className="h-4 w-4 sm:hidden" />
          <span className="hidden sm:inline">Previous</span>
        </Button>
        <div className="flex items-center px-1 sm:px-2">
          <span className="text-sm whitespace-nowrap">
            Page {currentPage} of {totalPages}
          </span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="h-8 w-8 p-0 sm:h-9 sm:w-auto sm:px-3"
        >
          <ChevronRight className="h-4 w-4 sm:hidden" />
          <span className="hidden sm:inline">Next</span>
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="h-8 w-8 p-0 sm:h-9 sm:w-auto sm:px-3"
        >
          <ChevronsRight className="h-4 w-4 sm:hidden" />
          <span className="hidden sm:inline">Last</span>
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
