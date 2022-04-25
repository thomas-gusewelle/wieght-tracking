const Alert = ({ children, setShowAlert }) => {

    setTimeout(() => {
        setShowAlert(false);
    }, 3000);

    return (
        <div className="bg-red-500 p-4 max-w-max mx-auto text-white">
            {children}
        </div>
    )
}

export default Alert