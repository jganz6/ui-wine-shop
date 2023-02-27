/* eslint-disable camelcase */
// project imports
import services from 'utils/mockAdapter';

let warehouses = [
    {
        id: 'W-001',
        name: 'Gudang A01',
        email: 'Joseph@mail.com',
        address: 'Jl. Kalibaru Tengan No 3',
        phone: '081243277232',
        delivery: 450,
        request_order: 128,
        return_item: 20,
        status: 1
    },
    {
        id: 'W-002',
        name: 'Gudang A02',
        email: 'Joseph@mail.com',
        address: 'Jl. Merapi No 2',
        phone: '08274848399484',
        delivery: 35,
        request_order: 20,
        return_item: 3,
        status: 1
    },
    {
        id: 'W-003',
        name: 'Gudang A03',
        email: 'Joseph@mail.com',
        address: 'Jl. Kebangsaan No 2',
        phone: '085243242473',
        delivery: 100,
        request_order: 120,
        return_item: 14,
        status: 1
    },
    {
        id: 'W-004',
        name: 'Gudang A04',
        email: 'Joseph@mail.com',
        address: 'Jl. Asia Africa No 2',
        phone: '087327282884',
        delivery: 130,
        request_order: 140,
        return_item: 40,
        status: 1
    },
    {
        id: 'W-005',
        name: 'Gudang A05',
        email: 'Joseph@mail.com',
        address: 'Jl. Perjuangan Lima No 4',
        phone: '098578847742',
        delivery: 130,
        request_order: 40,
        return_item: 32,
        status: 1
    },
    {
        id: 'W-006',
        name: 'Gudang A06',
        email: 'Joseph@mail.com',
        address: 'Jl. Kemanggisan 100 No 2',
        phone: '0837577727275',
        delivery: 40,
        request_order: 30,
        return_item: 2,
        status: 1
    },
    {
        id: 'W-007',
        name: 'Gudang A07',
        email: 'Joseph@mail.com',
        address: 'Jl. Malaka Biru No 2',
        phone: '08182838482',
        delivery: 100,
        request_order: 30,
        return_item: 10,
        status: 1
    },
    {
        id: 'W-008',
        name: 'Gudang A08',
        email: 'Joseph@mail.com',
        address: 'Jl. Johar Baru No 3',
        phone: '08942772364623',
        delivery: 120,
        request_order: 200,
        return_item: 4,
        status: 1
    },
    {
        id: 'W-009',
        name: 'Gudang A09',
        email: 'Joseph@mail.com',
        address: 'Jl. Mangga Dua No 6',
        phone: '0827474377344',
        delivery: 130,
        request_order: 420,
        return_item: 44,
        status: 1
    },
    {
        id: 'W-010',
        name: 'Gudang A10',
        email: 'Joseph@mail.com',
        address: 'Jl. Pintu Timur No 7',
        phone: '0874377746633',
        delivery: 230,
        request_order: 140,
        return_item: 40,
        status: 1
    }
];

