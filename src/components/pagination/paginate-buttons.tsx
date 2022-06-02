import {
  BiChevronsLeft,
  BiChevronsRight,
  BiChevronLeft,
  BiChevronRight,
} from "react-icons/bi";
import NumbersRow from "./numbers-row";

const PaginateButtons = ({ paginateList, page, setPage }) => {
  const iconSize = 25;

  return (
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
