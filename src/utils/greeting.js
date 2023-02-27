/* eslint-disable no-else-return */
const greeting = () => {
    const d = new Date();
    const time = d.getHours();
    if (time < 12) {
        return 'Good Morning,';
    } else if (time < 18) {
        return 'Good afternoon,';
    } else {
        return 'Good evening,';
    }
};

export default greeting;
