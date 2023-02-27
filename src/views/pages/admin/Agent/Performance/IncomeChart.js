import { useState } from 'react';

// material ui
import { Stack, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';

// project import
import MainCard from 'ui-component/cards/MainCard';
import WeeklyChartData from './WeeklyChartData';
import MonthlyChartData from './MonthlyChartData';
import YearlyChartData from './YearlyChartData';

// third-party
import Chart from 'react-apexcharts';

const IncomeChart = () => {
    const [toggleGraph, setToggleGraph] = useState('Monthly');

    return (
        <Stack>
            <MainCard border gradientBorder>
                <Stack direction={{ sx: 'column', md: 'row' }} alignItems="center" justifyContent="space-between">
                    <Typography variant="label">{toggleGraph} Income</Typography>
                    <ToggleButtonGroup
                        size="small"
                        color="info"
                        value={toggleGraph}
                        exclusive
                        onChange={(e, val) => setToggleGraph(val)}
                        aria-label="Report"
                    >
                        <ToggleButton value="Weekly">Weekly</ToggleButton>
                        <ToggleButton value="Monthly">Monthly</ToggleButton>
                        <ToggleButton value="Yearly">Yearly</ToggleButton>
                    </ToggleButtonGroup>
                </Stack>
                {toggleGraph === 'Weekly' && <Chart {...WeeklyChartData} />}
                {toggleGraph === 'Monthly' && <Chart {...MonthlyChartData} />}
                {toggleGraph === 'Yearly' && <Chart {...YearlyChartData} />}
            </MainCard>
        </Stack>
    );
};

export default IncomeChart;
