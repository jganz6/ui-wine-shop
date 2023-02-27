import LAYOUT_CONST from 'constant';

export const JWT_API = {
    secret: 'SECRET-KEY',
    timeout: '1 days'
};

export const FIREBASE_API = {
    apiKey: 'AIzaSyDCIu9qFVTZSkp-uCkD6uv9VyNhl-sHJjQ',
    authDomain: 'reactjsboilerplate.firebaseapp.com',
    projectId: 'reactjsboilerplate',
    storageBucket: 'reactjsboilerplate.appspot.com',
    messagingSenderId: '733529590367',
    appId: '1:733529590367:web:39851d082ee0ef1d9a29ea',
    measurementId: 'G-84P7ED9EEQ'
};

export const AUTH0_API = {
    client_id: '7T4IlWis4DKHSbG8JAye4Ipk0rvXkH9V',
    domain: 'dev-w0-vxep3.us.auth0.com'
};

export const AWS_API = {
    poolId: 'us-east-1_AOfOTXLvD',
    appClientId: '3eau2osduslvb7vks3vsh9t7b0'
};

// basename: only at build time to set, and Don't add '/' at end off BASENAME for breadcrumbs, also Don't put only '/' use blank('') instead,
export const BASE_PATH = '';

export const DASHBOARD_PATH = '/dashboard';
export const DASHBOARD_PATH_ADMIN = '/admin/dashboard';
export const DASHBOARD_PATH_WAREHOUSE = '/warehouse/dashboard';
export const DASHBOARD_PATH_AGENT = '/agent/dashboard';

export const HORIZONTAL_MAX_ITEM = 6;

const config = {
    layout: LAYOUT_CONST.VERTICAL_LAYOUT, // vertical, horizontal
    drawerType: LAYOUT_CONST.DEFAULT_DRAWER, // default, mini-drawer
    fontFamily: `'Montserrat', sans-serif`,
    borderRadius: 8,
    outlinedFilled: true,
    navType: 'light', // light, dark
    presetColor: 'default', // default, theme1, theme2, theme3, theme4, theme5, theme6
    locale: 'en', // 'en' - English, 'fr' - French, 'ro' - Romanian, 'zh' - Chinese
    rtlLayout: false,
    container: false
};

export default config;
