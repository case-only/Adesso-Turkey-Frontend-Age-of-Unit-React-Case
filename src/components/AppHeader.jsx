import React from 'react';
import {Link, useLocation} from 'react-router-dom';
import {routes} from "../routes/router.jsx";

const AppHeader = () => {
    const location = useLocation();
    const currentPath = location.pathname;
    return (
        <header className="bg-blue-500 w-full text-white flex justify-between items-center p-4">
            <nav className="flex items-center w-full justify-center space-x-4">
                <h1
                    className={`font-bold text-2xl text-blue-950 uppercase`}
                >
                    {routes[0].children.find((r) => r.path === currentPath)?.name || ''} Page
                </h1>
            </nav>
            <div className="flex space-x-4">
                {routes[0].children.map((route) => {
                    return (
                        <React.Fragment key={route.path}>
                            {route.showInHeader ?
                                <Link to={route.path} className={
                                    `capitalize ${currentPath === route.path ? 'font-bold text-blue-950 text-lg' : ''}`
                                }>
                                    {route.name}
                                </Link> : <></>}
                        </React.Fragment>
                    )
                })}
            </div>
        </header>
    );
};

export default AppHeader;
