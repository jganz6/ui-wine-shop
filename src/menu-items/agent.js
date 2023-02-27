// third-party
import { FormattedMessage } from 'react-intl';

import SvgIcons from 'assets/images/menu';

const agent = {
    id: 'main',
    title: 'main',
    icon: null,
    type: 'group',
    children: [
        {
            id: 'dashboard',
            title: <FormattedMessage id="dashboard" />,
            type: 'item',
            url: '/agent/dashboard',
            icon: SvgIcons.DashboardSVG,
            breadcrumbs: true,
            external: false,
            target: false
        },
        {
            id: 'mitra',
            title: 'Mitra',
            type: 'item',
            url: '/agent/mitra',
            icon: SvgIcons.MitraSVG,
            breadcrumbs: true,
            external: false,
            target: false
        },
        {
            id: 'inventory',
            title: 'Inventory',
            type: 'collapse',
            icon: SvgIcons.WarehouseSVG,
            children: [
                {
                    id: 'receive-list',
                    title: 'Receive List',
                    type: 'item',
                    url: '/agent/inventory/receive-list',
                    breadcrumbs: true
                },
                {
                    id: 'mitra-transaction',
                    title: 'Mitra Transaction',
                    type: 'item',
                    url: '/agent/inventory/mitra-transaction',
                    breadcrumbs: false
                }
            ]
        },
        {
            id: 'receive-list',
            title: 'Receive List',
            type: 'subtance',
            url: '/agent/inventory/receive-list',
            icon: SvgIcons.WarehouseSVG,
            children: [
                {
                    id: 'receive-purchase-order',
                    title: 'Receive Purchase Order',
                    type: 'item',
                    url: '/agent/inventory/receive-list/on-process/receive',
                    breadcrumbs: true
                },
                {
                    id: 'receive-transaction-detail',
                    title: 'Receive Transaction',
                    type: 'item',
                    url: '/agent/inventory/receive-list/arrived/detail',
                    breadcrumbs: true
                }
            ]
        },
        {
            id: 'finance',
            title: 'Finance',
            type: 'item',
            url: '/agent/finance',
            icon: SvgIcons.FinanceSVG,
            breadcrumbs: true,
            external: false,
            target: false
        },
        {
            id: 'report',
            title: 'Report',
            type: 'item',
            url: '/agent/report',
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

export default agent;
