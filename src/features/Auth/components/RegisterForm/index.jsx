import { yupResolver } from '@hookform/resolvers/yup';
import { LockOutlined } from '@mui/icons-material';
import { Avatar, Button, LinearProgress, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import InputField from '~/components/formControl/InputField';
import PasswordField from '~/components/formControl/PasswordField';

const classes = {
    root: {
        position: 'relative',
        paddingTop: '24px',
    },

    avatar: {
        margin: '0 auto',
        backgroundColor: 'red',
    },

    title: {
        textAlign: 'center',
        margin: '16px 0 16px 0',
    },

    submit: {
        margin: '16px 0 16px 0',
    },

    progress: {
        position: 'absolute',
        top: "4px",
        left: '0',
        right: 0,
    },
};

RegisterForm.propTypes = {
    onSubmit: PropTypes.func,
};

function RegisterForm(props) {
    const schema = yup.object().shape({
        fullName: yup
            .string()
            .required('Please enter your full name.')
            .test('should has at least two words', 'Please enter at least two words', (value) => {
                return value.split(' ').length >= 2;
            }),
        email: yup.string().required('Please enter your email.').email('Please enter a valid email address'),
        password: yup.string().required('Please enter your password.').min(6, 'Please enter at least 6 characters.'),
        retypePassword: yup
            .string()
            .required('Please retype your password.')
            .oneOf([yup.ref('password')], 'Password does not match'),
    });

    const form = useForm({
        defaultValues: {
            fullName: '',
            email: '',
            password: '',
            retypePassword: '',
        },
        reValidateMode: 'onSubmit',
        resolver: yupResolver(schema),
    });

    const handleSubmit = async (values) => {
        const { onSubmit } = props;

        if (onSubmit) {
            await onSubmit(values);
        }
    };

    const { isSubmitting } = form.formState;

    return (
        <div style={{ ...classes.root }}>
            {isSubmitting && <LinearProgress style={{ ...classes.progress }} />}

            <Avatar style={{ ...classes.avatar }}>
                <LockOutlined></LockOutlined>
            </Avatar>

            <Typography style={{ ...classes.title }} component="h3" variant="h5">
                Create An Account
            </Typography>

            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <InputField name="fullName" label="Full Name" form={form} />
                <InputField name="email" label="Email" form={form} />
                <PasswordField name="password" label="Password" form={form} />
                <PasswordField name="retypePassword" label="Retype Password" form={form} />

                <Button
                    disabled={isSubmitting}
                    type="submit"
                    style={{ ...classes.submit }}
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="large"
                >
                    Create an account
                </Button>
            </form>
        </div>
    );
}

export default RegisterForm;
