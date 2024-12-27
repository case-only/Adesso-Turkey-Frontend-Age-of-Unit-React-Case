import {all, put, select} from 'redux-saga/effects';
import {filterData, setUnitById} from '../store/actions/filterActions.js';
import {AGE_OPTIONS} from "../consts/AgeOptions.js";
import rootSaga, {
    applyFilters,
    getAgeFilter, getCostFilter, getData,
    getUnitByIdSaga,
    watchGetUnitById,
    watchSetAgeFilter,
    watchSetCostFilter
} from '../store/sagas/filterSagas.js';

const mockUnit = {
    id: 104,
    name: "Elite Woad Raider",
    description: "Upgraded Woad Raider",
    expansion: "Age of Kings",
    age: "Imperial",
    created_in: "Castle",
    cost: "Food: 65, Gold: 25",
    build_time: 10,
    reload_time: 2,
    attack_delay: 0,
    movement_rate: 1.38,
    line_of_sight: 5,
    hit_points: 80,
    range: "0",
    attack: 13,
    armor: "0/1",
    attack_bonus: "+3 eagles;+3 buildings",
    armor_bonus: "",
    search_radius: null,
    accuracy: "",
    blast_radius: null,
    costMap: {
        Food: 65,
        Gold: 25,
    },
};

const action = {
    type: 'GET_UNIT_BY_ID',
    payload: 104,
};

const mockState = {
    data: {
        data: [mockUnit],
    },
};

describe('Sagas', () => {

    it('applyFilters saga should handle case with no filters', () => {
        const mockState = {
            ageFilter: AGE_OPTIONS[0].key,
            costFilter: [],
            data: [
                {id: 1, age: 'Imperial', costMap: {Food: 60}},
                {id: 2, age: 'Feudal', costMap: {Food: 40}}
            ]
        };

        const generator = applyFilters();

        expect(generator.next().value).toEqual(select(getAgeFilter));
        expect(generator.next(mockState.ageFilter).value).toEqual(select(getCostFilter));
        expect(generator.next(mockState.costFilter).value).toEqual(select(getData));

        const filteredData = mockState.data.filter(item => {
            if (mockState.ageFilter !== AGE_OPTIONS[0].key && item.age.trim().toLowerCase() !== mockState.ageFilter.trim().toLowerCase()) return false;
            return true;
        });

        expect(generator.next(mockState.data).value).toEqual(put(filterData(filteredData)));
        expect(generator.next().done).toBe(true);
    });

    it('applyFilters saga should handle case where only age filter is applied', () => {
        const mockState = {
            ageFilter: 'Imperial',
            costFilter: [],
            data: [
                {id: 1, age: 'Imperial', costMap: {Food: 60}},
                {id: 2, age: 'Feudal', costMap: {Food: 40}}
            ]
        };

        const generator = applyFilters();

        expect(generator.next().value).toEqual(select(getAgeFilter));
        expect(generator.next(mockState.ageFilter).value).toEqual(select(getCostFilter));
        expect(generator.next(mockState.costFilter).value).toEqual(select(getData));

        const filteredData = mockState.data.filter(item => {
            if (mockState.ageFilter !== AGE_OPTIONS[0].key && item.age.trim().toLowerCase() !== mockState.ageFilter.trim().toLowerCase()) return false;
            return true;
        });

        expect(generator.next(mockState.data).value).toEqual(put(filterData(filteredData)));
        expect(generator.next().done).toBe(true);
    });

    it('should find unit by ID and dispatch setUnitById action', () => {
        const generator = getUnitByIdSaga(action);

        expect(generator.next().value).toEqual(select(getData));

        expect(generator.next(mockState.data.data).value).toEqual(
            put(setUnitById(mockUnit))
        );

        expect(generator.next().done).toBe(true);
    });

    it('applyFilters saga should filter data and dispatch filterData action', () => {
        const mockState = {
            ageFilter: AGE_OPTIONS[0].key,
            costFilter: [{key: 'Food', value: 50, checked: true}],
            data: [
                {id: 1, age: 'Imperial', costMap: {Food: 60}},
                {id: 2, age: 'Feudal', costMap: {Food: 40}}
            ]
        };

        const generator = applyFilters();

        expect(generator.next().value).toEqual(select(getAgeFilter));
        expect(generator.next(mockState.ageFilter).value).toEqual(select(getCostFilter));
        expect(generator.next(mockState.costFilter).value).toEqual(select(getData));

        const filteredData = mockState.data.filter(item => {
            if (mockState.ageFilter !== AGE_OPTIONS[0].key && item.age.trim().toLowerCase() !== mockState.ageFilter.trim().toLowerCase()) return false;
            const activeCostFilters = mockState.costFilter.filter(cost => cost.checked);
            for (let filter of activeCostFilters) {
                const costValue = item.costMap[filter.key];
                if (costValue === undefined || costValue <= filter.value) {
                    return false;
                }
            }
            return true;
        });

        expect(generator.next(mockState.data).value).toEqual(put(filterData(filteredData)));
        expect(generator.next().done).toBe(true);
    });

    it('applyFilters saga should apply both age and cost filters correctly', () => {
        const mockState = {
            ageFilter: 'Imperial',
            costFilter: [{key: 'Food', value: 50, checked: true}],
            data: [
                {id: 1, age: 'Imperial', costMap: {Food: 60}},
                {id: 2, age: 'Feudal', costMap: {Food: 40}},
                {id: 3, age: 'Imperial', costMap: {Food: 40}}
            ]
        };

        const generator = applyFilters();

        expect(generator.next().value).toEqual(select(getAgeFilter));
        expect(generator.next(mockState.ageFilter).value).toEqual(select(getCostFilter));
        expect(generator.next(mockState.costFilter).value).toEqual(select(getData));

        const filteredData = mockState.data.filter(item => {
            if (mockState.ageFilter !== AGE_OPTIONS[0].key && item.age.trim().toLowerCase() !== mockState.ageFilter.trim().toLowerCase()) return false;
            const activeCostFilters = mockState.costFilter.filter(cost => cost.checked);
            for (let filter of activeCostFilters) {
                const costValue = item.costMap[filter.key];
                if (costValue === undefined || costValue <= filter.value) {
                    return false;
                }
            }
            return true;
        });

        expect(generator.next(mockState.data).value).toEqual(put(filterData(filteredData)));
        expect(generator.next().done).toBe(true);
    });


    it('rootSaga should yield all watcher sagas', () => {
        const generator = rootSaga();

        expect(generator.next().value).toEqual(all([
            watchSetAgeFilter(),
            watchSetCostFilter(),
            watchGetUnitById()
        ]));

        expect(generator.next().done).toBe(true);
    });

});
