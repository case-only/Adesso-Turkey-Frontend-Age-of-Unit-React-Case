import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import createSagaMiddleware from 'redux-saga';
import { useParams } from 'react-router-dom';
import UnitDetail from '../views/UnitDetail';
import { getUnitById } from '../store/actions/filterActions';
import rootSaga from "../store/sagas/filterSagas";

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: jest.fn(),
}));

jest.mock('../store/actions/filterActions', () => ({
    getUnitById: jest.fn((unit) => ({ type: 'GET_UNIT_BY_ID', payload: unit })),
    setUnitById: jest.fn()
}));

const sagaMiddleware = createSagaMiddleware();
const mockStore = configureStore([sagaMiddleware]);

describe('UnitDetail Component', () => {
    let store;

    beforeEach(() => {
        store = mockStore({
            data: {
                selectedUnit: null,
            },
        });
        sagaMiddleware.run(rootSaga);
        useParams.mockReturnValue({ unit: '1' });
    });

    it('should render "Unit Not Found" when selectedUnit is null', () => {
        render(
            <Provider store={store}>
                <UnitDetail />
            </Provider>
        );

        expect(screen.getByText('Unit Not Found')).toBeInTheDocument();
    });

    it('should dispatch getUnitById action on mount', async () => {
        render(
            <Provider store={store}>
                <UnitDetail />
            </Provider>
        );

        await waitFor(() => {
            expect(getUnitById).toHaveBeenCalledWith('1');
        });
    });

    it('should render unit details when selectedUnit is available', async () => {
        const selectedUnit = {
            name: 'Archer',
            description: 'A ranged unit.',
            expansion: 'Age of Kings',
        };

        store = mockStore({
            data: {
                selectedUnit,
            },
        });

        render(
            <Provider store={store}>
                <UnitDetail />
            </Provider>
        );

        await waitFor(() => {
            expect(screen.getByText('Archer')).toBeInTheDocument();
            expect(screen.getByText('Description : A ranged unit.')).toBeInTheDocument();
            expect(screen.getByText('Expansion : Age of Kings')).toBeInTheDocument();
        });
    });

});
