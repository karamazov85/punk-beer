import React, { useState } from 'react'
import LoadingSpinner from "../LoadingSpinner";

const useSpinner = () => {
    const [showSpinner, setShowSpinner] = useState(false)
    const showLoadingSpinner = () => setShowSpinner(true);
    const hideLoadingSpinner = () => setShowSpinner(false);
    const spinner = showSpinner ? <LoadingSpinner /> : null
    return [spinner, showLoadingSpinner, hideLoadingSpinner]       
}

export default useSpinner;