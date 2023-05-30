import * as React from 'react';

import { Box, Button, TextField, Typography } from '@mui/material';
import styles from './styles';
import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { Auth } from '../Types/Usuario/Auth';
import AuthService from '../Services/AuthService';


type SingInProps = {
    setIsAuth: React.Dispatch<React.SetStateAction<boolean>>
}
const SingIn = ({ setIsAuth }: SingInProps) => {
    const navigate = useNavigate();
    const handleSubmit = async (values: Auth) => {
        try {
            let resp = await AuthService.authenticate(values)
            AuthService.setLoggedUser({
                name: resp.data.name,
                email: resp.data.email,
                token: resp.data.token
            })
            setIsAuth(true)
            navigate('/');
        } catch (error: any) {
            alert(error.response.data.message)
        }
    }
    const initialValues: Auth = { email: '', password: '' };
    const SigninSchema = Yup.object().shape({
        email: Yup.string().email('E-mail invalido').required('Obrigatório'),
        password: Yup.string()
            .min(6, 'Muito curto!')
            .max(50, 'Muito longo!')
            .required('Obrigatório')
    });
    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={SigninSchema}>
            {({ touched, errors, }) => (
                <div style={styles.container}>

                    <Form style={styles.formContainer} >
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Field as={TextField}
                            type="email" id="email" name="email"
                            margin="normal"
                            fullWidth
                            label="E-mail"
                            autoComplete="email"
                            error={Boolean(touched.email && errors.email)}
                        />
                        <Box height={16}>
                            <Typography component="span" color={"red"} >{touched.email && errors.email && <div>{errors.email}</div>}</Typography>
                        </Box>
                        <Field
                            type="password"
                            id="password"
                            name="password"
                            margin="normal"
                            as={TextField}
                            fullWidth
                            label="Password"
                            error={Boolean(touched.password && errors.password)}
                        />
                        <Box height={16}>
                            <Typography component="span" color={"red"}>{touched.password && errors.password && <div>{errors.password}</div>}</Typography>
                        </Box>
                        <Button type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}>Logar</Button>

                        <Link to={"/register"} style={styles.link}>
                            <Typography component="p">{"Não possui uma conta? Registre-se"}</Typography>
                        </Link>
                    </Form>
                </div>
            )}
        </Formik>
    );
}

export default SingIn;