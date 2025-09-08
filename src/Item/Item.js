// src/components/Header.js
import React from "react";
import './Item.css';
import { useNavigate } from "react-router-dom";
function Item( {id, image, title, chapter, views, chapter_api_data} ) {
    const navigate = useNavigate();
   
    return (
        <div key={id} className="item-card" onClick={() => navigate("/Chapter", { state: { chapter_api_data } })}>
            <div className="item-image">
                <img src={image} alt={title} />
            </div>
            <div className="item-info">
                <div className="item-title">{title}</div>
                <div className="item-meta">
                    <span className="chapter">{chapter}</span>
                    <span className="time">{views}</span>
                </div>
            </div>
        </div>
    );
}

export default Item;
