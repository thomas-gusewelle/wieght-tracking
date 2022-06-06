const BtnModalCancel = ({ onClose }) => {
  return (
    <button
      onClick={onClose}
      className='w-full mt-4 text-lg text-white font-semibold bg-red-500 py-3 px-6 rounded-md focus:outline-none focus:ring-2'>
      Cancel
    </button>
  );
};

export default BtnModalCancel;
