import React from 'react';
import PropTypes from 'prop-types';

const RangeSlider = ({ min = 0, max = 200, value = 0, onChange,disabled=false }) => {
    return (
            <label className="flex text-sm font-medium text-gray-900 items-center gap-2">{value}
                <input
                    type="range"
                    min={min}
                    disabled={disabled}
                    max={max}
                    value={value}
                    onChange={onChange}
                    className="-order-1 block w-full outline-0 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500"
                />
            </label>

    );
};

RangeSlider.propTypes = {
    min: PropTypes.number,
    max: PropTypes.number,
    value: PropTypes.number,
    onChange: PropTypes.func,
    disabled:PropTypes.bool
};

export default RangeSlider;
