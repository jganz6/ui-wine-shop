// assets
import colors from 'assets/scss/_themes-vars.module.scss';

// ==============================|| DASHBOARD - VISITOR AREA CHART ||============================== //
const YearlyChartData = {
    type: 'area',
    height: 250,
    options: {
        chart: {
            id: 'income-chart',
            toolbar: {
                show: false
            },
            zoom: {
                enabled: false
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth',
            width: 1
        },
        colors: [colors.darkTextSecondary],
        tooltip: {
            fixed: {
                enabled: false
            },
            x: {
                show: false
            },
            y: {
                title: {
                    formatter: () => 'Income'
                }
            },
            marker: {
                show: false
            }
        },
        xaxis: {
            categories: [
                '01',
                '02',
                '03',
                '04',
                '05',
                '06',
                '07',
                '08',
                '09',
                '10',
                '11',
                '12',
                '13',
                '14',
                '15',
                '16',
                '17',
                '18',
                '19',
                '20',
                '21',
                '22',
                '23',
                '24',
                '25',
                '26',
                '27',
                '28',
                '29',
                '30',
                '31'
            ]
        }
    },
    series: [
        {
            data: [
                200000, 150000, 70000, 460000, 2000000, 4000000, 650000, 200000, 1500000, 700000, 450000, 70000, 200000, 150000, 70000,
                460000, 2000000, 4000000, 650000, 200000, 1500000, 700000, 450000, 70000, 200000, 150000, 70000, 460000, 2000000, 4000000,
                650000
            ]
        }
    ]
};

export default YearlyChartData;
