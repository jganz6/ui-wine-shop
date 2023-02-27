/* eslint-disable camelcase */
// project imports
import services from 'utils/mockAdapter';

const inventories = [
    {
        id: 'I-001',
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
        id: 'I-002',
        image: 'https://i0.wp.com/i.gojekapi.com/darkroom/gofood-indonesia/v2/images/uploads/32ac3b20-a924-4ee5-a9c6-74fc35e25f08_Go-Biz_20220627_184748.jpeg',
        name: 'Kaicat',
        qty: '2',
        description: 'Berat : 1 Kg, Rasa Ayam Original',
        capital_price: '40000',
        selling_price: '50000',
        income: '100000',
        status: 1
    },
    {
        id: 'I-003',
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
        id: 'I-004',
        image: 'https://cdns.klimg.com/merdeka.com/i/w/news/2022/09/22/1474750/540x270/hadirkan-sensasi-beda-nikmati-uniknya-cita-rasa-bakpao-telur-asin-ini-di-jakarta.jpg',
        name: 'Bakpau Keju',
        qty: '3',
        description: 'Berat : 3 Kg, Rasa Keju',
        capital_price: '46000',
        selling_price: '50000',
        income: '150000',
        status: 1
    },
    {
        id: 'I-005',
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
        id: 'I-006',
        image: 'https://asset.kompas.com/crops/Atp1STR6jMcegrNX0anTx5eN7xY=/0x0:1000x667/780x390/data/photo/2021/05/23/60aa371ed27a5.jpg',
        name: 'Siomay',
        qty: '4',
        description: 'Berat : 1 Kg, Rasa Ayam',
        capital_price: '90000',
        selling_price: '10000',
        income: '40000',
        status: 1
    },
    {
        id: 'I-007',
        image: 'https://awsimages.detik.net.id/community/media/visual/2022/06/02/viral-restoran-sushi-tidak-halal-ini-3-bahan-sushi-yang-tak-halal-3.jpeg?w=1200',
        name: 'Sushi',
        qty: '6',
        description: 'Berat : 2 Kg, Rasa Ikan',
        capital_price: '50000',
        selling_price: '55000',
        income: '330000',
        status: 1
    },
    {
        id: 'I-008',
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
        id: 'I-009',
        image: 'https://www.masakapahariini.com/wp-content/uploads/2019/09/shutterstock_247169467-500x300.jpg',
        name: 'Lumpia Udang',
        qty: '7',
        description: 'Berat : 2 Kg, Rasa Udang',
        capital_price: '65000',
        selling_price: '70000',
        income: '490000',
        status: 1
    },
    {
        id: 'I-010',
        image: 'https://cdn1-production-images-kly.akamaized.net/bmn1A32YVgDuIsW-ykj77K8H1oQ=/1x30:1000x593/1200x675/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/3328136/original/010708500_1608347065-shutterstock_247595971.jpg',
        name: 'Nugget Ayam',
        qty: '5',
        description: 'Berat : 1 Kg, Rasa Ayam',
        capital_price: '77000',
        selling_price: '80000',
        income: '400000',
        status: 1
    }
];

// ==============================|| MOCK SERVICES ||============================== //

services.onGet('/api/inventory/list').reply(200, { inventories });