const orders = [
    {
        id: 'O-001',
        request_date: '24 Agustus 2022',
        agent_name: 'Mr. Sopyan',
        image: 'https://www.foodierate.com/uploads/fullsize/89418/1tobcW634e1e63be873_udang-keju-mie-gacoan.jpg',
        name: 'Udang Keju',
        qty: '4',
        description: 'Berat : 2 Kg, Rasa Keju',
        capital_price: '70000',
        selling_price: '75000',
        income: '300000',
        status: 1
    },
    {
        id: 'O-002',
        request_date: '24 Agustus 2022',
        agent_name: 'Mrs. Rachel',
        image: 'https://i0.wp.com/i.gojekapi.com/darkroom/gofood-indonesia/v2/images/uploads/32ac3b20-a924-4ee5-a9c6-74fc35e25f08_Go-Biz_20220627_184748.jpeg',
        name: 'Kaicat',
        qty: '2',
        description: 'Berat : 1 Kg, Rasa Ayam Original',
        capital_price: '40000',
        selling_price: '50000',
        income: '100000',
        status: 2
    },
    {
        id: 'O-003',
        request_date: '25 Mei 2022',
        agent_name: 'Mr. Agung',
        image: 'https://img.kurio.network/OOo7gzHmQoP2Y_P8COlidb77Xbs=/1200x1200/filters:quality(80)/https://kurio-img.kurioapps.com/21/06/28/79fc380f-6664-4de3-92c0-34884fc7af56.jpe',
        name: 'Lumpia Ayam',
        qty: '3',
        description: 'Berat : 2 Kg, Rasa Ayam',
        capital_price: '80000',
        selling_price: '85000',
        income: '170000',
        status: 1
    },
    {
        id: 'O-004',
        request_date: '26 Agustus 2022',
        agent_name: 'Mr. Septiyan',
        image: 'https://cdns.klimg.com/merdeka.com/i/w/news/2022/09/22/1474750/540x270/hadirkan-sensasi-beda-nikmati-uniknya-cita-rasa-bakpao-telur-asin-ini-di-jakarta.jpg',
        name: 'Bakpau Keju',
        qty: '3',
        description: 'Berat : 3 Kg, Rasa Keju',
        capital_price: '46000',
        selling_price: '50000',
        income: '150000',
        status: 3
    },
    {
        id: 'O-005',
        request_date: '24 Agustus 2022',
        agent_name: 'Mr. Agus',
        image: 'https://cdns.klimg.com/dream.co.id/resized/640x320/news/2020/09/25/148105/resep-bakpao-pandan-isi-cokelat-lumer-manjakakan-lidah-200925z.jpg',
        name: 'Bakpau Pandan',
        qty: '5',
        description: 'Berat : 3 Kg, Rasa Keju',
        capital_price: '75000',
        selling_price: '80000',
        income: '400000',
        status: 1
    },
    {
        id: 'O-006',
        request_date: '30 September 2022',
        agent_name: 'Mr. Asyer',
        image: 'https://asset.kompas.com/crops/Atp1STR6jMcegrNX0anTx5eN7xY=/0x0:1000x667/780x390/data/photo/2021/05/23/60aa371ed27a5.jpg',
        name: 'Siomay',
        qty: '4',
        description: 'Berat : 1 Kg, Rasa Ayam',
        capital_price: '90000',
        selling_price: '10000',
        income: '40000',
        status: 4
    },
    {
        id: 'O-007',
        request_date: '1 November 2022',
        agent_name: 'Mrs. Melisa',
        image: 'https://awsimages.detik.net.id/community/media/visual/2022/06/02/viral-restoran-sushi-tidak-halal-ini-3-bahan-sushi-yang-tak-halal-3.jpeg?w=1200',
        name: 'Sushi',
        qty: '6',
        description: 'Berat : 2 Kg, Rasa Ikan',
        capital_price: '50000',
        selling_price: '55000',
        income: '330000',
        status: 4
    },
    {
        id: 'O-008',
        request_date: '3 November 2022',
        agent_name: 'Mrs. Syafira',
        image: 'https://awsimages.detik.net.id/community/media/visual/2020/11/20/resep-pangsit-goreng.jpeg?w=700&q=90',
        name: 'Pangsit Goreng',
        qty: '8',
        description: 'Berat : 3 Kg, Rasa Ayam',
        capital_price: '55000',
        selling_price: '60000',
        income: '480000',
        status: 1
    },
    {
        id: 'O-009',
        request_date: '7 November 2022',
        agent_name: 'Mrs. Laura',
        image: 'https://www.masakapahariini.com/wp-content/uploads/2019/09/shutterstock_247169467-500x300.jpg',
        name: 'Lumpia Udang',
        qty: '7',
        description: 'Berat : 2 Kg, Rasa Udang',
        capital_price: '65000',
        selling_price: '70000',
        income: '490000',
        status: 2
    },
    {
        id: 'O-010',
        request_date: '24 Agustus 2022',
        agent_name: 'Mr. Candra',
        image: 'https://cdn1-production-images-kly.akamaized.net/bmn1A32YVgDuIsW-ykj77K8H1oQ=/1x30:1000x593/1200x675/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/3328136/original/010708500_1608347065-shutterstock_247595971.jpg',
        name: 'Nugget Ayam',
        qty: '5',
        description: 'Berat : 1 Kg, Rasa Ayam',
        capital_price: '77000',
        selling_price: '80000',
        income: '400000',
        status: 2
    }
];

