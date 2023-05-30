import { useEffect, useState } from "react";
import { Telefone } from "../../Types/Contato/Telefone";
import { Box, Button, IconButton, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import styles from "./styles";
import RegisterContatoForm from "./RegisterContatoForm";
import axios from "axios";
import authService from "../../Services/AuthService";

type ListContatoProps = {
    ClienteId: string
}
const ListContato = ({ ClienteId }: ListContatoProps) => {

    const apiUrl = process.env.REACT_APP_API_URL;
    const userLogged = authService.getLoggedUser();

    const get = async (clienteId: string) => {
        const endpoint = `${apiUrl}/telefone?ClienteId=${clienteId}`
        return axios.get<Telefone[]>(endpoint, { headers: { Authorization: `Bearer ${userLogged.token}` } });
    };

    const deleteContato = async (id: string) => {
        const endpoint = `${apiUrl}/telefone/${id}`
        return axios.delete(endpoint, { headers: { Authorization: `Bearer ${userLogged.token}` } });
    };

    const [rows, setRows] = useState<Telefone[]>([]);
    const [openCadastroContato, setOpenCadastroContato] = useState(false);

    const handleCadastroContato = () => setOpenCadastroContato(true);

    const handleCloseCadastroContato = () => {
        setOpenCadastroContato(false);
        refreshPage();
    };
    const handleDelete = async (id: string) => {
        try {
            await deleteContato(id)
            removeRow(id)
            alert("Contato excluido com sucesso!")
        } catch (error: any) {
            alert(error.response.data.message)
        }
    }

    useEffect(() => {
        get(ClienteId).then((resp) => {
            setRows(resp.data)
        }).catch((error) => {
            alert(error.response.data.message);
        })

    }, [])

    const refreshPage = () => {
        window.location.reload();
    }

    const removeRow = (id: string) => {
        setRows(rows.filter((i) => i.id !== id));
    }


    return (
        <Box style={styles.container}  >

            <TableContainer style={styles.table} component={Paper} variant='outlined'>
                <Paper sx={{ display: 'flex', padding: 1, alignItems: 'center', marginBottom: 5 }}>
                    <Typography component="h1" variant="h5" sx={{ width: '90%', height: '50px', display: 'flex', alignItems: 'center', padding: '10px' }}>
                        Contatos
                    </Typography>
                    <Button variant="contained" color="success" sx={{ width: '10%', height: 50 }} onClick={handleCadastroContato}>
                        Add
                    </Button>
                </Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Descrição</TableCell>
                            <TableCell>Numero</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map(row => (
                            <TableRow key={row.id}>
                                <TableCell>{row.descricao}</TableCell>
                                <TableCell>{row.numero}</TableCell>

                                <TableCell style={{ width: 50 }}>
                                    <IconButton size="large" onClick={() => {
                                        // setSelectedCliente(row)
                                        // handleOpenUpdateCliente()
                                    }}>
                                        <EditIcon fontSize="large" />
                                    </IconButton>
                                </TableCell>
                                <TableCell style={{ width: 50 }}>
                                    <IconButton size="large" onClick={() => handleDelete(row.id)}>
                                        <DeleteIcon fontSize="large" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Modal
                open={openCadastroContato}
                onClose={handleCloseCadastroContato}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
                <Box >
                    <RegisterContatoForm ClienteId={ClienteId}></RegisterContatoForm>
                </Box>
            </Modal>

        </Box>
    )
}

export default ListContato;