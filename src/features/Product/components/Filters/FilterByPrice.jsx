import { Box, Button, TextField, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';
import styled from 'styled-components';

FilterByPrice.propTypes = {
    onChange: PropTypes.func,
};

const BoxRoot = styled(Box)({
    padding: '16px',
    borderTop: "1px solid #eee",
})

const BoxRange = styled(Box)({
    display: "flex",
    flexFlow: 'row nowrap',
    alignItems: 'center',

    margin: '8px 0',

    '& > span': {
        margin: '0 8px'
    }
})

function FilterByPrice({ onChange }) {
    const [values, setValues] = useState({
        salePrice_gte: 0,
        salePrice_lte: 0,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleSubmit = () => {
        console.log(values);
        if (onChange) onChange(values);
    };

    return (
        <BoxRoot>
            <Typography variant="subtitle2">Chon khoang gia</Typography>

            <BoxRange>
                <TextField variant='standard' name="salePrice_gte" value={values.salePrice_gte} onChange={handleChange} />
                <span>-</span>
                <TextField variant='standard' name="salePrice_lte" value={values.salePrice_lte} onChange={handleChange} />
            </BoxRange>

            <Button variant="outlined" color="primary" size="small" onClick={handleSubmit}>
                Ap dung
            </Button>
        </BoxRoot>
    );
}

export default FilterByPrice;
