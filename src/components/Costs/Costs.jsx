import React from "react";
import Checkbox from "../Checkbox.jsx";
import RangeSlider from "../RangeSlider.jsx";
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from "react-redux";
import {setCostFilter} from "../../store/actions/filterActions.js";

const Costs = ({title = 'COST OPTIONS'}) => {
    const dispatch = useDispatch()
    const costFilter = useSelector(state => state.costFilter);

    return (
        <div className='flex flex-col gap-6'>
            <h1 className='font-bold text-3xl'>{title}</h1>
            {costFilter.map((cost) => {
                return (
                    <div className='flex items-center gap-4' key={cost.key}>
                        <Checkbox onChange={() => {
                            dispatch(setCostFilter({...cost,checked:!cost.checked}))
                        }} checked={cost.checked} label={cost.key}/>
                        <RangeSlider
                            onChange={(e)=>{
                                dispatch(setCostFilter({...cost,value:Number(e.target.value)}))
                            }}
                            disabled={!cost.checked} value={cost.value}/>
                    </div>
                )
            })}
        </div>
    )
}
Costs.propTypes = {
    title: PropTypes.string,
};
export default Costs