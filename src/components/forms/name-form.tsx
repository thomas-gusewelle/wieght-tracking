import { useState, useContext } from "react";
import { WeightContext } from "../../providers/weight-context";
import { WeightContextStruct } from "../../interfaces/weightContext";

const NameForm = () => {
  const weightContext = useContext<WeightContextStruct>(WeightContext);
  console.log(weightContext.profile.first_name);
  //   const [firstName, setFirstName] = useState(weightContext.profile.first_name)

  return (
    <div>
      {weightContext.profile.first_name}
      <form></form>
    </div>
  );
};

export default NameForm;
