import * as React from 'react';

import { Box, Button, TextField, Typography } from '@mui/material';
import styles from './styles';
import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { RegisterUser } from '../Types/Usuario/RegisterUser';
import userService from '../Services/UserService';



const Register = () => {

    const navigate = useNavigate();
    const handleSubmit = async (values: RegisterUser) => {
        try {
            await userService.register(values)
            alert("Usuário cadastrado com sucesso!")
            navigate('/login');
        } catch (error: any) {
            alert(error.response.data.message)
        }
    }
    const initialValues: RegisterUser = { name: '', email: '', password: '' };
    const SigninSchema = Yup.object().shape({
        name: Yup.string()
            .min(3, 'Muito curto!')
            .max(30, 'Muito longo!')
            .required('Obrigatório'),
        email: Yup.string().email('E-mail invalido').required('Obrigatório'),
        password: Yup.string()
            .min(6, 'Muito curto!')
            .max(30, 'Muito longo!')
            .required('Obrigatório')
    });
    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={SigninSchema}>
            {({ touched, errors, }) => (
                <div style={styles.container}>

                    <Form style={styles.formContainer} >
                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>
                        <Field
                            type="name"
                            id="name"
                            name="name"
                            margin="normal"
                            as={TextField}
                            fullWidth
                            label="Nome"
                            error={Boolean(touched.name && errors.name)}
                        />
                        <Box height={16}>
                            <Typography component="span" color={"red"}>{touched.name && errors.name && <div>{errors.name}</div>}</Typography>
                        </Box>
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
                            sx={{ mt: 3, mb: 2 }}>
                            CADASTRAR
                        </Button>

                    </Form>
                </div>
            )}
        </Formik>
    );
}

export default Register;