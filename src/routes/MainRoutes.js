import { lazy } from 'react';

// project imports
import AuthGuard from 'utils/route-guard/AuthGuard';
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// Guard
import AdminGuard from 'utils/route-guard/AdminGuard';
import WarehouseGuard from 'utils/route-guard/WarehouseGuard';
import AgentGuard from 'utils/route-guard/AgentGuard';

// ADMIN
const Dashboard = Loadable(lazy(() => import('views/pages/admin/Dashboard')));
const UserManagement = Loadable(lazy(() => import('views/pages/admin/UserManagement')));
const MasterItem = Loadable(lazy(() => import('views/pages/admin/InventoryManagement/MasterItem')));
const Mitra = Loadable(lazy(() => import('views/pages/admin/Mitra')));
const MitraInventory = Loadable(lazy(() => import('views/pages/admin/Mitra/Inventory')));
const MitraPerformance = Loadable(lazy(() => import('views/pages/admin/Mitra/Performance')));
const MitraReport = Loadable(lazy(() => import('views/pages/admin/Mitra/Report')));
const Finance = Loadable(lazy(() => import('views/pages/admin/Finance')));
const PurchaseOrder = Loadable(lazy(() => import('views/pages/admin/InventoryManagement/PurchaseOrder')));
const Warehouse = Loadable(lazy(() => import('views/pages/admin/Warehouse')));
const Agent = Loadable(lazy(() => import('views/pages/admin/Agent')));
const AgentReport = Loadable(lazy(() => import('views/pages/admin/Agent/Report')));
const AgentInventory = Loadable(lazy(() => import('views/pages/admin/Agent/Inventory')));
const AgentPerformance = Loadable(lazy(() => import('views/pages/admin/Agent/Performance')));

// WAREHOUSE
const DashboardWarehouse = Loadable(lazy(() => import('views/pages/warehouse/Dashboard')));
const InventoryWarehouse = Loadable(lazy(() => import('views/pages/warehouse/Inventory')));
const ReceiveList = Loadable(lazy(() => import('views/pages/warehouse/Inventory/ReceiveList')));
const ReceivePurchaseOrder = Loadable(lazy(() => import('views/pages/warehouse/Inventory/ReceiveList/ReceivePurchaseOrder')));
const ContactWarehouse = Loadable(lazy(() => import('views/pages/warehouse/Contact')));

// AGENT
/** Agent component list */

// FORM
const AddUserForm = Loadable(lazy(() => import('views/pages/forms/AddUserForm')));
const AddWarehouseForm = Loadable(lazy(() => import('views/pages/forms/AddWarehouseForm')));
const AddInventory = Loadable(lazy(() => import('views/pages/forms/AddInventoryForm')));
const AddPurchaseOrderForm = Loadable(lazy(() => import('views/pages/forms/AddPurchaseOrderForm')));
const AddAgentForm = Loadable(lazy(() => import('views/pages/forms/AddAgentForm')));
const AddMitraForm = Loadable(lazy(() => import('views/pages/forms/AddMitraForm')));
const AddContactForm = Loadable(lazy(() => import('views/pages/forms/AddContactForm')));

// INVOICE - CETAKAN
const SalesInvoice = Loadable(lazy(() => import('views/pages/invoice/SalesInvoice')));
const ReturnInvoice = Loadable(lazy(() => import('views/pages/invoice/ReturnInvoice')));
const PurchaseInvoice = Loadable(lazy(() => import('views/pages/invoice/PurchaseInvoice')));
const WarehouseReceiveInvoice = Loadable(lazy(() => import('views/pages/invoice/WarehouseReceiveInvoice')));

// OTHERS
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

