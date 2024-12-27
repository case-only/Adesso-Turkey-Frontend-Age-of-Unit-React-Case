import React from "react";
import PropTypes from "prop-types";
const Checkbox=({label,checked,onChange})=>{
    return(

                <label  className="flex items-center gap-2 text-sm font-medium text-gray-900">
                    {label}
                    <input
                        checked={checked}
                        onChange={onChange}
                        type="checkbox" className="-order-1 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600" />
                </label>

    )
}

Checkbox.propTypes = {
    label: PropTypes.string,
    checked: PropTypes.bool,
    onChange: PropTypes.func,
};
export default Checkbox