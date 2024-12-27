import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import RangeSlider from '../components/RangeSlider.jsx';

describe('RangeSlider', () => {

    it('should render with default props', () => {
        render(<RangeSlider onChange={() => {
        }}/>);

        const slider = screen.getByRole('slider');
        expect(slider).toHaveAttribute('min', '0');
        expect(slider).toHaveAttribute('max', '200');
        expect(slider).toHaveValue('0');
    });

    it('should render with custom min and max values', () => {
        render(<RangeSlider onChange={() => {
        }} min={10} max={100}/>);

        const slider = screen.getByRole('slider');
        expect(slider).toHaveAttribute('min', '10');
        expect(slider).toHaveAttribute('max', '100');
    });

    it('should render with custom value', () => {
        render(<RangeSlider onChange={() => {
        }} value={50}/>);

        const slider = screen.getByRole('slider');
        expect(slider).toHaveValue('50');
    });

    it('should call onChange function when the slider value changes', () => {
        const handleChange = jest.fn();
        render(<RangeSlider value={30} onChange={handleChange}/>);

        const slider = screen.getByRole('slider');
        fireEvent.change(slider, {target: {value: '60'}});

        expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it('should render the label correctly', () => {
        render(<RangeSlider onChange={() => {
        }} value={0}/>);

        const label = screen.getByText(/0/i);
        expect(label).toBeInTheDocument();
    });

    it('should be disabled when the disabled prop is true', () => {
        render(<RangeSlider disabled onChange={() => {
        }}/>);

        const slider = screen.getByRole('slider');
        expect(slider).toBeDisabled();
    });

});
