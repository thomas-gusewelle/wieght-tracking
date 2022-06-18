const BtnGrey = ({ onClick, text }) => {
  return (
    <button
      onClick={onClick}
      className='mt-6 text-lg w-full text-white font-semibold bg-stone-500 py-3 px-6 rounded-md focus:outline-none focus:ring-2'>
      {text}
    </button>
  );
};

export default BtnGrey;
