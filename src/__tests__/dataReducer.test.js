import dataReducer from '../store/reducers/dataReducer';
import { FILTER_DATA, SET_UNIT_BY_ID } from '../store/types/dataReducer';
import data from '../datas/data.json';

describe('dataReducer', () => {
    const initialState = {
        data,
        filteredData: data,
        selectedUnit: null
    };

    it('should return the initial state', () => {
        expect(dataReducer(undefined, {})).toEqual(initialState);
    });

    it('should handle FILTER_DATA action', () => {
        const filteredData = data.filter(item => item.id === 1);

        expect(
            dataReducer(initialState, {
                type: FILTER_DATA,
                payload: filteredData
            })
        ).toEqual({
            ...initialState,
            filteredData
        });
    });

    it('should handle SET_UNIT_BY_ID action', () => {
        const selectedUnit = data[0];

        expect(
            dataReducer(initialState, {
                type: SET_UNIT_BY_ID,
                payload: selectedUnit
            })
        ).toEqual({
            ...initialState,
            selectedUnit
        });
    });
});
