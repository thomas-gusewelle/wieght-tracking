const Modal = ({open, onClose, children}) => {
    if(!open) return;
    return (
        
        <>
        <div 
            onClick={onClose}
            className="fixed top-0 left-0 right-0 bottom-0 bg-stone-700/75 ">
        </div>
        <div className="fixed min-w-fit top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-stone-900 p-8 rounded-3xl">

            {children}

        </div>
        </>
        
    )
}

export default Modal