const transactions = [
    {
        id: 'INV-001',
        user_name: 'Robert Carlo',
        request_date: '01 Jan 2023',
        status_payment: 1,
        status: 1,
        warehouse: 'Gudang Utama',
        destination_address: 'Jln. Kalibaru Tengan No 3',
        total: 35000000,
        solution: '',
        problem: '',
        proof_attachment: '',
        details: [
            {
                id: 'I-001',
                product_name: 'Sushi rasa ikan',
                qty: 1,
                price: 30000
            },
            {
                id: 'I-002',
                product_name: 'Udang Keju',
                qty: 2,
                price: 20000
            },
            {
                id: 'I-003',
                product_name: 'Siomay',
                qty: 5,
                price: 20000
            },
            {
                id: 'I-004',
                product_name: 'Bakpau Keju',
                qty: 10,
                price: 40000
            },
            {
                id: 'I-005',
                product_name: 'Bakpau Pandan',
                qty: 4,
                price: 50000
            }
        ]
    },
    {
        id: 'INV-002',
        user_name: 'David Harison',
        request_date: '13 Jan 2023',
        status_payment: 1,
        status: 1,
        warehouse: 'Gudang Utama',
        destination_address: 'Jln. Merapi Raya No 2',
        total: 25000000,
        solution: '',
        problem: '',
        proof_attachment: '',
        details: [
            {
                id: 'I-001',
                product_name: 'Sushi rasa ikan',
                qty: 1,
                price: 30000
            },
            {
                id: 'I-002',
                product_name: 'Udang Keju',
                qty: 2,
                price: 20000
            },
            {
                id: 'I-003',
                product_name: 'Siomay',
                qty: 5,
                price: 20000
            },
            {
                id: 'I-004',
                product_name: 'Bakpau Keju',
                qty: 10,
                price: 40000
            },
            {
                id: 'I-005',
                product_name: 'Bakpau Pandan',
                qty: 4,
                price: 50000
            }
        ]
    },
    {
        id: 'INV-003',
        user_name: 'Randy Greenlee',
        request_date: '13 Feb 2023',
        status_payment: 3,
        status: 2,
        warehouse: 'Gudang Utama',
        destination_address: 'Jln. Kebangsaan No 4',
        total: 30000000,
        solution: '',
        problem: '',
        proof_attachment: '',
        details: [
            {
                id: 'I-001',
                product_name: 'Sushi rasa ikan',
                qty: 1,
                price: 30000
            },
            {
                id: 'I-002',
                product_name: 'Udang Keju',
                qty: 2,
                price: 20000
            },
            {
                id: 'I-003',
                product_name: 'Siomay',
                qty: 5,
                price: 20000
            },
            {
                id: 'I-004',
                product_name: 'Bakpau Keju',
                qty: 10,
                price: 40000
            },
            {
                id: 'I-005',
                product_name: 'Bakpau Pandan',
                qty: 4,
                price: 50000
            }
        ]
    },
    {
        id: 'INV-004',
        user_name: 'James Witcwicky',
        request_date: '15 Feb 2023',
        status_payment: 1,
        status: 2,
        warehouse: 'Gudang Utama',
        destination_address: 'Jln. Asia Africa No 3',
        total: 20000000,
        solution: '',
        problem: '',
        proof_attachment: '',
        details: [
            {
                id: 'I-001',
                product_name: 'Sushi rasa ikan',
                qty: 1,
                price: 30000
            },
            {
                id: 'I-002',
                product_name: 'Udang Keju',
                qty: 2,
                price: 20000
            },
            {
                id: 'I-003',
                product_name: 'Siomay',
                qty: 5,
                price: 20000
            },
            {
                id: 'I-004',
                product_name: 'Bakpau Keju',
                qty: 10,
                price: 40000
            },
            {
                id: 'I-005',
                product_name: 'Bakpau Pandan',
                qty: 4,
                price: 50000
            }
        ]
    },
    {
        id: 'INV-005',
        user_name: 'Olivia Shine',
        request_date: '15 Mar 2023',
        status_payment: 2,
        status: 1,
        warehouse: 'Gudang Utama',
        destination_address: 'Jln. Perjuangan Lima No 4',
        total: 22000000,
        solution: '',
        problem: '',
        proof_attachment: '',
        details: [
            {
                id: 'I-001',
                product_name: 'Sushi rasa ikan',
                qty: 1,
                price: 30000
            },
            {
                id: 'I-002',
                product_name: 'Udang Keju',
                qty: 2,
                price: 20000
            },
            {
                id: 'I-003',
                product_name: 'Siomay',
                qty: 5,
                price: 20000
            },
            {
                id: 'I-004',
                product_name: 'Bakpau Keju',
                qty: 10,
                price: 40000
            },
            {
                id: 'I-005',
                product_name: 'Bakpau Pandan',
                qty: 4,
                price: 50000
            }
        ]
    },
    {
        id: 'INV-006',
        user_name: 'Veronica',
        request_date: '11 Mar 2023',
        status_payment: 2,
        status: 1,
        warehouse: 'Gudang Utama',
        destination_address: 'Jln. Kemanggisan 100 No 2',
        total: 30000000,
        solution: '',
        problem: '',
        proof_attachment: '',
        details: [
            {
                id: 'I-001',
                product_name: 'Sushi rasa ikan',
                qty: 1,
                price: 30000
            },
            {
                id: 'I-002',
                product_name: 'Udang Keju',
                qty: 2,
                price: 20000
            },
            {
                id: 'I-003',
                product_name: 'Siomay',
                qty: 5,
                price: 20000
            },
            {
                id: 'I-004',
                product_name: 'Bakpau Keju',
                qty: 10,
                price: 40000
            },
            {
                id: 'I-005',
                product_name: 'Bakpau Pandan',
                qty: 4,
                price: 50000
            }
        ]
    },
    {
        id: 'INV-007',
        user_name: 'Franky Sitohang',
        request_date: '11 Mar 2023',
        status_payment: 2,
        status: 4,
        warehouse: 'Gudang Utama',
        destination_address: 'Jln. Malaka Biru No 2',
        total: 26000000,
        solution: 'Reshipment',
        problem: 'Food is stale',
        proof_attachment: 'https://sgp1.digitaloceanspaces.com/radarbogor/2021/05/2A3C0778-DA1B-4F6F-957C-C0427CC18FB1.jpeg',
        details: [
            {
                id: 'I-001',
                product_name: 'Sushi rasa ikan',
                qty: 1,
                price: 30000
            },
            {
                id: 'I-002',
                product_name: 'Udang Keju',
                qty: 2,
                price: 20000
            },
            {
                id: 'I-003',
                product_name: 'Siomay',
                qty: 5,
                price: 20000
            },
            {
                id: 'I-004',
                product_name: 'Bakpau Keju',
                qty: 10,
                price: 40000
            },
            {
                id: 'I-005',
                product_name: 'Bakpau Pandan',
                qty: 4,
                price: 50000
            }
        ]
    },
    {
        id: 'INV-008',
        user_name: 'Samantha Bake',
        request_date: '13 Apr 2023',
        status_payment: 3,
        status: 1,
        warehouse: 'Gudang Utama',
        destination_address: 'Jln.  Johar Baru No 3',
        total: 18500000,
        solution: '',
        problem: '',
        proof_attachment: '',
        details: [
            {
                id: 'I-001',
                product_name: 'Sushi rasa ikan',
                qty: 1,
                price: 30000
            },
            {
                id: 'I-002',
                product_name: 'Udang Keju',
                qty: 2,
                price: 20000
            },
            {
                id: 'I-003',
                product_name: 'Siomay',
                qty: 5,
                price: 20000
            },
            {
                id: 'I-004',
                product_name: 'Bakpau Keju',
                qty: 10,
                price: 40000
            },
            {
                id: 'I-005',
                product_name: 'Bakpau Pandan',
                qty: 4,
                price: 50000
            }
        ]
    },
    {
        id: 'INV-009',
        user_name: 'Jessica Wong',
        request_date: '14 Apr 2023',
        status_payment: 3,
        status: 1,
        warehouse: 'Gudang Utama',
        destination_address: 'Jln. Mangga Dua No 6',
        total: 26000000,
        solution: '',
        problem: '',
        proof_attachment: '',
        details: [
            {
                id: 'I-001',
                product_name: 'Sushi rasa ikan',
                qty: 1,
                price: 30000
            },
            {
                id: 'I-002',
                product_name: 'Udang Keju',
                qty: 2,
                price: 20000
            },
            {
                id: 'I-003',
                product_name: 'Siomay',
                qty: 5,
                price: 20000
            },
            {
                id: 'I-004',
                product_name: 'Bakpau Keju',
                qty: 10,
                price: 40000
            },
            {
                id: 'I-005',
                product_name: 'Bakpau Pandan',
                qty: 4,
                price: 50000
            }
        ]
    },
    {
        id: 'INV-010',
        user_name: 'Emilia Johanson',
        request_date: '16 Apr 2023',
        status_payment: 2,
        status: 4,
        warehouse: 'Gudang Utama',
        destination_address: 'Jln. Pintu Timur No 7',
        total: 43000000,
        solution: 'Money Refund',
        problem: 'Broken Stuff',
        proof_attachment:
            'https://img.okezone.com/content/2016/06/15/512/1416056/makanan-kedaluwarsa-banyak-dijual-di-karanganyar-Y4CPzNNHDQ.jpg',
        details: [
            {
                id: 'I-001',
                product_name: 'Sushi rasa ikan',
                qty: 1,
                price: 30000
            },
            {
                id: 'I-002',
                product_name: 'Udang Keju',
                qty: 2,
                price: 20000
            },
            {
                id: 'I-003',
                product_name: 'Siomay',
                qty: 5,
                price: 20000
            },
            {
                id: 'I-004',
                product_name: 'Bakpau Keju',
                qty: 10,
                price: 40000
            },
            {
                id: 'I-005',
                product_name: 'Bakpau Pandan',
                qty: 4,
                price: 50000
            }
        ]
    }
];
// ==============================|| MOCK SERVICES ||============================== //

