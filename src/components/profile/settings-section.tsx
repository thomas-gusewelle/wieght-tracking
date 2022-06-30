import Divider from "../divider";

const SettingsSection = ({ title, children }) => {
  return (
    <div className='text-white py-2'>
      <h2 className='text-2xl'>{title}</h2>
      <Divider />
      {children}
      <Divider />
    </div>
  );
};

export default SettingsSection;
