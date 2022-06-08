import { useContext, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import BtnModalCancel from "../src/components/buttons/btnModalCancel";
import EmailUpdateForm from "../src/components/forms/emailUpdateForm";
import NameForm from "../src/components/forms/name-form";
import Modal from "../src/components/modal";

import SettingsItem from "../src/components/profile/settings-item";
import SettingsSection from "../src/components/profile/settings-section";
import { WeightContext } from "../src/providers/weight-context";

const Profile = () => {
  const weightContext = useContext(WeightContext);
  const [nameEdit, setNameEdit] = useState(false);
  const [emailEdit, setEmailEdit] = useState(true);

  if (!weightContext.isLoading) {
    return (
      <>
        {/* Name Edit Modal */}
        <Modal open={nameEdit} onClose={() => setNameEdit(false)}>
          <NameForm onClose={() => setNameEdit(false)} />
          <BtnModalCancel onClose={() => setNameEdit(false)} />
        </Modal>

        {/* Email Edit Modal */}
        <Modal open={emailEdit} onClose={() => setEmailEdit(false)}>
          <EmailUpdateForm onClose={() => setEmailEdit(false)} />
          <BtnModalCancel onClose={() => setEmailEdit(false)} />
        </Modal>

        <div className='wrapper container mx-auto'>
          <SettingsSection title={"Account Settings"}>
            {/* Name Edit Line */}
            <SettingsItem
              title={"Name"}
              description={
                weightContext.profile.first_name +
                " " +
                weightContext.profile.last_name
              }
              onClick={() => setNameEdit(true)}
            />
            {/* Email line */}
            <SettingsItem
              title={"Email"}
              description={""}
              onClick={() => setEmailEdit(true)}
            />
          </SettingsSection>
        </div>
      </>
    );
  }
};

export default Profile;
