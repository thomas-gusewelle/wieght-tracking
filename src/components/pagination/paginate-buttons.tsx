import {
  BiChevronsLeft,
  BiChevronsRight,
  BiChevronLeft,
  BiChevronRight,
} from "react-icons/bi";
import NumbersRow from "./numbers-row";

const PaginateButtons = ({ paginateList, page, setPage }) => {
  const iconSize = 25;
  console.log(paginateList);

  return (
    // <div className='grid grid-cols-2 gap-2 max-w-xs mx-auto'>
    //   {paginateList.prev_page != null && (
    //     <button
    //       className='text-white bg-green-500 px-2 py-1 rounded-xl col-start-1'
    //       onClick={() => setPage(page - 1)}>
    //       Previous
    //     </button>
    //   )}
    //   {paginateList.next_page != null && (
    //     <button
    //       className='text-white bg-green-500 px-2 py-1 rounded-xl col-start-2 '
    //       onClick={() => setPage(page + 1)}>
    //       Next
    //     </button>
    //   )}
    // </div>

    <div className='flex items-center justify-center text-white mx-auto w-max'>
      <BiChevronsLeft
        className='hover:text-green-500 cursor-pointer'
        size={iconSize}
      />
      <BiChevronLeft
        className='hover:text-green-500 cursor-pointer'
        size={iconSize}
      />
      <NumbersRow paginateList={paginateList} page={page} setPage={setPage} />
      <BiChevronRight
        className='hover:text-green-500 cursor-pointer'
        size={iconSize}
      />
      <BiChevronsRight
        className='hover:text-green-500 cursor-pointer'
        size={iconSize}
      />
    </div>
  );
};

export default PaginateButtons;
