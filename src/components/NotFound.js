import React from 'react'
import "../styles/NotFound.styles.scss";

export default function NotFound() {
    return (
        <div className="not-found-wrapper">
            <img src={`${process.env.PUBLIC_URL}/assets/beerBottle.png`} alt="beer bottle upside down"/>
            <h1>Sorry, Page Not Found :(</h1>
        </div>
    )
}
