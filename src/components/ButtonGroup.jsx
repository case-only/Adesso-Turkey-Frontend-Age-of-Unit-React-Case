import React from 'react';
import PropTypes from 'prop-types';

const ButtonGroup = ({ datas, onSelectionChange ,active}) => {

  const handleButtonClick = (key) => {
    onSelectionChange(key);
  };

  return (
    <div className="flex space-x-2">
      {datas.map((button) => (
        <button
          key={button.key}
          onClick={() => handleButtonClick(button.key)}
          className={`px-4 py-2 rounded h-8 flex items-center ${
              active === button.key ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
          }`}
        >
          {button.value}
        </button>
      ))}
    </div>
  );
};
ButtonGroup.propTypes = {
  datas: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string,
        value: PropTypes.string
      })
  ),
  onSelectionChange: PropTypes.func,
  active: PropTypes.any
};

export default ButtonGroup;
