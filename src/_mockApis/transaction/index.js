/* eslint-disable camelcase */
// project imports
import services from 'utils/mockAdapter';

const transactions = [
    {
        id: 'I-001',
        image: 'https://www.foodierate.com/uploads/fullsize/89418/1tobcW634e1e63be873_udang-keju-mie-gacoan.jpg',
        user_name: 'Roberto Carlos',
        role: 'Mitra',
        name: 'Udang Keju',
        qty: '4',
        description: 'Berat : 2 Kg, Rasa Keju',
        capital_price: '70000',
        selling_price: '75000',
        date: '29 Jan 2022',
        time: '08:00 am',
        status: 1
    },
    {
        id: 'I-002',
        image: 'https://i0.wp.com/i.gojekapi.com/darkroom/gofood-indonesia/v2/images/uploads/32ac3b20-a924-4ee5-a9c6-74fc35e25f08_Go-Biz_20220627_184748.jpeg',
        user_name: 'Olivia Shine',
        role: 'Mitra',
        name: 'Kaicat',
        qty: '2',
        description: 'Berat : 1 Kg, Rasa Ayam Original',
        capital_price: '40000',
        selling_price: '50000',
        date: '08 Mar 2022',
        time: '09:00 am',
        status: 2
    },
    {
        id: 'I-003',
        image: 'https://img.kurio.network/OOo7gzHmQoP2Y_P8COlidb77Xbs=/1200x1200/filters:quality(80)/https://kurio-img.kurioapps.com/21/06/28/79fc380f-6664-4de3-92c0-34884fc7af56.jpe',
        user_name: 'James Alex',
        role: 'Agent',
        name: 'Lumpia Ayam',
        qty: '3',
        description: 'Berat : 2 Kg, Rasa Ayam',
        capital_price: '80000',
        selling_price: '85000',
        date: '29 Des 2022',
        time: '08:10 am',
        status: 1
    },
    {
        id: 'I-004',
        image: 'https://cdns.klimg.com/merdeka.com/i/w/news/2022/09/22/1474750/540x270/hadirkan-sensasi-beda-nikmati-uniknya-cita-rasa-bakpao-telur-asin-ini-di-jakarta.jpg',
        user_name: 'John Doe',
        role: 'Mitra',
        name: 'Bakpau Keju',
        qty: '3',
        description: 'Berat : 3 Kg, Rasa Keju',
        capital_price: '46000',
        selling_price: '50000',
        date: '29 Mar 2022',
        time: '10:00 am',
        status: 3
    },
    {
        id: 'I-005',
        image: 'https://cdns.klimg.com/dream.co.id/resized/640x320/news/2020/09/25/148105/resep-bakpao-pandan-isi-cokelat-lumer-manjakakan-lidah-200925z.jpg',
        user_name: 'Michele',
        role: 'Agent',
        name: 'Bakpau Pandan',
        qty: '5',
        description: 'Berat : 3 Kg, Rasa Keju',
        capital_price: '75000',
        selling_price: '80000',
        date: '28 Feb 2022',
        time: '11:00 am',
        status: 1
    },
    {
        id: 'I-006',
        image: 'https://asset.kompas.com/crops/Atp1STR6jMcegrNX0anTx5eN7xY=/0x0:1000x667/780x390/data/photo/2021/05/23/60aa371ed27a5.jpg',
        user_name: 'Johannes',
        role: 'Agent',
        name: 'Siomay',
        qty: '4',
        description: 'Berat : 1 Kg, Rasa Ayam',
        capital_price: '90000',
        selling_price: '10000',
        date: '29 Apr 2022',
        time: '01:00 pm',
        status: 1
    },
    {
        id: 'I-007',
        image: 'https://awsimages.detik.net.id/community/media/visual/2022/06/02/viral-restoran-sushi-tidak-halal-ini-3-bahan-sushi-yang-tak-halal-3.jpeg?w=1200',
        user_name: 'Emilia Johanson',
        role: 'Agent',
        name: 'Sushi',
        qty: '6',
        description: 'Berat : 2 Kg, Rasa Ikan',
        capital_price: '50000',
        selling_price: '55000',
        date: '29 Jan 2022',
        time: '08:00 am',
        status: 1
    },
    {
        id: 'I-008',
        image: 'https://awsimages.detik.net.id/community/media/visual/2020/11/20/resep-pangsit-goreng.jpeg?w=700&q=90',
        user_name: 'Franky Sitohang',
        role: 'Agent',
        name: 'Pangsit Goreng',
        qty: '8',
        description: 'Berat : 3 Kg, Rasa Ayam',
        capital_price: '55000',
        selling_price: '60000',
        date: '12 Jan 2022',
        time: '04:00 pm',
        status: 2
    },
    {
        id: 'I-009',
        image: 'https://www.masakapahariini.com/wp-content/uploads/2019/09/shutterstock_247169467-500x300.jpg',
        user_name: 'Samantha Bake',
        role: 'Agent',
        name: 'Lumpia Udang',
        qty: '7',
        description: 'Berat : 2 Kg, Rasa Udang',
        capital_price: '65000',
        selling_price: '70000',
        date: '29 Jan 2022',
        time: '08:00 am',
        status: 1
    },
    {
        id: 'I-010',
        image: 'https://cdn1-production-images-kly.akamaized.net/bmn1A32YVgDuIsW-ykj77K8H1oQ=/1x30:1000x593/1200x675/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/3328136/original/010708500_1608347065-shutterstock_247595971.jpg',
        user_name: 'Jessica Wong',
        role: 'Agent',
        name: 'Nugget Ayam',
        qty: '5',
        description: 'Berat : 1 Kg, Rasa Ayam',
        capital_price: '77000',
        selling_price: '80000',
        date: '29 Jan 2022',
        time: '08:00 am',
        status: 3
    }
];