// ==============================|| ADMIN ROUTING ||============================== //
export const AdminRoutes = {
    path: '/admin',
    element: (
        <AuthGuard>
            <AdminGuard>
                <MainLayout />
            </AdminGuard>
        </AuthGuard>
    ),
    children: [
        {
            path: 'dashboard',
            element: <Dashboard />
        },
        {
            path: 'user-management',
            element: <UserManagement />
        },
        {
            path: 'user-management/add',
            element: <AddUserForm />
        },
        {
            path: 'master-item',
            element: <MasterItem />
        },
        {
            path: 'master-item/add',
            element: <AddInventory />
        },
        {
            path: 'purchase-order',
            element: <PurchaseOrder />
        },
        {
            path: 'purchase-order/add',
            element: <AddPurchaseOrderForm />
        },
        {
            path: 'purchase-order/invoice',
            element: <PurchaseInvoice />
        },
        {
            path: 'warehouse',
            element: <Warehouse />
        },
        {
            path: 'warehouse/add',
            element: <AddWarehouseForm />
        },
        {
            path: 'warehouse/detail',
            element: <InventoryWarehouse />
        },
        {
            path: 'warehouse/receive-list/:id',
            element: <ReceiveList />
        },
        {
            path: 'warehouse/receive-list/:id/:tab',
            element: <ReceiveList />
        },
        {
            path: 'warehouse/receive-list/arrived/detail',
            element: <WarehouseReceiveInvoice />
        },
        {
            path: 'agent',
            element: <Agent />
        },
        {
            path: 'agent/add',
            element: <AddAgentForm />
        },
        {
            path: 'agent/inventory',
            element: <AgentInventory />
        },
        {
            path: 'agent/performance',
            element: <AgentPerformance />
        },
        {
            path: 'agent/report',
            element: <AgentReport />
        },
        {
            path: 'mitra',
            element: <Mitra />
        },
        {
            path: 'mitra/add',
            element: <AddMitraForm />
        },
        {
            path: 'mitra/inventory',
            element: <MitraInventory />
        },
        {
            path: 'mitra/performance',
            element: <MitraPerformance />
        },
        {
            path: 'mitra/report',
            element: <MitraReport />
        },
        {
            path: 'finance',
            element: <Finance />
        }
    ]
};

// ==============================|| WAREHOUSE ROUTING ||============================== //
export const WarehouseRoutes = {
    path: '/warehouse',
    element: (
        <AuthGuard>
            <WarehouseGuard>
                <MainLayout />
            </WarehouseGuard>
        </AuthGuard>
    ),
    children: [
        {
            path: 'dashboard',
            element: <DashboardWarehouse />
        },
        {
            path: 'inventory/agent-transaction',
            element: <InventoryWarehouse />
        },
        {
            path: 'inventory/receive-list',
            element: <ReceiveList />
        },
        {
            path: 'inventory/receive-list/:tab',
            element: <ReceiveList />
        },
        {
            path: 'inventory/receive-list/on-process/receive/:id',
            element: <ReceivePurchaseOrder />
        },
        {
            path: 'inventory/receive-list/arrived/detail',
            element: <WarehouseReceiveInvoice />
        },
        {
            path: 'inventory/sales-invoice',
            element: <SalesInvoice />
        },
        {
            path: 'inventory/return-report',
            element: <ReturnInvoice />
        },
        {
            path: 'contact',
            element: <ContactWarehouse />
        },
        {
            path: 'contact/add',
            element: <AddContactForm />
        },
        {
            path: 'report',
            element: <SamplePage />
        }
    ]
};

// ==============================|| AGENT ROUTING ||============================== //
export const AgentRoutes = {
    path: '/agent',
    element: (
        <AuthGuard>
            <AgentGuard>
                <MainLayout />
            </AgentGuard>
        </AuthGuard>
    ),
    children: [
        {
            path: 'dashboard',
            element: <SamplePage />
        },
        {
            path: 'mitra',
            element: <SamplePage />
        },
        {
            path: 'inventory',
            element: <SamplePage />
        },
        {
            path: 'inventory/mitra-transaction',
            element: <SamplePage />
        },
        {
            path: 'inventory/receive-list',
            element: <SamplePage />
        },
        {
            path: 'inventory/receive-list/:tab',
            element: <SamplePage />
        },
        {
            path: 'inventory/receive-list/on-process/receive/:id',
            element: <SamplePage />
        },
        {
            path: 'inventory/receive-list/arrived/detail',
            element: <SamplePage />
        },
        {
            path: 'inventory/sales-invoice',
            element: <SamplePage />
        },
        {
            path: 'inventory/return-report',
            element: <SamplePage />
        },
        {
            path: 'finance',
            element: <SamplePage />
        },
        {
            path: 'report',
            element: <SamplePage />
        }
    ]
};
