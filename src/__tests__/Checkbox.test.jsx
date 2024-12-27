import React, { useState } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Checkbox from '../components/Checkbox';

describe('Checkbox Component', () => {

    it('renders with label and initial unchecked state', () => {
        render(<Checkbox label="Test Checkbox" checked={false} onChange={() => {}} />);

        expect(screen.getByText('Test Checkbox')).toBeInTheDocument();

        expect(screen.getByRole('checkbox')).not.toBeChecked();
    });

    it('checkbox changes state when clicked', () => {
        const Wrap = () => {
            const [isChecked, setIsChecked] = useState(false);
            return <Checkbox label="Test Checkbox" checked={isChecked} onChange={() => setIsChecked(!isChecked)} />;
        };

        render(<Wrap />);

        const checkbox = screen.getByRole('checkbox');

        expect(checkbox).not.toBeChecked();

        fireEvent.click(checkbox);

        expect(checkbox).toBeChecked();
    });

    it('checkbox reflects the checked prop', () => {
        render(<Checkbox label="Test Checkbox" checked={true} onChange={() => {}} />);

        expect(screen.getByRole('checkbox')).toBeChecked();
    });

});
