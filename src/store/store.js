import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import ageFilterReducer from '../store/reducers/ageFilterReducer';
import costFilterReducer from '../store/reducers/costFilterReducer';
import dataReducer from '../store/reducers/dataReducer';
import rootSaga from '../store/sagas/filterSagas';

export const rootReducer = combineReducers({
    ageFilter: ageFilterReducer,
    costFilter: costFilterReducer,
    data: dataReducer
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    rootReducer,
    applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

export default store;
