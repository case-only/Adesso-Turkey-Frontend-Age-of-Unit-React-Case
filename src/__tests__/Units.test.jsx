import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import createSagaMiddleware from 'redux-saga';
import {useDispatch, useSelector} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import Units from '../views/Units';
import rootSaga from "../store/sagas/filterSagas.js";
import {AGE_OPTIONS} from "../consts/AgeOptions.js";

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
}));


jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

const sagaMiddleware = createSagaMiddleware();
const mockStore = configureStore([sagaMiddleware]);

describe('Units Component', () => {
    let store;
    let mockNavigate;
    let mockFilteredData;

    beforeEach(() => {
        store = mockStore({
            data: {
                filteredData: [],
            },
        });
        sagaMiddleware.run(rootSaga);

        mockNavigate = jest.fn();
        mockFilteredData = [
            {id: 1, name: 'Unit 1', age: 'Feudal', cost: 'Food: 50 , Gold: 40'},
            {id: 2, name: 'Unit 2', age: 'Castle', cost: 'Wood: 30 , Food: 45'},
        ];

        useDispatch.mockReturnValue(jest.fn());
        useSelector.mockReturnValue(mockFilteredData);

        require('react-router-dom').useNavigate.mockReturnValue(mockNavigate);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });


    it('should render an empty table when filteredData is empty', () => {
        const emptyData = [];
        useSelector.mockImplementation(callback => callback({
            data: {
                filteredData: emptyData,
            },
            costFilter: [],
            ageFilter: AGE_OPTIONS[0].key
        }));

        render(
            <Provider store={store}>
                <Router>
                    <Units/>
                </Router>
            </Provider>
        );

        expect(screen.queryByText('Unit 1')).not.toBeInTheDocument();
        expect(screen.queryByText('Unit 2')).not.toBeInTheDocument();
    });

    it('should render Ages, Costs, and Table components', () => {
        render(
            <Provider store={store}>
                <Router>
                    <Units/>
                </Router>
            </Provider>
        );
        expect(screen.getByText('AGE OPTIONS')).toBeInTheDocument();
        expect(screen.getByText('COST OPTIONS')).toBeInTheDocument();
        expect(screen.getByText('name')).toBeInTheDocument();
        expect(screen.getByText('age')).toBeInTheDocument();
        expect(screen.getByText('cost')).toBeInTheDocument();
        expect(screen.getByText('Unit 1')).toBeInTheDocument();
        expect(screen.getByText('Unit 2')).toBeInTheDocument();
    });


    it('should navigate to unit detail page on table row click', () => {
        render(
            <Provider store={store}>
                <Router>
                    <Units/>
                </Router>
            </Provider>
        );

        fireEvent.click(screen.getByText('Unit 1'));

        expect(mockNavigate).toHaveBeenCalledWith('/unit-detail/1');
    });
});