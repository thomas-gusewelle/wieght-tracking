import { useState } from "react";
import { supabase } from "../../utils/supabaseClient";

const WeightForm = ({onClose, setPostedToday, getUserWeights}) => {
    const [weight, setWeight] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {data, console} = await supabase.from('weight').insert([{weight: weight, user: supabase.auth.user().id}])
        setPostedToday(true);
        onClose();
        getUserWeights();
    }

    return (
        <div>
                <h3 className="text-center text-white text-3xl mb-4">Log Today's Weight</h3>
                    <form className="flex flex-col" onSubmit={handleSubmit}>
                        <label className="text-gray-200">Weight</label>
                        <input
                        className="mt-1 py-2 px-4 rounded-md focus:outline-none focus:ring-2"
                        type='number' 
                        id="weight"
                        step={.01} 
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        />
                        <button className="mt-6 text-lg text-white font-semibold bg-green-500 py-3 px-6 rounded-md focus:outline-none focus:ring-2"
                            type="submit"> 
                            Sumbit
                        </button>
                        
                    </form>
                    
                </div>
    )
}

export default WeightForm