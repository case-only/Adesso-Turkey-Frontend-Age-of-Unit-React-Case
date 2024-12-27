import {AGE_OPTIONS} from "../../consts/AgeOptions.js";
import {SET_AGE_FILTER} from "../types/ageFilterReducer.js";

const initialAgeFilterState = AGE_OPTIONS[0].key;

const ageFilterReducer = (state = initialAgeFilterState, action) => {
    switch (action.type) {
        case SET_AGE_FILTER:
            return action.payload;
        default:
            return state;
    }
};

export default ageFilterReducer;
