import BtnSmall from "../buttons/btn-small";

const SettingsItem = ({ title, description, onClick }) => {
  return (
    <div className='grid grid-cols-3 items-center md:justify-center'>
      <h3 className='text-xl'>{title}</h3>
      <p>{description}</p>
      <div className='justify-self-end md:justify-self-center'>
        <BtnSmall title={"edit"} onClick={onClick} />
      </div>
    </div>
  );
};

export default SettingsItem;
