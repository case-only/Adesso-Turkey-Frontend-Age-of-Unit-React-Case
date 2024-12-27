import React from 'react';
import { render, screen } from '@testing-library/react';
import Card from '../components/Card.jsx';

describe('Card component', () => {

    it('renders without crashing', () => {
        render(<Card title="Test Title">Test Children</Card>);
        expect(screen.getByText('Test Title')).toBeInTheDocument();
    });

    it('renders title prop correctly', () => {
        const title = 'Card Title';
        render(<Card title={title}>Test Children</Card>);
        expect(screen.getByText(title)).toBeInTheDocument();
    });

    it('renders children prop correctly', () => {
        const childrenText = 'This is a child element';
        render(<Card title="Title">{childrenText}</Card>);
        expect(screen.getByText(childrenText)).toBeInTheDocument();
    });

    it('applies correct CSS classes', () => {
        const { container } = render(<Card title="Title">Children</Card>);
        const cardElement = container.firstChild;
        expect(cardElement).toHaveClass('block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100');
    });
});
