// third-party
import { FormattedMessage } from 'react-intl';

import SvgIcons from 'assets/images/menu';

const admin = {
    id: 'main',
    title: 'main',
    icon: null,
    type: 'group',
    children: [
        {
            id: 'dashboard',
            title: <FormattedMessage id="dashboard" />,
            type: 'item',
            url: '/admin/dashboard',
            icon: SvgIcons.DashboardSVG,
            breadcrumbs: true,
            external: false,
            target: false
        },
        {
            id: 'user-management',
            title: 'User Management',
            type: 'item',
            url: '/admin/user-management',
            icon: SvgIcons.UserManagementSVG,
            breadcrumbs: true,
            external: false,
            target: false
        },
        {
            id: 'user-management',
            title: 'User Management',
            type: 'subtance',
            url: '/admin/user-management',
            icon: SvgIcons.UserManagementSVG,
            children: [
                {
                    id: 'add-user',
                    title: 'Add User',
                    type: 'item',
                    hide: true,
                    url: '/admin/user-management/add',
                    breadcrumbs: true
                }
            ]
        },
        {
            id: 'inventory-management',
            title: 'Inventory',
            type: 'collapse',
            icon: SvgIcons.OutletSVG,
            children: [
                {
                    id: 'master-item',
                    title: 'Master Item',
                    type: 'item',
                    url: '/admin/master-item',
                    breadcrumbs: true
                },
                {
                    id: 'purchase-order',
                    title: 'Purchase Order',
                    type: 'item',
                    url: '/admin/purchase-order',
                    breadcrumbs: true
                }
            ]
        },
        {
            id: 'master-item',
            title: 'Master Item',
            type: 'subtance',
            url: '/admin/master-item',
            icon: SvgIcons.OutletSVG,
            children: [
                {
                    id: 'add-item',
                    title: 'Add Item',
                    type: 'item',
                    hide: true,
                    url: '/admin/master-item/add',
                    breadcrumbs: true
                }
            ]
        },
        {
            id: 'purchase-order',
            title: 'Purchase Order',
            type: 'subtance',
            url: '/admin/purchase-order',
            children: [
                {
                    id: 'create-order',
                    title: 'Create Purchase Order',
                    type: 'item',
                    hide: true,
                    url: '/admin/purchase-order/add',
                    breadcrumbs: true
                },
                {
                    id: 'purchase-invoice',
                    title: 'Purchase Invoice',
                    type: 'item',
                    hide: true,
                    url: '/admin/purchase-order/invoice',
                    breadcrumbs: true
                }
            ]
        },
        {
            id: 'warehouse',
            title: 'Warehouse',
            type: 'item',
            url: '/admin/warehouse',
            icon: SvgIcons.WarehouseSVG,
            breadcrumbs: true,
            external: false,
            target: false
        },
        {
            id: 'warehouse',
            title: 'Warehouse',
            type: 'subtance',
            url: '/admin/warehouse',
            icon: SvgIcons.WarehouseSVG,
            children: [
                {
                    id: 'add-warehouse',
                    title: 'Add New Warehouse',
                    type: 'item',
                    hide: true,
                    url: '/admin/warehouse/add',
                    breadcrumbs: true
                },
                {
                    id: 'receive-list',
                    title: 'Receive List',
                    type: 'item',
                    hide: true,
                    url: '/admin/warehouse/receive-list',
                    breadcrumbs: true
                },
                {
                    id: 'warehouse-detail',
                    title: 'Warehouse Detail',
                    type: 'item',
                    hide: true,
                    url: '/admin/warehouse/detail',
                    breadcrumbs: true
                },
                {
                    id: 'warehouse-add-inventory',
                    title: 'Add Inventory Warehouse',
                    type: 'item',
                    hide: true,
                    url: '/admin/warehouse/detail/inventory/add',
                    breadcrumbs: true
                }
            ]
        },
        {
            id: 'receive-list',
            title: 'Receive List',
            type: 'subtance',
            url: '/admin/warehouse/receive-list',
            icon: SvgIcons.WarehouseSVG,
            children: [
                {
                    id: 'receive-purchase-order',
                    title: 'Receive Purchase Order',
                    type: 'item',
                    url: '/admin/warehouse/receive-list/on-process/receive',
                    breadcrumbs: true
                },
                {
                    id: 'receive-transaction-detail',
                    title: 'Receive Transaction',
                    type: 'item',
                    url: '/admin/warehouse/receive-list/arrived/detail',
                    breadcrumbs: true
                }
            ]
        },
        {
            id: 'agent',
            title: 'Agent',
            type: 'item',
            url: '/admin/agent',
            icon: SvgIcons.AgentSVG,
            breadcrumbs: true,
            external: false,
            target: false
        },
        {
            id: 'agent',
            title: 'Agent',
            type: 'subtance',
            url: '/admin/agent',
            icon: SvgIcons.AgentSVG,
            children: [
                {
                    id: 'add-agent',
                    title: 'Add Agent',
                    type: 'item',
                    hide: true,
                    url: '/admin/agent/add',
                    breadcrumbs: true
                },
                {
                    id: 'agent-inventory',
                    title: 'Agent Inventory',
                    type: 'item',
                    hide: true,
                    url: '/admin/agent/inventory',
                    breadcrumbs: true
                },
                {
                    id: 'agent-performance',
                    title: 'Agent Performance',
                    type: 'item',
                    hide: true,
                    url: '/admin/agent/performance',
                    breadcrumbs: true
                },
                {
                    id: 'agent-report',
                    title: 'Agent Report',
                    type: 'item',
                    hide: true,
                    url: '/admin/agent/report',
                    breadcrumbs: true
                }
            ]
        },
        {
            id: 'mitra',
            title: 'Mitra',
            type: 'item',
            url: '/admin/mitra',
            icon: SvgIcons.MitraSVG,
            breadcrumbs: true,
            external: false,
            target: false
        },
        {
            id: 'finance',
            title: 'Finance',
            type: 'item',
            url: '/admin/finance',
            icon: SvgIcons.FinanceSVG,
            breadcrumbs: true,
            external: false,
            target: false
        },
        {
            id: 'profile',
            title: 'Profile Management',
            type: 'item',
            hide: true,
            url: '/user/profile',
            breadcrumbs: true,
            external: false,
            target: false
        }
    ]
};

export default admin;
