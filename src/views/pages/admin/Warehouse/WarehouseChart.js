import colors from 'assets/scss/_themes-vars.module.scss';

// ==============================|| WIDGET - WAREHOUSE CHART ||============================== //

const WarehouseChart = {
    height: 280,
    type: 'donut',
    options: {
        chart: {
            id: 'warehouse-chart'
        },
        dataLabels: {
            enabled: true
        },
        labels: ['On Delivery', 'Request Order', 'Return Item'],
        colors: [colors.tertiaryMain, colors.warningMain, colors.infoLight],
        legend: {
            show: false,
            position: 'bottom',
            fontFamily: 'inherit',
            labels: {
                colors: 'inherit'
            },
            itemMargin: {
                horizontal: 10,
                vertical: 10
            }
        }
    },
    series: [25, 60, 7]
};
export default WarehouseChart;
