import { Box, Button, Checkbox, FormControlLabel, TextField, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';
import styled from 'styled-components';

FilterByService.propTypes = {
    onChange: PropTypes.func,
    filters: PropTypes.object,
};

const List = styled('ul')({
    padding: 0,
    margin: 0,
    listStyleType: 'none',

    '& > li': {
        margin: 0,
    },
});

const BoxRoot = styled(Box)({
    padding: '16px',
    borderTop: '1px solid #eee',
});

function FilterByService({ onChange, filters = {} }) {
    const handleChange = (e) => {
        if (!onChange) return;

        const { name, checked } = e.target;
        onChange({ [name]: checked });
    };

    return (
        <BoxRoot>
            <Typography variant="subtitle2">Dich vu</Typography>

            <List>
                {[
                    { value: 'isPromotion', label: 'Co khuyen mai' },
                    { value: 'isFreeShip', label: 'Van chuyen mien phi' },
                ].map((service) => (
                    <li key={service.value}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={Boolean(filters[service.value])}
                                    onChange={handleChange}
                                    color="primary"
                                    name={service.value}
                                />
                            }
                            label={service.label}
                        />
                    </li>
                ))}
            </List>
        </BoxRoot>
    );
}

export default FilterByService;