services.onGet('/api/warehouse/list').reply(200, { warehouses });

services.onPost('/api/warehouse').reply((request) => {
    try {
        const { name, email, address, phone, delivery, request_order, return_item, status } = JSON.parse(request.data);

        const user = {
            id: `W-${Math.floor(Math.random() * 90000) + 10000}`,
            name,
            email,
            address,
            phone,
            delivery,
            request_order,
            return_item,
            status
        };

        warehouses.push(user);

        return [200, warehouses];
    } catch (err) {
        console.error(err);
        return [500, { message: 'Onternal server error' }];
    }
});

services.onPatch('/api/warehouse').reply((request) => {
    try {
        const { id, name, email, address, phone, delivery, request_order, return_item, status } = JSON.parse(request.data);

        const user = {
            id,
            name,
            email,
            address,
            phone,
            delivery,
            request_order,
            return_item,
            status
        };

        const objIndex = warehouses.findIndex((obj) => obj.id === id);

        warehouses[objIndex] = user;

        return [200, warehouses];
    } catch (err) {
        console.error(err);
        return [500, { message: 'Onternal server error' }];
    }
});

services.onPost('/api/warehouse/delete').reply((request) => {
    try {
        const { id } = JSON.parse(request.data);
        warehouses = warehouses.filter((item) => item.id !== id);
        return [200, warehouses];
    } catch (err) {
        console.error(err);
        return [500, { message: 'Onternal server error' }];
    }
});

services.onGet('/api/warehouse/order').reply(200, { orders });
services.onGet('/api/warehouse/order-delivery').reply(200, { orders: orders.filter((i) => i.status === 2) });
services.onGet('/api/warehouse/order-returned').reply(200, { orders: orders.filter((i) => i.status === 4) });

services.onGet('/api/warehouse/transaction').reply(200, { transactions });
services.onGet('/api/warehouse/transaction-delivery').reply(200, { transactions: transactions.filter((i) => i.status === 2) });
services.onGet('/api/warehouse/transaction-returned').reply(200, { transactions: transactions.filter((i) => i.status === 4) });
services.onGet('/api/warehouse/transaction-success').reply(200, { transactions: transactions.filter((i) => i.status === 1) });
