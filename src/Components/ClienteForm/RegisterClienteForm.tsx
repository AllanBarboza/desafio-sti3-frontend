import { Field, Form, Formik } from "formik";
import { CreateCliente } from "../../Types/Cliente/CreateCliente";
import * as Yup from 'yup';
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import styles from "./styles";
import DateService from "../../Services/DateService";
import axios from "axios";
import authService from "../../Services/AuthService";

const RegisterClienteForm = () => {
    const apiUrl = process.env.REACT_APP_API_URL
    const userLogged = authService.getLoggedUser();

    const endpoint = `${apiUrl}/Cliente`

    const Create = async (data: CreateCliente) => {
        return axios.post<string>(endpoint, data, { headers: { Authorization: `Bearer ${userLogged.token}` } })
    }

    const handleSubmit = async (values: CreateCliente) => {
        try {
            values.dataNascimento = DateService.FormatStringDate(values.dataNascimento)
            await Create(values)
            alert("Cliente cadastrado com sucesso!")
        } catch (error: any) {
            alert(error.response.data.message)
        }
    }

    const initialValues: CreateCliente = { nome: '', email: '', dataNascimento: '' };
    const SigninSchema = Yup.object().shape({
        nome: Yup.string()
            .min(3, 'Muito curto!')
            .max(30, 'Muito longo!')
            .required('Obrigatório'),
        email: Yup.string().email('E-mail invalido').required('Obrigatório'),
        dataNascimento: Yup.string().required('Obrigatório').test(
            'test-invalid-date',
            'Data inválida',
            (date) => DateService.isValidDate(date))
    });
    return (
        <Formik initialValues={initialValues} onSubmit={(values, { resetForm }) => {
            handleSubmit(values)
            resetForm()
        }} validationSchema={SigninSchema}>
            {({ touched, errors, setFieldValue }) => (
                <Paper sx={{ width: '50vw', height: '50vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Form style={styles.container}>
                        <Typography component="h1" variant="h5" sx={{ marginBottom: 5 }}>
                            Cadastro de Cliente
                        </Typography>
                        <Field
                            type="name"
                            id="nome"
                            name="nome"
                            margin="normal"
                            as={TextField}
                            fullWidth
                            label="Nome"
                            error={Boolean(touched.nome && errors.nome)}
                        />
                        <Box height={16}>
                            <Typography component="span" color={"red"}>{touched.nome && errors.nome && <div>{errors.nome}</div>}</Typography>
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
                            as={TextField}
                            type="data"
                            id="dataNascimento"
                            name="dataNascimento"
                            margin="normal"
                            fullWidth
                            label="Data Nascimento"
                            onChange={(e: any) => {
                                setFieldValue('dataNascimento', DateService.maskDate(e.target.value))
                            }}
                            error={Boolean(touched.dataNascimento && errors.dataNascimento)}
                        />


                        <Box height={16}>
                            <Typography component="span" color={"red"}>{touched.dataNascimento && errors.dataNascimento && <div>{errors.dataNascimento}</div>}</Typography>
                        </Box>
                        <Button type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}>
                            CADASTRAR
                        </Button>

                    </Form>
                </Paper>
            )}
        </Formik>
    );
}
export default RegisterClienteForm;