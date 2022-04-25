import Link from "next/link"
import { useState, useEffect } from "react";


const EmailPassword = ({ signUpStateUp, signUpStateDown, email, setEmail, password, setPassword}) => {

    const [emailError, setEmailError] = useState({state: false, message: ""});
    const [passwordError, setPasswordError] = useState({state: false, message: ""});
    const [isValidating, setIsValidating] = useState(true);

    let mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    const handleNext = (e) => {
        e.preventDefault();
        if(!email.match(mailFormat)){
            setEmailError({state: true, message: "Please Enter a Valid Email"})
        } else {
            setEmailError({state: false})
        }
         if (password.length < 6) {
            setPasswordError({state: true, message: "Passwords Require Greater than 6 Characters"})
        } else {
            setPasswordError({state: false})
        }

        setIsValidating(false);

    }

    useEffect(() => {
        if (!isValidating && !emailError.state && !passwordError.state){
            signUpStateUp()
        }
    }, [isValidating, emailError, passwordError])

    return(
        <div className="flex items-center justify-center bg-stone-800">
        <div className="max-w-lg w-full">
          <h1 className="text-3xl font-semibold text-center text-white">
            Create your account
          </h1>
  
          <div className="flex flex-col">
            <form className="flex flex-col p-6">
            <label htmlFor="email" className=" text-gray-200">
                  Email
                </label>
                <input
                  className={`py-2 px-4 rounded-md focus:outline-none focus:ring-2 ${emailError.state && 'border-red-500 border-2'}`}
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {emailError.state && <span className="text-red-500">{emailError.message}</span>}
    
                <label htmlFor="password" className="mt-6 text-gray-200 ">
                  Password
                </label>
                <input
                  className={`py-2 px-4 rounded-md focus:outline-none focus:ring-2 ${passwordError.state && 'border-red-500 border-2'}`}
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {passwordError.state && <span className="text-red-500">{passwordError.message}</span>}

                <div className="grid grid-cols-2 gap-2">
                    <button
                        className="mt-10 text-lg text-white font-semibold bg-stone-500 py-3 px-6 rounded-md focus:outline-none focus:ring-2 hover:bg-stone-600"
                        // type="button"
                        onClick={signUpStateDown}>
                        Back
                    </button>
                    <button
                        className="mt-10 text-lg text-white font-semibold bg-green-500 py-3 px-6 rounded-md focus:outline-none focus:ring-2 hover:bg-green-600"
                        // type="button"
                        onClick={handleNext}>
                        Next
                    </button>
                </div>

            </form>
            
            <p className='mt-2 text-center text-white'>Already have an account?
                <Link href='/signin'>
                    <span 
                    className='ml-1 cursor-pointer underline decoration-solid hover:text-green-500'>
                    Log in</span>
                </Link>
            </p>
          </div>
        </div>
      </div>
    );
}

export default EmailPassword