// assets
import colors from 'assets/scss/_themes-vars.module.scss';

// ==============================|| DASHBOARD - VISITOR AREA CHART ||============================== //
const WeeklyChartData = {
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
        colors: [colors.secondaryMain],
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
            categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        }
    },
    series: [
        {
            data: [200000, 150000, 700000, 450000, 200000, 400000, 650000]
        }
    ]
};

export default WeeklyChartData;
