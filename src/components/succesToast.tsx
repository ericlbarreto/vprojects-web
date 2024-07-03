import { ToastContainer } from "react-toastify"

const SuccesToast = () => {
    return (
        <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
    />
    )
}

export default SuccesToast;
