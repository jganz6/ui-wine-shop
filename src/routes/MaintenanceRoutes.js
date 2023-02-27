import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

// maintenance routing
const MaintenanceError = Loadable(lazy(() => import('views/error/Error')));
const MaintenanceComingSoon = Loadable(lazy(() => import('views/error/ComingSoon')));
const MaintenanceUnderConstruction = Loadable(lazy(() => import('views/error/UnderConstruction')));
const MaintenanceForbidden = Loadable(lazy(() => import('views/error/Forbidden')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const MaintenanceRoutes = {
    path: '/',
    element: <MinimalLayout />,
    children: [
        {
            path: '/coming-soon',
            element: <MaintenanceComingSoon />
        },
        {
            path: '/under-construction',
            element: <MaintenanceUnderConstruction />
        },
        {
            path: '/forbidden',
            element: <MaintenanceForbidden />
        },
        {
            path: '*',
            element: <MaintenanceError />
        }
    ]
};

export default MaintenanceRoutes;
