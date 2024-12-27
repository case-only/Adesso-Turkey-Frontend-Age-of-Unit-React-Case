import React from "react";
import Ages from "../components/Ages/Ages.jsx";
import Costs from "../components/Costs/Costs.jsx";
import Table from "../components/Table.jsx";
import { useSelector} from "react-redux";
import {UNIT_TABLE_HEADERS} from "../consts/UnitsTableHeaders.js";
import {useNavigate} from "react-router-dom";

const Units = () => {
    const filteredData = useSelector(state => state.data.filteredData);
    const navigate = useNavigate();


    return (
        <div className='flex flex-col gap-4'>
            <Ages/>
            <Costs/>
            <Table headers={UNIT_TABLE_HEADERS} data={filteredData} onClick={(row)=>{
                navigate(`/unit-detail/${row.id}`)
            }}/>

        </div>
    )
}
export default Units