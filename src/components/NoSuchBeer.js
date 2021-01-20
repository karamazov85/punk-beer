import React from 'react'
import "../styles/NoSuchBeer.styles.scss";

export default function NoSuchBeer() {
    return (
        <div className="not-found-wrapper">
            <img src={`${process.env.PUBLIC_URL}/assets/beerBottle.png`} alt="beer bottle upside down"/>
            <h1>No such beer :(</h1>
        </div>
    )
}
