// third-party
import { FormattedMessage } from 'react-intl';

import SvgIcons from 'assets/images/menu';

const warehouse = {
    id: 'main',
    title: 'main',
    icon: null,
    type: 'group',
    children: [
        {
            id: 'dashboard',
            title: <FormattedMessage id="dashboard" />,
            type: 'item',
            url: '/warehouse/dashboard',
            icon: SvgIcons.DashboardSVG,
            breadcrumbs: true,
            external: false,
            target: false
        },
        {
            id: 'inventory',
            title: 'Inventory',
            type: 'collapse',
            // url: '/warehouse/inventory',
            icon: SvgIcons.WarehouseSVG,
            children: [
                {
                    id: 'receive-list',
                    title: 'Receive List',
                    type: 'item',
                    url: '/warehouse/inventory/receive-list',
                    breadcrumbs: true
                },
                {
                    id: 'agent-transaction',
                    title: 'Agent Transaction',
                    type: 'item',
                    url: '/warehouse/inventory/agent-transaction',
                    breadcrumbs: false
                }
            ]
        },
        {
            id: 'receive-list',
            title: 'Receive List',
            type: 'subtance',
            url: '/warehouse/inventory/receive-list',
            icon: SvgIcons.WarehouseSVG,
            children: [
                {
                    id: 'receive-purchase-order',
                    title: 'Receive Purchase Order',
                    type: 'item',
                    url: '/warehouse/inventory/receive-list/on-process/receive',
                    breadcrumbs: true
                },
                {
                    id: 'receive-transaction-detail',
                    title: 'Receive Transaction',
                    type: 'item',
                    url: '/warehouse/inventory/receive-list/arrived/detail',
                    breadcrumbs: true
                }
            ]
        },
        {
            id: 'inventory',
            title: 'Inventory',
            type: 'subtance',
            url: '/warehouse/inventory',
            icon: SvgIcons.WarehouseSVG,
            children: [
                {
                    id: 'warehouse-sales-invoice',
                    title: 'Sales Invoice',
                    type: 'item',
                    hide: true,
                    url: '/warehouse/inventory/sales-invoice',
                    breadcrumbs: true
                },
                {
                    id: 'warehouse-return-invoice',
                    title: 'Item List Return',
                    type: 'item',
                    hide: true,
                    url: '/warehouse/inventory/return-report',
                    breadcrumbs: true
                }
            ]
        },
        {
            id: 'contact',
            title: 'Contact',
            type: 'item',
            url: '/warehouse/contact',
            icon: SvgIcons.ContactSVG,
            breadcrumbs: true,
            external: false,
            target: false
        },
        {
            id: 'report',
            title: 'Report',
            type: 'item',
            url: '/warehouse/report',
            icon: SvgIcons.ReportSVG,
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

export default warehouse;
