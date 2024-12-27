import costFilterReducer from '../store/reducers/costFilterReducer';
import {SET_COST_FILTER} from '../store/types/costFilterReducer.js';
import {COST_OPTIONS} from '../consts/CostOptions.js';

describe('costFilterReducer', () => {
    const initialState = COST_OPTIONS;

    it('should return the initial state', () => {
        expect(costFilterReducer(undefined, {})).toEqual(initialState);
    });

    it('should handle SET_COST_FILTER action', () => {
        const action = {
            type: SET_COST_FILTER,
            payload: {
                key: 1,
                checked: true,
                value: 50
            }
        };

        const expectedState = initialState.map(item =>
            item.key === action.payload.key
                ? {...item, checked: true, value: 50}
                : item
        );

        expect(costFilterReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle SET_COST_FILTER action with no matching key', () => {
        const action = {
            type: SET_COST_FILTER,
            payload: {
                key: 999,
                checked: true,
                value: 50
            }
        };

        expect(costFilterReducer(initialState, action)).toEqual(initialState);
    });

    it('should not modify state for unknown actions', () => {
        const action = {
            type: 'UNKNOWN_ACTION',
            payload: {}
        };

        expect(costFilterReducer(initialState, action)).toEqual(initialState);
    });
});
