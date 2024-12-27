import React from "react";
import PropTypes from "prop-types";

const Card = ({title, children}) => {
    return (
        <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">{title}</h5>
            {children}
        </div>
    );
};

Card.propTypes = {
    title: PropTypes.string,
    children: PropTypes.node
};

export default Card;
