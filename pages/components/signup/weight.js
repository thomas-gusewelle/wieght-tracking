import Link from "next/link"
import { useState, useEffect } from "react" 

const Weight = ({handleSubmit, signUpStateDown, currentWeight, setCurrentWeight, targetWeight, setTargetWeight}) => {
    
    const [currentWeightError, setCurrentWeightError] = useState({state: false, message: ""})
    const [targetWeightError, setTargetWeightError] = useState({state: false, message: ""})
    const [isValidating, setIsValidating] = useState(true);

    const handlePreSubmit = (e) => {
        e.preventDefault();
        if(currentWeight <= 0) {
            setCurrentWeightError({state: true, message: "Please Enter Your Current Weight"});
        } else {
            setCurrentWeightError({state: false})
        }
        if (targetWeight <= 0){
            setTargetWeightError({state: true, message: "Please Enter Your Target Weight"});
        } else {
            setTargetWeightError({state: false})
        }
        setIsValidating(false);

    }

    useEffect(()=> {
        if (!isValidating && !currentWeightError.state && !targetWeightError.state) {
            handleSubmit()
        }
    }, [currentWeightError, targetWeightError, isValidating])
    
    return (
        <div className="flex items-center justify-center bg-stone-800">
        <div className="max-w-lg w-full">
          <h1 className="text-3xl font-semibold text-center text-white">
            Create your account
          </h1>
  
          <div className="flex flex-col p-6">
            <form className="flex flex-col">
            <label htmlFor="currentWeight" className="text-gray-200">
                  Current Weight
                </label>
                <input
                  className={`py-2 px-4 rounded-md focus:outline-none focus:ring-2 ${currentWeightError.state && 'border-red-500 border-2'}`}
                  type="number"
                  id="currentWeight"
                  value={currentWeight}
                  onChange={(e) => setCurrentWeight(e.target.value)}
                />
                <span className="text-red-500">{currentWeightError.state && currentWeightError.message}</span>

                <label htmlFor="password" className="mt-6 text-gray-200 ">
                  Target Weight
                </label>
                <input
                  className={`py-2 px-4 rounded-md focus:outline-none focus:ring-2 ${targetWeightError.state && 'border-red-500 border-2'}`}
                  type="number"
                  id="targetWeight"
                  value={targetWeight}
                  onChange={(e) => setTargetWeight(e.target.value)}
                />
                <span className="text-red-500">{targetWeightError.state && targetWeightError.message}</span>

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
                        onClick={handlePreSubmit}>
                        Submit
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
    )
}

export default Weight