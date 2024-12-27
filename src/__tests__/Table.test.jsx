import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import Table from '../components/Table.jsx';

describe('Table', () => {
    const headers = ['Name', 'Age'];
    const data = [
        {Name: 'John Doe', Age: 30},
        {Name: 'Jane Doe', Age: 25},
    ];

    it('should render headers correctly', () => {
        render(<Table headers={headers} data={data}/>);

        headers.forEach((header) => {
            expect(screen.getByText(header)).toBeInTheDocument();
        });
    });

    it('should render data rows correctly', () => {
        render(<Table headers={headers} data={data}/>);

        data.forEach((row) => {
            Object.values(row).forEach((value) => {
                expect(screen.getByText(value.toString())).toBeInTheDocument();
            });
        });
    });

    it('should handle row clicks correctly', () => {
        const handleClick = jest.fn();
        render(<Table headers={headers} data={data} onClick={handleClick}/>);

        const firstRow = screen.getAllByRole('row')[1];
        fireEvent.click(firstRow);

        expect(handleClick).toHaveBeenCalledTimes(1);
        expect(handleClick).toHaveBeenCalledWith(data[0], 0);
    });

    it('should render empty cell with "-" when no data for header', () => {
        const newHeaders = ['Name', 'Age', 'Country'];
        const newData = [
            {Name: 'John Doe', Age: 30},
        ];

        render(<Table headers={newHeaders} data={newData}/>);

        expect(screen.getByText('-')).toBeInTheDocument();
    });
});
