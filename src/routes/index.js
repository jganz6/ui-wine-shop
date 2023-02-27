import { useRoutes } from 'react-router-dom';

// routes
import AuthenticationRoutes from './AuthenticationRoutes';
import MaintenanceRoutes from './MaintenanceRoutes';
import { AdminRoutes, WarehouseRoutes, AgentRoutes } from './MainRoutes';
import GeneralRoutes from './GeneralRoutes';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
    return useRoutes([AuthenticationRoutes, MaintenanceRoutes, AdminRoutes, WarehouseRoutes, AgentRoutes, GeneralRoutes]);
}
