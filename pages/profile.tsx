import { useContext, useState } from "react";
import BtnModalCancel from "../src/components/buttons/btnModalCancel";
import NameForm from "../src/components/forms/name-form";
import Modal from "../src/components/modal";

import SettingsItem from "../src/components/profile/settings-item";
import SettingsSection from "../src/components/profile/settings-section";
import { WeightContext } from "../src/providers/weight-context";

const Profile = () => {
  const weightContext = useContext(WeightContext);
  const [nameEdit, setNameEdit] = useState(true);

  if (!weightContext.isLoading) {
    return (
      <>
        <Modal open={nameEdit} onClose={() => setNameEdit(false)}>
          <NameForm onClose={() => setNameEdit(false)} />
          <BtnModalCancel onClose={() => setNameEdit(false)} />
        </Modal>

        <div className='wrapper container mx-auto'>
          <SettingsSection title={"Account Settings"}>
            <SettingsItem
              title={"Name"}
              description={
                weightContext.profile.first_name +
                " " +
                weightContext.profile.last_name
              }
              onClick={() => setNameEdit(true)}
            />
          </SettingsSection>
        </div>
      </>
    );
  }
};

export default Profile;
