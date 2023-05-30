import { Field, Form, Formik } from "formik";
import { CreateTelefone } from "../../Types/Contato/CreateTelefone"
import { TelefoneEnum } from "../../Types/Contato/Telefone"
import * as Yup from 'yup';
import { Box, Button, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import styles from "./styles";
import { useState } from "react";
import authService from "../../Services/AuthService";
import axios from "axios";

type RegisterContatoFormProps = {
    ClienteId: string
}

const RegisterContatoForm = ({ ClienteId }: RegisterContatoFormProps) => {
    const [descricao, setdescricao] = useState('CASA');

    const apiUrl = process.env.REACT_APP_API_URL;
    const userLogged = authService.getLoggedUser();

    const create = (telefone: CreateTelefone) => {
        const endpoint = `${apiUrl}/telefone`
        return axios.post(endpoint, telefone, { headers: { Authorization: `Bearer ${userLogged.token}` } });
    }

    const handleChange = (event: SelectChangeEvent) => {
        setdescricao(event.target.value as string);
    };
    const handleSubmit = async (values: CreateTelefone) => {
        try {
            values.descricao = descricao;
            await create(values);
            alert("Contato cadastrado com sucesso!");
        } catch (error: any) {
            alert(error.response.data.message)
        }
    }

    const initialValues: CreateTelefone = { clienteId: ClienteId, descricao: descricao, numero: '' };
    const SigninSchema = Yup.object().shape({
        descricao: Yup.string()
            .min(4, 'Muito curto!')
            .max(7, 'Muito longo!')
            .required('Obrigatório'),
        numero: Yup.string()
            .min(8, 'Muito curto!')
            .required('Obrigatório'),

    });
    return (
        <Formik initialValues={initialValues} onSubmit={(values, { resetForm }) => {
            handleSubmit(values)
            resetForm()
        }} validationSchema={SigninSchema}>
            {({ touched, errors, setFieldValue, values }) => (
                <Paper sx={{ width: '30vw', height: '35vh', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 5 }}>
                    <Form style={styles.form}>
                        <Typography component="h1" variant="h5" sx={{ marginBottom: 5 }}>
                            Cadastro de Contato
                        </Typography>

                        <Field
                            type="name"
                            id="descricao"
                            name="descricao"
                            as={InputLabel}
                            label="Descrição"
                            value={descricao}
                            error={Boolean(touched.descricao && errors.descricao)}
                        />
                        <Select
                            labelId="descricao"
                            id="descricao"
                            value={descricao}
                            onChange={(e: any) => {
                                handleChange(e)
                            }}
                            label="Age"
                        >
                            <MenuItem value={'CASA'}>CASA</MenuItem>
                            <MenuItem value={'TRABALHO'}>TRABALHO</MenuItem>
                            <MenuItem value={'CELULAR'}>CELULAR</MenuItem>
                        </Select>
                        <Box height={16}>
                            <Typography component="span" color={"red"}>{touched.descricao && errors.descricao && <div>{errors.descricao}</div>}</Typography>
                        </Box>
                        <Field as={TextField}
                            type="name"
                            id="numero"
                            name="numero"
                            margin="normal"
                            fullWidth
                            label="numero"
                            autoComplete="numero"
                            error={Boolean(touched.numero && errors.numero)}
                        />
                        <Box height={16}>
                            <Typography component="span" color={"red"} >{touched.numero && errors.numero && <div>{errors.numero}</div>}</Typography>
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
    )
}

export default RegisterContatoForm;