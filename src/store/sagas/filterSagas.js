import { put, select, takeEvery ,all} from 'redux-saga/effects';
import {filterData, setUnitById} from '../actions/filterActions.js';
import {SET_AGE_FILTER} from "../types/ageFilterReducer.js";
import {SET_COST_FILTER} from "../types/costFilterReducer.js";
import {AGE_OPTIONS} from "../../consts/AgeOptions.js";
import {GET_UNIT_BY_ID} from "../types/dataReducer.js";

export const getAgeFilter = state => state.ageFilter;
export const getCostFilter = state => state.costFilter;
export const getData = state => state.data.data;

export function* applyFilters() {
    const ageFilter = yield select(getAgeFilter);
    const costFilter = yield select(getCostFilter);
    const data = yield select(getData);
    const filteredData = data.filter(item => {
        if (ageFilter !== AGE_OPTIONS[0].key && item.age.trim().toLowerCase() !== ageFilter.trim().toLowerCase()) return false;
        const activeCostFilters = costFilter.filter(cost => cost.checked);
        for (let filter of activeCostFilters) {
            const costValue = item.costMap[filter.key];
            if (costValue === undefined || costValue <= filter.value) {
                return false;
            }
        }
        return true;
    });

    yield put(filterData(filteredData));
}

export function* getUnitByIdSaga(action) {
    const data = yield select(getData);
    const unit = data.find(item => item.id === Number(action.payload));
    yield put(setUnitById(unit));
}
export function* watchGetUnitById() {
    yield takeEvery(GET_UNIT_BY_ID, getUnitByIdSaga);
}
export function* watchSetAgeFilter() {
    yield takeEvery(SET_AGE_FILTER, applyFilters);
}

export function* watchSetCostFilter() {
    yield takeEvery(SET_COST_FILTER, applyFilters);
}

export default function* rootSaga() {
    yield all([
        watchSetAgeFilter(),
        watchSetCostFilter(),
        watchGetUnitById()
    ]);
}
