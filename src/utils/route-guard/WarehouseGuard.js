import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// project imports
import useAuth from 'hooks/useAuth';

// ==============================|| WAREHOUSE GUARD ||============================== //

/**
 * Guest guard for routes having no auth required
 * @param {PropTypes.node} children children element/node
 */

const WarehouseGuard = ({ children }) => {
    const { isLoggedIn, user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn) {
            if (user?.role !== '10') {
                navigate('/forbidden', { replace: true });
            }
        }
    }, [isLoggedIn, navigate, user?.role]);

    return children;
};

WarehouseGuard.propTypes = {
    children: PropTypes.node
};

export default WarehouseGuard;
