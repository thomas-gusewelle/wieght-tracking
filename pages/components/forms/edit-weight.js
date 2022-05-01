import { useEffect, useState } from "react";
import { supabase } from "../../../utils/supabaseClient";

const EditWeight = ({onClose, weightObject, getUserWeights, setIsLoading}) => {
    const [weight, setWeight] = useState(0);
    const [weightError, setWeightError] = useState({state: false, message: ""});
    const [isValidating, setIsValidating] = useState(true);

    useEffect(() => {
        setWeight(weightObject.weight);
    },[])

    const handlePreSubmit = async (e)  => {
        e.preventDefault();
        console.log(weight);
        if (weight == 0 || weight === undefined || weight === null){
            setWeightError({state: true, message: "Please Enter Your Weight"});
        } else {
            setWeightError({state: false});
        }
        setIsValidating(false);
       
    }

    const handleSubmit = async () => {
        setIsLoading(true);
        const {data, error} = await supabase
        .from('weight')
        .update({weight: weight})
        .eq('id', weightObject.id)
        console.log(error);
        onClose();  
        getUserWeights();
        setIsLoading(false);
    }

    useEffect( () => {
        if (!weightError.state && !isValidating){
             handleSubmit();
        }
        
    },[weightError, isValidating])

    return (
        <div>
                <h3 className="text-center text-white text-3xl mb-4">{"Update Your Weight"}</h3>
                    <form className="flex flex-col" onSubmit={handlePreSubmit}>
                        <label className="text-gray-200">Weight</label>
                        <input
                        className={`py-2 px-4 rounded-md focus:outline-none focus:ring-2 ${weightError.state && 'border-red-500 border-2'}`}
                        type='number' 
                        id="weight"
                        step={.01} 
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        />
                        <span className="text-red-500">{weightError.state && weightError.message}</span>
                        <button className="mt-6 text-lg text-white font-semibold bg-green-500 py-3 px-6 rounded-md focus:outline-none focus:ring-2"
                            type="submit"> 
                            Sumbit
                        </button>
                        
                        
                    </form>
                    <button
                        onClick={onClose}
                        className="w-full mt-4 text-lg text-white font-semibold bg-red-500 py-3 px-6 rounded-md focus:outline-none focus:ring-2"
                        > Cancel
                    </button>
                </div>
    )
}


export default EditWeight