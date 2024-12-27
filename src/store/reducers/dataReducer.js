import {FILTER_DATA, SET_UNIT_BY_ID} from "../types/dataReducer.js";
import data from '../../datas/data.json'
const initialDataState = {
    data,
    filteredData: data,
    selectedUnit: null
};

const dataReducer = (state = initialDataState, action) => {
    switch (action.type) {
        case FILTER_DATA:
            return {
                ...state,
                filteredData: action.payload
            };
        case SET_UNIT_BY_ID:
            return {
                ...state,
                selectedUnit: action.payload
            };
        default:
            return state;
    }
};

export default dataReducer;
