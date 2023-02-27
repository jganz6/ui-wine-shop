import { useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';

// material ui
import { Tab, Tabs } from '@mui/material';

// project imports
import TabPanel from 'ui-component/extended/TabPanel';
import Arrived from './Arrived';
import OnProcess from './OnProcess';
import useAuth from 'hooks/useAuth';

// assets
import { IconBoxSeam, IconTruckDelivery } from '@tabler/icons';

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    };
}

const ReceiveList = () => {
    const { state: data } = useLocation();
    const { tab, id } = useParams();
    const { user } = useAuth();

    const tabOptions = [
        {
            warehouseLink: `/warehouse/inventory/receive-list/arrived`,
            adminLink: `/admin/warehouse/receive-list/${id}/arrived`,
            icon: <IconBoxSeam stroke={1.5} size="17px" />,
            label: 'Arrived'
        },
        {
            warehouseLink: `/warehouse/inventory/receive-list/on-process`,
            adminLink: `/admin/warehouse/receive-list/${id}/on-process`,
            icon: <IconTruckDelivery stroke={1.5} size="17px" />,
            label: 'On Process'
        }
    ];

    let selectedTab = 0;
    switch (tab) {
        case 'arrived':
            selectedTab = 0;
            break;
        case 'on-process':
            selectedTab = 1;
            break;
        default:
            selectedTab = 0;
    }
    const [value, setValue] = useState(selectedTab);
    const handleChange = (_, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <Tabs
                value={value}
                variant="scrollable"
                onChange={handleChange}
                indicatorColor="secondary"
                sx={{
                    marginTop: 2.5,
                    '& .MuiTabs-flexContainer': {
                        border: 'none'
                    },
                    '& a': {
                        minHeight: 'auto',
                        minWidth: 10,
                        py: 1.5,
                        px: 1,
                        mr: 2.25,
                        color: 'grey.700',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center'
                    },
                    '& a.Mui-selected': {
                        color: 'secondary.main'
                    },
                    '& a > svg': {
                        marginBottom: '4px !important',
                        mr: 1.25
                    }
                }}
            >
                {tabOptions.map((option, index) => (
                    <Tab
                        key={index}
                        component={Link}
                        to={user?.role === '29' ? option.adminLink : option.warehouseLink}
                        state={data}
                        icon={option.icon}
                        label={option.label}
                        {...a11yProps(index)}
                    />
                ))}
            </Tabs>

            <>
                <TabPanel value={value} index={0}>
                    <Arrived />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <OnProcess />
                </TabPanel>
            </>
        </>
    );
};

export default ReceiveList;
