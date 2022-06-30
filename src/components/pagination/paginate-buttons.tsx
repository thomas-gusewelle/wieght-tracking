import { useState, useEffect } from "react";
import {
  BiChevronsLeft,
  BiChevronsRight,
  BiChevronLeft,
  BiChevronRight,
} from "react-icons/bi";
import PaginateData from "../../interfaces/paginate-data";
import paginate from "../../services/paginate";
import NumbersRow from "./numbers-row";

const PaginateButtons = ({ paginateList, page, setPage }) => {
  const iconSize = 25;
  const [pageRow, setPagerow] = useState(1);

  const [pagiantePageList, setPagiantePageList] = useState<PaginateData>({
    page: 1,
    per_page: 1,
    prev_page: null,
    next_page: null,
    total: 1,
    total_pages: 1,
    data: [1],
  });

  useEffect(() => {
    let pageNums = [];
    for (let i = 1; i <= paginateList.total_pages; i++) {
      pageNums.push(i);
    }

    const handlePagination = () => {
      let _paginate = paginate(pageNums, pageRow, 5);
      setPagiantePageList(_paginate);
    };
    handlePagination();
  }, [pageRow, paginateList.total_pages]);

  const handleSingleForward = () => {
    if (page == paginateList.total_pages) return;
    setPage(page + 1);
  };

  const handleSingleBack = () => {
    if (page == 1) return;
    setPage(page - 1);
  };

  useEffect(() => {
    let firstPageInRow = pagiantePageList.data[0];
    let lastElement = pagiantePageList.data.slice(-1);
    let lastPageInRow = lastElement[0];
    if (page > lastPageInRow) {
      setPagerow(pageRow + 1);
    }
    if (page < firstPageInRow && pageRow != 1) {
      setPagerow(pageRow - 1);
    }
  }, [page, pageRow, pagiantePageList.data]);

  const handleDoubleBack = () => {
    if (pageRow == 1) return;
    setPagerow(pageRow - 1);
  };

  const handleDoubleForward = () => {
    if (pageRow == pagiantePageList.total_pages) return;
    setPagerow(pageRow + 1);
  };

  if (pagiantePageList.total > 1) {
    return (
      <div className='flex items-center justify-center text-white mx-auto w-max'>
        {pagiantePageList.total_pages > 1 && (
          <BiChevronsLeft
            size={iconSize}
            onClick={handleDoubleBack}
            className='hover:text-green-500 cursor-pointer'
          />
        )}

        <BiChevronLeft
          className='hover:text-green-500 cursor-pointer'
          size={iconSize}
          onClick={handleSingleBack}
        />
        <NumbersRow
          paginateList={paginateList}
          pagiantePageList={pagiantePageList}
          page={page}
          setPage={setPage}
          pageRow={pageRow}
          setPageRow={setPagerow}
        />
        <BiChevronRight
          className='hover:text-green-500 cursor-pointer'
          size={iconSize}
          onClick={handleSingleForward}
        />
        {pagiantePageList.total_pages > 1 && (
          <BiChevronsRight
            className='hover:text-green-500 cursor-pointer'
            size={iconSize}
            onClick={handleDoubleForward}
          />
        )}
      </div>
    );
  }
};

export default PaginateButtons;