const purchaseOrder = [
    {
        id: 'PO-001',
        vendor: 'Supplier 1',
        warehouse: 'Gudang Tangerang',
        qty: 4,
        total: 770000,
        date: '29 Jan 2022',
        status: 1,
        details: [
            {
                id: 'I-001',
                product_name: 'Sushi rasa ikan',
                qty: 1,
                cost: 30000,
                total: 30000
            },
            {
                id: 'I-002',
                product_name: 'Udang Keju',
                qty: 2,
                cost: 20000,
                total: 40000
            },
            {
                id: 'I-003',
                product_name: 'Siomay',
                qty: 5,
                cost: 20000,
                total: 100000
            },
            {
                id: 'I-004',
                product_name: 'Bakpau Keju',
                qty: 10,
                cost: 40000,
                total: 400000
            },
            {
                id: 'I-005',
                product_name: 'Bakpau Pandan',
                qty: 4,
                cost: 50000,
                total: 200000
            }
        ]
    },
    {
        id: 'PO-002',
        vendor: 'Supplier 1',
        warehouse: 'Gudang Tangerang',
        qty: 5,
        total: 770000,
        date: '29 Jan 2022',
        status: 1,
        details: [
            {
                id: 'I-001',
                product_name: 'Sushi rasa ikan',
                qty: 1,
                cost: 30000,
                total: 30000
            },
            {
                id: 'I-002',
                product_name: 'Udang Keju',
                qty: 2,
                cost: 20000,
                total: 40000
            },
            {
                id: 'I-003',
                product_name: 'Siomay',
                qty: 5,
                cost: 20000,
                total: 100000
            },
            {
                id: 'I-004',
                product_name: 'Bakpau Keju',
                qty: 10,
                cost: 40000,
                total: 400000
            },
            {
                id: 'I-005',
                product_name: 'Bakpau Pandan',
                qty: 4,
                cost: 50000,
                total: 200000
            }
        ]
    }
];

const receiveList = [
    {
        id: 'RC-001',
        vendor: 'Supplier 1',
        warehouse: 'Gudang Tangerang',
        qty: 4,
        receive_qty: 4,
        total: 770000,
        date: '29 Jan 2022',
        status: 1,
        details: [
            {
                id: 'I-001',
                product_name: 'Sushi rasa ikan',
                qty: 1,
                cost: 30000,
                total: 30000
            },
            {
                id: 'I-002',
                product_name: 'Udang Keju',
                qty: 2,
                cost: 20000,
                total: 40000
            },
            {
                id: 'I-003',
                product_name: 'Siomay',
                qty: 5,
                cost: 20000,
                total: 100000
            },
            {
                id: 'I-004',
                product_name: 'Bakpau Keju',
                qty: 10,
                cost: 40000,
                total: 400000
            },
            {
                id: 'I-005',
                product_name: 'Bakpau Pandan',
                qty: 4,
                cost: 50000,
                total: 200000
            }
        ]
    },
    {
        id: 'RC-002',
        vendor: 'Supplier 1',
        warehouse: 'Gudang Tangerang',
        qty: 5,
        receive_qty: 5,
        total: 770000,
        date: '29 Jan 2022',
        status: 1,
        details: [
            {
                id: 'I-001',
                product_name: 'Sushi rasa ikan',
                qty: 1,
                cost: 30000,
                total: 30000
            },
            {
                id: 'I-002',
                product_name: 'Udang Keju',
                qty: 2,
                cost: 20000,
                total: 40000
            },
            {
                id: 'I-003',
                product_name: 'Siomay',
                qty: 5,
                cost: 20000,
                total: 100000
            },
            {
                id: 'I-004',
                product_name: 'Bakpau Keju',
                qty: 10,
                cost: 40000,
                total: 400000
            },
            {
                id: 'I-005',
                product_name: 'Bakpau Pandan',
                qty: 4,
                cost: 50000,
                total: 200000
            }
        ]
    }
];

// ==============================|| MOCK SERVICES ||============================== //

services.onGet('/api/transaction/list').reply(200, { transactions });
services.onGet('/api/transaction/purchase-order').reply(200, { purchaseOrder });
services.onGet('/api/transaction/receive-list').reply(200, { receiveList });
