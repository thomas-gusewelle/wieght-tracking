const DeleteItemConfirmaton = ({ onClose, setDeleteItem }) => {
  return (
    <div className='text-white'>
      <h1 className='text-3xl text-center'>
        Are you sure you want to delete this?
      </h1>
      <div className='grid grid-cols-2 mt-6 gap-4'>
        <button className='bg-stone-500 px-2 py-4 rounded-xl' onClick={onClose}>
          Cancel
        </button>
        <button
          className='bg-red-500 px-2 py-4 rounded-xl'
          onClick={() => setDeleteItem(true)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteItemConfirmaton;
