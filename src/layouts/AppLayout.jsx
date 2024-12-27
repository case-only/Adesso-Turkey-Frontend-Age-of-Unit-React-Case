import React from "react";
import AppHeader from "../components/AppHeader.jsx";
import {Outlet} from "react-router-dom";
import Container from "../components/Container.jsx";

const AppLayout = () => {

    return (
        <div className='flex flex-col gap-4'>
            <AppHeader/>
            <Container>
                <Outlet />
            </Container>
        </div>
    )
}
export default AppLayout