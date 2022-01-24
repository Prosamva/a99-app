import React from "react";
import "./PropertyCard.css";

function PropertyCard({id, title, description, pricing, imageUrl, profileUrl}){
    return (
    <div className="property-card">
        <div className="image-div">
        <img className="property-image" src={imageUrl} alt="Property"/>
        </div>
        <div className="card">
            <img className="avatar-image" src={profileUrl} alt="Avatar"/>
            <div className="content">    
                <h4>{title}</h4>
                <p>{description}</p>
                <h5>{pricing}</h5>
            </div>
        </div>
    </div>
    )
}

export default PropertyCard;