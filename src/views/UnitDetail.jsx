import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getUnitById} from "../store/actions/filterActions.js";
import Card from "../components/Card.jsx";

const UnitDetail = () => {
    let {unit} = useParams();
    const dispatch = useDispatch()
    const selectedUnit = useSelector(state => state.data.selectedUnit);
    useEffect(() => {
        dispatch(getUnitById(unit))
    }, [dispatch,unit]);
    return (
        <div className='flex items-center justify-center'>
            {selectedUnit ? <Card title={selectedUnit.name}>
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">Description
                        : {selectedUnit.description}</h5>
                    <p className="font-normal text-gray-700 ">Expansion : {selectedUnit.expansion}</p>
                </Card>
                : <>Unit Not Found</>}
        </div>
    )
}
export default UnitDetail