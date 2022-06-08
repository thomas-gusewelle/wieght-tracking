const FormEmailItem = ({ labelTitle, error, id, getter, setter }) => {
  return (
    <>
      <label className='text-gray-200 mt-1'>{labelTitle}</label>
      <input
        className={`py-2 px-4 rounded-md focus:outline-none focus:ring-2 w-72 ${
          error.state && "border-red-500 border-2"
        }`}
        type='text'
        id={id}
        value={getter}
        onChange={(e) => setter(e.target.value)}
      />
      <span className='text-red-500'>{error.state && error.message}</span>
    </>
  );
};

export default FormEmailItem;
