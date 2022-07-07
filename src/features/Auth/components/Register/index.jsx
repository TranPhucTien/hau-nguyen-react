import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { register } from '../../userSlice';
import RegisterForm from '../RegisterForm';

Register.propTypes = {
    closeDialog: PropTypes.func,
};

function Register(props) {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const handleSubmit = async (values) => {
        try {
            // auto set username = email
            values.username = values.email;

            console.log('Form submit: ', values);
            const action = register(values);
            const resultAction = await dispatch(action);
            unwrapResult(resultAction);

            // close dialog
            const { closeDialog } = props;
            
            if (closeDialog) {
                closeDialog();
            }

            // Do something here on register successfully
            enqueueSnackbar('Register successfully!!! 😁', { variant: 'success' });
        } catch (error) {
            console.log('Fail to register: ', error);
            enqueueSnackbar(error.message, { variant: 'error' });
        }
    };

    return (
        <div>
            <RegisterForm onSubmit={handleSubmit}></RegisterForm>
        </div>
    );
}

export default Register;
