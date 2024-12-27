import {
    setAgeFilter,
    setCostFilter,
    filterData,
    getUnitById,
    setUnitById
} from "../store/actions/filterActions.js";
import ageFilterReducer from '../store/reducers/ageFilterReducer';

import {
    SET_AGE_FILTER,
} from "../store/types/ageFilterReducer.js";
import {
    SET_COST_FILTER
} from "../store/types/costFilterReducer.js";
import {
    FILTER_DATA,
    GET_UNIT_BY_ID,
    SET_UNIT_BY_ID
} from "../store/types/dataReducer.js";
import {AGE_OPTIONS} from "../consts/AgeOptions.js";

describe('Action Creators Tests', () => {

    it('should return the initial state', () => {
        expect(ageFilterReducer(undefined, {})).toEqual(AGE_OPTIONS[0].key);
    });

    it('should handle SET_AGE_FILTER action', () => {
        const age = 'Medieval';
        const action = {
            type: SET_AGE_FILTER,
            payload: age
        };
        expect(ageFilterReducer(AGE_OPTIONS[0].key, action)).toEqual(age);
    });

    it('setAgeFilter creates an action to set age filter', () => {
        const age = 'All';
        const expectedAction = {
            type: SET_AGE_FILTER,
            payload: age
        };
        expect(setAgeFilter(age)).toEqual(expectedAction);
    });


    it('setCostFilter creates an action to set cost filter', () => {
        const cost = { Food: 40 };
        const expectedAction = {
            type: SET_COST_FILTER,
            payload: cost,
        };
        expect(setCostFilter(cost)).toEqual(expectedAction);
    });



    it('filterData creates an action to filter data', () => {
        const data = { filterKey: 'filterValue' };
        const expectedAction = {
            type: FILTER_DATA,
            payload: data
        };
        expect(filterData(data)).toEqual(expectedAction);
    });

    it('getUnitById creates an action to get unit by id', () => {
        const id = 1;
        const expectedAction = {
            type: GET_UNIT_BY_ID,
            payload: id
        };
        expect(getUnitById(id)).toEqual(expectedAction);
    });

    it('setUnitById creates an action to set unit by id', () => {
        const unit = { name: 'Archer' };
        const expectedAction = {
            type: SET_UNIT_BY_ID,
            payload: unit
        };
        expect(setUnitById(unit)).toEqual(expectedAction);
    });
});
