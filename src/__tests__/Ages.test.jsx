import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import Ages from '../components/Ages/Ages.jsx';
import { rootReducer } from '../store/store.js';
import { AGE_OPTIONS } from '../consts/AgeOptions.js';
import { setAgeFilter } from '../store/actions/filterActions.js';


jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
}));

describe('Ages Component', () => {
    let mockDispatch;

    beforeEach(() => {
        mockDispatch = jest.fn();
        useDispatch.mockReturnValue(mockDispatch);
    });

    it('should render title correctly', () => {
        const mockAgeFilter = AGE_OPTIONS[0].key;
        useSelector.mockReturnValue(mockAgeFilter);

        render(
            <Provider store={createStore(rootReducer)}>
                <Ages />
            </Provider>
        );

        expect(screen.getByText('AGE OPTIONS')).toBeInTheDocument();
    });

    it('should render ButtonGroup with correct props', () => {
        const mockAgeFilter = AGE_OPTIONS[0].key;

        useSelector.mockReturnValue(mockAgeFilter);

        render(
            <Provider store={createStore(rootReducer)}>
                <Ages />
            </Provider>
        );

        const buttons = screen.getAllByRole('button');
        expect(buttons).toHaveLength(AGE_OPTIONS.length);

        AGE_OPTIONS.forEach(option => {
            const button = screen.getByText(option.value);
            expect(button).toBeInTheDocument();
            if (option.key === mockAgeFilter) {
                expect(button).toHaveClass('bg-blue-500 text-white');
            } else {
                expect(button).toHaveClass('bg-gray-200 text-black');
            }
        });
    });

    it('should dispatch setAgeFilter action on button click', () => {
        const mockAgeFilter = AGE_OPTIONS[0].key;

        useSelector.mockReturnValue(mockAgeFilter);

        render(
            <Provider store={createStore(rootReducer)}>
                <Ages />
            </Provider>
        );

        const newAgeFilterKey = AGE_OPTIONS[1].key;
        fireEvent.click(screen.getByText(AGE_OPTIONS[1].value));

        expect(mockDispatch).toHaveBeenCalledWith(setAgeFilter(newAgeFilterKey));
    });

    it('should pass the correct active prop to ButtonGroup', () => {
        const mockAgeFilter = AGE_OPTIONS[1].key;

        useSelector.mockReturnValue(mockAgeFilter);

        render(
            <Provider store={createStore(rootReducer)}>
                <Ages />
            </Provider>
        );

        const buttons = screen.getAllByRole('button');
        buttons.forEach(button => {
            const buttonText = button.textContent;
            const buttonOption = AGE_OPTIONS.find(option => option.value === buttonText);

            if (buttonOption.key === mockAgeFilter) {
                expect(button).toHaveClass('bg-blue-500 text-white');
            } else {
                expect(button).toHaveClass('bg-gray-200 text-black');
            }
        });
    });


});
