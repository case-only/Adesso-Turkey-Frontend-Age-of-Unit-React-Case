import {COST_OPTIONS} from "../../consts/CostOptions.js";
import {SET_COST_FILTER} from "../types/costFilterReducer.js";

const initialCostFilterState = COST_OPTIONS

const costFilterReducer = (state = initialCostFilterState, action) => {
    switch (action.type) {
        case SET_COST_FILTER:
            return state.map(item =>
                item.key === action.payload.key
                    ? { ...item, checked: action.payload.checked, value: action.payload.value }
                    : item
            );

        default:
            return state;
    }
};

export default costFilterReducer;
