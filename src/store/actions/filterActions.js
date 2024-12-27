import {SET_AGE_FILTER} from "../types/ageFilterReducer.js";
import {SET_COST_FILTER} from "../types/costFilterReducer.js";
import {FILTER_DATA, GET_UNIT_BY_ID, SET_UNIT_BY_ID} from "../types/dataReducer.js";

export const setAgeFilter = (age) => ({
    type: SET_AGE_FILTER,
    payload: age
});

export const setCostFilter = (cost) => ({
    type: SET_COST_FILTER,
    payload: cost
});



export const filterData = (data) => ({
    type: FILTER_DATA,
    payload: data
});

export const getUnitById = (id) => ({
    type: GET_UNIT_BY_ID,
    payload: id
});
export const setUnitById = (unit) => ({
    type: SET_UNIT_BY_ID,
    payload: unit
});