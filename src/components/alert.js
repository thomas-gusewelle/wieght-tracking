import { AnimatePresence, motion } from "framer-motion";

const Alert = ({ children, setShowAlert, showAlert }) => {
  // setTimeout(() => {
  //   setShowAlert(false);
  // }, 3500);

  return (
    <motion.div
      className='absolute mt-2 mx-2 left-0 sm:left-1/2 sm:-translate-x-1/2 bg-red-500 rounded-xl tranpare p-4 max-w-max sm:mx-96 text-white'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}>
      {children}
    </motion.div>
  );
};

export default Alert;
