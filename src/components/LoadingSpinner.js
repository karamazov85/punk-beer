import React from "react";
import SpinnerIcon from "./SpinnerIcon";
import "../styles/LoadingSpinner.styles.scss";

export default function LoadingSpinner() {
    return (
        <div className="spinner-wrapper">
            <SpinnerIcon />
        </div>
    )
}
