import {Link} from "react-router-dom"
import React from "react"
import PropTypes from 'prop-types';
import "./logo.css"

export default function Logo({variant}){
    return(
        <h2 to = "/" className = {`logo--${variant}`}>DRAW TOGETHER</h2>
    )
}

Logo.propTypes = {
    variant: PropTypes.string
};

Logo.defaultProps = {
    variant: "default"
};