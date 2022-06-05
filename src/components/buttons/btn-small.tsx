const BtnSmall = ({ title }) => {
  return (
    <button className='text-white font-semibold w-min bg-green-500 py-1 px-2 rounded-md focus:outline-none focus:ring-2'>
      {title}
    </button>
  );
};

export default BtnSmall;
