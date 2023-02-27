/* eslint-disable react/prop-types */
/* eslint-disable no-unused-expressions */
import { useState } from 'react';
import { TextField } from '@mui/material';
import { NumericFormat } from 'react-number-format';

const CurrencyInput = ({ ...props }) => {
    const [displayValue, setDisplayValue] = useState();
    return (
        <NumericFormat
            customInput={TextField}
            variant="outlined"
            valueIsNumericString
            thousandSeparator="."
            decimalSeparator=","
            allowNegative={false}
            allowLeadingZeros={false}
            value={displayValue}
            onValueChange={(vals) => {
                props.formik.setFieldValue(props.name, vals.value);
                setDisplayValue({ value: vals.formattedValue });
            }}
            {...props}
        />
    );
};

export default CurrencyInput;
