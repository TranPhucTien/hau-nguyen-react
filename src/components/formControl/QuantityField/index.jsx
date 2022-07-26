import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import { Box, FormControl, FormHelperText, IconButton, OutlinedInput, styled, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';

QuantityField.propTypes = {
    form: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,

    label: PropTypes.string,
    disabled: PropTypes.bool,
};

const Root = styled(Box)({});

const BoxCustom = styled(Box)({
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',

    maxWidth: '150px',
});

function QuantityField(props) {
    const { form, name, label, disabled } = props;
    const { control, setValue } = form;

    return (
        <Controller
            name={name}
            control={control}
            fullWidth
            render={({ field: { onChange, onBlur, value, name, ref }, fieldState: { invalid, isTouched, error } }) => (
                <>
                    <FormControl error={invalid} fullWidth margin="normal" variant="outlined" size="small">
                        <Typography>{label}</Typography>
                        <BoxCustom>
                            <IconButton
                                onClick={() => setValue(name, Number.parseInt(value) ? Number.parseInt(value) - 1 : 1)}
                            >
                                <RemoveCircleOutline />
                            </IconButton>

                            <OutlinedInput
                                id={name}
                                error={invalid}
                                type="number"
                                disabled={disabled}
                                value={value}
                                onBlur={onBlur}
                                onChange={onChange}
                            />

                            <IconButton
                                onClick={() => setValue(name, Number.parseInt(value) ? Number.parseInt(value) + 1 : 1)}
                            >
                                <AddCircleOutline />
                            </IconButton>
                        </BoxCustom>
                    </FormControl>
                    <FormHelperText error={invalid}>{error?.message}</FormHelperText>
                </>
            )}
        />
    );
}

export default QuantityField;
