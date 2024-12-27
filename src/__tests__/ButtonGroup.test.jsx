import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ButtonGroup from '../components/ButtonGroup.jsx';

describe('ButtonGroup Component', () => {
    const mockOnSelectionChange = jest.fn();

    const setup = (props) => {
        render(<ButtonGroup {...props} />);
    };

    it('renders buttons based on datas prop', () => {
        const datas = [
            { key: '1', value: 'Button 1' },
            { key: '2', value: 'Button 2' }
        ];

        setup({ datas, onSelectionChange: mockOnSelectionChange, active: '1' });

        expect(screen.getByText('Button 1')).toBeInTheDocument();
        expect(screen.getByText('Button 2')).toBeInTheDocument();
    });

    it('renders active button with correct style', () => {
        const datas = [
            { key: '1', value: 'Button 1' },
            { key: '2', value: 'Button 2' }
        ];

        setup({ datas, onSelectionChange: mockOnSelectionChange, active: '1' });

        const activeButton = screen.getByText('Button 1');
        expect(activeButton).toHaveClass('bg-blue-500');
        expect(activeButton).toHaveClass('text-white');

        const inactiveButton = screen.getByText('Button 2');
        expect(inactiveButton).toHaveClass('bg-gray-200');
        expect(inactiveButton).toHaveClass('text-black');
    });

    test('calls onSelectionChange with correct key when button is clicked', () => {
        const datas = [
            { key: '1', value: 'Button 1' },
            { key: '2', value: 'Button 2' }
        ];

        setup({ datas, onSelectionChange: mockOnSelectionChange, active: '1' });

        fireEvent.click(screen.getByText('Button 2'));

        expect(mockOnSelectionChange).toHaveBeenCalledWith('2');
        expect(mockOnSelectionChange).toHaveBeenCalledTimes(1);
    });

    it('renders no buttons when datas prop is empty', () => {
        setup({ datas: [], onSelectionChange: mockOnSelectionChange, active: '' });

        expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('button colors change when clicked', () => {
        const datas = [
            { key: '1', value: 'Button 1' },
            { key: '2', value: 'Button 2' }
        ];

        const { rerender } = render(
            <ButtonGroup
                datas={datas}
                onSelectionChange={mockOnSelectionChange}
                active=''
            />
        );

        const button1 = screen.getByText('Button 1');
        const button2 = screen.getByText('Button 2');

        expect(button1).toHaveClass('bg-gray-200');
        expect(button2).toHaveClass('bg-gray-200');

        fireEvent.click(button1);

        rerender(
            <ButtonGroup
                datas={datas}
                onSelectionChange={mockOnSelectionChange}
                active='1'
            />
        );

        expect(screen.getByText('Button 1')).toHaveClass('bg-blue-500');
        expect(screen.getByText('Button 2')).toHaveClass('bg-gray-200');
    });

    it('active button updates when active prop changes', () => {
        const { rerender } = render(
            <ButtonGroup
                datas={[
                    { key: '1', value: 'Button 1' },
                    { key: '2', value: 'Button 2' }
                ]}
                onSelectionChange={mockOnSelectionChange}
                active='1'
            />
        );

        expect(screen.getByText('Button 1')).toHaveClass('bg-blue-500');

        rerender(
            <ButtonGroup
                datas={[
                    { key: '1', value: 'Button 1' },
                    { key: '2', value: 'Button 2' }
                ]}
                onSelectionChange={mockOnSelectionChange}
                active='2'
            />
        );

        expect(screen.getByText('Button 2')).toHaveClass('bg-blue-500');
        expect(screen.getByText('Button 1')).toHaveClass('bg-gray-200');
    });


});
