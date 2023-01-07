import {Link} from "react-router-dom"
import React from "react"
import PropTypes from 'prop-types';
import "./logo.css"

export default function Logo({variant}){
    return(
        <Link to = "/" className = {`logo--${variant}`}>DRAW TOGETHER</Link>
    )
}

Logo.propTypes = {
    variant: PropTypes.string
};

Logo.defaultProps = {
    variant: "default"
};