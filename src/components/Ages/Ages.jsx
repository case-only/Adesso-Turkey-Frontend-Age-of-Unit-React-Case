import React from "react";
import ButtonGroup from "../ButtonGroup.jsx";
import {AGE_OPTIONS} from "../../consts/AgeOptions.js";
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from "react-redux";
import {setAgeFilter} from "../../store/actions/filterActions.js";

const Ages = ({title = 'AGE OPTIONS'}) => {
    const dispatch = useDispatch();
    const ageFilter = useSelector(state => state.ageFilter);
    return (
        <div className='flex flex-col gap-6'>
            <h1 className='font-bold text-3xl'>{title}</h1>
            <ButtonGroup datas={AGE_OPTIONS}
                         onSelectionChange={(key) => {
                             dispatch(setAgeFilter(key))
                         }} active={ageFilter}/>
        </div>
    )
}
Ages.propTypes = {
    title: PropTypes.string,
};

export default Ages