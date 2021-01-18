import React from "react";

export default function SpinnerIcon() {
    return (
        // <?xml version="1.0" encoding="utf-8"?>
        <svg xmlns="http://www.w3.org/2000/svg" style={{margin: "auto", background: "none", display: "block", shapeRendering: "auto"} } width="81px" height="81px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
        <circle cx="50" cy="50" r="42" stroke-width="8" stroke="#0a0a0a" stroke-dasharray="65.97344572538566 65.97344572538566" fill="none" stroke-linecap="round">
        <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="0.9615384615384615s" keyTimes="0;1" values="0 50 50;360 50 50"></animateTransform>
        </circle>
        </svg>
    )
}
