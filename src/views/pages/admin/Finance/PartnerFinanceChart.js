// ==============================|| WIDGET - AGENT FINANCE CHART ||============================== //

const PartnerFinanceChart = {
    height: 200,
    type: 'radialBar',
    options: {
        chart: {
            id: 'partner-finance-chart'
        },
        plotOptions: {
            radialBar: {
                dataLabels: {
                    name: {
                        show: false
                    },
                    value: {
                        formatter(val) {
                            return `${parseInt(val, 10)}%`;
                        },
                        fontSize: '24px',
                        show: true
                    }
                }
            }
        },
        fill: {
            type: 'gradient',
            gradient: {
                type: 'horizontal',
                gradientToColors: ['#624FD1', '#3BD7E1'],
                inverseColors: true,
                opacityFrom: 1,
                opacityTo: 1,
                stops: [0, 100]
            }
        }
    },
    series: [62]
};
export default PartnerFinanceChart;
