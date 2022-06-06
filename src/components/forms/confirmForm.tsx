import BtnConfirm from "../buttons/btnConfirm";
import BtnModalSubmit from "../buttons/btnModalSubmit";

const ConfirmForm = ({ onConfirm, message, btnText }) => {
  return (
    <>
      <p className='text-white text-center'>{message}</p>
      <BtnConfirm onConfirm={onConfirm} text={btnText} />
    </>
  );
};

export default ConfirmForm;
