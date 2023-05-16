import { lazy } from 'react';

// project imports
import AuthGuard from 'utils/route-guard/AuthGuard';
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

const Home = Loadable(lazy(() => import('views/pages/home')));

const ShoppingCart = Loadable(lazy(() => import('views/pages/shoppingcart')));

// ==============================|| MAIN ROUTING ||============================== //

const GeneralRoutes = {
    path: '/home',
    element: <MainLayout />,
    children: [
        {
            path: '',
            element: <Home />
        },
        {
            path: 'shopping-cart',
            element: <ShoppingCart />
        }
    ]
};

export default GeneralRoutes;
