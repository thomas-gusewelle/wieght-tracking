import { AnimatePresence, motion } from "framer-motion";

const Alert = ({ children, setShowAlert, showAlert }) => {
  setTimeout(() => {
    setShowAlert(false);
  }, 3500);

  return (
    <AnimatePresence>
      {showAlert && (
        <motion.div
          className='absolute mt-2 mx-auto top-0 left-1/2 -translate-x-1/2 bg-red-500 rounded-xl tranpare p-4 max-w-max text-white'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}>
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Alert;
