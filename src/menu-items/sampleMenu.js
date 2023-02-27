// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconBrandChrome, IconHelp, IconSitemap, IconMenu, IconKey } from '@tabler/icons';

// constant
const icons = {
    IconBrandChrome,
    IconHelp,
    IconSitemap,
    IconMenu,
    IconKey
};

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const sampleMenu = {
    id: 'sample-docs-roadmap',
    title: <FormattedMessage id="others" />,
    icon: icons.IconHelp,
    type: 'group',
    children: [
        {
            id: 'sample-page',
            title: (
                <>
                    <FormattedMessage id="Single Menu" />
                </>
            ),
            type: 'item',
            url: '/sample-page',
            icon: icons.IconBrandChrome,
            breadcrumbs: false
        },
        {
            id: 'documentation',
            title: <FormattedMessage id="External Page" />,
            type: 'item',
            url: 'https://meeroket.gitbook.io/',
            icon: icons.IconHelp,
            external: true,
            target: true
        },
        {
            id: 'dropdown',
            title: <FormattedMessage id="Dropdown" />,
            type: 'collapse',
            icon: icons.IconMenu,
            children: [
                {
                    id: 'menu-level-1.1',
                    title: (
                        <>
                            <FormattedMessage id="level" /> 1
                        </>
                    ),
                    type: 'item',
                    url: '#'
                },
                {
                    id: 'menu-level-1.2',
                    title: (
                        <>
                            <FormattedMessage id="level" /> 1
                        </>
                    ),
                    type: 'collapse',
                    children: [
                        {
                            id: 'menu-level-2.1',
                            title: (
                                <>
                                    <FormattedMessage id="level" /> 2
                                </>
                            ),
                            type: 'item',
                            url: '#'
                        },
                        {
                            id: 'menu-level-2.2',
                            title: (
                                <>
                                    <FormattedMessage id="level" /> 2
                                </>
                            ),
                            type: 'collapse',
                            children: [
                                {
                                    id: 'menu-level-3.1',
                                    title: (
                                        <>
                                            <FormattedMessage id="level" /> 3
                                        </>
                                    ),
                                    type: 'item',
                                    url: '#'
                                },
                                {
                                    id: 'menu-level-3.2',
                                    title: (
                                        <>
                                            <FormattedMessage id="level" /> 3
                                        </>
                                    ),
                                    type: 'item',
                                    url: '#',
                                    caption: <FormattedMessage id="menu-level-subtitle-collapse" />
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
};

export default sampleMenu;
