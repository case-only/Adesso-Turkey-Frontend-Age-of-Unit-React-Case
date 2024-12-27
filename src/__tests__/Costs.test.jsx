import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {useDispatch, useSelector} from 'react-redux';
import Costs from '../components/Costs/Costs.jsx';
import {rootReducer} from "../store/store.js";
import {setCostFilter} from "../store/actions/filterActions.js";

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: jest.fn(),
    useSelector: jest.fn()
}));

describe('Costs Component', () => {
    let mockDispatch;

    beforeEach(() => {
        mockDispatch = jest.fn();
        useDispatch.mockReturnValue(mockDispatch);
    });

    it('should render title and cost options', () => {
        const mockCostFilter = [
            {key: 'Food', value: 30, checked: true},
            {key: 'Gold', value: 20, checked: false}
        ];

        useSelector.mockReturnValue(mockCostFilter);

        render(
            <Provider store={createStore(rootReducer)}>
                <Costs/>
            </Provider>
        );

        expect(screen.getByText('COST OPTIONS')).toBeInTheDocument();
        expect(screen.getByLabelText('Food')).toBeInTheDocument();
        expect(screen.getByLabelText('Gold')).toBeInTheDocument();
    });

    it('should dispatch setCostFilter action on checkbox change', () => {
        const mockCostFilter = [
            {key: 'Food', value: 30, checked: false},
            {key: 'Gold', value: 20, checked: true}
        ];

        useSelector.mockReturnValue(mockCostFilter);

        render(
            <Provider store={createStore(rootReducer)}>
                <Costs/>
            </Provider>
        );

        fireEvent.click(screen.getByLabelText('Food'));

        expect(mockDispatch).toHaveBeenCalledWith(
            setCostFilter({key: 'Food', value: 30, checked: true})
        );
    });

    it('should dispatch setCostFilter action on range slider change', () => {
        const mockCostFilter = [
            {key: 'Food', value: 30, checked: true},
            {key: 'Gold', value: 20, checked: true}
        ];

        useSelector.mockReturnValue(mockCostFilter);

        render(
            <Provider store={createStore(rootReducer)}>
                <Costs/>
            </Provider>
        );

        const foodSlider = screen.getAllByRole('slider')[0];

        fireEvent.change(foodSlider, {target: {value: 40}});

        expect(mockDispatch).toHaveBeenCalledWith(
            setCostFilter({key: 'Food', value: 40, checked: true})
        );
    });

    it('should disable range slider when checkbox is unchecked', () => {
        const mockCostFilter = [
            {key: 'Food', value: 30, checked: false}
        ];

        useSelector.mockReturnValue(mockCostFilter);

        render(
            <Provider store={createStore(rootReducer)}>
                <Costs/>
            </Provider>
        );

        expect(screen.getByLabelText('Food').closest('div').querySelector('input[type="range"]')).toBeDisabled();
    });

    it('should enable range slider when checkbox is checked', () => {
        const mockCostFilter = [
            {key: 'Food', value: 30, checked: true}
        ];

        useSelector.mockReturnValue(mockCostFilter);

        render(
            <Provider store={createStore(rootReducer)}>
                <Costs/>
            </Provider>
        );

        expect(screen.getByLabelText('Food').closest('div').querySelector('input[type="range"]')).not.toBeDisabled();
    });
});