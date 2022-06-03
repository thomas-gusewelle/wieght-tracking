import { useEffect, useState } from "react";
import PaginateData from "../../interfaces/paginate-data";
import paginate from "../../services/paginate";

const NumbersRow = ({
  paginateList,
  pagiantePageList,
  page,
  setPage,
  pageRow,
  setPageRow,
}) => {
  useEffect(() => {}, []);

  if (pagiantePageList != undefined) {
    return (
      <div className='grid grid-flow-col gap-4 mx-4'>
        {pagiantePageList.data.map((data) => {
          return (
            <div
              key={data}
              onClick={() => setPage(data)}
              className={`${
                paginateList.page === data && "text-green-500"
              } flex justify-center items-center cursor-pointer hover:text-green-500`}>
              {data}
            </div>
          );
        })}
      </div>
    );
  }
};

export default NumbersRow;
