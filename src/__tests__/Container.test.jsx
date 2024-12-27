import React from 'react';
import {render, screen} from '@testing-library/react';
import Container from '../components/Container.jsx';

describe('Container', () => {

    it('should render children correctly', () => {
        render(
            <Container>
                <div>Child Component</div>
            </Container>
        );

        expect(screen.getByText('Child Component')).toBeInTheDocument();
    });

    it('should have the correct classes applied', () => {
        const {container} = render(
            <Container>
                <div>Child Component</div>
            </Container>
        );

        expect(container.firstChild).toHaveClass('md:container');
        expect(container.firstChild).toHaveClass('md:mx-auto');
    });
});
