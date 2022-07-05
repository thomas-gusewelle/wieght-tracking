import { useContext, useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import BtnModalCancel from "../src/components/buttons/btnModalCancel";
import EmailUpdateForm from "../src/components/forms/emailUpdateForm";
import NameForm from "../src/components/forms/name-form";
import Modal from "../src/components/modal";

import SettingsItem from "../src/components/profile/settings-item";
import SettingsSection from "../src/components/profile/settings-section";
import { WeightContext } from "../src/providers/weight-context";
import { User } from "@supabase/supabase-js";
import { WeightTypeChange } from "../src/components/forms/weightTypeChange";
import { WeightGoalForm } from "../src/components/forms/weightGoal";
import { userInfo } from "os";
import PasswordEditForm from "../src/components/forms/passwordUpdate";
import { ShowTargetForm } from "../src/components/forms/showTargetForm";

const Settings = () => {
  const weightContext = useContext(WeightContext);
  const [nameEdit, setNameEdit] = useState(false);
  const [emailEdit, setEmailEdit] = useState(false);
  const [passwordEdit, setPasswordEdit] = useState(false);
  const [weightGoal, setWeightGoal] = useState(false);
  const [weightTypeEdit, setWeightTypeEdit] = useState(false);
  const [showTarget, setShowTarget] = useState(false);

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const [email, setEmail] = useState("");

  useEffect(() => {
    const user: User = supabase.auth.user();
    console.log(user);
    setEmail(user.email);
  }, []);

  if (!weightContext.isLoading) {
    return (
      <>
        {/* Name Edit Modal */}
        <Modal open={nameEdit} onClose={() => setNameEdit(false)}>
          <NameForm onClose={() => setNameEdit(false)} />
          <BtnModalCancel onClose={() => setNameEdit(false)} />
        </Modal>

        {/* Email Edit Modal */}
        <Modal
          open={emailEdit}
          onClose={() => setEmailEdit(false)}
          showAlert={showAlert}
          setShowAlert={setShowAlert}
          alertMessage={alertMessage}>
          <EmailUpdateForm
            onClose={() => setEmailEdit(false)}
            setShowAlert={setShowAlert}
            setAlertMessage={setAlertMessage}
          />
          <BtnModalCancel onClose={() => setEmailEdit(false)} />
        </Modal>

        {/* Password Edit Modal */}
        <Modal open={passwordEdit} onClose={() => setPasswordEdit(false)}>
          <PasswordEditForm onClose={() => setPasswordEdit(false)} />
          <BtnModalCancel onClose={() => setPasswordEdit(false)} />
        </Modal>

        {/* Weight Goal Modal */}
        <Modal open={weightGoal} onClose={() => setWeightGoal(false)}>
          <WeightGoalForm onClose={() => setWeightGoal(false)}></WeightGoalForm>
        </Modal>

        {/* Weight Type Modal */}
        <Modal open={weightTypeEdit} onClose={() => setWeightTypeEdit(false)}>
          <WeightTypeChange onClose={() => setWeightTypeEdit(false)} />
          <BtnModalCancel onClose={() => setWeightTypeEdit(false)} />
        </Modal>

        <Modal open={showTarget} onClose={() => setShowTarget(false)}>
          <ShowTargetForm onClose={() => setShowTarget(false)} />
          <BtnModalCancel onClose={() => setShowTarget(false)} />
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
              description={email}
              onClick={() => setEmailEdit(true)}
            />

            {/* Password Line */}
            <SettingsItem
              title={"Password"}
              description={"**********"}
              onClick={() => setPasswordEdit(true)}
            />
          </SettingsSection>
          <SettingsSection title={"Weight Settings"}>
            {/* Weight Goal */}
            <SettingsItem
              title={"Weight Goal"}
              description={weightContext.profile.target_weight}
              onClick={() => setWeightGoal(true)}
            />
            {/* Weight Type Line */}
            <SettingsItem
              title={"Weight Type"}
              description={weightContext.profile.weight_type}
              onClick={() => setWeightTypeEdit(true)}
            />
            {/* Show Target on Graph */}
            <SettingsItem
              title={"Show Target"}
              description={
                weightContext.profile.show_target_weight ? "Yes" : "No"
              }
              onClick={() => setShowTarget(true)}
            />
          </SettingsSection>
        </div>
      </>
    );
  }
};

export default Settings;
