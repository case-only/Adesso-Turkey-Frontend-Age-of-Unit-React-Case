import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppHeader from '../components/AppHeader.jsx';
import { routes } from '../routes/router';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useLocation: jest.fn(),
}));

const { useLocation } = require('react-router-dom');

describe('AppHeader', () => {
    const mockUseLocation = (pathname) => {
        useLocation.mockReturnValue({
            pathname,
        });
    };

    it('should render the header with the correct route name', () => {
        const currentPath = routes[0].children[0].path;
        const currentName = routes[0].children[0].name;

        mockUseLocation(currentPath);

        render(
            <Router>
                <AppHeader />
            </Router>
        );

        expect(screen.getByText(currentName)).toBeInTheDocument();

    });

    it('should highlight the active route link', () => {
        const currentPath = routes[0].children[1].path;
        const currentName = routes[0].children[1].name;

        mockUseLocation(currentPath);

        render(
            <Router>
                <AppHeader />
            </Router>
        );

        const activeLink = screen.getByText(currentName);
        expect(activeLink).toHaveClass('font-bold text-blue-950');
    });

    it('should render all routes that should be shown in header', () => {
        mockUseLocation('/');

        render(
            <Router>
                <AppHeader />
            </Router>
        );

        routes[0].children.forEach((route) => {
            if (route.showInHeader) {
                expect(screen.getByText(route.name)).toBeInTheDocument();
            } else {
                expect(screen.queryByText(route.name)).toBeNull();
            }
        });
    });
});
