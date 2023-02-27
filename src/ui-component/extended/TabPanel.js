import PropTypes from 'prop-types';
import { Box } from '@mui/material';

const TabPanel = ({ children, value, index, ...other }) => (
    <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
    >
        {value === index && (
            <Box sx={{ py: 1 }}>
                <>{children}</>
            </Box>
        )}
    </div>
);

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired
};

export default TabPanel;
