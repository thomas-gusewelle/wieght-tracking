import { CircularProgress } from "@mui/material"

const LoadingScreen = () => {
    return (
        <div className="wrapper flex justify-center items-center text-green-500">
        <CircularProgress
            color="inherit"
        />

        </div>
    )
}

export default LoadingScreen