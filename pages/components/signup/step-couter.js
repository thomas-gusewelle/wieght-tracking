const StepCounter = ({ signUpState }) => {
    return (
    
        <div className="flex items-center justify-center w-96 h-24 mx-auto mb-4">
            <div className= {`flex justify-center items-center rounded-full h-12 w-12 ${signUpState === 1 ? 'bg-green-500 text-white' : 'bg-white text-stone-800'}`}>
                <span>1</span>
            </div>
            <div className="mx-2 h-1 w-12 bg-white"></div>
            <div className={`flex justify-center items-center rounded-full h-12 w-12 ${signUpState === 2 ? 'bg-green-500 text-white' : 'bg-white text-stone-800'}`}>
                <span>2</span>
            </div>
            <div className="mx-2 h-1 w-12 bg-white"></div>
            <div className={`flex justify-center items-center rounded-full h-12 w-12 ${signUpState === 3 ? 'bg-green-500 text-white' : 'bg-white text-stone-800'}`}>
                <span>3</span>
            </div>
        </div>
    
    )
}

export default StepCounter