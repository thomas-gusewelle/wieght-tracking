const Modal = ({open, onClose, children}) => {
    if(!open) return;
    return (
        
        <>
        <div 
        onClick={onClose}
        className="fixed top-0 left-0 right-0 bottom-0 bg-stone-700/75 "></div>
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-stone-900 p-8 rounded-3xl">

            {children}
            <button
                        onClick={onClose}
                            className="mt-4 text-lg text-white font-semibold bg-red-500 py-3 px-6 rounded-md focus:outline-none focus:ring-2"
                            > Cancel
                        </button>
        </div>
        </>
        
    )
}

export default Modal