import Link from "next/link";
import { useEffect, useState } from "react";

const NameSignup = ({
  signUpState,
  signUpStateUp,
  firstName,
  setFirstName,
  lastName,
  setLastName,
}) => {
  const [firstNameError, setFirstNameError] = useState({
    state: false,
    message: "",
  });
  const [lastNameError, setLastNameError] = useState({
    state: false,
    message: "",
  });
  const [isValidating, setIsValidating] = useState(true);

  // error.firstNameErrorMessage = "Please Enter Your First Name";

  const handleNext = (e) => {
    e.preventDefault();
    // setIsValidating(true);

    if (firstName.trim() === "") {
      setFirstNameError({
        state: true,
        message: "Please Enter Your First Name",
      });
    } else {
      setFirstNameError({ state: false });
    }

    if (lastName.trim() === "") {
      setLastNameError({ state: true, message: "Please Enter Your Last Name" });
    } else {
      setLastNameError({ state: false });
    }
    setIsValidating(false);
  };

  useEffect(() => {
    if (!firstNameError.state && !lastNameError.state && !isValidating) {
      signUpStateUp();
    }
  }, [firstNameError, lastNameError, isValidating]);

  return (
    <>
      <div className='flex items-center justify-center bg-stone-800'>
        <div className='max-w-lg w-full'>
          <h1 className='text-3xl font-semibold text-center text-white'>
            Create your account
          </h1>

          <div className='flex flex-col'>
            <form className='flex flex-col p-6'>
              <label htmlFor='firstName' className='text-gray-200'>
                First Name
              </label>
              <input
                className={`py-2 px-4 rounded-md focus:outline-none focus:ring-2 ${
                  firstNameError.state && "border-red-500 border-2"
                }`}
                type='text'
                id='firstName'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <span className='text-red-500'>
                {firstNameError.state && firstNameError.message}
              </span>

              <label htmlFor='lastName' className='mt-6 text-gray-200'>
                Last Name
              </label>
              <input
                className={`py-2 px-4 rounded-md focus:outline-none focus:ring-2 ${
                  lastNameError.state && "border-red-500 border-2"
                }`}
                type='text'
                id='lastName'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <span className='text-red-500'>
                {lastNameError.state && lastNameError.message}
              </span>

              <div className='grid'>
                <button
                  className='mt-10 text-lg text-white font-semibold bg-green-500 py-3 px-6 rounded-md focus:outline-none focus:ring-2 hover:bg-green-600'
                  // type="button"
                  onClick={handleNext}>
                  Next
                </button>
              </div>
            </form>

            <p className='mt-2 text-center text-white'>
              Already have an account?
              <Link href='/signin'>
                <span className='ml-1 cursor-pointer underline decoration-solid hover:text-green-500'>
                  Log in
                </span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default NameSignup;
