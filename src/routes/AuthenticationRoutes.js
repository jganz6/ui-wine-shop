import { lazy } from 'react';

// project imports
import GuestGuard from 'utils/route-guard/GuestGuard';
import MainLayout from 'layout/MainLayout';
import NavMotion from 'layout/NavMotion';
import Loadable from 'ui-component/Loadable';

// login routing
const MaintenanceComingSoon = Loadable(lazy(() => import('views/error/ComingSoon')));

const AuthLogin = Loadable(lazy(() => import('views/pages/authentication/Login')));
const AuthRegister = Loadable(lazy(() => import('views/pages/authentication/Register')));
const AuthForgotPassword = Loadable(lazy(() => import('views/pages/authentication/ForgotPassword')));
const AuthActivation = Loadable(lazy(() => import('views/pages/authentication/Activation')));
const AuthResetPassword = Loadable(lazy(() => import('views/pages/authentication/ResetPassword')));
const AuthSuccess = Loadable(lazy(() => import('views/pages/authentication/SuccessPage')));
const Home = Loadable(lazy(() => import('views/pages/home')));

// ==============================|| AUTH ROUTING ||============================== //

const AuthenticationRoutes = {
    path: '/',
    element: (
        <NavMotion>
            <GuestGuard>
                <MainLayout />
            </GuestGuard>
        </NavMotion>
    ),
    children: [
        {
            path: '/',
            element: <Home />
        },
        {
            path: '/login',
            element: <AuthLogin />
        },
        {
            path: '/register',
            element: <AuthRegister />
        },
        {
            path: '/activation',
            element: <AuthActivation />
        },
        {
            path: '/reset-password',
            element: <AuthResetPassword />
        },
        {
            path: '/auth-success',
            element: <AuthSuccess />
        },
        {
            path: '/forgot',
            element: <AuthForgotPassword />
        }
    ]
};

export default AuthenticationRoutes;
