const BtnConfirm = ({ onConfirm, text }) => {
  return (
    <button
      onClick={onConfirm}
      className='mt-6 text-lg w-full text-white font-semibold bg-green-500 py-3 px-6 rounded-md focus:outline-none focus:ring-2'>
      {text}
    </button>
  );
};

export default BtnConfirm;
