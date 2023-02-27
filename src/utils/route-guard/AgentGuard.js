import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// project imports
import useAuth from 'hooks/useAuth';

// ==============================|| AGENT GUARD ||============================== //

/**
 * Guest guard for routes having no auth required
 * @param {PropTypes.node} children children element/node
 */

const AgentGuard = ({ children }) => {
    const { isLoggedIn, user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn) {
            if (user?.role !== '20') {
                navigate('/forbidden', { replace: true });
            }
        }
    }, [isLoggedIn, navigate, user?.role]);

    return children;
};

AgentGuard.propTypes = {
    children: PropTypes.node
};

export default AgentGuard;
