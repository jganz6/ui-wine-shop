/* eslint-disable camelcase */
// project imports
import services from 'utils/mockAdapter';

let users = [
    {
        id: '#C-001',
        role: 'Admin',
        name: 'Joseph William 1',
        email: 'Joseph@mail.com',
        address: 'Hong Kong, China',
        phone: '07327426426',
        status: 1
    },
    {
        id: '#C-002',
        role: 'Mitra',
        name: 'Ashy Handgun 2',
        email: 'Akshay@mail.com',
        address: 'New York, USA',
        phone: '07327426426',
        status: 2
    },
    {
        id: '#C-003',
        role: 'Mitra',
        name: 'Larry Doe 3',
        email: 'larry@mail.com',
        address: 'Hong Kong, China',
        phone: '07327426426',
        status: 2
    },
    {
        id: '#C-004',
        role: 'Mitra',
        name: 'Sara Soudan 4',
        email: 'Sara@mail.com',
        address: 'New York, USA',
        phone: '07327426426',
        status: 3
    },
    {
        id: '#C-005',
        role: 'Mitra',
        name: 'Joseph William 5',
        email: 'Joseph@mail.com',
        address: 'Hong Kong, China',
        phone: '07327426426',
        status: 1
    },
    {
        id: '#C-006',
        role: 'Mitra',
        name: 'Aisha Handgun 6',
        email: 'Akshay@mail.com',
        address: 'New York, USA',
        phone: '07327426426',
        status: 3
    },
    {
        id: '#C-007',
        role: 'Agent',
        name: 'Larky Doe 7',
        email: 'larry@mail.com',
        address: 'Hong Kong, China',
        phone: '07327426426',
        status: 2
    },
    {
        id: '#C-008',
        role: 'Mitra',
        name: 'Sara Soupier 8',
        email: 'Sara@mail.com',
        address: 'New York, USA',
        phone: '07327426426',
        status: 1
    },
    {
        id: '#C-009',
        role: 'Mitra',
        name: 'Joseph William 9',
        email: 'Joseph@mail.com',
        address: 'Hong Kong, China',
        phone: '07327426426',
        status: 3
    },
    {
        id: '#C-010',
        role: 'Admin',
        name: 'Anshan Handgun 10',
        email: 'Akshay@mail.com',
        address: 'New York, USA',
        phone: '07327426426',
        status: 1
    },
    {
        id: '#C-011',
        role: 'Mitra',
        name: 'Lardy Doe 11',
        email: 'larry@mail.com',
        address: 'Hong Kong, China',
        phone: '07327426426',
        status: 1
    },
    {
        id: '#C-012',
        role: 'Agent',
        name: 'Sara Soudan 12',
        email: 'Sara@mail.com',
        address: 'New York, USA',
        phone: '07327426426',
        status: 3
    },
    {
        id: '#C-013',
        role: 'Mitra',
        name: 'Joseph William 13',
        email: 'Joseph@mail.com',
        address: 'Hong Kong, China',
        phone: '07327426426',
        status: 2
    },
    {
        id: '#C-014',
        role: 'Mitra',
        name: 'Ashy Handgun 14',
        email: 'Akshay@mail.com',
        address: 'New York, USA',
        phone: '07327426426',
        status: 2
    },
    {
        id: '#C-015',
        role: 'Mitra',
        name: 'Lars Doe 15',
        email: 'larry@mail.com',
        address: 'Hong Kong, China',
        phone: '07327426426',
        status: 1
    },
    {
        id: '#C-016',
        role: 'Mitra',
        name: 'Sara Souvenir 16',
        email: 'Sara@mail.com',
        address: 'New York, USA',
        phone: '07327426426',
        status: 2
    }
];

// ==============================|| MOCK SERVICES ||============================== //

services.onGet('/api/user/list').reply(200, { users });

services.onPost('/api/user').reply((request) => {
    try {
        const { first_name, last_name, role, email, phone, address } = JSON.parse(request.data);

        const user = {
            id: `C-${Math.floor(Math.random() * 90000) + 10000}`,
            name: `${first_name} ${last_name}`,
            role,
            email,
            address,
            phone,
            status: 2
        };

        users.push(user);

        return [200, users];
    } catch (err) {
        console.error(err);
        return [500, { message: 'Internal server error' }];
    }
});

services.onPatch('/api/user').reply((request) => {
    try {
        const { id, first_name, last_name, role, email, address, phone, status } = JSON.parse(request.data);

        const user = {
            id,
            name: `${first_name} ${last_name}`,
            role,
            email,
            address,
            phone,
            status
        };

        const objIndex = users.findIndex((obj) => obj.id === id);

        users[objIndex] = user;

        return [200, users];
    } catch (err) {
        console.error(err);
        return [500, { message: 'Internal server error' }];
    }
});

services.onPost('/api/user/delete').reply((request) => {
    try {
        const { id } = JSON.parse(request.data);
        users = users.filter((item) => item.id !== id);
        return [200, users];
    } catch (err) {
        console.error(err);
        return [500, { message: 'Internal server error' }];
    }
});
