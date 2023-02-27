import admin from './admin';
import warehouse from './warehouse';
import agent from './agent';

// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
    items: [admin, warehouse, agent],
    admin: [admin],
    warehouse: [warehouse],
    agent: [agent]
};

export default menuItems;
