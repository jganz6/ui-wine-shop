// assets
import colors from 'assets/scss/_themes-vars.module.scss';

// ==============================|| DASHBOARD - VISITOR AREA CHART ||============================== //
const YearlyChartData = {
    type: 'line',
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
            width: 3
        },
        colors: [colors.primaryMain],
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
                'Januari',
                'Februari',
                'Maret',
                'April',
                'Mei',
                'Juni',
                'Juli',
                'Agustus',
                'September',
                'Oktober',
                'November',
                'Desember'
            ]
        }
    },
    series: [
        {
            data: [20000000, 15000000, 70000000, 45000000, 20000000, 40000000, 65000000, 20000000, 15000000, 70000000, 45000000, 70000000]
        }
    ]
};

export default YearlyChartData;
