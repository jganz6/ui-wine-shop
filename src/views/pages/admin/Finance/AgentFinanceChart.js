// ==============================|| WIDGET - AGENT FINANCE CHART ||============================== //

const AgentFinanceChart = {
    height: 200,
    type: 'radialBar',
    options: {
        chart: {
            id: 'agent-finance-chart'
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
                type: 'vertical',
                gradientToColors: ['#FF6175', '#FFB661'],
                inverseColors: true,
                opacityFrom: 1,
                opacityTo: 1,
                stops: [0, 100]
            }
        }
    },
    series: [38]
};
export default AgentFinanceChart;
