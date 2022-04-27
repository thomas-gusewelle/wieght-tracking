import {AnimatePresence, motion} from "framer-motion"

const Alert = ({ children, setShowAlert, showAlert }) => {

    setTimeout(() => {
        setShowAlert(false);
    }, 3000);

    return (
            <motion.div 
                 className="absolute mt-2 translate-x-1/2 bg-red-500 rounded-xl tranpare p-4 max-w-max mx-auto text-white"
                initial={{opacity: 0}}
                animate={{ opacity:1}}
                exit={{opacity: 0}}
                transition={
                        {
                            duration: .3,
                            ease: "easeInOut"
                        }
                    }
                >
                    {children}
            </motion.div>

    )
}

export default Alert