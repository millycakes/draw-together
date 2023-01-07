import "./button.css"
import React from "react"
import PropTypes from 'prop-types';

export default function Button({text, variant, onClick, src}){
    return(
        <button className = {`button--${variant}`} onClick = {onClick}>
            {(variant.includes("icon")) && <img src = {src}/>}
            {text}
        </button>
    )
}

Button.propTypes = {
    text: PropTypes.string.isRequired,
    variant: PropTypes.string,
    onClick: PropTypes.func.isRequired
};

Button.defaultProps = {
    variant: "primary"
};