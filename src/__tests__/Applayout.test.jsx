import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppLayout from '../layouts/AppLayout.jsx';

describe('AppLayout Component', () => {

    it('renders AppHeader component', () => {
        const { getByText } = render(
            <Router>
                <AppLayout />
            </Router>
        );

        expect(getByText('home Page')).toBeInTheDocument();
    });

    it('renders Container component', () => {
        const { getByText } = render(
            <Router>
                <AppLayout />
            </Router>
        );

        expect(getByText('home Page')).toBeInTheDocument();
    });

    it('renders children components via Outlet', () => {
        const { getByText } = render(
            <Router>
                <AppLayout />
            </Router>
        );

        expect(getByText('home Page')).toBeInTheDocument();
    });
});
