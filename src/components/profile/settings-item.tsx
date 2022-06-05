import BtnSmall from "../buttons/btn-small";

const SettingsItem = () => {
  return (
    <div className='grid grid-cols-3 items-center md:justify-center'>
      <h3>Name</h3>
      <p>Thomas Gusewelle</p>
      <div className='justify-self-end md:justify-self-center'>
        <BtnSmall title={"edit"} />
      </div>
    </div>
  );
};

export default SettingsItem;
