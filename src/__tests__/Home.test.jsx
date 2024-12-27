import React from 'react';
import {render, screen} from '@testing-library/react';
import Home from '../views/Home.jsx';

describe('Home', () => {

    it('should render an image with correct src and alt attributes', () => {
        render(<Home/>);
        const image = screen.getByRole('img');
        expect(image).toHaveAttribute('src', 'https://cdn.vox-cdn.com/thumbor/txRSFUwQEUYbN7QSWkylE9XBKNs=/0x0:1920x1080/1200x675/filters:focal(807x387:1113x693)/cdn.vox-cdn.com/uploads/chorus_image/image/65821972/age1.0.png');
        expect(image).toHaveAttribute('alt', 'Age Of Empires Two');
    });

    it('should render the image inside a div with flex class', () => {
        const {container} = render(<Home/>);
        const div = container.firstChild;
        expect(div).toHaveClass('flex');
    });
});
