import { useContext } from "react";
import NameForm from "../src/components/forms/name-form";

import SettingsItem from "../src/components/profile/settings-item";
import SettingsSection from "../src/components/profile/settings-section";

const Profile = () => {
  return (
    <div className='wrapper container mx-auto'>
      <SettingsSection title={"Account Settings"}>
        <SettingsItem />
        <NameForm />
      </SettingsSection>
    </div>
  );
};

export default Profile;
