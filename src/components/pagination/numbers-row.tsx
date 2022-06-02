import { useEffect, useState } from "react";

const NumbersRow = ({ paginateList, page, setPage }) => {
  const [pageNums, setPageNums] = useState([]);
  const [rowIndex, setRowIndex] = useState(1);

  useEffect(() => {
    let pageNumTemp = [];
    let pageRows = [];
    let i = 1;
    let pageTemp = 5;
    let rowNum = Math.ceil(paginateList.total_pages / 5);

    // this takes in a row which is 5 pages of weights. I then creates a new list with the rows and pages associated with each row. The if statements at the end are there to find of the end of the pages and ensure that no more page numbers are added to the pageRows array than exist.

    // data structure for pageRows
    //[
    //   {row: 1
    //   pages:
    //   }
    // ]
    for (var row = 1; row <= rowNum; row++) {
      for (i; i <= pageTemp; i++) {
        pageNumTemp.push(i);
      }
      pageRows.push({
        row: row,
        pages: pageNumTemp,
      });
      pageNumTemp = [];
      if (row == rowNum - 1) {
        let pagesLeft = paginateList.total_pages - row * 5;
        pageTemp = pageTemp + pagesLeft;
      }
      if (row != rowNum - 1) {
        pageTemp = pageTemp + 5;
      }
    }
    console.log(pageRows);
    setPageNums(pageRows);
  }, [paginateList.total, paginateList.total_pages]);

  return (
    <div className='grid grid-flow-col gap-4 mx-2 '>
      {pageNums[0].pages.map((page) => {
        return (
          <div
            key={page}
            className={`${
              paginateList.page === page && "text-green-500"
            } flex justify-center items-center cursor-pointer hover:text-green-500`}
            onClick={() => setPage(page)}>
            {page}
          </div>
        );
      })}
    </div>
  );
};

export default NumbersRow;
