import React from 'react';
import PropTypes from 'prop-types';

const Table = ({ headers, data , onClick}) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                <tr >
                    {headers.map((header, index) => (
                        <th
                            key={index}
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            {header}
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {data.map((row, rowIndex) => (
                    <tr className='cursor-pointer' key={rowIndex} onClick={()=>{
                        onClick(row,rowIndex)
                    }}>
                        {headers.map((header, colIndex) => (
                            <td
                                key={colIndex}
                                className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                            >
                                {row[header] || '-'}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

Table.propTypes = {
    headers: PropTypes.arrayOf(PropTypes.string),
    data: PropTypes.arrayOf(PropTypes.object),
    onClick:PropTypes.func
};

export default Table;
