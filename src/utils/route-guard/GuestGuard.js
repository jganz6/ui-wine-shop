import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// project imports
import useAuth from 'hooks/useAuth';
import { DASHBOARD_PATH_ADMIN, DASHBOARD_PATH_WAREHOUSE, DASHBOARD_PATH_AGENT } from 'config';

// ==============================|| GUEST GUARD ||============================== //

/**
 * Guest guard for routes having no auth required
 * @param {PropTypes.node} children children element/node
 */

const GuestGuard = ({ children }) => {
    const { isLoggedIn, user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn) {
            if (user?.role === '29') {
                navigate(DASHBOARD_PATH_ADMIN, { replace: true });
            } else if (user?.role === '10') {
                navigate(DASHBOARD_PATH_WAREHOUSE, { replace: true });
            } else if (user?.role === '20') {
                navigate(DASHBOARD_PATH_AGENT, { replace: true });
            } else {
                navigate('/forbidden');
            }
        }
    }, [isLoggedIn, navigate, user?.role]);

    return children;
};

GuestGuard.propTypes = {
    children: PropTypes.node
};

export default GuestGuard;
