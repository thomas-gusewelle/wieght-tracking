import { useEffect, useState } from "react";

const NumbersRow = ({ paginateList, page, setPage }) => {
  const [pageNums, setPageNums] = useState([]);

  useEffect(() => {
    let pageNumTemp = [];
    for (var i: any = 1; i <= paginateList.total_pages; i++) {
      pageNumTemp.push(i);
    }
    console.log(pageNumTemp);
    setPageNums(pageNumTemp);
  }, [paginateList.total_pages]);

  return (
    <div className='flex gap-3 mx-2'>
      {pageNums.map((x) => {
        return <div key={x}>{x}</div>;
      })}
    </div>
  );
};

export default NumbersRow;
