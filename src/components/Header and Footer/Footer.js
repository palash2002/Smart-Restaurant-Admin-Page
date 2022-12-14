import React from "react";
import {LocationIcon, PhoneIcon} from "../Icons/Icons";
import './Footer.css'

export default function Footer() {
    return (
        <div className="footer">
            <h1 className="restaurant-name">De la Cuisine</h1>
            <div className="location">
                {LocationIcon}
                <div className="address">Gregorian Dale, Maradu, Ernakulam, Kerala</div>
            </div>
            <div className="phone">
                {PhoneIcon}
                <div className="phone-number">0484 645 0100</div>
            </div>
        </div>
    );
}