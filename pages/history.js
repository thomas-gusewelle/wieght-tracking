import { useRouter } from "next/router";
import { useState, useContext, useEffect } from "react";

import { WeightContext } from "../src/providers/weight-context";
import paginate from "../src/services/paginate";

import WeightHistory from "../src/components/dashboard/weight-history";
import { CircularProgress } from "@mui/material";
import PaginateButtons from "../src/components/pagination/paginate-buttons";

const History = () => {
  const router = useRouter();
  const weightContext = useContext(WeightContext);

  const [paginateList, setPaginateList] = useState({});
  const [page, setPage] = useState(1);

  useEffect(() => {
    const handlePagination = () => {
      let paginateList = paginate(weightContext.reversedUserData, page, 15);

      setPaginateList(paginateList);
    };
    handlePagination();
  }, [weightContext.reversedUserData, page]);

  return (
    <div className='wrapper'>
      {weightContext.isLoading ? (
        <div className='wrapper flex justify-center items-center text-green-500'>
          <CircularProgress color='inherit' />
        </div>
      ) : (
        <>
          <WeightHistory
            data={paginateList.data}
            getUserWeights={weightContext.getUserWeights}
            setIsLoading={weightContext.setIsLoading}
          />
          <div className='mt-6 mx-auto'>
            <PaginateButtons
              paginateList={paginateList}
              page={page}
              setPage={setPage}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default History;
