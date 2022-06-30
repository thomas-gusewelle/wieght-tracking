import BtnConfirm from "../buttons/btnConfirm";
import BtnGrey from "../buttons/btnGrey";

export const YesNoForm = ({ onConfirm, onDecline, message, btnText }) => {
  return (
    <>
      <p className='text-white text-center'>{message}</p>
      <div className='grid grid-cols-2 gap-2'>
        <BtnConfirm onConfirm={onConfirm} text={btnText} />
        <BtnGrey onClick={onDecline} text={"No"} />
      </div>
    </>
  );
};
