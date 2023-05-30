import { Field, Form, Formik } from "formik";
import * as Yup from 'yup';
import { Box, Button, Input, Paper, TextField, Typography } from "@mui/material";
import styles from "./styles";
import { Cliente } from "../../Types/Cliente/Cliente";
import dayjs from "dayjs";
import DateService from "../../Services/DateService";
import authService from "../../Services/AuthService";
import axios from "axios";

type ChangeClienteFormProps = {
    Cliente: Cliente
}
const EditClienteForm = ({ Cliente }: ChangeClienteFormProps) => {
    const apiUrl = process.env.REACT_APP_API_URL
    const userLogged = authService.getLoggedUser();

    const endpoint = `${apiUrl}/Cliente`

    const Update = async (data: Cliente) => {
        return axios.put<string>(endpoint, data, { headers: { Authorization: `Bearer ${userLogged.token}` } })
    }
    const handleSubmit = async (values: Cliente) => {
        try {
            values.dataNascimento = DateService.FormatStringDate(values.dataNascimento)
            await Update(values)
            alert("Cliente atualizado com sucesso!")
        } catch (error: any) {
            alert(error.response.data.message)
        }
    }
    const validDate = (date: string) => {
        return DateService.isValidDate(date)
    }

    const initialValues: Cliente = { id: Cliente.id, nome: Cliente.nome, email: Cliente.email, dataNascimento: dayjs(Cliente.dataNascimento).format('DD/MM/YYYY') };
    const SigninSchema = Yup.object().shape({
        nome: Yup.string()
            .min(3, 'Muito curto!')
            .max(30, 'Muito longo!')
            .required('Obrigatório'),
        email: Yup.string().email('E-mail invalido').required('Obrigatório'),
        dataNascimento: Yup.string().required('Obrigatório').test(
            'test-invalid-date',
            'Data inválida',
            (date) => validDate(date))
    });
    return (
        <Formik initialValues={initialValues} onSubmit={(values) => {
            handleSubmit(values)
        }} validationSchema={SigninSchema}>
            {({ touched, errors, setFieldValue }) => (
                <Paper sx={{ width: '50vw', height: '50vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Form style={styles.container}>
                        <Typography component="h1" variant="h5" sx={{ marginBottom: 5 }}>
                            Cliente
                        </Typography>
                        <Field
                            as={TextField}
                            type="name"
                            id="nome"
                            name="nome"
                            margin="normal"
                            fullWidth
                            label="Nome"
                            error={Boolean(touched.nome && errors.nome)}
                        />
                        <Box height={16}>
                            <Typography component="span" color={"red"}>{touched.nome && errors.nome && <div>{errors.nome}</div>}</Typography>
                        </Box>
                        <Field as={TextField}
                            type="email"
                            id="email"
                            name="email"
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
                            ATUALIZAR
                        </Button>

                    </Form>
                </Paper>
            )}
        </Formik>
    );
}
export default EditClienteForm;