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

LoginForm.propTypes = {
    onSubmit: PropTypes.func,
};

function LoginForm(props) {
    const schema = yup.object().shape({
        identifier: yup.string().required('Please enter your email.').email('Please enter a valid email address'),
        password: yup.string().required('Please enter your password.')
    });

    const form = useForm({
        defaultValues: {
            identifier: '',
            password: '',
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
                Sign in
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
                    Sign in
                </Button>
            </form>
        </div>
    );
}

export default LoginForm;
