import React from "react";
import {
    createBrowserRouter,
} from "react-router-dom";
import AppLayout from "../layouts/AppLayout.jsx";
import Units from "../views/Units.jsx";
import Home from "../views/Home.jsx";
import UnitDetail from "../views/UnitDetail.jsx";


export const routes=[
    {
        path: "/",
        element: <AppLayout/>,
        children: [
            {
                path: '/',
                name:'home',
                index: true,
                element:<Home /> ,
                showInHeader:true,
            },
            {
                name:'units',
                path: '/units',
                element: <Units/>,
                showInHeader:true,

            },
            {
                name:'unit-detail',
                path: '/unit-detail/:unit',
                element: <UnitDetail/>,
                showInHeader:false,

            }
        ]
    },
]
const router = createBrowserRouter(routes)
export default router